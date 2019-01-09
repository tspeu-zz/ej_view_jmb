import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray, ValidatorFn } from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {HttpService} from '../services/http.service';
import * as example_1 from '../model/example_1.json';
import * as example_2 from '../model/example_2.json';

@Component({
  selector: 'app-matching',
  templateUrl: './matching.component.html',
  styleUrls: ['./matching.component.css']
})
export class MatchingComponent implements OnInit {

  _URL = 'http://localhost:3003/api/matching/match';
  // _URL = 'http://prueba-api-jmb.herokuapp.com/api/matching/match';
  _RESPONSE: any;
  matching: any;
  show = true;
  msmOK: any;
  msmERR: any;

  workers: any;
  shifts: any;

  /* INPUT DATA */
  data1: any = example_1;
  data: any = example_2;

  // OUT
  sendData = { 'workers': [], 'shifts': [] };

  matchingForm: FormGroup;
  form: FormGroup;

  constructor(public snackBar: MatSnackBar, private httpService: HttpService,
              private formBuilder: FormBuilder ) {

    const controls = this.data.workers.map(c => new FormControl(false));
    controls[0].setValue(true);

    const controlsShift = this.data.workers.map(c => new FormControl(false));
    controls[0].setValue(true);

    this.form = this.formBuilder.group({
      workers: new FormArray(controls, this.minSelectedCheckboxes(1)),
      shifts: new FormArray(controlsShift, this.minSelectedCheckboxes(1))
    });
    // console.log('this.form', this.form);
  }

  ngOnInit() {/* this.sendDataPost(this.data);*/}

  onSubmit() {
    const selectedOrderIds = this.form.value.workers
      .map((v, i) => v ? this.data.workers[i].id : null)
      .filter(v => v !== null);

    const selectedOrderIdsShift = this.form.value.shifts
      .map((v, i) => v ? this.data.shifts[i].id : null)
      .filter(v => v !== null);

    for (let i = 0; i < this.data.workers.length; i++) {
        // console.log('workers', this.data.workers[i]);
        for ( let j = 0; j < selectedOrderIds.length; j++ ) {
            // console.log('select', selectedOrderIds[j]);
            if (this.data.workers[i].id === selectedOrderIds[j]) {
              this.sendData.workers.push(this.data.workers[i]);
              // console.log('DEBE HACER PUSH A LOS QUE SE ENVIA->', this.data.workers[i] );
            }
        }
    }

    for (let i = 0; i < this.data.shifts.length; i++) {
        // console.log('shifts', this.data.shifts[i]);
        for ( let j = 0; j < selectedOrderIdsShift.length; j++ ) {
            // console.log('select', selectedOrderIds[j]);
            if (this.data.shifts[i].id === selectedOrderIdsShift[j]) {
              this.sendData.shifts.push(this.data.shifts[i]);
              // console.log('DEBE HACER PUSH A LOS QUE SE ENVIA->', this.data.shifts[i] );
            }
        }
    }
    // console.log('this.sendData.workers', this.sendData);
    this.sendDataPost(this.sendData);
    this.cleanForm();
  }

  minSelectedCheckboxes(min = 1) {
    const validator: ValidatorFn = (formArray: FormArray) => {
      const totalSelected = formArray.controls
        .map(control => control.value)
        .reduce((prev, next) => next ? prev + next : prev, 0);

      return totalSelected >= min ? null : { required: true };
    };
    return validator;
  }

  sendDataPost(data: any) {
  return this.httpService
        .sendPost(data, this._URL)
        .subscribe( resp => {
            this._RESPONSE = resp;
            this.matching = this._RESPONSE.res;
            this.msmOK = this._RESPONSE.msm;
            this.msmERR = this._RESPONSE.err;
              if (this.msmOK !== '' ) {this.openSnackBar( this.msmERR, 'close'); }
              this.show = true;
              this.cleanForm();
            }, error => {
              console.log('error', error);
              this.show = false;
              this.msmOK = JSON.stringify(error.message);
              this.msmERR = JSON.stringify(error.message);
              this.openSnackBar(this.msmERR, 'close');
          });

  }

  cleanForm() {
    this.sendData = { 'workers': [], 'shifts': [] };
  }


  openSnackBar(message, action ) {
    this.snackBar.open(message, action, {
      duration: 3500,
      panelClass: 'success-dialog'
    });
    setTimeout(() => {
        this.show = true;
      }, 3500);

  }

}
// function minSelectedCheckboxes(min = 1) {
//   const validator: ValidatorFn = (formArray: FormArray) => {
//     const totalSelected = formArray.controls
//       .map(control => control.value)
//       .reduce((prev, next) => next ? prev + next : prev, 0);

//     return totalSelected >= min ? null : { required: true };

//   };
//   return validator;
// }

