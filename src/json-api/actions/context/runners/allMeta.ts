import { Action, allUsing, ConsumeAdapter, ConsumeDeserializer, ConsumeModel, ModelDefinition } from '@/core';
import { JsonApiDocument } from '@/json-api/types';

export default function allMeta<R, D extends JsonApiDocument, S extends ModelDefinition, I>() {
  return (
    action: Action<ConsumeAdapter<R, D> & ConsumeDeserializer<D> & ConsumeModel<S, I>>,
  ) => action.run(allUsing((data, realData) => ({
    data,
    meta: realData.meta ?? {},
  })));
}
