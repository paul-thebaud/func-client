import Action from '@/core/actions/action';
import { ConsumeInstance } from '@/core/actions/types';

export default function changeExistence(
  willExists: boolean,
) {
  return <C extends ConsumeInstance<any, any>>(
    action: Action<C>,
  ) => action.hook('onSuccess', (event) => {
    // eslint-disable-next-line no-param-reassign
    event.context.instance.exists = willExists;
  });
}
