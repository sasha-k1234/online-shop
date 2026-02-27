import { Component, OnInit } from '@angular/core';
import { CartModel } from '../../models/cart.model';
import { CartService } from '../../services/cart.service';
import { CartItemComponent } from './cart-item/cart-item.component';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderComponent } from './modals/order/order.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
  imports: [CartItemComponent, CommonModule],
})
export class CartComponent implements OnInit {
  cartItems: CartModel[] = [];

  constructor(
    private cartService: CartService,
    private readonly modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getCart();
  }

  getCart() {
    this.cartService
      .getCart()
      .subscribe({ next: (items) => (this.cartItems = items) });
  }

  deleteCart(productId: number) {
    this.cartItems = this.cartItems.filter(
      (item) => item.productId !== productId
    );
  }

  openOrderModal() {
    const modal = this.modalService.open(OrderComponent);
    modal.componentInstance.products = this.cartItems;
    modal.result.then((res) => {
      if (res) {
        this.cartItems = [];
        this.cartService.clear();
      }
    });
  }
}
