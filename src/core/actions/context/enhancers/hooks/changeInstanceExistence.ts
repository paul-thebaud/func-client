import Action from '@/core/actions/action';
import onSuccess from '@/core/actions/context/enhancers/hooks/onSuccess';
import { ConsumeInstance } from '@/core/actions/types';

export default function changeInstanceExistence(
  willExists: boolean,
) {
  return <C extends ConsumeInstance<any, any>>(action: Action<C>) => action.use(
    onSuccess(({ context }) => {
      context.instance.exists = willExists;
    }),
  );
}
