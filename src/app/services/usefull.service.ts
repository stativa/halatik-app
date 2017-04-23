import { Injectable } from '@angular/core';
import { Response, RequestOptions, URLSearchParams } from '@angular/http';
import { ServerConnectionService } from './server-connection.service';
import { REQUEST_URLS } from '../../../constants';

@Injectable()
export class UsefullService {
  constructor(private serverConnection: ServerConnectionService) { }

  getAll(): Promise<Response> {
    return this.serverConnection.request(REQUEST_URLS.USEFULL_INFO, false);
  }

  getUsefullInfo(id): Promise<Response> {
    return this.serverConnection.request(REQUEST_URLS.USEFULL_INFO + id, null, false);
  }
}