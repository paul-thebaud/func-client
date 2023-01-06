import Action from '@/core/actions/action';
import context from '@/core/actions/context/enhancers/context';
import { ActionContext } from '@/core/actions/types';
import { DeserializedData, DeserializerI } from '@/core/types';

export default function withDeserializer<
  AdapterData,
  Data extends DeserializedData,
  Deserializer extends DeserializerI<AdapterData, Data>,
>(deserializer: Deserializer) {
  return <C extends ActionContext>(action: Action<C>) => action.use(context({ deserializer }));
}
