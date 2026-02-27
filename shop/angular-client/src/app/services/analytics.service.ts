import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';
import { CountByCategoryModel } from '../models/countByCategory.model';
import { MostViewedModel } from '../models/mostViewed.model';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private readonly baseUrl: string = environment.apiUrl + 'analytics/';
  constructor(private httpClient:HttpClient) { }

  countByCategory(){
    return this.httpClient.get<CountByCategoryModel[]>(this.baseUrl + "count-by-category");
  }

  getMostViewed(amount:number){
    return this.httpClient.get<MostViewedModel[]>(this.baseUrl + `most-viewed?amount=${amount}`);
  }
}
