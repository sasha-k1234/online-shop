import { Component, Input, OnInit } from '@angular/core';
import { AccountService } from '../../../services/account.service';
import { ProfileModel } from '../../../models/profile.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfileUploadPhotoComponent } from '../modals/profile-upload-photo/profile-upload-photo.component';
import { GalleryComponent } from './gallery/gallery.component';
import { Photo } from '../../../models/photo.model';
import { SettingsComponent } from './settings/settings.component';
import { ActivityComponent } from './activity/activity.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgbNavModule,
    GalleryComponent,
    SettingsComponent,
    ActivityComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  active = 'settings';
  profileModel: ProfileModel = {} as ProfileModel;
  confirmPassword: string = '';
  isClickedConfirm: boolean = false;
  isClickedNew: boolean = false;
  isClickedCurrent: boolean = false;
  username:string = '';

  constructor(
    private readonly accountService: AccountService,
    private readonly toastr: ToastrService,
    private readonly modalService: NgbModal,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {
    activatedRoute.queryParams.subscribe((param) => {
      const tab = param['tab'];
      if (tab) {
        this.active = tab;
      }
    });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((data) => {
      this.username = data.get('username')!;
      this.getUser(data.get('username')!);
    });
  }

  logout() {
    this.accountService.logout();
  }

  getUser(username: string) {
    this.accountService
      .getUserData(username)
      .subscribe((user) => (this.profileModel = user));
  }

  openPhotoUploadModal() {
    const modal = this.modalService.open(ProfileUploadPhotoComponent);
    modal.result.then((photo) => {
      this.profileModel.photos.push(photo);
      const main_photo = this.profileModel.photos.find((p) => p.is_main);
      this.profileModel.main_photo = main_photo!;
    });
  }

  changeAvatar(photo: Photo | null) {
    this.profileModel.main_photo = photo;
  }

  deletePhotoChange(id: number) {
    this.profileModel.photos = this.profileModel.photos.filter(
      (p) => p.id !== id
    );
  }

  tabChange(nextTab: string) {
    this.router.navigate(['profile/' + this.username], {
      queryParams: {
        tab: nextTab,
      },
    });
  }
}
