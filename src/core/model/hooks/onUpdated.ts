import registerHook from '@/core/hooks/registerHook';
import { Model, ModelDefinition, ModelInstance } from '@/core/model/types';
import { Awaitable } from '@/core/utilities/types';

export default function onUpdated<S extends ModelDefinition, I extends ModelInstance<S>>(
  model: Model<S, I>,
  callback: (instance: I) => Awaitable<void>,
) {
  return registerHook(model, 'updated', callback);
}
