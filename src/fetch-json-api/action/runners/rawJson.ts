import { Action, ActionContext, raw, WithAdapterContext } from '@/core';

export default function rawJson<C extends ActionContext>() {
  return async (a: Action<WithAdapterContext<C, Response>>) => {
    const response = await a.run(raw());

    return response.json();
  };
}
