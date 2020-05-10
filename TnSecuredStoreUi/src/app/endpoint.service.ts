import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EndpointService {

  BaseUrl: string = 'https://localhost:44341';
  WeatherUrl: string = '/weatherforecast';
  CryptoEndpoint: string = "/crypto"
  

}
