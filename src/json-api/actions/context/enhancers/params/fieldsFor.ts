import { ActionContext, deepContext, ModelClass, ModelSchemaRaw, ModelValues } from '@/core';
import { Action } from '@/core/actions';
import mergeParamList from '@/json-api/utilities/mergeParamList';

export default function fieldsFor<S extends ModelSchemaRaw>(
  model: ModelClass<S>,
  ...fieldset: (keyof ModelValues<S>)[]
) {
  return <C extends ActionContext>(a: Action<C>) => a.use(deepContext({
    params: {
      fields: {
        [model.$type]: mergeParamList(a.context.params?.fields?.[model.$type], ...fieldset),
      },
    },
  }));
}
