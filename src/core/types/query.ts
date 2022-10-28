import { Pagination } from '@/core/pagination/pagination';
import { RecordType } from '@/core/types/record';
import { Serializable } from '@/core/types/serializable/serializable';

export type Query = {
  selects: Map<RecordType, Set<string>>;
  relations: Map<string, null>;
  filters: Serializable;
  sortBys: Map<string, 'asc' | 'desc'>;
};

export type PaginatedQuery<P extends Pagination = Pagination> = Query & {
  page: {
    pagination: P;
    page: Parameters<P['paginateUsing']>[0];
  }
};
