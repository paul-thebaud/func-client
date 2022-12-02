import { ActionContext } from '@/core/actions/types';
import optionalJoin from '@/core/utilities/optionalJoin';

export default function makeParams(context: ActionContext) {
  const include = optionalJoin(context.includes ?? [], ',');
  if (!include) {
    return context.params;
  }

  if (typeof context.params === 'string') {
    return `${context.params}&include=${include}`;
  }

  return {
    ...context.params,
    include,
  };
}
