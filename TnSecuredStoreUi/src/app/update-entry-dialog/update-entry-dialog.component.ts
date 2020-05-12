import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EntryModel } from '../../models/EntryModel';
import { ApiService } from '../api.service';
import { EntryService } from '../entry.service';

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
  email: string;
  id: number;
  authorId: number;
  createdOn: Date;
  modifiedOn: Date;
  rowGuid: string;
  isRemoved: boolean;
  isActive: boolean;

  constructor(
    private _entryService: EntryService,
    private _httpClient: ApiService,
    private _formBuilder: FormBuilder,
    private _dialogRef: MatDialogRef<UpdateEntryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public _dialogConfig: any
  ) { }

  ngOnInit(): void {

    this.id = this._dialogConfig.id;
    this.password = this._dialogConfig.password;
    this.login = this._dialogConfig.login;
    this.url = this._dialogConfig.url;
    this.title = this._dialogConfig.title;
    this.email = this._dialogConfig.email;

    this.form = this._formBuilder.group({
      title: [this.title, []],
      url: [this.url, []],
      login: [this.login, []],
      password: [this.password, []],
      email: [this.email, []],
      id: [this.id, []],
      authorId: [this.authorId, []],
      createdOn: [this.createdOn, []],
      modifiedOn: [this.modifiedOn, []],
      isActive: [this.isActive, []],
      isRemoved: [this.isRemoved, []],
      rowGuid: [this.rowGuid, []]
    });

  }

  update() {

    this._httpClient.updateEntry(this._entryService.CombineEntry(this.form, this._dialogConfig)).subscribe({
      next: data => {
        this._dialogRef.close(this._entryService.GetResponseEntry(data))
      },
      error: error => this._dialogRef.close(error)
    });
  }

  close() {
    this._dialogRef.close();
  }

}
