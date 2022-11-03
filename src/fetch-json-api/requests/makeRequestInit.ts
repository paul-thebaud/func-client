import { ActionContext } from '@/core';

export default function makeRequestInit(context: ActionContext): RequestInit {
  return {
    method: (context?.method || 'GET').toUpperCase(),
    headers: {
      Accept: 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
    },
    body: context.payload !== undefined
      ? JSON.stringify(context.payload)
      : undefined,
  };
}
