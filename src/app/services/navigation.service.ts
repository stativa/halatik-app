import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { ServerConnectionService } from './server-connection.service';
import { REQUEST_URLS } from '../../../constants';

@Injectable()
export class NavigationService {
  constructor(private serverConnection: ServerConnectionService) { }

  getAll(): Promise<Response> {
    return this.serverConnection.request(REQUEST_URLS.NAVIGATION, true);
  }

}
