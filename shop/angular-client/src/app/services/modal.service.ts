import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SubmitActionComponent } from '../components/modals/submit-action/submit-action.component';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private modal:NgbModal) { }

  open(){
   const openRes = this.modal.open(SubmitActionComponent);
   return from(openRes.result);
  }
  
}
