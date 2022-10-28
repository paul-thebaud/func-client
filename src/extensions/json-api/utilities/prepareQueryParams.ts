import isPaginatedQuery from '@/core/pagination/isPaginatedQuery';
import { Query } from '@/core/types/query';
import { Serializable } from '@/core/types/serializable/serializable';
import { Dictionary } from '@/core/types/utilities/dictionary';

export default function prepareQueryParams(query: Partial<Query>): Dictionary<Serializable> {
  let queryParams = {
    filter: query.filters,
  } as Dictionary<Serializable>;

  query.selects?.forEach((fields, type) => {
    queryParams.fields = {
      ...((queryParams.fields as Dictionary<string> | undefined) || {}),
      [type]: [...fields].join(','),
    };
  });

  if (query.relations?.size) {
    queryParams.include = [...query.relations.keys()].join(',');
  }

  if (query.sortBys?.size) {
    queryParams.sort = [...query.sortBys.entries()]
      .map(([key, order]) => (order === 'desc' ? `-${key}` : key))
      .join(',');
  }

  if (isPaginatedQuery(query)) {
    queryParams = query.page.pagination.paginateUsing(
      query.page.page,
      queryParams,
    ) as Dictionary<Serializable>;
  }

  return queryParams;
}
