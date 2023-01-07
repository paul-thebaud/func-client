import { Action, ActionContext, allUsing, ConsumeAdapter, ConsumeDeserializer, ConsumeModel, Model } from '@/core';
import { JsonApiDeserializedData } from '@/jsonapi/deserializer/jsonApiDeserializer';

/**
 * Run the action and deserialize an array of model's instance.
 * Also returns the JSON:API document meta.
 *
 * @category Runners
 */
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
