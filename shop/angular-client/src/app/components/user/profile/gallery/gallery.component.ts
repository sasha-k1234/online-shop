import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { Photo } from '../../../../models/photo.model';
import { CommonModule } from '@angular/common';
import { AccountService } from '../../../../services/account.service';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [NgbCarouselModule, CommonModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css',
})
export class GalleryComponent {
  @Input() images: Photo[] = [];
  @Output() changeMainPhoto = new EventEmitter<Photo|null>();
  @Output() deletePhotoEvent = new EventEmitter<number>();
  constructor(private readonly accountService: AccountService) {}

  setFavorite(id: number) {
    this.accountService.setFavoritePhoto(id).subscribe((_) => {
      this.images.forEach((img) => (img.is_main = false));
      const mainImg = this.images.find((img) => img.id === id);
      mainImg!.is_main = true;
      this.changeMainPhoto.emit(mainImg);
    });
  }

  deletePhoto(id: number) {
    this.accountService.deletePhoto(id).subscribe((_) => {
      if (this.images.find(p => p.id === id)?.is_main) {
        this.changeMainPhoto.emit(null);
      }
      this.deletePhotoEvent.emit(id);
      this.images = this.images.filter((p) => p.id !== id);
    });
  }
}
