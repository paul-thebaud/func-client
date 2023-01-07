import Action from '@/core/actions/action';
import useCacheContext from '@/core/actions/context/consumers/useCacheContext';
import useContext from '@/core/actions/context/consumers/useContext';
import useIdContext from '@/core/actions/context/consumers/useIdContext';
import useTypeContext from '@/core/actions/context/consumers/useTypeContext';
import { ActionContext, ConsumeCache, ConsumeModel, ContextRunner } from '@/core/actions/types';
import { Model } from '@/core/model/types';
import loaded from '@/core/model/utilities/loaded';
import { Awaitable, isNil } from '@/utilities';

export default function cachedOrUsing<
  C extends ActionContext,
  M extends Model,
  I extends InstanceType<M>,
  ND,
  RD,
>(
  using: (data: { context: C; instance: I; }) => Awaitable<ND>,
  nilRunner: ContextRunner<C, RD>,
) {
  return async (action: Action<C & ConsumeCache & ConsumeModel<M>>) => {
    const cache = await useCacheContext(action);
    const instance = await cache.find(
      await useTypeContext(action),
      await useIdContext(action),
    );
    if (isNil(instance)) {
      return action.run(nilRunner);
    }

    const context = await useContext(action);
    if (context.includes && !loaded(instance, context.includes as never[])) {
      return action.run(nilRunner);
    }

    return using({ context, instance });
  };
}
