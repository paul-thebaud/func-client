import { FuncClientError } from '@/core';
import { HttpActionContext } from '@/http/types';

export default function prevParams(context: HttpActionContext) {
  const { params } = context;
  if (typeof params === 'string') {
    throw new FuncClientError('Object and string URL params cannot be merged in action context.');
  }

  return params;
}
