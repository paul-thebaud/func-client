import Action from '@/core/actions/action';
import context from '@/core/actions/context/enhancers/context';
import forSchema from '@/core/actions/context/enhancers/forSchema';
import { ActionContext } from '@/core/actions/types';
import { ModelClass, ModelSchemaRaw } from '@/core/model/types';
import { Constructor } from '@/core/utilities/types';

export default function forModel<S extends ModelSchemaRaw, I>(
  model: ModelClass<S> & Constructor<I>,
) {
  return <C extends ActionContext>(a: Action<C>) => a
    .use(forSchema(model.$schema as S))
    .use(context({
      model,
      baseURL: model.$config.baseURL,
      type: model.$config.type,
    }));
}
