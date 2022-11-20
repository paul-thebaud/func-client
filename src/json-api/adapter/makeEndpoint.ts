import { ActionContext } from '@/core';
import isNil from '@/core/utilities/isNil';
import optionalJoin from '@/core/utilities/optionalJoin';
import { AdapterOptions } from '@/json-api/adapter/types';

export default function makeEndpoint<R>(
  context: ActionContext,
  options: AdapterOptions<R>,
) {
  const transformType = options?.transformTypeInPath ?? ((t: string) => t);
  const transformRelation = options?.transformRelationInPath ?? ((r: string) => r);

  return optionalJoin([
    isNil(context.baseURL) ? options.baseURL : context.baseURL,
    isNil(context.type) ? undefined : transformType(context.type),
    isNil(context.id) ? undefined : `${context.id}`,
    isNil(context.relation) ? undefined : transformRelation(context.relation),
    context.path,
  ], '/');
}
