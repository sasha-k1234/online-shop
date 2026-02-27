export interface ReviewModel {
    id:number,
    text:string,
    rate:number,
    user_id:number,
    username:string,
    product_id:number,
    date:Date,
    user_photo_url:string,
    isMy:boolean,
    child:ReviewModel[],
    parent_id:number
}