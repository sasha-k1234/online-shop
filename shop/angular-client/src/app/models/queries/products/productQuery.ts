import { PaginationQuery } from '../paginationQuery.model';

export class ProductQuery extends PaginationQuery {
  keyword: string = '';
  minPrice: number = 0;
  maxPrice: number = 0;
  category_id:number = 0;
  rating:number = 0;
  override toParams() {
    return super
      .toParams()
      .append('keyword', this.keyword)
      .append('minPrice', this.minPrice)
      .append('maxPrice', this.maxPrice)
      .append('categoryId',this.category_id)
      .append('rating',this.rating);
  }
}
