import Action from '@/core/actions/action';
import data from '@/core/actions/context/runners/data';
import { ActionContext, ConsumeAdapter } from '@/core/actions/types';

export default function dataUsing<C extends ActionContext, R, RD, ND>(
  transformData: (context: C, data: RD) => Promise<ND>,
) {
  return async (
    action: Action<C & ConsumeAdapter<R, RD>>,
  ) => transformData(
    await action.getContext(),
    await action.run(data()),
  );
}
