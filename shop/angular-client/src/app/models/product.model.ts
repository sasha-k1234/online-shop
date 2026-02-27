import { CategoryModel } from "./category.model";
import { Photo } from "./photo.model";
import { ReviewModel } from "./review.model";

export interface ProductModel {
    name:string,
    description:string,
    price:number,
    mainImagePath:string,
    id:number,
    category_id:number,
    category:CategoryModel,
    rating:number,
    photos:Photo[],
    is_deleted:boolean,
    is_favorite:boolean,
    reviews:ReviewModel[],
    features:string 
}