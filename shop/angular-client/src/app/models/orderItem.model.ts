import { ProductModel } from "./product.model";

export interface OrderItem{
    quantity:number,
    product_id:number,
    order_id:number,
    product:ProductModel
}