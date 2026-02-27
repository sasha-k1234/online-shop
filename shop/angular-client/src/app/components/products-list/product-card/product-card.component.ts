import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../environment/environment';
import { CartService } from '../../../services/cart.service';
import { CartModel } from '../../../models/cart.model';
import { ProductModel } from '../../../models/product.model';
import { ToastrService } from 'ngx-toastr';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { CommonModule } from '@angular/common';
import { AccountService } from '../../../services/account.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [NgbRatingModule,CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent implements OnInit {
  // @Input() set imageUrl(value:string){
  //   this._imageUrl =  environment.apiUrl + value ;
  // }
  // _imageUrl:string = '';
  @Input() class: string = '';
  @Input() productModel: ProductModel = {} as ProductModel;
  constructor(
    private cartService: CartService,
    private toastr: ToastrService,
    private router: Router,
    private readonly productService:ProductService,
    private readonly accountService:AccountService
  ) {}

  ngOnInit(): void {
    const ending = this.productModel.description?.length > 50 ? '...' : '';
    const description = this.productModel.description?.substring(0, 100).trim();
    this.productModel.description = description + ending;
  }

  addToCart(e:Event) {
    e.stopPropagation();
    e.preventDefault();
    this.cartService.addToCart(this.productModel.id).subscribe();
    this.toastr.success('added');
  }

  redirectToDetailPage() {
    this.router.navigateByUrl(`products/${this.productModel.id}`);
  }

  setFavorite(productId:number,e:Event){
    e.stopPropagation();
    this.productService.setFavorite(productId).subscribe(()=>{
      this.productModel.is_favorite = true;
    });
  }

  undoFavorite(productId:number,e:Event){
    e.stopPropagation();
    this.productService.undoFavorite(productId).subscribe(()=>{
      this.productModel.is_favorite = false;
    });
  }
}
