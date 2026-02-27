import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from '../../../../services/category.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category-create',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './category-create.component.html',
  styleUrl: './category-create.component.css'
})
export class CategoryCreateComponent {
  category:string = '';
  constructor(public readonly modal:NgbActiveModal,private categoryService:CategoryService){}

  addCategory(){
    this.categoryService.addCategory(this.category)
        .subscribe(category=>this.modal.close(category));
  }
}
