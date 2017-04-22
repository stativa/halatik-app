import { Injectable } from '@angular/core';
import { Response, RequestOptions, URLSearchParams } from '@angular/http';
import { ServerConnectionService } from './server-connection.service';
import { REQUEST_URLS } from '../../../constants';

@Injectable()
export class NavigationService {
  constructor(private serverConnection: ServerConnectionService) { }

  getAll(): Promise<Response> {
    return this.serverConnection.request(REQUEST_URLS.NAVIGATION, false);
  }

  getCategory(category): Promise<Response> {
    /*let params:object = {};
    if (category) {
      params = new RequestOptions({
        search: new URLSearchParams('category=' + category)
      });
    }*/
    return this.serverConnection.request(REQUEST_URLS.NAVIGATION_CATEGORY + category, null, false);
  }

  getType(type): Promise<Response> {
    /*let params:object = {};
    if (type) {
      params = new RequestOptions({
        search: new URLSearchParams('type=' + type)
      });
    }*/
    return this.serverConnection.request(REQUEST_URLS.NAVIGATION_TYPE + type, null, false);
  }

}
