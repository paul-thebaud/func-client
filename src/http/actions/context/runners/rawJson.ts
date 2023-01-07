import { Action, ConsumeAdapter } from '@/core';
import useAdapterContext from '@/core/actions/context/consumers/useAdapterContext';
import useContext from '@/core/actions/context/consumers/useContext';

export default function rawJson<T = any>() {
  return async (
    action: Action<ConsumeAdapter<Response>>,
  ) => {
    const adapter = await useAdapterContext(action);
    const response = await adapter.execute(await useContext(action));

    return response.json() as Promise<T>;
  };
}
