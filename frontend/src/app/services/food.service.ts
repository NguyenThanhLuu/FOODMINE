import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { sample_foods, sample_tags } from 'src/data';
import { Food } from '../shared/models/Food';
import { HttpClient } from '@angular/common/http';
import { Tag } from '../shared/models/Tag';
import { FOODS_BY_SEARCH_URL, FOODS_BY_TAG_URL, FOODS_TAGS_URL, FOODS_URL, FOOD_BY_ID_URL } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Food[]> {
    return this.http.get<Food[]>(FOODS_URL);
  }

  getFoodsWithSearchKeyword(keyword: string): Observable<Food[]> {
    return this.http.get<Food[]>(FOODS_BY_SEARCH_URL + keyword)
  }

  getAllTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(FOODS_TAGS_URL);
  }

  getAllFoodsByTag(tag: string): Observable<Food[]> {
    return tag === "All" ? this.getAll() : this.http.get<Food[]>(FOODS_BY_TAG_URL + tag)
  }

  getFoodWithId(id: any): Observable<Food> {
    return this.http.get<Food>(FOOD_BY_ID_URL + id);
  }
}
