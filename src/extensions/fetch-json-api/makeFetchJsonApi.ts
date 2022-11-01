import { WithStoreContext } from '@/core/action/changers/useStore';
import { ActionContext } from '@/core/action/types';
import { Store } from '@/core/store/types';
import deserializeMany from '@/extensions/fetch-json-api/deserialization/deserializeMany';
import deserializeOne from '@/extensions/fetch-json-api/deserialization/deserializeOne';
import makeIncludedMap from '@/extensions/fetch-json-api/deserialization/makeIncludedMap';
import makeRequestInit from '@/extensions/fetch-json-api/requests/makeRequestInit';
import makeURL from '@/extensions/fetch-json-api/requests/makeURL';
import { FetchJsonApiFactoryOptions } from '@/extensions/fetch-json-api/types';

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
    async deserializeOne(
      context: WithStoreContext<ActionContext, Store>,
      response: Response,
    ) {
      const body = await response.json();
      const includedMap = makeIncludedMap(body.included || []);

      return deserializeOne(body.data, includedMap, { store: context.store });
    },
    async deserializeMany(
      context: WithStoreContext<ActionContext, Store>,
      response: Response,
    ) {
      const body = await response.json();
      const includedMap = makeIncludedMap(body.included || []);

      return deserializeMany(body.data, includedMap, { store: context.store });
    },
  };
}
