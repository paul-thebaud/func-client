import merge from '@/core/utilities/merge';
import { Dictionary } from '@/core/utilities/types';

export default function filter<C extends Dictionary>(
  clause: unknown,
) {
  return (context: C) => merge(context, {
    params: {
      filter: clause,
    },
  });
}
