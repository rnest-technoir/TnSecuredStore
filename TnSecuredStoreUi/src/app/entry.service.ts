import { Injectable } from '@angular/core';
import { EntryModel } from '../models/EntryModel';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  constructor() { }

  public CombineEntry(form: any, data: any, actionType: string = "UPDATE"): EntryModel {

    let entry = new EntryModel();

    if (actionType === "ADD") {
      entry.id = 0;
    }
    else {
      entry.id = form.value.id;
    }
    
    entry.authorId = data.authorId;
    entry.title = form.value.title;
    entry.email = form.value.email;
    entry.login = form.value.login;
    entry.password = form.value.password;
    entry.url = form.value.url;
    entry.rowGuid = data.rowGuid;
    entry.isActive = data.isActive;
    entry.isRemoved = data.isRemoved;
    entry.createdOn = data.createdOn;
    entry.modifiedOn = data.modifiedOn;

    return entry;
  }

  public GetResponseEntry(data: any): EntryModel {

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

  public UpdateEntryByFormData(fromForm: EntryModel, orig: EntryModel): void {
    orig.email = fromForm.email;
    orig.login = fromForm.login;
    orig.password = fromForm.password;
    orig.title = fromForm.title;
    orig.url = fromForm.url;
    orig.modifiedOn = fromForm.modifiedOn;
  }

  public GetEntryById(id: number, list: EntryModel[]): EntryModel {
    return list.filter(en => en.id === id)[0];
  }

}
