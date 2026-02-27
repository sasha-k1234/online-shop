import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { NotificationModel } from '../models/notification.model';
import { NotificationTypeModel } from '../models/notificationType.model';
import { PaginationList } from '../models/pagination-list.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly baseUrl: string = environment.apiUrl + 'notification/';
  private readonly typeUrl: string = environment.apiUrl + 'notification-types/';
  constructor(private httpClient: HttpClient) {}

  createNotification(notification: NotificationModel) {
    return this.httpClient.post(this.baseUrl, {
      ...notification,
      types: notification.types.map((t) => t.id),
    });
  }

  getNotifications(pageNumber: number | string, itemsPerPage: number | string) {
    const params = new HttpParams()
      .append('page', pageNumber)
      .append('itemsPerPage', itemsPerPage);
    return this.httpClient.get<PaginationList<NotificationModel>>(this.baseUrl, { params });
  }

  getNotificationById(id: number | string) {
    return this.httpClient.get<NotificationModel>(this.baseUrl + id);
  }

  getTypes() {
    return this.httpClient.get<NotificationTypeModel[]>(this.typeUrl);
  }

  addType(name: string) {
    return this.httpClient.post<NotificationTypeModel>(this.typeUrl, { name });
  }

  deleteType(id: number) {
    return this.httpClient.delete(this.typeUrl + id);
  }

  editType(model: NotificationTypeModel) {
    return this.httpClient.put<NotificationTypeModel>(this.typeUrl + model.id, {
      name: model.name,
    });
  }

  makeReaded(id:number){
    return this.httpClient.put(this.baseUrl + `readed/${id}`,{});
  }
}
