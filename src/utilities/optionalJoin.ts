import { Optional } from '@/utilities/types';

export default function optionalJoin(
  strings: Optional<string>[],
  separator: string,
) {
  return strings
    .filter((s) => typeof s === 'string')
    .join(separator);
}
