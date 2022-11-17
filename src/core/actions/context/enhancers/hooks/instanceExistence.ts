import Action from '@/core/actions/action';
import { ConsumeInstance } from '@/core/actions/types';
import { ModelSchemaRaw } from '@/core/model/types';

export default function instanceExistence<S extends ModelSchemaRaw, I>(
  willExists: boolean,
) {
  return (action: Action<ConsumeInstance<S, I>>) => action.hook('onSuccess', (event) => {
    // eslint-disable-next-line no-param-reassign
    event.context.instance.$exists = willExists;

    // TODO Model hooks?
  });
}
