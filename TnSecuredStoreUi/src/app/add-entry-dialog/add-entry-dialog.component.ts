import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../api.service';
import { EntryModel } from '../../models/EntryModel';
import { EntryService } from '../entry.service';
import { CryptoService } from '../crypto.service';

@Component({
  selector: 'app-add-entry-dialog',
  templateUrl: './add-entry-dialog.component.html',
  styleUrls: ['./add-entry-dialog.component.css']
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
    private _cryptoService: CryptoService,
    private _entryService: EntryService,
    private _httpClient: ApiService,
    private _formBuilder: FormBuilder,
    private _dialogRef: MatDialogRef<AddEntryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public _dialogConfig: any
  ) { }

  ngOnInit(): void {

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

    let entry = this._entryService.CombineEntry(this.form, this._dialogConfig, "ADD");
    let encryptedEntry = this._cryptoService.EncryptEntry(entry);

    this._httpClient.addEntry(encryptedEntry).subscribe({
      next: data => {
        let responseEntry = this._entryService.GetResponseEntry(data);
        let decryptedEntry = this._cryptoService.DecryptEntry(responseEntry);
        this._dialogRef.close(decryptedEntry)
      },
      error: error => this._dialogRef.close(error)
    });
  }

  close() {
    this._dialogRef.close();
  }

}
