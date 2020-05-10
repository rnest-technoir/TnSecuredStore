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


  constructor(private _apiService: ApiService) { }

  ngOnInit() {
   
  }

}
