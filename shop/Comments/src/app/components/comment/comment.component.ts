import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommentModel } from '../../models/comment.model';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent {
  @Input() comment:CommentModel = {} as CommentModel;
}
