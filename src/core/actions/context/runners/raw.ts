import Action from '@/core/actions/action';
import { ConsumeAdapter } from '@/core/actions/types';

export default function raw<AD>() {
  return async (
    action: Action<ConsumeAdapter<AD>>,
  ) => (await action.context).adapter.execute(await action.context);
}
