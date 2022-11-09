import context from '@/core/actions/context/enhancers/context';
import Action from '@/core/actions/action';
import forSchema from '@/core/actions/context/enhancers/forSchema';
import { ActionContext } from '@/core/actions/types';
import { ModelClass, ModelSchemaRaw } from '@/core/model/types';
import { Constructor } from '@/core/utilities/types';

export default function forModel<S extends ModelSchemaRaw, I>(
  model: ModelClass<S> & Constructor<I>,
) {
  return <C extends ActionContext>(a: Action<C>) => a
    .use(forSchema(model.$schema as S))
    .use(context({ model, type: model.$type }));
}
