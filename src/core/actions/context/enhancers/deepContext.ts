import Action from '@/core/actions/action';
import { ActionContext } from '@/core/actions/types';
import merge from '@/core/utilities/merge';

export default function deepContext<NC extends Partial<ActionContext>>(
  contextToDeepMerge: NC,
) {
  return <C extends ActionContext>(a: Action<C>) => a.setContext(merge(
    a.context,
    contextToDeepMerge,
  ) as C & NC);
}
