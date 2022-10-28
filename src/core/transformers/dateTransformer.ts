import { ClassicTransformer } from '@/core/transformers/transformer';
import { Serializable } from '@/core/types/serializable/serializable';
import { Optional } from '@/core/types/utilities/optional';
import isNone from '@/core/utilities/isNone';

export default class DateTransformer implements ClassicTransformer {
  public readonly id = 'date';

  transformFromRaw(value: Serializable): Optional<Date> {
    if (isNone(value)) {
      return null;
    }

    if (typeof value === 'number') {
      return this.makeDateFromUnix(value);
    }

    if (typeof value === 'string') {
      return this.makeDateFromUnix(Date.parse(value));
    }

    // TODO Warn about cast value.

    return null;
  }

  transformToRaw(value: Optional<Date>): Serializable {
    if (value instanceof Date) {
      return value.toISOString();
    }

    return null;
  }

  private makeDateFromUnix(unix: number): Date {
    const date = new Date();

    date.setTime(unix);

    return date;
  }
}
