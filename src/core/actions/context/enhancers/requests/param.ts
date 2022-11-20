import Action from '@/core/actions/action';
import params from '@/core/actions/context/enhancers/requests/params';
import previousParams from '@/core/actions/context/utilities/previousParams';
import { ActionContext } from '@/core/actions/types';

export default function param(key: string, value: unknown) {
  return async <C extends ActionContext>(a: Action<C>) => a.use(params({
    ...previousParams(await a.getContext()),
    [key]: value,
  }));
}
