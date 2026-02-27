import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartModel } from '../../../models/cart.model';
import { CartService } from '../../../services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css'
})
export class CartItemComponent implements OnInit {
    @Input() cartModel:CartModel = {} as CartModel;
    @Output() cartDelClick = new EventEmitter<number>();

    constructor(private cartService:CartService,private toastr:ToastrService) {}
  ngOnInit(): void {

  }

    

    incCart() {
      this.cartService.incCart(this.cartModel.productId)
                      .subscribe(res => this.cartModel.quantity++)

        this.toastr.success('INcremented');
    }

    decCart() {
      if (this.cartModel.quantity===1) {
        return
      }
      this.cartService.decCart(this.cartModel.productId)
                      .subscribe(res => this.cartModel.quantity--)
    }

    deleteCart(){
      this.cartService.deleteCart(this.cartModel.productId)
                      .subscribe(res => this.cartDelClick.emit(this.cartModel.productId))
    }
}
