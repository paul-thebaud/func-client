import { Action, deepContext } from '@/core/actions';
import { ActionContext } from '@/core/actions/types';
import mergeParamList from '@/json-api/utilities/mergeParamList';

export default function sortBy(key: string, direction: 'asc' | 'desc' = 'asc') {
  return <C extends ActionContext>(a: Action<C>) => a.use(deepContext({
    params: {
      ...a.context.params,
      sort: mergeParamList(a.context.params?.sort, `${direction === 'desc' ? '-' : ''}${key}`),
    },
  }));
}
