import runHook from '@/core/hooks/runHook';
import { ModelHooksDefinition, ModelInstance } from '@/core/model/types';
import sequentialTransform from '@/core/utilities/sequentialTransform';
import { Arrayable } from '@/core/utilities/types';
import wrap from '@/core/utilities/wrap';

export default function runInstanceHooks(
  instance: ModelInstance<any>,
  hooks: Arrayable<keyof ModelHooksDefinition>,
) {
  return async () => {
    await sequentialTransform(wrap(hooks).map(
      (hook) => () => runHook(instance.constructor, hook, instance),
    ));
  };
}
