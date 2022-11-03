import { ForSchemaContext } from '@/core/action/changers/forSchema';
import type Action from '@/core/action/action';
import { ModelDotRelation, ModelSchemaRaw } from '@/core/model/types';

export default function include<C extends {}, S extends ModelSchemaRaw>(
  ...relations: ModelDotRelation<S>[]
) {
  return (a: Action<ForSchemaContext<C, S>>) => a.merge({
    params: {
      include: relations.join(','),
    },
  });
}
