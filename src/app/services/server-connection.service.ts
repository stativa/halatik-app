import { Injectable } from '@angular/core';
import { Http, Response, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import ServerError from './server-error';
import { AlertService } from './alert.service';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ServerConnectionService {
  private _caches: any = {};

  constructor(private _http: Http) { }

  private _request(url: string, params: any = {}) {
    return this._http.get(url, params)
          .map(this.toObject)
          .catch(this.handleError)
          .toPromise();
  }

  request(url: string, params?: RequestOptionsArgs, cache?: boolean): Promise<Response> {
    let responsePromise: Promise<any>;
    
    if (typeof params === 'boolean') {
      cache = params;
      params = {};
    }

    if (cache) {
      let urlKey = this.getURLKey(url)
      let cached = this._caches[urlKey];

      if (cached) {
        responsePromise = new Promise((resolve, reject) => {
          resolve(cached);
        })
      } else {
        responsePromise = this._request(url, params).then((response) => {
            this._caches[urlKey] = response;
            return Promise.resolve(response);
          })
          .catch((error) => {
            return Promise.reject(error);
          });
      }
    } else {
       responsePromise = this._request(url, params);
    }

    return responsePromise;
  }

  

  getURLKey(url: string) {
    return url.replace(/[^\w\s]/gi, '');
  }

  private _cacheResponse = (url: string, response: any) => {
    this._caches[this.getURLKey(url)] = response.value;
  }

  private toObject(data: Response): any{
    let body = data.json();
    return body || { };
  }

  /**
   * Handles errors that occurs when we call `Http` service
   * @param error The error that need to be handled.
   * The error can be a `Response` when the server returns any status code that is > 299 or < 200 if there is any :)
   * It can also be a `SyntaxError` when the `Http` service fails to parse the JSON returned from the server
   */
  private handleError(error: Response | SyntaxError): ErrorObservable {
    if(error instanceof Response) {
      let serverError = new ServerError(error);
      return Observable.throw(serverError);
    }
    
    return Observable.throw(error);
  }

  public resetCache(url: string) {
    if (this._caches[this.getURLKey(url)]) {
      delete this._caches[this.getURLKey(url)];
    }
  }
}
