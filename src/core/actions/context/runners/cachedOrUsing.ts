import Action from '@/core/actions/action';
import { ActionContext, ConsumeCache, ContextRunner, ConsumeModel } from '@/core/actions/types';
import FuncModelError from '@/core/errors/funcModelError';
import { Model } from '@/core/model/types';
import loaded from '@/core/model/utilities/loaded';
import isNil from '@/core/utilities/isNil';
import isNone from '@/core/utilities/isNone';
import { Awaitable } from '@/core/utilities/types';

export default function cachedOrUsing<C extends ActionContext, M extends Model, ND, DD>(
  transformData: (data: InstanceType<M>, context: C) => Awaitable<ND>,
  nilRunner: ContextRunner<C, DD>,
) {
  return async (
    action: Action<C & ConsumeCache & ConsumeModel<M>>,
  ) => {
    const context = await action.getContext();
    if (isNone(context.id)) {
      throw new FuncModelError('cannot use cached runner without ID context');
    }

    const cachedInstance = await context.cache.find(context.type, context.id);
    if (isNil(cachedInstance)) {
      return action.run(nilRunner);
    }

    if (context.includes && !loaded(cachedInstance, context.includes as never[])) {
      return action.run(nilRunner);
    }

    return transformData(cachedInstance as InstanceType<M>, context);
  };
}
