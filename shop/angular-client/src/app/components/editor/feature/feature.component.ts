import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditorModel } from '../editor.model';

@Component({
  selector: 'app-feature',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './feature.component.html',
  styleUrl: './feature.component.css'
})
export class FeatureComponent {
  @Input() model:EditorModel = {} as EditorModel;
  @Output() successClick:EventEmitter<any> = new EventEmitter();
  @Output() deleteClick:EventEmitter<any> = new EventEmitter();
}
