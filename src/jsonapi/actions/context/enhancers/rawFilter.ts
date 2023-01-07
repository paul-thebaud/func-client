import { Action, ActionContext } from '@/core';
import { param } from '@/http';

/**
 * Set a raw filter param in context.
 *
 * @param filter
 *
 * @category Enhancers
 */
export default function rawFilter(
  filter: unknown,
) {
  return <C extends ActionContext>(action: Action<C>) => action.use(param('filter', filter));
}
