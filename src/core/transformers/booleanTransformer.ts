import { BidirectionalTransformer } from '@/core/transformers/transformer';
import { Serializable } from '@/core/types/serializable/serializable';
import { Optional } from '@/core/types/utilities/optional';
import isNone from '@/core/utilities/isNone';

const DEFAULT_TRUE_VALUES = [true, 1, '1', 'true', 'yes'];

export default class BooleanTransformer implements BidirectionalTransformer {
  public readonly id = 'boolean';

  private readonly trueValues: unknown[];

  public constructor(trueValues: unknown[] = DEFAULT_TRUE_VALUES) {
    this.trueValues = trueValues;
  }

  public transform(value: Optional<Serializable>): Optional<boolean> {
    if (!isNone(value)) {
      return this.trueValues.indexOf(value) !== -1;
    }

    return null;
  }
}
