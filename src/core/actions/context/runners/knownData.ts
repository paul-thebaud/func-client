import Action from '@/core/actions/action';
import raw from '@/core/actions/context/runners/raw';
import { ConsumeAdapter } from '@/core/actions/types';

export default function knownData<ND = any, R = unknown, RD = unknown>() {
  return async (action: Action<ConsumeAdapter<R, RD>>) => (await action.getContext()).adapter.data(
    await action.run(raw()),
  ) as unknown as Promise<ND>;
}
