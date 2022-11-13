import { Action, ActionContext, context } from '@/core';
import mergeParamList from '@/json-api/utilities/mergeParamList';

export default function sortBy(key: string, direction: 'asc' | 'desc' = 'asc') {
  return <C extends ActionContext>(a: Action<C>) => a.use(context({
    params: {
      ...a.context.params,
      sort: mergeParamList(a.context.params?.sort, `${direction === 'desc' ? '-' : ''}${key}`),
    },
  }));
}
