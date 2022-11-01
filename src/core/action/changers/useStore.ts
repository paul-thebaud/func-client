import { Store } from '@/core/store/types';

export type WithStoreContext<C, S extends Store> = C & {
  store: S;
};

export default function useStore<C, S extends Store>(store: S) {
  return (context: C) => ({
    ...context,
    store,
  });
}
