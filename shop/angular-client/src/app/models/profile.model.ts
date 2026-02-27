import { Photo } from "./photo.model";
import { ProductModel } from "./product.model";

export interface ProfileModel {
    photos:Photo[],
    username:string,
    email:string,
    favorites:ProductModel[],
    main_photo:Photo|null,
    first_name:string,
    last_name:string,
    birth_date:Date,
    current_password:string,
    new_password:string
}