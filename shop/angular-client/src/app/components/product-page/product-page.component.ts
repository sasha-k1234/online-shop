import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { ProductModel } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { ReviewService } from '../../services/review.service';
import { NgbNavModule, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { ReviewModel } from '../../models/review.model';
import { FormsModule } from '@angular/forms';
import { TimeagoModule } from 'ngx-timeago';
import { AccountService } from '../../services/account.service';
import { ProductFeatureComponent } from '../product-feature/product-feature.component';
import { EditorModel } from '../editor/editor.model';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {
  ClassicEditor,
  Bold,
  Essentials,
  Italic,
  Mention,
  Paragraph,
  Undo,
  Heading,
  Alignment,
  Link,
  BlockQuote,
  Table,
  Image,
  ImageUpload,
  ImageResize,
  ImageCaption,
  ImageStyle,
  ImageToolbar,
  ImageUploadUI,
  Base64UploadAdapter,
} from 'ckeditor5';
import { ReviewComponent } from './review/review.component';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [
    CommonModule,
    NgbRatingModule,
    FormsModule,
    TimeagoModule,
    NgbNavModule,
    ProductFeatureComponent,
    CKEditorModule,
    ReviewComponent,
  ],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class ProductPageComponent implements OnInit {
  productModel: ProductModel = {} as ProductModel;
  reviewModel: ReviewModel = {} as ReviewModel;
  reviewsArr: ReviewModel[] = [];
  active = 1;
  featuresArr: EditorModel[] = [];
  reviewExists: boolean = false;
  hoverReview: boolean = false;
  editClicked: boolean = false;
  public Editor = ClassicEditor;
  public config = {
    toolbar: [
      'undo',
      'redo',
      '|',
      'bold',
      'italic',
      '|',
      'heading',
      '|',
      'alignment',
      'blockQuote',
      '|',
      'link',
      '|',
      'insertTable',
      'uploadImage',
    ],
    plugins: [
      Bold,
      Essentials,
      Italic,
      Mention,
      Paragraph,
      Undo,
      Heading,
      Alignment,
      Link,
      BlockQuote,
      Table,
      ImageUpload,
      Image,
      ImageResize,
      ImageCaption,
      ImageStyle,
      ImageToolbar,
      ImageUploadUI,
      Base64UploadAdapter,
    ],
  };

  constructor(
    private router: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private readonly reviewService: ReviewService,
    public readonly accountService: AccountService
  ) {
    // router.snapshot.subscribe(data=>
    // );
  }

  ngOnInit(): void {
    //   this.router.paramMap.subscribe(data=>{
    //   this.productService.getById(parseInt(data.get('id')!)).subscribe()
    // });
    this.getPrById();
  }

  getPrById() {
    this.router.paramMap.subscribe((data) => {
      this.productService
        .getById(parseInt(data.get('id')!))
        .subscribe((product) => {
          this.productModel = product;
          this.reviewsArr = this.productModel.reviews;
          this.getReviews()
          // this.accountService.currentUser$.subscribe(
          //   (user) =>
          //     (this.reviewExists = !!this.reviewsArr.find(
          //       (u) => u.username === user?.username
          //     ))
          // );
          console.log(this.productModel);
          
          this.featuresArr = JSON.parse(this.productModel?.features ?? '[]');
        });
    });
  }

  addToCart() {
    this.cartService.addToCart(this.productModel.id).subscribe();
  }

  postReview() {
    this.reviewModel.product_id = this.productModel.id;
    this.reviewService.postReview(this.reviewModel).subscribe((review) => {
      this.reviewsArr = [review, ...this.reviewsArr];
      this.reviewExists = true;
      this.reviewModel.text = '';
      this.reviewModel.rate = 0;
      review.isMy = true;
    });
  }

  inputOnChange(e: any) {
    if (e.key === 'Enter') {
      this.postReview();
    }
  }

  deleteReview(review_id: number) {
    this.reviewsArr = this.reviewsArr.filter((el) => el.id !== review_id);
  }

  getReviews() {
   
    
    this.reviewService
      .getReviews(this.productModel.id)
      .subscribe((res) => (this.reviewsArr = res));
  }
}
