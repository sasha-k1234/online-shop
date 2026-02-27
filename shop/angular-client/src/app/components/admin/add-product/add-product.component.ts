import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductModel } from '../../../models/product.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryModel } from '../../../models/category.model';
import { CategoryService } from '../../../services/category.service';
import { ProductService } from '../../../services/product.service';
import { CategoryCreateComponent } from '../modals/category-create/category-create.component';
import { EditorComponent } from '../../editor/editor.component';
import { CreateFeatureComponent } from '../modals/create-feature/create-feature.component';
import { ChangeEvent, CKEditorModule } from '@ckeditor/ckeditor5-angular';
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
import { TextFieldComponent } from '../../form-controls/text-field/text-field.component';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    CKEditorModule,
    ReactiveFormsModule,
    TextFieldComponent,
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent implements OnInit {
  productModel: ProductModel = {} as ProductModel;
  file: File = {} as File;
  categoryArr: CategoryModel[] = [];

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

  form = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    price: new FormControl('', [Validators.required, Validators.min(1)]),
    category: new FormControl(undefined, [Validators.required]),
    photo: new FormControl(undefined,[])
  });

  // get canAddProduct() {
  //   return (
  //     !!this.productModel.category_id &&
  //     !!this.productModel.name &&
  //     !!this.productModel.description &&
  //     !!this.productModel.price
  //   );
  // }

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private modalService: NgbModal
  ) {}
  ngOnInit(): void {
    this.getCategories();
  }

  onChange({ editor }: ChangeEvent) {
    console.log((this.productModel.description = editor.getData()));
  }

  fileChange(e: any) {
    this.file = e.target.files[0];
  }

  addProduct() {
    this.productModel.price = this.form.controls.price.value as any;
    this.productModel.category_id = this.form.controls.category.value as any;
    this.productModel.name = this.form.controls.title.value as any;
    this.productService
      .addProducts(this.productModel, this.file)
      .subscribe((res) => {
        this.productModel.price = 0;
        this.productModel.category = { id: 0 } as CategoryModel;
        this.productModel.description = '';
        this.productModel.name = '';
      });
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((res) => {
      this.categoryArr = res;
    });
  }

  openCategoryCreateModal() {
    const modal = this.modalService.open(CategoryCreateComponent);
    modal.result.then((category) => this.categoryArr.push(category));
  }

  openEditor() {
    const modal = this.modalService.open(CreateFeatureComponent);
    modal.componentInstance.characteristic = this.productModel.features;
    modal.result.then((c) => (this.productModel.features = c));
  }
}
