import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/Food';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.css']
})
export class FoodPageComponent implements OnInit {
  food: any;
  constructor( private activatedRoute: ActivatedRoute, private foodService: FoodService, private cartService:CartService, private router: Router) {
    activatedRoute.params.subscribe(param => {
      foodService.getFoodWithId(param['id']).subscribe(food => this.food = food);
    })
  }

  ngOnInit(): void {
  }

  addToCart() {
    this.cartService.addToCart(this.food);
    // this.router.navigateByUrl('/cart-page');
  }

}
