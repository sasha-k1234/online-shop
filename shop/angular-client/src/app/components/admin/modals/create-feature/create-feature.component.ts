import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EditorComponent } from "../../../editor/editor.component";
import { EditorModel } from '../../../editor/editor.model';

@Component({
  selector: 'app-create-feature',
  standalone: true,
  imports: [EditorComponent],
  templateUrl: './create-feature.component.html',
  styleUrl: './create-feature.component.css'
})
export class CreateFeatureComponent implements OnInit {
  disabled:boolean = false;
  constructor(private modal:NgbActiveModal){
  }
  ngOnInit(): void {

   if (this.characteristic) {
    this.features = JSON.parse(this.characteristic);
   }
  }
  features: EditorModel[] = [];
  characteristic:string = '';
  close(){
    this.modal.close(JSON.stringify(this.features));
  }

  OnChangeFeatureHandler(fieldsArr:EditorModel[]){
    this.features = fieldsArr;
  }

  dismiss(){
    this.modal.dismiss();
  }

  getDisabledValue(value:boolean){
    this.disabled = value;
  }
}
