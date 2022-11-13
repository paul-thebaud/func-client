import { ActionContext } from '@/core/actions/types';
import { Hook } from '@/core/hooks/types';
import useContextHooks from '@/core/hooks/useContextHooks';

export default function useHooks<H extends Hook<any, any>>(
  hook: string,
  context?: ActionContext,
): H[] {
  return [
    ...(context ? useContextHooks<H>(hook, context) : []),
  ];
}
