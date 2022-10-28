/**
 * Interface Pagination.
 *
 * An adapter dedicated pagination mode.
 */
export interface Pagination<Page extends unknown[] = unknown[]> {
  /**
   * Take the "relevant" data and enhance it with pagination.
   * Relevant data might be a URL query for an API adapter, a SQL query for
   * a DB adapter, etc.
   *
   * @param page
   * @param relevant
   */
  paginateUsing(
    page: Page,
    relevant: unknown,
  ): unknown;
}
