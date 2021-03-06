import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { EndpointService } from './endpoint.service';
import { WeatherModel } from '../models/WeatherModel';
import { EntryModel } from '../models/EntryModel';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private endpoints: object;
  private _baseUrl: string;

  constructor(private _httpClient: HttpClient, private _endpoints: EndpointService) { }

  ngOnInit() {
    this._baseUrl = this._endpoints.BaseUrl;
  }

  makeEncryptedRequest(securedData: string): void
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://localhost:44341'
      })
    };

    this._httpClient.post(
      `${this._endpoints.BaseUrl}${this._endpoints.CryptoEndpoint}`,
      httpOptions
    );
  }

  getEntries(): Observable<Array<EntryModel>> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://localhost:44341'
      })
    };

    return this._httpClient.get<EntryModel[]>(
      `${this._endpoints.BaseUrl}${this._endpoints.EntryList}`,
      httpOptions
    );
  }

  addEntry(entry: EntryModel): Observable<EntryModel> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://localhost:44341'
      })
    };

    return this._httpClient.post<EntryModel>(
      `${this._endpoints.BaseUrl}${this._endpoints.AddEntry}`,
      entry,
      httpOptions
    );
  }

  updateEntry(entry: EntryModel): Observable<EntryModel> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://localhost:44341'
      })
    };

    return this._httpClient.put<EntryModel>(
      `${this._endpoints.BaseUrl}${this._endpoints.UpdateEntry}`,
      entry,
      httpOptions
    );
  }

  deleteEntry(entry: EntryModel): Observable<EntryModel> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://localhost:44341'
      })
    };

    return this._httpClient.post<EntryModel>(
      `${this._endpoints.BaseUrl}${this._endpoints.DeleteEntry}`,
      entry,
      httpOptions
    );
  }

}
