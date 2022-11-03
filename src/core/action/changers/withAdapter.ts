import Action from '@/core/action/action';
import { ActionContext, Adapter } from '@/core/action/types';

export type WithAdapterResultContext<C, R> = C & {
  adapter: Adapter<R>;
};

export default function withAdapter<C extends ActionContext, R, A extends Adapter<R>>(adapter: A) {
  return (a: Action<C>) => a.merge({ adapter });
}
