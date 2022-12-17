import Action from '@/core/actions/action';
import onSuccess from '@/core/actions/context/enhancers/hooks/onSuccess';
import { ConsumeInstance } from '@/core/actions/types';
import { ModelInstance } from '@/core/model/types';

export default function changeInstanceExistence(
  willExists: boolean,
) {
  return <I extends ModelInstance, C extends ConsumeInstance<I>>(
    action: Action<C>,
  ) => action.use(
    onSuccess(({ context }) => {
      context.instance.exists = willExists;
    }),
  );
}
