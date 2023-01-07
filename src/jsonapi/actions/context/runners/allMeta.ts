import { Action, ActionContext, allUsing, ConsumeAdapter, ConsumeDeserializer, ConsumeModel, Model } from '@/core';
import { JsonApiDeserializedData } from '@/jsonapi/deserializer/jsonApiDeserializer';

export default function allMeta<
  C extends ActionContext,
  M extends Model,
  AD,
  DD extends JsonApiDeserializedData,
>() {
  return (
    action: Action<C & ConsumeAdapter<AD> & ConsumeDeserializer<AD, DD> & ConsumeModel<M>>,
  ) => action.run(allUsing(({ data }) => ({
    instances: data.instances,
    meta: data.document.meta ?? {},
  })));
}
