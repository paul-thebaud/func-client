import Action from '@/core/actions/action';
import forSchema from '@/core/actions/context/changers/forSchema';
import { ActionContext } from '@/core/actions/types';
import { ModelClass, ModelSchemaRaw } from '@/core/model/types';
import { Constructor } from '@/core/utilities/types';

export default function forModel<C extends ActionContext, S extends ModelSchemaRaw, I>(
  model: ModelClass<S> & Constructor<I>,
) {
  return (a: Action<C>) => a.use(forSchema(model.$schema as S)).merge({
    model,
    type: model.$type,
  });
}
