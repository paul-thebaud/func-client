import Action from '@/core/actions/action';
import context from '@/core/actions/context/enhancers/context';
import { ActionContext } from '@/core/actions/types';
import { ModelSchemaRaw } from '@/core/model/types';

export default function forSchema<S extends ModelSchemaRaw>(schema: S) {
  return <C extends ActionContext>(a: Action<C>) => a.use(context({ schema }));
}
