import { Action, ActionContext, param } from '@/core';
import mergeParamList from '@/json-api/utilities/mergeParamList';

export default function sortBy(key: string, direction: 'asc' | 'desc' = 'asc') {
  return <C extends ActionContext>(a: Action<C>) => a.use(param(
    'sort',
    mergeParamList(a.context.params?.sort, `${direction === 'desc' ? '-' : ''}${key}`),
  ));
}
