import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryModel } from '../models/category.model';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly baseUrl: string = environment.apiUrl + 'categories/';
  constructor(private httpClient:HttpClient) { }

  getCategories(){
    return this.httpClient.get<CategoryModel[]>(this.baseUrl+'allCategories')
  }

  addCategory(category:string){
    return this.httpClient.post<CategoryModel>(this.baseUrl+'createCategory',{
      category
    });
  }
}
