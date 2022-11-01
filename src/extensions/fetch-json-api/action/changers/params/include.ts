import { WithSchemaContext } from '@/core/action/changers/forSchema';
import { ModelDotRelation, ModelSchemaRaw } from '@/core/model/types';
import merge from '@/core/utilities/merge';

export default function include<C, S extends ModelSchemaRaw>(
  ...relations: ModelDotRelation<S>[]
) {
  return (context: WithSchemaContext<C, S>) => merge(context, {
    params: {
      include: relations.join(','),
    },
  });
}
