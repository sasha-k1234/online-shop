import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { jwtInterceptor } from './interceptors/jwt.interceptor';
import { TimeagoModule } from 'ngx-timeago';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { errorInterceptor } from './interceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideHttpClient(withInterceptors([jwtInterceptor,errorInterceptor])),
    provideAnimations(),
    provideToastr(
      //toastClass:"ngx-toastr toast"
      
    ),
   provideCharts(withDefaultRegisterables()),
  ],
};
