import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { PAYMENT_ID } from 'src/app/shared/constants/paymentId';
import { Title } from 'src/app/shared/constants/title';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'normal-button',
  templateUrl: './normal-button.component.html',
  styleUrls: ['./normal-button.component.css']
})
export class NormalButtonComponent implements OnInit {
  @Input() title!: string;
  @Input() order!: Order;
  isDisable: boolean = true;
  constructor( private orderService: OrderService, private router: Router, private cartService: CartService) {
   }

  ngOnInit(): void {
    setTimeout(() => {
      this.isDisable = this.order.items?.length == 0;
    }, 1000)
  }

  handlerAfterClick(title: string) {
    if (title === Title.PAYMENT) {
      // Handle process for payment
        this.order.paymentId = PAYMENT_ID;
        this.orderService.pay(this.order).subscribe(
          {
            next: (orderId) => {
              this.cartService.clearCart();
              this.router.navigateByUrl('/track/' + orderId);
              alert('PAYMENT SUCCESSFUL!');
            },
            error: (error) => {
              alert('PAYMENT FAIL!');
            }
          }
        );

    }
  }

}
