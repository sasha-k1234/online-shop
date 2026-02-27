import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { AccountService } from './services/account.service';
import { SharedModule } from './shared.module';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [SharedModule]
})
export class AppComponent {
  title = 'angular-client';

  weather:string='';
  constructor(private httpClient:HttpClient,
  private accountService:AccountService) {
    const user = localStorage.getItem("user");
    const res = user?JSON.parse(user):null;
    accountService.setCurrUser(res);
  }
 
  weatherReport(){
    this.httpClient.get('https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=27a89482475ba4710adb1f994183253d')
                   .subscribe({
                      next:data => {

                      },
                      error:error => {

                      }
                   })
  }

  click(text:string){
    alert(text);
  }
}
