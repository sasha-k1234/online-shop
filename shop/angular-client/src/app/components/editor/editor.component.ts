import { Component, EventEmitter, Input, Output, Pipe, PipeTransform } from '@angular/core';
import { EditorModel } from './editor.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FeatureComponent } from "./feature/feature.component";
import { group } from '@angular/animations';
// @Pipe({
//   name:'formatjson',
//   standalone:true
// })
// export class FormatJsonPipe implements PipeTransform{
//   transform(value: any, ...args: any[]) {
//     return JSON.stringify(value, null, 2).replace(' ','&nbsp;').replace('\n', '<br/>');
//   }
// }

@Component({
  selector: 'app-editor',
  standalone: true,
  
  imports: [CommonModule, FormsModule, FeatureComponent],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css',
})
export class EditorComponent {
  fieldsArr: EditorModel[] = [];
  private _disabled:boolean = false;
  get disabled(){
    return this._disabled;
  }
  set disabled(value:boolean){
    this._disabled = value;
    this.DisableSaveEvent.emit(value);
  }
  @Output() DisableSaveEvent = new EventEmitter<boolean>();
  hoverInputs:boolean = false;
 @Output()OnChangeFeature = new EventEmitter<EditorModel[]>();
 @Input() set charachteristic (value:string){
  this.fieldsArr = JSON.parse(value??'[]');
  }

  addFields() {
    this.fieldsArr.push({} as EditorModel);
    this.disabled = this.fieldsArr.filter((el) => !el.isClicked).length > 0;
  }

  successClick(index: number) {
      this.fieldsArr[index].isClicked = true;
     this.disabled = this.fieldsArr.filter((el) => !el.isClicked).length > 0;
     this.OnChangeFeature.emit(this.fieldsArr);
  }

  successGroupClick(index: number,group:EditorModel){
    group.groupItems[index].isClicked = true;
    this.disabled = group.groupItems.filter((f)=>!f.isClicked).length > 0;
    this.OnChangeFeature.emit(this.fieldsArr);
  }

  deleteFields(i:number){
  this.fieldsArr = this.fieldsArr.filter((el,index)=>index!==i);
  this.disabled = this.fieldsArr.filter((el) => !el.isClicked).length > 0;
  this.OnChangeFeature.emit(this.fieldsArr);
  }

  deleteGroupFields(i:number,group:EditorModel){
    group.groupItems = group.groupItems.filter((el,index)=>index!==i);
    this.disabled = group.groupItems.filter((f)=>!f.isClicked).length > 0;
    this.OnChangeFeature.emit(this.fieldsArr);
  }

  addGroup(){
    this.fieldsArr.push({isGroup:true,groupItems:[] as  EditorModel[]} as EditorModel);
  }

  addGroupFields(group:EditorModel){
    group.groupItems.push({} as EditorModel);
    this.disabled =true;
  }


}
