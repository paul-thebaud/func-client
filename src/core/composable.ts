import { MixableModel } from '@/core/types/model';
import { Constructor } from '@/core/types/utilities/constructor';

export default function composable<M extends MixableModel, E>(
  composer: (ModelClass: M) => E,
): <R extends M>(ModelClass: R) => E & Constructor<E> & R {
  return (ModelClass: M) => (composer(ModelClass)) as any;
}
