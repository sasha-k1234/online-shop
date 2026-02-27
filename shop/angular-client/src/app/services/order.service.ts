import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { CreateOrder } from '../models/create-order.model';
import { OrderPagination } from '../models/orderPagination.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly baseUrl: string = environment.apiUrl + 'orders/';
  constructor(private readonly httpClient: HttpClient) {}

  createOrder(order: CreateOrder) {
    return this.httpClient.post(this.baseUrl + 'create', order);
  }

  getOrders(perPage: number, page: number) {
    const params = new HttpParams()
      .append('itemsPerPage', perPage)
      .append('page', page);

    return this.httpClient
      .get<OrderPagination>(this.baseUrl + 'allOrders', { params })
      .pipe(
        map((res) => {
          for (let i = 0; i < res.list.length; i++) {
            let sum = 0;
            for (let j = 0; j < res.list[i].items.length; j++) {
              const item = res.list[i].items[j];
              sum +=
                item.product.price * item.quantity;
                item.product.photos.forEach(p=>p.url = environment.apiUrl + p.url);
               const mainPhoto = item.product.photos.find(p=>p.is_main);
               if (mainPhoto) {
                item.product.mainImagePath = mainPhoto.url;
               }
            }
            res.list[i].sum = sum;
          }
          return res;
        })
      );
  }

  getStatuses(){
    return this.httpClient.get<string[]>(this.baseUrl + 'statuses');
  }
}
