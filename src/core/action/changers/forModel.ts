import forSchema, { WithSchemaContext } from '@/core/action/changers/forSchema';
import { Model, ModelSchemaRaw } from '@/core/model/types';

export type WithModelContext<C, S extends ModelSchemaRaw> =
  WithSchemaContext<C, S> & { type: string };

export default function forModel<C, S extends ModelSchemaRaw>(model: Model<S>) {
  return (context: C) => ({
    ...forSchema<C, S>(model.$schema as S)(context),
    type: model.$type,
  });
}
