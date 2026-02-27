import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductQuery } from '../../../models/queries/products/productQuery';
import { NgxSliderModule, Options } from '@angular-slider/ngx-slider';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { CategoryService } from '../../../services/category.service';
import { CategoryModel } from '../../../models/category.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-filter',
  standalone: true,
  imports: [NgxSliderModule, NgbRatingModule, FormsModule, CommonModule],
  templateUrl: './product-filter.component.html',
  styleUrl: './product-filter.component.css',
})
export class ProductFilterComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  options: Options = {
    floor: 0,
    ceil: 200,
  };
  @Input() query: ProductQuery = new ProductQuery();
  @Output() findClick: EventEmitter<any> = new EventEmitter();
  categories: CategoryModel[] = [];

  ngOnInit(): void {
    this.productService.getMaxPrice().subscribe((res) => {
      this.options = {
        ...this.options,
        floor: 0,
        ceil: res.maxPrice ?? 0,
      } as Options;
      this.query.maxPrice = this.options.ceil!;
      this.findClick.emit();
    });
    this.getCategories();
  }

  getCategories() {
    this.categoryService
      .getCategories()
      .subscribe((c) => (this.categories = c));
  }
}
