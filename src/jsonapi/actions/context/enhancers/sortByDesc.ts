import { Action, ActionContext } from '@/core';
import sortBy from '@/jsonapi/actions/context/enhancers/sortBy';

/**
 * Shortcut for the {@link sortBy} function with a desc direction.
 *
 * @param key
 *
 * @category Enhancers
 */
export default function sortByDesc(key: string) {
  return <C extends ActionContext>(action: Action<C>) => action.use(sortBy(key, 'desc'));
}
