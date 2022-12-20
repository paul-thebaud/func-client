import { ModelInstance } from '@/core/model/types';

export default function makeComposable<D extends object = {}>(
  extendsFrom?: D & ThisType<ModelInstance<D>>,
) {
  return extendsFrom;
}
