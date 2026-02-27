import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AccountService } from '../../../services/account.service';
import { SignInModel } from '../../../models/sign-in.model';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  model: SignInModel = {} as SignInModel;

  constructor(private accountService: AccountService, private router: Router) {
   
  }

  login() {
    this.accountService.login(this.model).subscribe({
      next: (res) => {
        this.router.navigateByUrl('/');
      },
    });
  }
}
