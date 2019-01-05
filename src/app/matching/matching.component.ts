import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {MatSnackBar} from '@angular/material';
import {HttpService} from '../services/http.service';

@Component({
  selector: 'app-matching',
  templateUrl: './matching.component.html',
  styleUrls: ['./matching.component.css']
})
export class MatchingComponent implements OnInit {

  _URL = 'http://localhost:3003/api/matching/match';
  _RESPONSE: any;
  matching: any;
  show = true;
  msmOK: any;
  msmERR: any;

  testdata = {
    'workers': [],
    'shifts' : []
    };

    workers: any;
    shifts: any;


  workersTest = [
    {
      'id': 1,
      'availability': ['Monday', 'Wednesday'],
      'payrate': 7.50
    },
    {
      'id': 2,
      'availability': ['Monday', 'Tuesday', 'Thursday'],
      'payrate': 9.00
    },
    {
      'id': 3,
      'availability': ['Monday', 'Friday'],
      'payrate': 18.00
    },
    {
      'id': 4,
      'availability': ['Monday', 'Tuesday', 'Friday'],
      'payrate': 12.25
    }
  ];
  shiftsTest = [
    {
      'id': 1,
      'day': ['Monday']
    },
    {
      'id': 2,
      'day': ['Tuesday']
    },
    {
      'id': 3,
      'day': ['Wednesday']
    },
    {
      'id': 4,
      'day': ['Thursday']
    }
  ];
  data = {
    'workers': [
      // {
      //   'id': 1,
      //   'availability': ['Monday', 'Wednesday'],
      //   'payrate': 7.50
      // },
      // {
      //   'id': 2,
      //   'availability': ['Monday', 'Tuesday', 'Thursday'],
      //   'payrate': 9.00
      // },
      // {
      //   'id': 3,
      //   'availability': ['Monday', 'Friday'],
      //   'payrate': 18.00
      // },
      // {
      //   'id': 4,
      //   'availability': ['Monday', 'Tuesday', 'Friday'],
      //   'payrate': 12.25
      // }
    ],
    'shifts': [
      {
        'id': 1,
        'day': ['Monday']
      },
      {
        'id': 2,
        'day': ['Tuesday']
      },
      {
        'id': 3,
        'day': ['Wednesday']
      },
      {
        'id': 4,
        'day': ['Thursday']
      }
    ]
  };

  constructor(private http: HttpClient, public snackBar: MatSnackBar, private httpService: HttpService) { }

  ngOnInit() {


    // this.postData(this.data);
  }

  sendDataPost() {

  return this.httpService.sendPost(this.data, this._URL)
                  .subscribe(resp => {
                      this._RESPONSE = resp;
                      this.matching = this._RESPONSE.res;
                      this.msmOK = resp.msm;
                      this.msmERR = resp.err;
                      console.log('VUELTA DEL SERVER- API:>', this.matching);
                      console.log('VUELTA DEL SERVER- API:>' , this._RESPONSE);
                      console.log('msmOK', this.msmOK);
                      this.openSnackBar(this.msmERR  , 'close');
                      this.show = true;
                    }, error => { console.log(error);
                  });


  }

  sendPostTestOLD(testData: any) {

    // const body = JSON.stringify(testData);
    const body = testData;
    console.log('send data--> ', body);
    const headerOptions = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(this._URL, body, {headers: headerOptions})
      .subscribe( res => {

        this._RESPONSE = res;
        console.log('VUELTA DEL SERVER- API:>' , this._RESPONSE);
        this.openSnackBar( this._RESPONSE.res , 'close');
        this.show = true;

      }, error => { console.log(error);
      });

  }

  openSnackBar(message, action ) {

    this.snackBar.open(message, action, {
      duration: 3500,
      panelClass: 'success-dialog'
    });
    setTimeout(() => {
      // this.vehicleForm.reset();
        this.show = true;
      }, 3500);

  }

}
