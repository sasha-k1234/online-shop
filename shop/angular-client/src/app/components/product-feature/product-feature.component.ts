import { Component, Input } from '@angular/core';
import { EditorModel } from '../editor/editor.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-feature',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-feature.component.html',
  styleUrl: './product-feature.component.css',
})
export class ProductFeatureComponent {
   @Input() data:EditorModel[] = [];

  // data: EditorModel[] =  [
  //   {
  //     "hover": false,
  //     "name": "ersdadsad",
  //     "value": "er",
  //     "isClicked": true
  //   },
  //   {
  //     "isGroup": true,
  //     "groupItems": [
  //       {
  //         "hover": false,
  //         "name": "ewqeqeqw",
  //         "value": "ee",
  //         "isClicked": true
  //       },
  //       {
  //         "hover": false,
  //         "name": "ee",
  //         "value": "2",
  //         "isClicked": true
  //       },
  //       {
  //         "hover": false,
  //         "name": "eee",
  //         "value": "3",
  //         "isClicked": true
  //       }
  //     ],
  //     "hover": false,
  //     "name": "g1",
  //     "isClicked": true
  //   },
  //   {
  //     "hover": false,
  //     "name": "dsa",
  //     "value": "dsa",
  //     "isClicked": true
  //   },
  //   {
  //     "isGroup": true,
  //     "groupItems": [
  //       {
  //         "hover": false,
  //         "name": "3",
  //         "value": "3",
  //         "isClicked": true
  //       }
  //     ],
  //     "hover": false,
  //     "name": "d",
  //     "isClicked": true
  //   }
  // ] as any as EditorModel[]
}
