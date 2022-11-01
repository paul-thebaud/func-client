import { ModelSchemaRaw } from '@/core/model/types';

export type WithSchemaContext<C, S extends ModelSchemaRaw> = C & { schema: S };

export default function forSchema<C, S extends ModelSchemaRaw>(schema: S) {
  return (context: C) => ({
    ...context,
    schema,
  });
}
