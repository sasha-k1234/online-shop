import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { CartModel } from '../models/cart.model';
import { AccountService } from './account.service';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private currQtySource = new BehaviorSubject<number>(0);
  cartQuantity$ = this.currQtySource.asObservable();

  constructor(
    private httpClient: HttpClient,
    private accountService: AccountService
  ) {}

  getCart() {
    return this.httpClient.get<CartModel[]>(environment.apiUrl + 'cart/').pipe(
      map((c) => {
        this.currQtySource.next(c.length);
        c.map((el) => {
          const mainPhoto = el.product.photos.find((p) => p.is_main);
          if (mainPhoto && mainPhoto.url) {
            el.product.mainImagePath = mainPhoto.url;
          }
          return el;
        });
        return c;
      })
    );
  }

  addToCart(id: number) {
    return this.httpClient
      .post(environment.apiUrl + 'cart/', {
        productId: id,
      })
      .pipe(
        map((qty) => {
          this.currQtySource.next(this.currQtySource.getValue() + 1);
          return qty;
        })
      );
  }

  incCart(id: number) {
    return this.httpClient.put(environment.apiUrl + `cart/inc/${id}`, {});
  }

  decCart(id: number) {
    return this.httpClient.put(environment.apiUrl + `cart/dec/${id}`, {});
  }

  deleteCart(id: number) {
    return this.httpClient.delete(environment.apiUrl + `cart/${id}`).pipe(
      map((_) => {
        this.currQtySource.next(this.currQtySource.getValue() - 1);
      })
    );
  }

  clear(){
    this.currQtySource.next(0);
  }
}
