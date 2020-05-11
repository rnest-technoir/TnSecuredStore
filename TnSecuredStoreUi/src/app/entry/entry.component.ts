import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { EntryModel } from '../../models/EntryModel';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddEntryDialogComponent } from '../entry-dialog/entry-dialog.component';
import { DeleteEntryDialogComponent } from '../delete-entry-dialog/delete-entry-dialog.component';
import { UpdateEntryDialogComponent } from '../update-entry-dialog/update-entry-dialog.component';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit {

  Error: string;
  EntryList: EntryModel[];

  constructor(private _apiService: ApiService, private _dialog: MatDialog) { }

  ngOnInit(): void {
    this._apiService.getEntries().subscribe({
      next: (elem) => this.EntryList = elem,
      error: (err) => { this.Error = err, console.log(err) }
    });
  }

  addDialog(): void {
    const dialogRef = this._dialog.open(AddEntryDialogComponent, {
      width: '350px',
      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {
      //let newEntry = new EntryModel()
      console.log('ADD RESULT:');
      console.log(result);

      if (result instanceof EntryModel) {
        this.EntryList.unshift(result);
      }
      else {
        console.log(result);
      }
      
    });
  }

  updateDialog(entry: EntryModel): void {
    const dialogRef = this._dialog.open(UpdateEntryDialogComponent, {
      width: '350px',
      data: {
        title: entry.title,
        url: entry.url,
        password: entry.password,
        login: entry.login,
        list: this.EntryList
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('UPDATE RESULT:');
      console.log(result);
    });
  }

  deleteDialog(): void {
    const dialogRef = this._dialog.open(DeleteEntryDialogComponent, {
      width: '350px',
      data: { id: 111 }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('DELETE RESULT:');
      console.log(result);
    });
  }

}



