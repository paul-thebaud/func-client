import { ActionContext } from '@/core/actions/types';
import { Hook } from '@/core/hooks/types';

export default function useContextHooks<H extends Hook<any, any>>(
  hook: string,
  context: ActionContext,
): H[] {
  return ((context.hooks ?? {})[hook] ?? []) as H[];
}
