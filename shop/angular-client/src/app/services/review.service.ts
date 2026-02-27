import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { ReviewModel } from '../models/review.model';
import { map } from 'rxjs';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private readonly baseUrl: string = environment.apiUrl + 'reviews/';
  constructor(
    private httpClient: HttpClient,
    private accountService: AccountService
  ) {}
  review: ReviewModel[] = [];

  getReviews(product_id: number) {
    return this.httpClient.get<ReviewModel[]>(this.baseUrl + product_id).pipe(
      map((p) => {
        this.accountService.currentUser$.subscribe((u) => {
          for (let i = 0; i < p.length; i++) {
            p[i].isMy = p[i].username == u?.username;
          }
        });
        return p;
      })
    );
  }

  postReview(review: ReviewModel) {
    return this.httpClient.post<ReviewModel>(this.baseUrl, review);
  }

  editReview(review_id: number, text: string) {
    return this.httpClient.put(this.baseUrl, {
      review_id,
      text,
    });
  }

  deleteReview(review_id: number) {
    return this.httpClient.delete(this.baseUrl + review_id);
  }
}
