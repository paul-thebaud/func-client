import { WithAdapterResultContext } from '@/core/action/changers/withAdapter';
import Action from '@/core/action/action';
import { ActionContext } from '@/core/action/types';

export default function raw<C extends ActionContext>() {
  return <R>(
    context: Action<WithAdapterResultContext<C, R>>,
  ) => context.context.adapter.action(context.context);
}
