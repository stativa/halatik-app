import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { OneClickService } from '../services/one-click.service';
import { ActivatedRoute } from '@angular/router';
import { SIZES, URLS } from '../../../constants'


import { ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';


@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [
    ProductsService,
    OneClickService
  ]
})
export class ProductsComponent implements OnInit {
  public products:any;
  public selected:any;
  public previewImgWidth = SIZES.ITEM_PREVIEW_WIDTH;
  public previewImgUrl = URLS.IMAGE_PREVIEW;
  public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  public phone:string;

  

  @ViewChild('lgModal') public lgModal:ModalDirective;

  public showChildModal(product):void {
    this.lgModal.show();
    this.selected = product;
  }

  constructor(private _route: ActivatedRoute,
              private productsService: ProductsService,
              private oneClick: OneClickService) { 
    this._route.params.subscribe((product) => {
      //this.products = product.category
     // this.onProductGetAll
      if (product.category) {
        this.productsService.getCategory(product.category).then(this.onProductGetAll);
      } else if (product.subcategory) {
        this.productsService.getSubcategory(product.subcategory).then(this.onProductGetAll);
      } else if (!product.subcategory && !product.category) {
        this.productsService.getMain().then(this.onProductGetAll);
      }
    });

  //  this.productsService.getAll().then(this.onProductGetAll);
  }

  ngOnInit() {  
  }

  onProductGetAll = (res: any) => {
    this.products = res;
  }

  sendMail() {
   this.oneClick.sendMail(this.selected, this.phone);
   this.lgModal.hide();
  }
}
