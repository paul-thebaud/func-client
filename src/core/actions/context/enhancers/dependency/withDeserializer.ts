import Action from '@/core/actions/action';
import context from '@/core/actions/context/enhancers/context';
import { ActionContext } from '@/core/actions/types';
import { DeserializedData, NewDeserializerI } from '@/core/types';

export default function withDeserializer<
  AdapterData,
  Data extends DeserializedData,
  Deserializer extends NewDeserializerI<AdapterData, Data>,
>(deserializer: Deserializer) {
  return <C extends ActionContext>(action: Action<C>) => action.use(context({ deserializer }));
}
