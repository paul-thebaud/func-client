import { ConsumeId, ConsumeModel } from '@/core/actions/types';
import ModelNotFoundError from '@/core/errors/modelNotFoundError';

export default function toModelNotFoundError(
  context: ConsumeModel<any, any> & Partial<ConsumeId>,
): never {
  throw new ModelNotFoundError(context.type, context.id);
}
