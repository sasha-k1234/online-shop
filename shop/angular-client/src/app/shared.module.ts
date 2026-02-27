import { NgModule } from '@angular/core';
import { RectComponent } from './components/weather/rect/rect.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { CounterComponent } from './components/counter/counter.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { WeatherComponent } from './components/weather/weather.component';
import { TimeagoModule } from 'ngx-timeago';

@NgModule({
  declarations: [],
  imports: [
    RouterOutlet,
    HttpClientModule,
    CounterComponent,
    WeatherComponent,
    NavbarComponent,
    RectComponent,
    TimeagoModule.forRoot(),
  ],
  exports: [
    RouterOutlet,
    HttpClientModule,
    CounterComponent,
    WeatherComponent,
    NavbarComponent,
    RectComponent,
    TimeagoModule,
  ],
})
export class SharedModule {}
