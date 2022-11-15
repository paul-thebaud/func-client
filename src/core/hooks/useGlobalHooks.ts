import globalHooks from '@/core/hooks/globalHooks';
import { Hook } from '@/core/hooks/types';

export default function useGlobalHooks<H extends Hook<any, any>>(
  hookName: string,
): H[] {
  return (globalHooks[hookName] ?? []) as H[];
}
