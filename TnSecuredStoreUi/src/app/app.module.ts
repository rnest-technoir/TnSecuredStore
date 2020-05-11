import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HttpClientJsonpModule  } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from '../modules/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CryptoRequestComponent } from './crypto-request/crypto-request.component';
import { EntryComponent } from './entry/entry.component';
import { AddEntryDialogComponent } from './entry-dialog/entry-dialog.component';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UpdateEntryDialogComponent } from './update-entry-dialog/update-entry-dialog.component';
import { DeleteEntryDialogComponent } from './delete-entry-dialog/delete-entry-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    CryptoRequestComponent,
    EntryComponent,
    AddEntryDialogComponent,
    UpdateEntryDialogComponent,
    DeleteEntryDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule
  ],
  exports: [
    MatInputModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AddEntryDialogComponent]
})
export class AppModule { }
