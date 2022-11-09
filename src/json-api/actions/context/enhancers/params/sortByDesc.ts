import { Action } from '@/core/actions';
import { ActionContext } from '@/core/actions/types';
import sortBy from '@/json-api/actions/context/enhancers/params/sortBy';

export default function sortByDesc(key: string) {
  return <C extends ActionContext>(a: Action<C>) => a.use(sortBy(key, 'desc'));
}
