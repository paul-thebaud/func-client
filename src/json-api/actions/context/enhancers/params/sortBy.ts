import { Action, deepContext } from '@/core/actions';
import { ActionContext } from '@/core/actions/types';
import cleanParamList from '@/json-api/utilities/cleanParamList';

export default function sortBy(key: string, direction: 'asc' | 'desc' = 'asc') {
  return <C extends ActionContext>(a: Action<C>) => a.use(deepContext({
    params: {
      ...a.context.params,
      sort: cleanParamList(a.context.params?.sort, `${direction === 'desc' ? '-' : ''}${key}`),
    },
  }));
}
