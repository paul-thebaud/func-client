import Action from '@/core/actions/action';
import { ConsumeAdapter } from '@/core/actions/types';

export default function raw<R, D>() {
  return (
    action: Action<ConsumeAdapter<R, D>>,
  ) => action.context.adapter.action(action.context);
}
