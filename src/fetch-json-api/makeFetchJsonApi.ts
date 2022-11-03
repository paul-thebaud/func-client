import type { WithStoreContext } from '@/core/action/changers/withStore';
import type { ActionContext } from '@/core/action/types';
import type { ModelInstance } from '@/core/model/types';
import type { Store } from '@/core/store/types';
import makeRequestInit from '@/fetch-json-api/requests/makeRequestInit';
import makeURL from '@/fetch-json-api/requests/makeURL';
import deserializeMany from '@/fetch-json-api/serialization/deserializeMany';
import deserializeOne from '@/fetch-json-api/serialization/deserializeOne';
import makeIncludedMap from '@/fetch-json-api/serialization/makeIncludedMap';
import serializeOne from '@/fetch-json-api/serialization/serializeOne';
import { FetchJsonApiFactoryOptions } from '@/fetch-json-api/types';

export default function makeFetchJsonApi(
  options: FetchJsonApiFactoryOptions = {},
) {
  const baseURL = options.baseURL || '/api';
  const fetch = options.fetch || window.fetch;

  return {
    async action(context: ActionContext) {
      try {
        const response = await fetch(
          makeURL(baseURL, context),
          makeRequestInit(context),
        );
        if (!response.ok) {
          // TODO Manage errors.
        }

        return response;
      } catch (error) {
        throw new Error();
      }
    },
    async serializeOne(
      context: ActionContext,
      model: ModelInstance,
    ) {
      console.log(context);
      return serializeOne(model);
    },
    async deserializeOne(
      context: WithStoreContext<ActionContext, Store>,
      response: Response,
    ) {
      const body = await response.json();
      const includedMap = makeIncludedMap(body.included || []);

      return deserializeOne(context, body.data, includedMap);
    },
    async deserializeMany(
      context: WithStoreContext<ActionContext, Store>,
      response: Response,
    ) {
      const body = await response.json();
      const includedMap = makeIncludedMap(body.included || []);

      return deserializeMany(context, body.data, includedMap);
    },
  };
}
