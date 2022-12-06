import Action from '@/core/actions/action';
import knownData from '@/core/actions/context/runners/knownData';
import { ConsumeAdapter } from '@/core/actions/types';

export default function data<R, D>() {
  return (action: Action<ConsumeAdapter<R, D>>) => action.run(knownData<D>());
}
