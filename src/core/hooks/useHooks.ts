import { ActionContext } from '@/core/actions/types';
import { Hook } from '@/core/hooks/types';
import useContextHooks from '@/core/hooks/useContextHooks';
import useGlobalHooks from '@/core/hooks/useGlobalHooks';

export default function useHooks<H extends Hook<any, any>>(
  hook: string,
  context?: ActionContext,
): H[] {
  return [
    ...useGlobalHooks<H>(hook),
    ...(context ? useContextHooks<H>(hook, context) : []),
  ];
}
