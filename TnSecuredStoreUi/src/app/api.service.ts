import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { EndpointService } from './endpoint.service';
import { WeatherModel } from '../models/WeatherModel';

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
        'Access-Control-Allow-Origin': 'https://localhost:44341/weatherforecast'
      })
    };

    this._httpClient.post(
      `${this._endpoints.BaseUrl}${this._endpoints.CryptoEndpoint}`,
      httpOptions
    );
  }

  getWeather(): Observable<Array<WeatherModel>> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://localhost:44341/weatherforecast'
      })
    };

    return this._httpClient.get<WeatherModel[]>(
      `${this._endpoints.BaseUrl}${this._endpoints.WeatherUrl}`,
      httpOptions
    );
  }

}
