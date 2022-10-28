import { BidirectionalTransformer } from '@/core/transformers/transformer';
import { Serializable } from '@/core/types/serializable/serializable';
import { Optional } from '@/core/types/utilities/optional';
import isNone from '@/core/utilities/isNone';

export default class StringTransformer implements BidirectionalTransformer {
  public readonly id = 'string';

  public transform(value: Serializable): Optional<string> {
    return isNone(value) ? value : String(value);
  }
}
