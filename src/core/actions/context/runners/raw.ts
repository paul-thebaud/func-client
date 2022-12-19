import Action from '@/core/actions/action';
import { ConsumeAdapter } from '@/core/actions/types';

export default function raw<R, RD>() {
  return async (
    action: Action<ConsumeAdapter<R, RD>>,
  ) => (await action.getContext()).adapter.action(await action.getContext());
}
