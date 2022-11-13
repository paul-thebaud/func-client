import globalHooks from '@/core/hooks/globalHooks';
import { Hook } from '@/core/hooks/types';

export default function useGlobalHooks<H extends Hook<any, any>>(
  hook: string,
): H[] {
  return (globalHooks[hook] ?? []) as H[];
}
