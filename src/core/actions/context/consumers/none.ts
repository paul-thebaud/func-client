import Action from '@/core/actions/action';
import { ConsumeAdapter } from '@/core/actions/types';

export default function none<R, D>() {
  return async (
    action: Action<ConsumeAdapter<R, D>>,
  ) => {
    await (await action.getContext()).adapter.action(await action.getContext());
  };
}
