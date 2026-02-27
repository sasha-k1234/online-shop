import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { AccountService } from '../services/account.service';
import { map } from 'rxjs';
import { UserModel } from '../models/user.model';
import { UserAuthModel } from '../models/user-auth.model';

@Directive({
  selector: '[appHasRole]',
  standalone: true,
})
export class HasRoleDirective implements OnInit {
  @Input() appHasRole: string[] = [];

  user:UserAuthModel|null = {} as UserAuthModel;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private accountService: AccountService
  ) {
    accountService.currentUser$.subscribe(res=> this.user=res)
  }
  ngOnInit(): void {
    console.log('inmit');
    
      if (this.appHasRole.some(r=>{
        console.log('1');
        
       return this.user?.roles.includes(r);
      })) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        console.log('2');
        
        this.viewContainerRef.clear();
      }
    };
  }

