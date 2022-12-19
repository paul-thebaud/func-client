import { Action, allUsing, ConsumeAdapter, ConsumeDeserializer, Model, ConsumeModel } from '@/core';
import { JsonApiDocument } from '@/json-api/types';

export default function allMeta<R, RD extends JsonApiDocument, M extends Model>() {
  return (
    action: Action<ConsumeAdapter<R, RD> & ConsumeDeserializer<RD> & ConsumeModel<M>>,
  ) => action.run(allUsing((data, realData) => ({
    data,
    meta: realData.meta ?? {},
  })));
}
