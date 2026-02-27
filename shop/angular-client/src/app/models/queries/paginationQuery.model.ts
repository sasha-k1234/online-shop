import { HttpParams } from '@angular/common/http';

export class PaginationQuery {
  page: number = 1;
  perPage: number = 5;
  toParams() {
    return new HttpParams()
      .append('page', this.page)
      .append('perPage', this.perPage);
  }
}
