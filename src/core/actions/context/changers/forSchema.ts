import Action from '@/core/actions/action';
import { ActionContext } from '@/core/actions/types';
import { ModelSchemaRaw } from '@/core/model/types';

export default function forSchema<C extends ActionContext, S extends ModelSchemaRaw>(schema: S) {
  return (a: Action<C>) => a.merge({ schema });
}
