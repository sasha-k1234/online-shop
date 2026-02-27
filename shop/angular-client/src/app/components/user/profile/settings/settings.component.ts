import { Component, Input, OnInit } from '@angular/core';
import { AccountService } from '../../../../services/account.service';
import { ToastrService } from 'ngx-toastr';
import { ProfileModel } from '../../../../models/profile.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent implements OnInit {
  @Input() profileModel: ProfileModel = {} as ProfileModel;
  
  confirmPassword: string = '';
  isClickedConfirm: boolean = false;
  isClickedNew: boolean = false;
  isClickedCurrent: boolean = false;
  constructor(
    private readonly accountService: AccountService,
    private readonly toastr: ToastrService
  ) {}
  ngOnInit(): void {
    
  }



  editUser() {
    if (
      this.profileModel.current_password &&
      this.profileModel.new_password &&
      this.profileModel.new_password !== this.confirmPassword
    ) {
      this.toastr.error('Passswords dont match');
      return;
    }
    this.accountService
      .editUser(this.profileModel)
      .subscribe((user) => (this.profileModel = user));
  }

}
