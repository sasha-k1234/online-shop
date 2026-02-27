import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../../../../services/account.service';

@Component({
  selector: 'app-profile-upload-photo',
  standalone: true,
  imports: [],
  templateUrl: './profile-upload-photo.component.html',
  styleUrl: './profile-upload-photo.component.css',
})
export class ProfileUploadPhotoComponent {
  file:any;
  imageSrc:string|ArrayBuffer = '';
  constructor(
    private readonly toastr: ToastrService,
    public readonly activeModal: NgbActiveModal,
    private accountService:AccountService
  ) {}

  uploadPhoto(){
    this.accountService.addProfilePhoto(this.file).subscribe(photo => {
      this.toastr.success('Success');
      this.activeModal.close(photo);
    });
  }

  changeFile(e:any){
    this.file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = e => {
      this.imageSrc = e.target!.result!
    }
    fileReader.readAsDataURL(this.file);
  }

}
