import Action from '@/core/actions/action';
import raw from '@/core/actions/context/runners/raw';
import { ConsumeAdapter } from '@/core/actions/types';

export default function none<R, D>() {
  return async (
    action: Action<ConsumeAdapter<R, D>>,
  ) => {
    await action.run(raw());
  };
}
