import Action from '@/core/actions/action';
import context from '@/core/actions/context/enhancers/context';
import forSchema from '@/core/actions/context/enhancers/forSchema';
import { ActionContext } from '@/core/actions/types';
import { ModelClass, ModelDefinition } from '@/core/model/types';
import { Constructor } from '@/core/utilities/types';

export default function model<S extends ModelDefinition, I>(
  modelToUse: ModelClass<S> & Constructor<I>,
) {
  return <C extends ActionContext>(a: Action<C>) => a
    .use(forSchema(modelToUse.$schema as S))
    .use(context({
      model: modelToUse,
      baseURL: modelToUse.$config.baseURL,
      type: modelToUse.$config.type,
    }));
}
