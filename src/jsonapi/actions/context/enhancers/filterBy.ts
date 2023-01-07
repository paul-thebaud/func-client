import { Action, ActionContext } from '@/core';
import { param } from '@/http';
import prevParams from '@/http/actions/context/utilities/prevParams';

/**
 * [Filter the JSON:API resource](https://jsonapi.org/format/#fetching-filtering)
 * by the given key and value.
 * The new filter will be merged with the previous ones.
 *
 * @param key
 * @param value
 *
 * @category Enhancers
 */
export default function filterBy(key: string, value: unknown) {
  return async <C extends ActionContext>(action: Action<C>) => action.use(param('filter', {
    ...prevParams(await action.context)?.filter,
    [key]: value,
  }));
}
