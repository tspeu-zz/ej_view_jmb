import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  sendPost(data: any, url: string) {
    const body = data;
    console.log('send data--> ', body);
    const headerOptions = new HttpHeaders({ 'Content-Type': 'application/json' });
    return  this.http.post(url, body,
        {headers: headerOptions})
        // .subscribe( res => {
        //   resp = res;
        //   console.log('VUELTA DEL SERVER- API:>' , resp);
        //   }, error => { console.log(error);
        // })
        ;

  }

  // addHero (hero: Hero): Observable<Hero> {

  //   return this.http.post<Hero>(this.heroesUrl, hero, httpOptions)
  //     .pipe(
  //     tap((hero: Hero) => this.log(`added hero w/ id=${hero.id}`)),
  //     catchError(this.handleError<Hero>('addHero'))
  //   );
  // }
}
