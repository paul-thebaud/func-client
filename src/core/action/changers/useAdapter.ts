import { Adapter } from '@/core/action/types';

export type WithAdapterResultContext<C, R> = C & {
  adapter: Adapter<R>;
};

export default function useAdapter<C, R, A extends Adapter<R>>(adapter: A) {
  return (context: C) => ({
    ...context,
    adapter,
  });
}
