import Action from '@/core/action/action';
import { ActionContext } from '@/core/action/types';
import { ModelSchemaRaw } from '@/core/model/types';

export type ForSchemaContext<C, S extends ModelSchemaRaw> = C & { schema: S };

export default function forSchema<C extends ActionContext, S extends ModelSchemaRaw>(
  schema: S,
) {
  return (a: Action<C>) => a.merge({ schema });
}
