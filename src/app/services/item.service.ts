import { Injectable } from '@angular/core';
import { Response, RequestOptions, URLSearchParams } from '@angular/http';
import { ServerConnectionService } from './server-connection.service';
import { REQUEST_URLS } from '../../../constants';

@Injectable()
export class ItemService {
  constructor(private serverConnection: ServerConnectionService) { }

  getItem(id): Promise<Response> {
    return this.serverConnection.request(REQUEST_URLS.ITEM + id, null, false);
  }
}