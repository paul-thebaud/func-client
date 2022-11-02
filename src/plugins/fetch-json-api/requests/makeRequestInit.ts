import { ActionContext } from '@/core/action/types';

export default function makeRequestInit(context: ActionContext): RequestInit {
  console.log(context);
  return {};
}
