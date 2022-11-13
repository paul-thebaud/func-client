import { Hook } from '@/core/hooks/types';
import { Dictionary } from '@/core/utilities/types';

const globalHooks = {} as Dictionary<Hook<any, any>[]>;

export default globalHooks;
