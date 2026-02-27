import { PaginationQuery } from '../paginationQuery.model';

export class UserQuery extends PaginationQuery {
  terms: string = '';

  override toParams() {
    return super.toParams().append('terms', this.terms);
  }
}
