import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { EntryModel } from '../../models/EntryModel';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EntryDialogComponent } from '../entry-dialog/entry-dialog.component';

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

  openDialog(): void {
    const dialogRef = this._dialog.open(EntryDialogComponent, {
      width: '350px',
      data: { id: 111 }
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }

}



