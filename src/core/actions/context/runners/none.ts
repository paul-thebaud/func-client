import Action from '@/core/actions/action';
import { ConsumeAdapter } from '@/core/actions/types';

export default function none() {
  return async (
    action: Action<ConsumeAdapter>,
  ) => {
    (await action.context).adapter.execute(await action.context);
  };
}
