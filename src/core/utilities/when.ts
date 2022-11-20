import { OnlyFalsy, OnlyTruthy, Value } from '@/core/utilities/types';
import value from '@/core/utilities/value';

export default function when<E>(
  expression: E,
  truthyCallback: (value: OnlyTruthy<Value<E>>) => void,
  falsyCallback?: (value: OnlyFalsy<Value<E>>) => void,
) {
  const exprValue = value(expression);
  if (exprValue) {
    truthyCallback(exprValue as OnlyTruthy<Value<E>>);
  } else if (falsyCallback) {
    falsyCallback(exprValue as OnlyFalsy<Value<E>>);
  }
}
