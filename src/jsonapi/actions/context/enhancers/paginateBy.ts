import { Action, ActionContext } from '@/core';
import { param } from '@/http';

/**
 * [Paginate the JSON:API resource](https://jsonapi.org/format/#fetching-pagination)
 * by the given params.
 * JSON:API specification on pagination is agnostic, so page params may be
 * anything used by your implementation.
 *
 * @param page
 *
 * @category Enhancers
 */
export default function paginateBy(page: unknown) {
  return <C extends ActionContext>(action: Action<C>) => action.use(param('page', page));
}
