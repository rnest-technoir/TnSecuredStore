import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { WeatherModel } from '../models/WeatherModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  opened: boolean;
  shouldRun: boolean = true;
  Title: string = 'Secured password store';
  Error: string;
  WeatherList: WeatherModel[];

  constructor(private _apiService: ApiService) { }

  ngOnInit() {

    let x = 10;
    let y = 12;

    this._apiService.getWeather().subscribe({
      next: (elem) => this.WeatherList = elem,
      error: (err) => { this.Error = err, console.log(err) }
    });
   
  }

}
