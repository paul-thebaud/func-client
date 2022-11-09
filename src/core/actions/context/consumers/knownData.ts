import Action from '@/core/actions/action';
import raw from '@/core/actions/context/consumers/raw';
import { ConsumeAdapter } from '@/core/actions/types';

export default function knownData<ND = any, R = unknown, D = unknown>() {
  return async (action: Action<ConsumeAdapter<R, D>>) => action.context.adapter.data(
    await action.run(raw()),
  ) as unknown as Promise<ND>;
}
