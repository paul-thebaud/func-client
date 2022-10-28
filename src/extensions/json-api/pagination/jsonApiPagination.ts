import { Pagination } from '@/core/pagination/pagination';
import { Serializable } from '@/core/types/serializable/serializable';
import { Dictionary } from '@/core/types/utilities/dictionary';

/**
 * Interface JsonApiPagination.
 *
 * A JSON:API adapter compatible pagination mode.
 */
export interface JsonApiPagination<Page extends unknown[] = unknown[]> extends Pagination<Page> {
  /**
   * Take the page param and define the pagination on the query.
   *
   * @param page
   * @param query
   */
  paginateUsing(
    page: Page,
    query: Dictionary<Serializable>,
  ): Dictionary<Serializable>;
}
