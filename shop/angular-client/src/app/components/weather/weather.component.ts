import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { City } from '../../models/city.model';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css',
})
export class WeatherComponent {
  city: string = '';
  cities: City[] = [];
  selectUnits: 'standart' | 'metric' | 'imperial' = 'standart';
  //weather: any;
  tempSymbolDictionary = {
    metric: '°C',
    imperial: '℉',
    standart: 'K',
  };
  constructor(private weatherService: WeatherService) {
    this.cities = JSON.parse(localStorage.getItem('city')??'');
  }

  weatherReport() {
    this.weatherService.getWeather(this.selectUnits, this.city).subscribe({
      next: (data) => {
        //this.weather = data;
        const city = new City();
        city.city = data.name;
        city.temp = data.main.temp;
        this.cities.push(city);
        localStorage.setItem('city',JSON.stringify(this.cities));
        
      },
      error: (error) => {

      },
    });
  }

  getTempSymbol() {
    return this.tempSymbolDictionary[this.selectUnits];
  }

  deleteCity(id:number){
    this.cities = this.cities.filter((city,i)=>i!==id);
    localStorage.setItem('city',JSON.stringify(this.cities));
  }
}
