import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchValue: string = '';
  constructor( private router: Router) {
   }

  ngOnInit(): void {
  }

  changeUrlWithSearchKey(searchKey: string) {
    this.searchValue = searchKey;
    this.router.navigateByUrl(`/search/${searchKey}`)
  }

}
