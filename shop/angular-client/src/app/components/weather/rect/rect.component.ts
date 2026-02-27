import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-rect',
  standalone: true,
  imports: [],
  templateUrl: './rect.component.html',
  styleUrl: './rect.component.css'
})
export class RectComponent {
  @Output() rectClick = new EventEmitter<string>(); 

  myClick(){
    this.rectClick.emit('dsadsa');
  }
}
