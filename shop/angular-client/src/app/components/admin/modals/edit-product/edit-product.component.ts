import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductModel } from '../../../../models/product.model';
import { ProductService } from '../../../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { CategoryModel } from '../../../../models/category.model';
import { CategoryService } from '../../../../services/category.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryCreateComponent } from '../category-create/category-create.component';
import { CreateFeatureComponent } from '../create-feature/create-feature.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ClassicEditor, Bold, Essentials, Italic, Mention, Paragraph, Undo, Heading, Alignment, Link, BlockQuote, Table, Image, ImageUpload, ImageResize, ImageCaption, ImageStyle, ImageToolbar, ImageUploadUI, Base64UploadAdapter } from 'ckeditor5';


@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, FormsModule,CKEditorModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css',
})
export class EditProductComponent implements OnInit {
  productModel: ProductModel = {} as ProductModel;
  categoryArr: CategoryModel[] = [];
  files: File[] = [null as any];

  public Editor = ClassicEditor;
  public config = {
    toolbar: [ 'undo', 'redo', '|', 'bold', 'italic', '|', 'heading','|', 'alignment','blockQuote','|',
        'link','|','insertTable', 'uploadImage' ],
    plugins:  [
        Bold, Essentials, Italic, Mention, Paragraph, Undo,Heading,Alignment,Link,BlockQuote,Table,ImageUpload,Image,ImageResize,ImageCaption,ImageStyle,ImageToolbar,ImageUploadUI,Base64UploadAdapter
    ],
}

  constructor(
    private productService: ProductService,
    private toastr: ToastrService,
    private categoryService: CategoryService,
    private modal: NgbActiveModal,
    private modalService:NgbModal
  ) {}

  ngOnInit(): void {
    this.categoryService
      .getCategories()
      .subscribe((res) => (this.categoryArr = res));
  }

  get IsFileExists(){
    return false//!this.files.find(f=>f);
  }

  editProduct() {
    this.productService.editProduct(this.productModel).subscribe((product) => {
      this.productModel = product;
      this.toastr.success('Success');
      this.modal.close(product);
    });
  }

  fileChange(e: any,index:number) {

    
    let file = e.target.files[0];

    // let lst = new FileList();
    // lst.;
    this.files = [file, ...this.files]
    // this.files[index] = file;
    // this.files.push(new File([],'') );
    // if (this.files.length === 1) {
      // this.files.unshift(file);
    // } else{
      // this.files.splice(this.files.length-2,0,file);
    // }
}

  openCategoryCreateModal() {
    const modal = this.modalService.open(CategoryCreateComponent);
    modal.result.then((category) => this.categoryArr.push(category));
  }

  addFile(){
    this.files.push(new File([], ''));
  }

  deleteFile(index:number){
    this.files = this.files.filter((file,i)=>i!==index);
  }

  addProductPhoto(){
    for(let i = 0;i<this.files.length;i++){
      if (this.files[i]) {

        this.productService.addProductPhoto(this.productModel.id,this.files[i]!).subscribe();
      }
    }
  }

  openFeatureEditModal(){
    const modal = this.modalService.open(CreateFeatureComponent);

    modal.componentInstance.characteristic = this.productModel.features;
    modal.result.then(c=>this.productModel.features = c);
  }
}
