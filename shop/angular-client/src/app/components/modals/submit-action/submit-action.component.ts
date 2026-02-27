import { Component } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-submit-action',
  standalone: true,
  imports: [],
  templateUrl: './submit-action.component.html',
  styleUrl: './submit-action.component.css'
})
export class SubmitActionComponent {
  constructor(public modal:NgbActiveModal){}

  
}
