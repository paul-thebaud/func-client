import type { Serializable } from '@/core/types/serializable/serializable';

export type SerializableObject = {
  [k: string]: Serializable;
};
