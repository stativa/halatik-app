import { Injectable } from '@angular/core';
import { Response, RequestOptions, URLSearchParams } from '@angular/http';
import { ServerConnectionService } from './server-connection.service';
import { REQUEST_URLS } from '../../../constants';

@Injectable()
export class ProductsService {
  constructor(private serverConnection: ServerConnectionService) { }

  getAll(): Promise<Response> {
    return this.serverConnection.request(REQUEST_URLS.PRODUCTS, false);
  }

  getCategory(category): Promise<Response> {
    //let params = {};
    /*if (category) {
      params = new RequestOptions({
        search: new URLSearchParams('category=' + category)
      });
    }*/

    category = category || '';

    return this.serverConnection.request(REQUEST_URLS.PRODUCTS + category, null, false);
  }

  getSubcategory(subcategory): Promise<Response> {
    subcategory = subcategory || '';

    return this.serverConnection.request(REQUEST_URLS.SUB_PRODUCTS + subcategory, null, false);
  }

  getMain(): Promise<Response> {
    return this.serverConnection.request(REQUEST_URLS.MAIN_PRODUCTS, null, false);
  }


}
