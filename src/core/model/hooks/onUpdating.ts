import registerHook from '@/core/hooks/registerHook';
import { Model, ModelInstance } from '@/core/model/types';
import { Awaitable } from '@/core/utilities/types';

export default function onUpdating<I extends ModelInstance>(
  model: Model<any, I>,
  callback: (instance: I) => Awaitable<void>,
) {
  return registerHook(model, 'updating', callback);
}
