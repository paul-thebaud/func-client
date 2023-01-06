import { Action, ConsumeAdapter } from '@/core';

export default function rawJson<T = any>() {
  return async (
    action: Action<ConsumeAdapter<Response>>,
  ) => (await (await action.context).adapter.execute(await action.context)).json() as Promise<T>;
}
