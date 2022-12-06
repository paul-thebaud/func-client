import Action from '@/core/actions/action';
import { ActionContext, ConsumeCache, ConsumeId, ConsumeModel, ContextRunner } from '@/core/actions/types';
import { ModelDefinition } from '@/core/model/types';
import loaded from '@/core/model/utilities/loaded';
import isNil from '@/core/utilities/isNil';
import { Awaitable } from '@/core/utilities/types';

export default function cachedOrUsing<C extends ActionContext,
  S extends ModelDefinition, I, ND, DD>(
  transformData: (data: I, context: C) => Awaitable<ND>,
  nilRunner: ContextRunner<C, DD>,
) {
  return async (
    action: Action<C & ConsumeCache & ConsumeId & ConsumeModel<S, I>>,
  ) => {
    const context = await action.getContext();
    const cachedInstance = await context.cache.find(context.type, context.id);
    if (isNil(cachedInstance)) {
      return action.run(nilRunner);
    }

    if (context.includes && !loaded(cachedInstance, context.includes as never[])) {
      return action.run(nilRunner);
    }

    return transformData(cachedInstance as I, context);
  };
}