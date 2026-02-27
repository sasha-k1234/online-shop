import { OrderItem } from "./orderItem.model";
import { ProductModel } from "./product.model";

export interface OrderModel {
    id:number,
    date:Date,
    destination:string,
    status:string,
    items:OrderItem[],
    sum:number,
    user_id:number,
    username:string
}