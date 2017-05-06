import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http'; 
import { EMAILS, REQUEST_URLS } from '../../../constants';

@Injectable()
export class OneClickService {

  constructor(private http: Http) {}

  sendMail(product, phone) {
    let  headers = new Headers();
  //  var creds = 'name=' + usercreds.username + '&password=' + usercreds.password;
   // var emailid = 'name=' + usercreds.username;
    let data = {
  //    'email':  EMAILS.EMAIL,
      'productId': product.id,
      'phone': phone
    }
    headers.append('Content-Type', 'application/X-www-form-urlencoded');


    this.http.post(REQUEST_URLS.SEND_CLICK_MAIL, data, {headers: headers}).subscribe((data) => {
      if(data.json().success) {
        console.log('mail sent');
      }
    })
  }

}