import Action from '@/core/actions/action';
import cachedOr from '@/core/actions/context/runners/cachedOr';
import { ConsumeCache, ConsumeModel } from '@/core/actions/types';
import { Model } from '@/core/model/types';

export default function cached<M extends Model>() {
  return (
    action: Action<ConsumeCache & ConsumeModel<M>>,
  ) => action.run(cachedOr(() => null));
}
