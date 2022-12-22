import { ObjectTransform } from '@/core/transforms/types';

function dateFromUnix(unix: number): Date {
  const date = new Date();

  date.setTime(unix);

  return date;
}

export default function toDate(): ObjectTransform<Date | undefined, unknown> {
  return {
    serialize(value: Date | undefined) {
      return value?.toISOString();
    },
    deserialize(value: string | undefined) {
      if (typeof value === 'string') {
        return dateFromUnix(Date.parse(value));
      }

      return undefined;
    },
  };
}
