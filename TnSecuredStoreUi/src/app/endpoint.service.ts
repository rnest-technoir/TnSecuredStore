import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EndpointService {

  BaseUrl: string = 'https://localhost:44341';
  CryptoEndpoint: string = "/crypto"
  EntryList: string = '/api/EntryList';
  AddEntry: string = '/api/AddEntry';
  AddOrUpdateEntry: string = '/api/AddOrUpdateEntry';
  UpdateEntry: string = '/api/UpdateEntry';
  DeleteEntry: string = '/api/deleteEntry';
}
