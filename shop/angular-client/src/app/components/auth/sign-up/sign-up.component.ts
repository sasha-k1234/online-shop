import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AccountService } from '../../../services/account.service';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SignUpModel } from '../../../models/sign-up.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  model: SignUpModel = {} as SignUpModel;

  constructor(private accountService: AccountService, private router: Router) {}

  form = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      // Validators.minLength(4),
      // Validators.maxLength(10),
    ]),
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(10),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(10),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(10),
      this.checkUpperCase,
      this.checkLowerCase,
      this.checkNumber,
    ]),
    confirmPassword: new FormControl('', [this.checkMatch('password')]),
  });

  register() {
    console.log(this.model.birth_date);
    this.model = {
      email:this.form.controls.email.value!,
      first_name:this.form.controls.firstName.value!,
      last_name:this.form.controls.lastName.value!,
      password:this.form.controls.password.value!,
      birth_date:this.model.birth_date
    } as SignUpModel;
    
    this.accountService.register(this.model).subscribe({
      next: (res) => {
        this.router.navigateByUrl('/sign-in');
      },
    });
  }

  checkUpperCase(control: AbstractControl) {
    const regex = new RegExp('[A-Z]');
    if (regex.test(control.value)) {
      return null;
    }
    return { checkUpperCase: true };
  }

  checkLowerCase(control: AbstractControl) {
    const regex = new RegExp('[a-z]');
    if (regex.test(control.value)) {
      return null;
    }
    return { checkLowerCase: true };
  }

  checkNumber(control: AbstractControl) {
    const regex = new RegExp('[0-9]');
    if (regex.test(control.value)) {
      return null;
    }
    return { checkNumber: true };
  }

  checkMatch(parent: string) {
    return (control: AbstractControl) => {
      if (control.value === control.parent?.get(parent)?.value) {
        return null;
      }
      return { checkMatch: true };
    };
  }
}
