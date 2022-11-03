import Action from '@/core/action/action';
import forSchema from '@/core/action/changers/forSchema';
import { ActionContext } from '@/core/action/types';
import { Model, ModelSchemaRaw } from '@/core/model/types';

export default function forModel<C extends ActionContext, S extends ModelSchemaRaw>(
  model: Model<S>,
) {
  return (a: Action<C>) => a.use(forSchema(model.$schema)).merge({ type: model.$type });
}
