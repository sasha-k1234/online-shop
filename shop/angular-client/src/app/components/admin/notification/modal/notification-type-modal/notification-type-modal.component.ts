import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../../../services/notification.service';
import { NotificationTypeModel } from '../../../../../models/notificationType.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-notification-type-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './notification-type-modal.component.html',
  styleUrl: './notification-type-modal.component.css',
})
export class NotificationTypeModalComponent implements OnInit {
  types: NotificationTypeModel[] = [];
  checkedArr: NotificationTypeModel[] = [];
  model: NotificationTypeModel = {} as NotificationTypeModel;

  constructor(
    private notificationService: NotificationService,
    public modal: NgbActiveModal
  ) {}
  ngOnInit(): void {
    this.getTypes();
  }
  get isEditMode(){
    return this.model.id> 0;
  }
  getTypes() {
    this.notificationService.getTypes().subscribe((res) => {
      if (!this.checkedArr) this.checkedArr = [];
      for (let i = 0; i < res.length; i++) {
        
        res[i].checked = false;
        if (this.checkedArr.find((el) => el.id === res[i].id)) {
          res[i].checked = true;
          
        }
      }
      this.types = res;

    });
  }

  createType() {
    this.notificationService.addType(this.model.name).subscribe((res) => {
      this.types.push(res);
      this.model = {} as NotificationTypeModel;
    });
  }

  chooseModal() {
    this.modal.close(this.types.filter((type) => type.checked));
  }

  deleteType(id: number) {
    this.notificationService.deleteType(id).subscribe((res) => {
      this.types = this.types.filter((t) => t.id !== id);
      this.checkedArr = this.checkedArr.filter((t) => t.id !== id);
    });
  }

  endEditing() {
    this.notificationService
      .editType(this.model)
      .subscribe((res) => {
        const index2 = this.types.findIndex((t) => (t.id = this.model.id));
        this.types[index2] = res;
        this.model = {} as NotificationTypeModel;
      });
  }
  startEditing(type: NotificationTypeModel) {
    this.model = type;
  }
}
