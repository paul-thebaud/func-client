import { Action, ActionContext, ForSchemaContext, ModelDotRelation, ModelSchemaRaw } from '@/core';

export default function include<C extends ActionContext, S extends ModelSchemaRaw>(
  ...relations: ModelDotRelation<S>[]
) {
  return (a: Action<ForSchemaContext<C, S>>) => a.merge({
    params: {
      include: relations.join(','),
    },
  });
}
