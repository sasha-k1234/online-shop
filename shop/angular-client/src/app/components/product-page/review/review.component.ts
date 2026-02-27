import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgbNavModule, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { TimeagoModule } from 'ngx-timeago';
import { ReviewModel } from '../../../models/review.model';
import { CommonModule } from '@angular/common';
import { ReviewService } from '../../../services/review.service';
import { AccountService } from '../../../services/account.service';
import {
  Alignment,
  Base64UploadAdapter,
  BlockQuote,
  Bold,
  ClassicEditor,
  Essentials,
  Heading,
  ImageCaption,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  ImageUploadUI,
  Italic,
  Link,
  Mention,
  Paragraph,
  Table,
  Undo,
} from 'ckeditor5';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [
    NgbRatingModule,
    FormsModule,
    TimeagoModule,
    NgbNavModule,
    CKEditorModule,
    CommonModule,
  ],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class ReviewComponent implements OnInit {
  constructor(
    private readonly reviewService: ReviewService,
    public readonly accountService: AccountService
  ) {}
  ngOnInit(): void {
    //this.Editor.setData()
  }
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
      // 'uploadImage',
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
      // ImageUpload,
      Image,
      ImageResize,
      ImageCaption,
      ImageStyle,
      ImageToolbar,
      // ImageUploadUI,
      Base64UploadAdapter,
    ],
  } as any;
  @Input() review: ReviewModel = { text: '' } as ReviewModel;
  @Output() onDelete: EventEmitter<number> = new EventEmitter();
  @Output() onReply: EventEmitter<ReviewModel> = new EventEmitter();


  reviewExists: boolean = false;
  hoverReview: boolean = false;
  editClicked: boolean = false;
  model: ReviewModel = {} as ReviewModel;
  replyClicked: boolean = false;

  

  editReview(reviewId: number, text: string) {
    this.reviewService
      .editReview(reviewId, text)
      .subscribe((_) => (this.editClicked = false));
  }

  deleteReview(review_id: number) {
    this.reviewService.deleteReview(review_id).subscribe(() => {
      this.onDelete.emit(review_id);
      this.reviewExists = false;
    });
  }

  reply() {
    
    
    this.model.product_id = this.review.product_id;
  
    
    this.model.parent_id = this.review.id;
    
    
    this.reviewService
      .postReview(this.model)
      .subscribe((res) => this.review.child.push(res));
  }

  
}
