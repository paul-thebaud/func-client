/* eslint-disable no-param-reassign */
import { Hookable } from '@/core/hooks/types';
import { Awaitable } from '@/core/utilities/types';

export default async function withoutHooks<T extends Hookable<any>, R>(
  hookable: T,
  callback: (hookable: T) => Awaitable<R>,
) {
  const hooksBackup = hookable.$hooks;

  hookable.$hooks = null;

  try {
    return await callback(hookable);
  } finally {
    hookable.$hooks = hooksBackup;
  }
}
