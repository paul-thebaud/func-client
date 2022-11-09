import AdapterError from '@/core/errors/adapterError';
import { ModelId } from '@/core/model/types';

export default class ModelNotFoundError extends AdapterError {
  public constructor(type: string, id?: ModelId) {
    let message = `Model of type \`${type}\` was not found.`;
    if (id) {
      message = `${message} Supplied ID: \`${id}\``;
    }

    super(message);
  }
}
