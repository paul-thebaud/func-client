import { Action, allUsing, ConsumeAdapter, ConsumeDeserializer, Model, ConsumeModel } from '@/core';
import { JsonApiDocument } from '@/json-api/types';

export default function allMeta<R, D extends JsonApiDocument, M extends Model>() {
  return (
    action: Action<ConsumeAdapter<R, D> & ConsumeDeserializer<D> & ConsumeModel<M>>,
  ) => action.run(allUsing((data, realData) => ({
    data,
    meta: realData.meta ?? {},
  })));
}
