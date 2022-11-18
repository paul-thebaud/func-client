import { SerializesKeysOptions } from '@/json-api/utilities/serializedKey';

export type SerializerOptions = SerializesKeysOptions & {
  keepUnchanged?: boolean;
};
