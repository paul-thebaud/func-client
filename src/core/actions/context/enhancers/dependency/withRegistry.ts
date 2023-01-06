import Action from '@/core/actions/action';
import context from '@/core/actions/context/enhancers/context';
import { ActionContext } from '@/core/actions/types';
import { RegistryI } from '@/core/types';

export default function withRegistry<Registry extends RegistryI>(registry: Registry) {
  return <C extends ActionContext>(action: Action<C>) => action.use(context({ registry }));
}
