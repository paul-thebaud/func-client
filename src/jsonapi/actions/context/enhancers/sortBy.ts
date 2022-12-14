import { Action, ActionContext } from '@/core';
import prevParams from '@/http/actions/context/utilities/prevParams';
import rawSortBy from '@/jsonapi/actions/context/enhancers/rawSortBy';
import mergeParamList from '@/jsonapi/actions/context/utilities/mergeParamList';

/**
 * [Sort the JSON:API resource](https://jsonapi.org/format/#fetching-sorting)
 * by the given key and direction.
 * The new sort will be merged with the previous ones.
 * Sorts priority are kept.
 *
 * @param key
 * @param direction
 *
 * @category Enhancers
 */
export default function sortBy(key: string, direction: 'asc' | 'desc' = 'asc') {
  return async <C extends ActionContext>(action: Action<C>) => action.use(rawSortBy(
    mergeParamList([
      prevParams(await action.context)?.sort,
      `${direction === 'desc' ? '-' : ''}${key}`,
    ]),
  ));
}
