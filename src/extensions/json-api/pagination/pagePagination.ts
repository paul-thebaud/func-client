import { Serializable } from '@/core/types/serializable/serializable';
import { Dictionary } from '@/core/types/utilities/dictionary';
import { JsonApiPagination } from '@/extensions/json-api/pagination/jsonApiPagination';

export type PageParams = [] | [number | string] | [number | string, number | string];

export default class PagePagination implements JsonApiPagination<PageParams> {
  private readonly pageKey: string;

  private readonly perPageKey: string;

  public constructor(pageKey: string, perPageKey: string) {
    this.pageKey = pageKey;
    this.perPageKey = perPageKey;
  }

  public paginateUsing(
    page: PageParams,
    relevant: Dictionary<Serializable>,
  ): Dictionary<Serializable> {
    return {
      ...relevant,
      page: {
        [this.pageKey]: page[0] || 1,
        [this.perPageKey]: page[1],
      },
    };
  }
}
