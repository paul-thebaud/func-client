import Action from '@/core/actions/action';
import context from '@/core/actions/context/enhancers/context';
import { ActionContext } from '@/core/actions/types';
import { ModelDefinition } from '@/core/model/types';

export default function forSchema<S extends ModelDefinition>(schema: S) {
  return <C extends ActionContext>(a: Action<C>) => a.use(context({ schema }));
}
