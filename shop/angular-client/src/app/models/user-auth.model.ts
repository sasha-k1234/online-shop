import { Photo } from "./photo.model"

export interface UserAuthModel {
    accessToken:string,
    photoUrl:string,
    photos:Photo[],
    username:string,
    roles:string[]
}