import { ProductModel } from "./product.model";

export interface CartModel {
    productId:number,
    quantity:number,
    product:ProductModel
}