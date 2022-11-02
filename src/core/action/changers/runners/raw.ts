import { WithAdapterResultContext } from '@/core/action/changers/useAdapter';
import { ActionContext } from '@/core/action/types';

export default function raw<C extends ActionContext, NC extends ActionContext>(
  changer?: (c: C) => NC,
) {
  return <R>(context: WithAdapterResultContext<C, R>) => context.adapter.action(
    changer ? changer(context) : context,
  );
}
