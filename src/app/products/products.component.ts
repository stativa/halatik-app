import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ProductsService]
})
export class ProductsComponent implements OnInit {
  public products:any;
  constructor(private _route: ActivatedRoute,
              private productsService: ProductsService) { 
    this._route.params.subscribe((product) => {
      //this.products = product.category
      this.onProductGetAll
    });

    this.productsService.getAll().then(this.onProductGetAll);
  }

  ngOnInit() {
    
  }

  onProductGetAll = (res: any) => {
    this.products = res;
  }

}
