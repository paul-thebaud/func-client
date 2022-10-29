import type Model from '@/core/model';
import { Transformer } from '@/core/transformers/transformer';
import { AttributeOptions } from '@/core/types/model';

export default function attr(
  transformer?: Transformer | string,
  options?: Partial<AttributeOptions>,
) {
  return (target: object, key: string) => {
    (target as Model).attr(key, transformer, options);
  };
}
