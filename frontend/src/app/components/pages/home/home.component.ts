import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/Food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  foods: Food[] = [];
  foodObservable!: Observable<Food[]>;
  constructor(private foodService: FoodService, private activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe(param => {
      this.foodObservable =  param['searchKeyword'] ? foodService.getFoodsWithSearchKeyword(param['searchKeyword']) : param['tag'] ? foodService.getAllFoodsByTag(param['tag']) : foodService.getAll();

      this.foodObservable.subscribe(foods => this.foods = foods)
    })
  }

  ngOnInit(): void {
  }
}
