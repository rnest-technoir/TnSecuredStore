import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../api.service';
import { EntryModel } from '../../models/EntryModel';

@Component({
  selector: 'app-entry-dialog',
  templateUrl: './entry-dialog.component.html',
  styleUrls: ['./entry-dialog.component.css']
})
export class AddEntryDialogComponent implements OnInit {

  form: FormGroup;

  title: string;
  url: string;
  login: string;
  password: string;
  email: string;
  id: number;

  constructor(
    private _httpClient: ApiService,
    private _formBuilder: FormBuilder,
    private _dialogRef: MatDialogRef<AddEntryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public _dialogConfig: any
  ) { }

  ngOnInit(): void {

    //console.log('INIT DIALOG');
    //console.log(this._dialogConfig);

    this.form = this._formBuilder.group({
      title: [this.title, []],
      url: [this.url, []],
      login: [this.login, []],
      password: [this.password, []],
      id: [this.id, []],
      email: [this.email, []],
    });
  }

  save() {
    //this.form.value.id = this._dialogConfig.id;
    //console.log('SAVE');
    //console.log(this.form.value);
    let responseEntry: EntryModel;
    let responseError: any;

    this._httpClient.addEntry(this.formEntry()).subscribe({
      next: data => {
        console.log(data),
          this._dialogRef.close(this.responseEntry(data))
      },
      error: error => this._dialogRef.close(error)
    });

    //if (responseError)
    //  this._dialogRef.close('Error occured');
    //else
    //  this._dialogRef.close(responseEntry);
  }

  close() {
    this._dialogRef.close();
  }

  private formEntry(): EntryModel {
    let entry = new EntryModel();
    entry.title = this.form.value.title;
    entry.email = this.form.value.email;
    entry.login = this.form.value.login;
    entry.password = this.form.value.password;
    entry.url = this.form.value.url;
    return entry;
  }

  private responseEntry(data: any): EntryModel {
    let entry = new EntryModel();
    entry.title = data.title;
    entry.email = data.email;
    entry.login = data.login;
    entry.password = data.password;
    entry.url = data.url;
    entry.id = data.id;
    entry.rowGuid = data.rowGuid;
    entry.isActive = data.isActive;
    entry.isRemoved = data.isRemoved;
    entry.authorId = data.authorId;
    entry.createdOn = data.createdOn;
    entry.modifiedOn = data.modifiedOn;
    return entry;
  }

}
