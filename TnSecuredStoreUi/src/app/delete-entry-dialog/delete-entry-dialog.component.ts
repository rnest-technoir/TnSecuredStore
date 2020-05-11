import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'delete-entry-dialog',
  templateUrl: './delete-entry-dialog.component.html',
  styleUrls: ['./delete-entry-dialog.component.css']
})
export class DeleteEntryDialogComponent implements OnInit {

  form: FormGroup;
  title: string;
  url: string;
  login: string;
  password: string;
  id: number;

  constructor(
    private _formBuilder: FormBuilder,
    private _dialogRef: MatDialogRef<DeleteEntryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public _dialogConfig: any
  ) { }

  ngOnInit(): void {

    console.log('INIT DELETE DIALOG');
    console.log(this._dialogConfig);

    this.form = this._formBuilder.group({
      title: [this.title, []],
      url: [this.url, []],
      login: [this.login, []],
      password: [this.password, []],
      id: [this.id, []],
    });
  }

  save() {
    this.form.value.id = this._dialogConfig.id;
    console.log('DELETE');
    console.log(this.form.value);
    this._dialogRef.close(this.form.value);
  }

  close() {
    this._dialogRef.close();
  }

}
