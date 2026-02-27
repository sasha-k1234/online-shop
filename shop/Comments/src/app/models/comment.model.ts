export interface CommentModel {
    userName:string,
    text:string,
    date:Date,
    childrenComments:CommentModel[]
}