import { ModelAttribute, ModelRelation, ModelSchema } from '@/core/model/types';

export default function mapSchema<S extends ModelSchema<{}>, R>(
  schema: S,
  callback: (def: ModelAttribute<any, any> | ModelRelation<any, any>, key: string) => R,
): R[] {
  return Object.entries(schema).map(([key, def]) => callback(def, key));
}
