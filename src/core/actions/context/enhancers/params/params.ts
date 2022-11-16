import Action from '@/core/actions/action';
import context from '@/core/actions/context/enhancers/context';
import { ActionContext } from '@/core/actions/types';
import { Dictionary } from '@/core/utilities/types';

export default function params(values: Dictionary) {
  return <C extends ActionContext>(a: Action<C>) => a.use(context({ params: values }));
}
