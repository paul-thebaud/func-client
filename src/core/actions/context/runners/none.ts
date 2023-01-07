import Action from '@/core/actions/action';
import useAdapterContext from '@/core/actions/context/consumers/useAdapterContext';
import useContext from '@/core/actions/context/consumers/useContext';
import { ConsumeAdapter } from '@/core/actions/types';

export default function none() {
  return async (
    action: Action<ConsumeAdapter>,
  ) => {
    const adapter = await useAdapterContext(action);

    await adapter.execute(await useContext(action));
  };
}
