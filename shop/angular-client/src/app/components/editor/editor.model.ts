export interface EditorModel{
    name:string,
    value:string,
    isClicked:boolean,
    hover:boolean,
    groupItems:EditorModel[],
    isGroup:boolean
}