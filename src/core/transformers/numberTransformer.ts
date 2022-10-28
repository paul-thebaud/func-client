import { BidirectionalTransformer } from '@/core/transformers/transformer';
import { Serializable } from '@/core/types/serializable/serializable';
import { Optional } from '@/core/types/utilities/optional';
import isNone from '@/core/utilities/isNone';

export default class NumberTransformer implements BidirectionalTransformer {
  public readonly id = 'number';

  public transform(
    value: Optional<Serializable>,
  ): Optional<number> {
    if (!isNone(value)) {
      return Number(value);
    }

    return null;
  }
}
