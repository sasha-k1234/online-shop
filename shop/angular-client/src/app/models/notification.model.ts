import {  NotificationTypeModel } from "./notificationType.model";

export interface NotificationModel{
    id:number,
    header:string,
    content:string,
    types:NotificationTypeModel[],
    directs:number[]|null,
    created_at:Date,
    read_at:Date|null,
    is_available:boolean,
    direct:number,
    isMy:boolean
}