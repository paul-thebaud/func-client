import Action from '@/core/actions/action';
import { ActionContext } from '@/core/actions/types';
import { OnlyFalsy, OnlyTruthy, Value } from '@/core/utilities/types';
import value from '@/core/utilities/value';

export default function when<C extends ActionContext, E, TR, FR = void>(
  expression: E,
  truthyCallback: (action: Action<C>, value: OnlyTruthy<Value<E>>) => TR,
  falsyCallback?: (action: Action<C>, value: OnlyFalsy<Value<E>>) => FR,
): (action: Action<C>) => TR | FR {
  return (action: Action<C>) => {
    const exprValue = value(expression);
    if (exprValue) {
      return truthyCallback(action, exprValue as OnlyTruthy<Value<E>>);
    }

    if (falsyCallback !== undefined) {
      return falsyCallback(action, exprValue as OnlyFalsy<Value<E>>);
    }

    return undefined as any;
  };
}
