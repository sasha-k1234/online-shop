import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WeatherModel } from '../models/weather.model';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private httpClient: HttpClient) {}

  getWeather(selectUnits: string, city: string) {
    //lat=44.34&lon=10.99&units=${selectUnits}&q=${city}&appid=27a89482475ba4710adb1f994183253d
    const params = new HttpParams()
      .append('lat', '44.34')
      .append('lon', '10.99')
      .append('units', selectUnits)
      .append('q', city)
      .append('appid', '27a89482475ba4710adb1f994183253d');

    return this.httpClient.get<WeatherModel>(
      `https://api.openweathermap.org/data/2.5/weather`,
      { params }
    );
  }
}
