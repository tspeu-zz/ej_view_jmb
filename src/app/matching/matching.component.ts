import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray, ValidatorFn } from '@angular/forms';
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

  data = {
    'workers': [
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

  // orders = [
  //   { id: 100, name: 'order 1' },
  //   { id: 200, name: 'order 2' },
  //   { id: 300, name: 'order 3' },
  //   { id: 400, name: 'order 4' }
  // ];
  selectedWorkers: any = [];
  selectedShifts: any = [];

  // SEND DATA TO API
  outData = { 'workers': [], 'shifts': [] };

  matchingForm: FormGroup;
  form: FormGroup;

  constructor(public snackBar: MatSnackBar, private httpService: HttpService,
              private formBuilder: FormBuilder) {

    const controls = this.data.workers.map(c => new FormControl(false));
    controls[0].setValue(true);
    // console.log('controls', controls);

    this.form = this.formBuilder.group({
      orders: new FormArray(controls, this.minSelectedCheckboxes(1))
    });
    // console.log('this.form', this.form);
  }

  ngOnInit() {/* this.postData(this.data);*/}

  onSubmit() {
    const selectedOrderIds = this.form.value.orders
      .map((v, i) => v ? this.data.workers[i].id : null)
      .filter(v => v !== null);

    // console.log('selectedOrderIds->', selectedOrderIds);
    for (let i = 0; i < this.data.workers.length; i++) {
        // console.log('workers', this.data.workers[i]);
        for ( let j = 0; j < selectedOrderIds.length; j++ ) {
            // console.log('select', selectedOrderIds[j]);
            if (this.data.workers[i].id === selectedOrderIds[j]) {
              this.outData.workers.push(this.data.workers[i]);
              console.log('DEBE HACER PUSH A LOS QUE SE ENVIA->', this.data.workers[i] );
            }
        }
    }
    console.log('this.outData.workers', this.outData);
    this.sendDataPost(this.outData);
  }

  minSelectedCheckboxes(min = 1) {
    const validator: ValidatorFn = (formArray: FormArray) => {
      const totalSelected = formArray.controls
        .map(control => control.value)
        .reduce((prev, next) => next ? prev + next : prev, 0);

      return totalSelected >= min ? null : { required: true };
    };
    console.log('validator--->', validator);
    return validator;
  }

  sendDataPost(data) {
    // this.selectedWorkers = this.matchingGroup.value;
    console.log('--', this.selectedWorkers);
  return this.httpService
          .sendPost(data, this._URL)
          .subscribe(resp => {
              this._RESPONSE = resp;
              this.matching = this._RESPONSE.res;
              this.msmOK = this._RESPONSE.msm;
              this.msmERR = this._RESPONSE.err;
              console.log('VUELTA DEL SERVER- API:>', this.matching);
              console.log('VUELTA DEL SERVER- API:>' , this._RESPONSE);
              console.log('msmOK', this.msmOK);
              this.openSnackBar(this.msmERR  , 'close');
              this.show = true;
            }, error => { console.log(error);
          });
    console.log(data);
  }

  addWorkers(data) {
    console.log('add work --->', data);
  }

  // sendPostTestOLD(testData: any) {

  //   // const body = JSON.stringify(testData);
  //   const body = testData;
  //   console.log('send data--> ', body);
  //   const headerOptions = new HttpHeaders({ 'Content-Type': 'application/json' });

  //   return this.http.post(this._URL, body, {headers: headerOptions})
  //     .subscribe( res => {

  //       this._RESPONSE = res;
  //       console.log('VUELTA DEL SERVER- API:>' , this._RESPONSE);
  //       this.openSnackBar( this._RESPONSE.res , 'close');
  //       this.show = true;

  //     }, error => { console.log(error);
  //     });

  // }

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
function minSelectedCheckboxes(min = 1) {
  const validator: ValidatorFn = (formArray: FormArray) => {
    const totalSelected = formArray.controls
      .map(control => control.value)
      .reduce((prev, next) => next ? prev + next : prev, 0);

    return totalSelected >= min ? null : { required: true };
    console.log('validator--->', validator);

  };
  return validator;
}
/*
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
  ]; */