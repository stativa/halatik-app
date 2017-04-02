import { Component, OnInit } from '@angular/core';
//import { NavigationService } from '../services/navigation.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public product:any;
  constructor(private _route: ActivatedRoute) { 
    this._route.params.subscribe((product) => {
      this.product = product.category
    });


  }

  ngOnInit() {
    
  }
}
