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

 /* getCategory(category): Promise<Response> {
    let params = new RequestOptions({
      search: new URLSearchParams('category=' + category)
    });
    return this.serverConnection.request(REQUEST_URLS.NAVIGATION, params, false);
  }*/

}
