import Action from '@/core/action/action';
import forSchema, { ForSchemaContext } from '@/core/action/changers/forSchema';
import { ActionContext } from '@/core/action/types';
import { Model, ModelSchemaRaw } from '@/core/model/types';

export type ForModelContext<C, S extends ModelSchemaRaw> = ForSchemaContext<C, S> & {
  type: string;
};

export default function forModel<C extends ActionContext, S extends ModelSchemaRaw>(
  model: Model<S>,
) {
  return (a: Action<C>) => a.use(forSchema(model.$schema)).merge({ type: model.$type });
}
