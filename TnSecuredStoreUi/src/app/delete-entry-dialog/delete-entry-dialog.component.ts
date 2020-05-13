import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EntryService } from '../entry.service';
import { ApiService } from '../api.service';

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
    private _entryService: EntryService,
    private _httpClient: ApiService,
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

  delete() {
    
    console.log('DELETE');
    console.log(this._dialogConfig.entry);

    this._httpClient.deleteEntry(this._dialogConfig.entry).subscribe({
      next: data => {
        this._dialogRef.close("204")
      },
      error: error => this._dialogRef.close(error)
    });

  }

  close() {
    this._dialogRef.close();
  }

}
