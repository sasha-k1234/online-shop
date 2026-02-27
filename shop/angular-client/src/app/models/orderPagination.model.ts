import { OrderModel } from "./order.model";

export interface OrderPagination {
    list:OrderModel[],
    totalCount:number

}