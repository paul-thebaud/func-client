import Action from '@/core/actions/action';
import data from '@/core/actions/context/runners/data';
import { ActionContext, ConsumeAdapter } from '@/core/actions/types';

export default function dataUsing<C extends ActionContext, R, D, ND>(
  transformData: (context: C, data: D) => Promise<ND>,
) {
  return async (
    action: Action<C & ConsumeAdapter<R, D>>,
  ) => transformData(
    await action.getContext(),
    await action.run(data()),
  );
}
