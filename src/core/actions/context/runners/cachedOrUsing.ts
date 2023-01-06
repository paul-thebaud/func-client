import Action from '@/core/actions/action';
import { ActionContext, ConsumeCache, ConsumeModel, ContextRunner } from '@/core/actions/types';
import FuncClientError from '@/core/errors/funcClientError';
import { Model } from '@/core/model/types';
import loaded from '@/core/model/utilities/loaded';
import { Awaitable, isNil, isNone } from '@/utilities';

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
    const context = await action.context;
    if (isNone(context.id)) {
      throw new FuncClientError('cannot use cached runner without ID context');
    }

    const instance = await context.cache.find(
      context.model.$config.type,
      context.id,
    );
    if (isNil(instance)) {
      return action.run(nilRunner);
    }

    if (context.includes && !loaded(instance, context.includes as never[])) {
      return action.run(nilRunner);
    }

    return using({ context, instance });
  };
}
