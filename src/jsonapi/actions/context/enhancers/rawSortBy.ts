import { Action, ActionContext } from '@/core';
import { param } from '@/http';

/**
 * [Sort the JSON:API resource](https://jsonapi.org/format/#fetching-sorting)
 * with a custom raw sort param.
 * The new sort will replace the previous ones.
 *
 * @param sort
 *
 * @category Enhancers
 */
export default function rawSortBy(
  sort?: string | undefined,
) {
  return <C extends ActionContext>(action: Action<C>) => action.use(param('sort', sort));
}
