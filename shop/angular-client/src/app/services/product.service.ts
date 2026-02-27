import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { ProductModel } from '../models/product.model';
import { map } from 'rxjs';
import { PaginationList } from '../models/pagination-list.model';
import { Photo } from '../models/photo.model';
import { ProductQuery } from '../models/queries/products/productQuery';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly baseUrl: string = environment.apiUrl + 'products/';
  constructor(private httpClient: HttpClient) {}

  getProducts(query: ProductQuery) {
    return this.httpClient
      .get<PaginationList<ProductModel>>(this.baseUrl + `allProducts`, {
        params: query.toParams(),
      })
      .pipe(
        map((c) => {
          c.list.map((el) => {
            const photo = el.photos.find((el) => el.is_main)?.url;
            if (photo) {
              el.mainImagePath = photo;
            }
            return el;
          });
          return c;
        })
      );
  }

  addProducts(product: ProductModel, file: File) {
    const formData = new FormData();
    formData.set('file', file);
    formData.set('title', product.name);
    formData.set('description', product.description);
    formData.set('price', product.price.toString());
    formData.set('category_id', product.category_id.toString());
    if (product.features) {
      formData.set('features', product.features);
    }
    return this.httpClient.post(this.baseUrl + 'addProducts', formData);
  }

  deleteProduct(id: number) {
    return this.httpClient.delete(this.baseUrl + `${id}`);
  }

  getById(id: number) {
    return this.httpClient
      .get<ProductModel>(this.baseUrl + `allProducts/${id}`)
      .pipe(
        map((pM) => {
          const photo = pM.photos.find((p) => p.is_main)?.url;
          if (photo) {
            pM.mainImagePath = photo;
          }
          return pM;
        })
      );
  }

  editProduct(product: ProductModel) {
    return this.httpClient
      .put<ProductModel>(this.baseUrl + `editProduct/${product.id}`, product)
      .pipe(
        map((pM) => {
          const photo = pM.photos.find((p) => p.is_main)?.url;
          if (photo) {
            pM.mainImagePath = environment.apiUrl + photo;
          }
          return pM;
        })
      );
  }

  addProductPhoto(id: number, photo: File) {
    const formData = new FormData();
    formData.set('file', photo);
    return this.httpClient.put<Photo>(
      this.baseUrl + `addPhoto/${id}`,
      formData
    );
  }

  setFavorite(productId: number) {
    return this.httpClient.post(this.baseUrl + `setFavorite/${productId}`, {});
  }

  undoFavorite(pId: number) {
    return this.httpClient.post(this.baseUrl + `undoFavorite/${pId}`, {});
  }

  getFavorites() {
    return this.httpClient.get<ProductModel[]>(this.baseUrl + 'favorites').pipe(
      map((pM) => {
        for (let i = 0; i < pM.length; i++) {
          const photo = pM[i].photos.find((p) => p.is_main)?.url;
          if (photo) {
            pM[i].mainImagePath = environment.apiUrl + photo;
          }
        }
        return pM;
      })
    );
  }

  getMaxPrice(){
    return this.httpClient.get<any>(this.baseUrl + 'maxPrice');
  }
}
