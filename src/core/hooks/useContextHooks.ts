import { ActionContext } from '@/core/actions/types';
import { Hook } from '@/core/hooks/types';

export default function useContextHooks<H extends Hook<any, any>>(
  hookName: string,
  context: ActionContext,
): H[] {
  return ((context.hooks ?? {})[hookName] ?? []) as H[];
}
