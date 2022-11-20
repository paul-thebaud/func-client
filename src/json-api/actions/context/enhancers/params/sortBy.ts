import { Action, ActionContext, param } from '@/core';
import previousParams from '@/core/actions/context/utilities/previousParams';
import mergeParamList from '@/json-api/utilities/mergeParamList';

export default function sortBy(key: string, direction: 'asc' | 'desc' = 'asc') {
  return async <C extends ActionContext>(a: Action<C>) => a.use(param(
    'sort',
    mergeParamList([
      previousParams(await a.getContext())?.sort,
      `${direction === 'desc' ? '-' : ''}${key}`,
    ]),
  ));
}
