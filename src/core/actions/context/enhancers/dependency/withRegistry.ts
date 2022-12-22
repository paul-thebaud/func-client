import Action from '@/core/actions/action';
import context from '@/core/actions/context/enhancers/context';
import { ActionContext } from '@/core/actions/types';
import { RegistryI } from '@/core/types';

export default function withRegistry<S extends RegistryI>(registry: S) {
  return <C extends ActionContext>(a: Action<C>) => a.use(context({ registry }));
}
