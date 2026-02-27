import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { PaginationList } from '../models/pagination-list.model';
import { map } from 'rxjs';
import { UserModel } from '../models/user.model';
import { ProductModel } from '../models/product.model';
import { UserQuery } from '../models/queries/admin/userQuery.model';
import { PaginationQuery } from '../models/queries/paginationQuery.model';
import { NotificationModel } from '../models/notification.model';
import { OrderModel } from '../models/order.model';
import { OrderQuery } from '../models/queries/admin/orderQuery';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private readonly baseUrl: string = environment.apiUrl + 'admin/';
  constructor(private httpClient: HttpClient) {}

  getProducts(page: number, perPage: number) {
    const params = new HttpParams()
      .append('itemsPerPage', perPage)
      .append('page', page)
      .append('perAdminPage', 10);

    return this.httpClient.get<PaginationList<ProductModel>>(
      this.baseUrl + `products`,
      { params }
    );
  }

  activateProduct(productId: number) {
    return this.httpClient.put(this.baseUrl + `activate/${productId}`, {});
  }

  getUsers(query: UserQuery) {
    return this.httpClient.get<PaginationList<UserModel>>(
      this.baseUrl + `users`,
      { params: query.toParams() }
    );
  }

  getNotifications(query: PaginationQuery) {
    return this.httpClient.get<PaginationList<NotificationModel>>(
      this.baseUrl + 'notifications',
      { params: query.toParams() }
    );
  }

  makeAvailable(id: number) {
    return this.httpClient.post(this.baseUrl + `available/${id}`, {});
  }

  updateAmazonPhotos() {
    return this.httpClient.put(this.baseUrl + 'updatePhotos', {});
  }

  getOrders(query: OrderQuery) {
    return this.httpClient
      .get<PaginationList<OrderModel>>(this.baseUrl + 'orders', {
        params: query.toParams(),
      })
      .pipe(
        map((res) => {
          for (let i = 0; i < res.list.length; i++) {
            let sum = 0;
            for (let j = 0; j < res.list[i].items.length; j++) {
              const item = res.list[i].items[j];
              sum += item.product.price * item.quantity;
              item.product.photos.forEach(
                (p) => (p.url = environment.apiUrl + p.url)
              );
              const mainPhoto = item.product.photos.find((p) => p.is_main);
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

  changeOrderStatus(id:number,status:string){
    return this.httpClient.put(this.baseUrl + `order/${id}/changeStatus/${status}`,{});
  }
}
