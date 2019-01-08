import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  sendPost(data: any, url: string) {
    console.log('---->URL: ', url);
    const body = data;
    // console.log('send data--> ', body);
    const headerOptions = new HttpHeaders({ 'Content-Type': 'application/json' });
    return  this.http.post(url, body,
        {headers: headerOptions});
  }

}
