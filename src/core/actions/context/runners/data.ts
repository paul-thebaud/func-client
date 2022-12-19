import Action from '@/core/actions/action';
import knownData from '@/core/actions/context/runners/knownData';
import { ConsumeAdapter } from '@/core/actions/types';

export default function data<R, RD>() {
  return (action: Action<ConsumeAdapter<R, RD>>) => action.run(knownData<RD>());
}
