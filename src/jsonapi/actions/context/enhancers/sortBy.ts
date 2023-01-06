import { Action, ActionContext } from '@/core';
import prevParams from '@/http/actions/context/utilities/prevParams';
import rawSort from '@/jsonapi/actions/context/enhancers/rawSort';
import mergeParamList from '@/jsonapi/actions/context/utilities/mergeParamList';

export default function sortBy(key: string, direction: 'asc' | 'desc' = 'asc') {
  return async <C extends ActionContext>(action: Action<C>) => action.use(rawSort(
    mergeParamList([
      prevParams(await action.context)?.sort,
      `${direction === 'desc' ? '-' : ''}${key}`,
    ]),
  ));
}
