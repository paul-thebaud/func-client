import Action from '@/core/actions/action';
import useAdapterContext from '@/core/actions/context/consumers/useAdapterContext';
import useContext from '@/core/actions/context/consumers/useContext';
import { ConsumeAdapter } from '@/core/actions/types';

export default function raw<AD>() {
  return async (
    action: Action<ConsumeAdapter<AD>>,
  ) => {
    const adapter = await useAdapterContext(action);

    return adapter.execute(await useContext(action));
  };
}
