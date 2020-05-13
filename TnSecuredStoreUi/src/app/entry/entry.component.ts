import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { EntryModel } from '../../models/EntryModel';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeleteEntryDialogComponent } from '../delete-entry-dialog/delete-entry-dialog.component';
import { UpdateEntryDialogComponent } from '../update-entry-dialog/update-entry-dialog.component';
import { AddEntryDialogComponent } from '../add-entry-dialog/add-entry-dialog.component';
import { EntryService } from '../entry.service';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit {

  Error: string;
  EntryList: EntryModel[];

  constructor(private _apiService: ApiService, private _dialog: MatDialog, private _entryService: EntryService) { }

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

      if (result instanceof EntryModel) {
        this.EntryList.unshift(result);
      }
      else {
        console.log(result);
      }
      
    });
  }

  updateDialog(formEntry: EntryModel): void {
    let entry: EntryModel = this._entryService.GetEntryById(formEntry.id, this.EntryList);

    const dialogRef = this._dialog.open(UpdateEntryDialogComponent, {
      width: '350px',
      data: {
        title: formEntry.title,
        url: formEntry.url,
        password: formEntry.password,
        login: formEntry.login,
        email: formEntry.email,
        id: formEntry.id,
        authorId: entry.authorId,
        createdOn: entry.createdOn,
        modifiedOn: entry.modifiedOn,
        rowGuid: entry.rowGuid,
        isRemoved: entry.isRemoved,
        isActive: entry.isActive,
        list: this.EntryList
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === null || result === undefined)
        return;

      let entry: EntryModel = this._entryService.GetEntryById(formEntry.id, this.EntryList)
      this._entryService.UpdateEntryByFormData(result, entry);
    });
  }

  deleteDialog(formEntry: EntryModel): void {
    const dialogRef = this._dialog.open(DeleteEntryDialogComponent, {
      width: '350px',
      data: { entry: formEntry }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('DELETE RESULT');
      console.log(result);

      if (result === null || result === undefined)
        return;

      if (result === "204") {
        let entry: EntryModel = this.EntryList.filter(en => en.id === formEntry.id)[0];
        //let list = this.EntryList.filter(e => e.id !== entry.id);
        //this.EntryList = list;

        const index = this.EntryList.indexOf(entry, 0);
        if (index > -1) {
          this.EntryList.splice(index, 1);
        }
      }
     

    });
  }

}



