import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'update-entry-dialog',
  templateUrl: './update-entry-dialog.component.html',
  styleUrls: ['./update-entry-dialog.component.css']
})
export class UpdateEntryDialogComponent implements OnInit {

  form: FormGroup;
  title: string;
  url: string;
  login: string;
  password: string;
  id: number;

  constructor(
    private _formBuilder: FormBuilder,
    private _dialogRef: MatDialogRef<UpdateEntryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public _dialogConfig: any
  ) { }

  ngOnInit(): void {

    //console.log('INIT UPDATE DIALOG');
    //console.log(this._dialogConfig);

    this.id = this._dialogConfig.id;
    this.password = this._dialogConfig.password;
    this.login = this._dialogConfig.login;
    this.url = this._dialogConfig.url;
    this.title = this._dialogConfig.title;

    this.form = this._formBuilder.group({
      title: [this.title, []],
      url: [this.url, []],
      login: [this.login, []],
      password: [this.password, []],
      id: [this.id, []],
    });

  }

  update() {
    
    //console.log('UPDATE');
   // console.log(this.form.value);
    this._dialogRef.close(this.form.value);
  }

  close() {
    this._dialogRef.close();
  }

}
