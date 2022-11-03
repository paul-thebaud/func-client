import Action from '@/core/action/action';
import { ActionContext } from '@/core/action/types';
import { Dictionary } from '@/core/utilities/types';

export default function withOptions<C extends ActionContext>(options: Dictionary) {
  return (a: Action<C>) => a.merge({ options });
}
