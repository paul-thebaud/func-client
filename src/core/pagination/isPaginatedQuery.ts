import { PaginatedQuery, Query } from '@/core/types/query';

export default function isPaginatedQuery(
  query: Partial<Query | PaginatedQuery>,
): query is { page: PaginatedQuery['page'] } {
  return 'page' in query && !!query.page;
}
