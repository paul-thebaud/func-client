import { Action, allUsing, ConsumeAdapter, ConsumeDeserializer, ConsumeModel, ModelSchemaRaw } from '@/core';
import { JsonApiDocument } from '@/json-api/types';

export default function allMeta<R, D extends JsonApiDocument, S extends ModelSchemaRaw, I>() {
  return async (
    action: Action<ConsumeAdapter<R, D> & ConsumeDeserializer<D> & ConsumeModel<S, I>>,
  ) => action.run(allUsing((data, realData) => ({
    data,
    meta: realData.meta ?? {},
  })));
}
