import Action from '@/core/actions/action';
import params from '@/core/actions/context/enhancers/requests/params';
import { ActionContext } from '@/core/actions/types';

export default function param(key: string, value: unknown) {
  return <C extends ActionContext>(a: Action<C>) => a.use(params({
    ...a.context.params,
    [key]: value,
  }));
}
