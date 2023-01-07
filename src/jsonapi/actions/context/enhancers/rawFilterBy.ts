import { Action, ActionContext } from '@/core';
import { param } from '@/http';

/**
 * [Filter the JSON:API resource](https://jsonapi.org/format/#fetching-filtering)
 * with a custom raw filter param.
 * The new filter will replace the previous ones.
 *
 * @param filter
 *
 * @category Enhancers
 */
export default function rawFilterBy(
  filter?: unknown,
) {
  return <C extends ActionContext>(action: Action<C>) => action.use(param('filter', filter));
}
