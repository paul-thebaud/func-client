import runHook from '@/core/hooks/runHook';
import { ModelHooksDefinition, ModelInstance } from '@/core/model/types';
import { ArrayableVariadic, sequentialTransform, wrapVariadic } from '@/utilities';

export default function runInstanceHooks(
  instance: ModelInstance,
  ...hooks: ArrayableVariadic<keyof ModelHooksDefinition>
) {
  return async () => {
    await sequentialTransform(wrapVariadic(...hooks).map(
      (hook) => () => runHook(instance.$model, hook, instance),
    ));
  };
}
