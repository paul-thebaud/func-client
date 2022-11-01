import { WithAdapterResultContext } from '@/core/action/changers/useAdapter';
import { ActionContext } from '@/core/action/types';

export default function getRaw<C extends ActionContext, R>() {
  return (context: WithAdapterResultContext<C, R>) => context.adapter.action(context);
}
