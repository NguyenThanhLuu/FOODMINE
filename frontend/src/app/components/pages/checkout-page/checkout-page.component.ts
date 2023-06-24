import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css'],
})
export class CheckoutPageComponent implements OnInit {
  order: Order = new Order();
  checkoutForm!: FormGroup;
  idUser!: string;
  constructor(cartService: CartService, private userService: UserService, private formBuilder: FormBuilder, private orderService: OrderService, private router: Router
  ) {
    const cart = cartService.getCart();
    this.order.items = cart.items;
    this.order.totalPrice = cart.totalPrice;
  }

  ngOnInit(): void {
    let { name, address, id } = this.userService.currentUser;
    this.idUser = id;
    this.checkoutForm = this.formBuilder.group({
      name: [name, Validators.required],
      address: [address, Validators.required],
    });
  }

  get fc() {
    return this.checkoutForm.controls;
  }

  createOrder() {
    if (this.checkoutForm.invalid) {
      alert('Please fill the inputs');
      // this.toastrService.warning('Please fill the inputs', 'Invalid Inputs'); //hard code
      return;
    }
    this.order.name = this.fc.name.value;
    this.order.address = this.fc.address.value;
    this.order.id = this.idUser;
    this.orderService.create(this.order).subscribe({
      next: () => {
        this.router.navigateByUrl('/payment');
      },
      error: (errorResponse) => {
        alert(errorResponse.error);
        // this.toastrService.error(errorResponse.error, 'Cart'); //hard code
      },
    });
  }
}
