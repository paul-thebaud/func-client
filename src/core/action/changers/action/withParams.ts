import Action from '@/core/action/action';
import { ActionContext } from '@/core/action/types';
import { Dictionary } from '@/core/utilities/types';

export default function withParams<C extends ActionContext>(params: Dictionary) {
  return (a: Action<C>) => a.merge({ params });
}
