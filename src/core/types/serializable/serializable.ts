import type { SerializableArray } from '@/core/types/serializable/serializableArray';
import type { SerializableObject } from '@/core/types/serializable/serializableObject';
import { SerializablePrimitive } from '@/core/types/serializable/serializablePrimitive';

export type Serializable = SerializableArray | SerializableObject | SerializablePrimitive;
