import { Component } from '@angular/core';
import { EditProductComponent } from '../admin/modals/edit-product/edit-product.component';
import { EditorComponent } from "../editor/editor.component";
import { ProductFeatureComponent } from "../product-feature/product-feature.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [EditProductComponent, EditorComponent, ProductFeatureComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
