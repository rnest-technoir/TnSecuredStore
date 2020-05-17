import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { EntryModel } from '../../models/EntryModel';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeleteEntryDialogComponent } from '../delete-entry-dialog/delete-entry-dialog.component';
import { UpdateEntryDialogComponent } from '../update-entry-dialog/update-entry-dialog.component';
import { AddEntryDialogComponent } from '../add-entry-dialog/add-entry-dialog.component';
import { EntryService } from '../entry.service';
import { CryptoService } from '../crypto.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit {

  public length: number = 100;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [5, 10, 25, 100];

  public pageEvent: PageEvent;

  public Error: string;
  public EntryList: EntryModel[];
  public PagedEntryList: EntryModel[];

  constructor(private _cryptoService: CryptoService, private _apiService: ApiService, private _dialog: MatDialog, private _entryService: EntryService) { }

  ngOnInit(): void {

    this._apiService.getEntries().subscribe({
      next: (list) => {
        
        this.EntryList = this._cryptoService.DecryptEntryList(list);
        this.length = this.EntryList.length;
        this.PagedEntryList = this.EntryList.slice(0, this.pageSize);
      },
      error: (err) => { this.Error = err, console.log(err) }
    });
  }

  public handlePageEvent(event?: PageEvent): PageEvent {

    if (event) {
      console.log(event);
      this.SetPager(event);
    }

    return event;
  }

  public setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  public addDialog(): void {
    const dialogRef = this._dialog.open(AddEntryDialogComponent, {
      width: '420px',
      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result instanceof EntryModel) {
        this.EntryList.unshift(result);
        this.InitPager();
      }
      else {
        //console.log(result);
      }
      
    });
  }

  public updateDialog(formEntry: EntryModel): void {
    let entry: EntryModel = this._entryService.GetEntryById(formEntry.id, this.EntryList);

    const dialogRef = this._dialog.open(UpdateEntryDialogComponent, {
      width: '420px',
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

  public deleteDialog(formEntry: EntryModel): void {
    const dialogRef = this._dialog.open(DeleteEntryDialogComponent, {
      width: '350px',
      data: { entry: formEntry }
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result === null || result === undefined)
        return;

      if (result === "204") {
        let entry: EntryModel = this.EntryList.filter(en => en.id === formEntry.id)[0];

        const index = this.EntryList.indexOf(entry, 0);
        if (index > -1) {
          this.EntryList.splice(index, 1);
          this.InitPager();
        }
      }
     

    });
  }

  private SetPager(event: PageEvent): void {
    this.length = this.EntryList.length;
    let offset: number = event.pageIndex * event.pageSize;
    this.PagedEntryList = this.EntryList.slice(offset, event.pageSize + offset);
  }

  private InitPager(): void {
    this.length = this.EntryList.length;
    this.PagedEntryList = this.EntryList.slice(0, this.pageSize);
    this.pageEvent.pageIndex = 0;
    this.pageEvent.previousPageIndex = 0;
  }

}



