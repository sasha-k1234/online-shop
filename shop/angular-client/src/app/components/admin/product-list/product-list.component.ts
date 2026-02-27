import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { NgbModal, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { ProductModel } from '../../../models/product.model';
import { AdminService } from '../../../services/admin.service';
import { EditProductComponent } from '../modals/edit-product/edit-product.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, NgbPaginationModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  page: number = 1;
  totalCount: number = 0;
  list: ProductModel[] = [];
  constructor(
    private productService: ProductService,
    private adminService: AdminService,
    private modalService: NgbModal
  ) {}
  ngOnInit(): void {
    this.getProducts();
  }
  getProducts() {
    this.adminService.getProducts(this.page, 10).subscribe({
      next: (pagination) => {
        this.list = pagination.list;
        this.totalCount = pagination.totalCount;
      },
    });
  }

  delProduct(productId: number) {
    this.productService
      .deleteProduct(productId)
      .subscribe(
        (_) => (this.list.find((p) => p.id === productId)!.is_deleted = true)
      );
  }

  activateProduct(productId: number) {
    this.adminService
      .activateProduct(productId)
      .subscribe(
        (_) => (this.list.find((p) => p.id === productId)!.is_deleted = false)
      );
  }

  openEditModal(product: ProductModel) {
    const modal = this.modalService.open(EditProductComponent);
    modal.componentInstance.productModel = {...product};
    modal.result.then((result) => {
      const index = this.list.findIndex((el) => el.id === product.id);
      this.list[index] = result;
    });
  }

  updatePhotos(){
    this.adminService.updateAmazonPhotos().subscribe();
  }
}
