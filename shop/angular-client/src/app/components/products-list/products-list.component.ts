import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductModel } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './product-card/product-card.component';
import { NgbPaginationModule, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductQuery } from '../../models/queries/products/productQuery';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { NgxSliderModule, Options } from '@angular-slider/ngx-slider';
import { CategoryModel } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { ProductFilterComponent } from "./product-filter/product-filter.component";

@Component({
  selector: 'app-products-list',
  standalone: true,
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css',
  imports: [
    CommonModule,
    ProductCardComponent,
    NgbPaginationModule,
    FormsModule,
    NgxSliderModule,
    NgbRatingModule,
    ProductFilterComponent
],
})
export class ProductsListComponent  {
  totalCount: number = 0;
  list: ProductModel[] = [];
  query: ProductQuery = new ProductQuery();
  options: Options = {
    floor: 0,
    ceil: 200,
  };
  
  

  constructor(private productService: ProductService,private categoryService:CategoryService) {
    // this.getProducts();
  }



  getProducts() {
    this.productService.getProducts(this.query).subscribe({
      next: (pagination) => {
        this.list = pagination.list;
        this.totalCount = pagination.totalCount;
      },
    });
  }

  

  // getMaxPrice(){
  //   this.productService.getMaxPrice().subscribe(res => this.query.maxPrice = res.maxPrice);

  // }
}
