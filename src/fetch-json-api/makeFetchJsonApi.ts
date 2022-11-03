import type { ActionContext, ModelInstance, WithStoreContext } from '@/core';
import ConflictError from '@/fetch-json-api/errors/conflictError';
import FetchError from '@/fetch-json-api/errors/fetchError';
import ForbiddenError from '@/fetch-json-api/errors/forbiddenError';
import InvalidError from '@/fetch-json-api/errors/invalidError';
import JsonParseError from '@/fetch-json-api/errors/jsonParseError';
import NotFoundError from '@/fetch-json-api/errors/notFoundError';
import ServerError from '@/fetch-json-api/errors/serverError';
import UnauthorizedError from '@/fetch-json-api/errors/unauthorizedError';
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

  const runFetch = async (context: ActionContext) => {
    try {
      return await fetch(
        makeURL(baseURL, context),
        makeRequestInit(context),
      );
    } catch (error) {
      throw new FetchError(
        error instanceof Error ? error.message : 'Unknown fetch error',
      );
    }
  };

  const parseJsonBody = async (response: Response) => {
    if (response.status === 204) {
      return undefined;
    }

    try {
      return await response.json();
    } catch (error) {
      throw new JsonParseError(
        error instanceof Error ? error.message : 'Unknown JSON error',
      );
    }
  };

  return {
    async action(context: ActionContext) {
      const response = await runFetch(context);
      const body = await parseJsonBody(response);

      if (!response.ok) {
        const errors = body.errors || [];
        if (response.status >= 500) {
          throw new ServerError(response, errors);
        } else if (response.status === 401) {
          throw new UnauthorizedError(response, errors);
        } else if (response.status === 403) {
          throw new ForbiddenError(response, errors);
        } else if (response.status === 404) {
          throw new NotFoundError(response, errors);
        } else if (response.status === 409) {
          throw new ConflictError(response, errors);
        }

        throw new InvalidError(response, errors);
      }

      return response;
    },
    async serializeOne(
      context: ActionContext,
      model: ModelInstance,
    ) {
      console.log(context);
      return serializeOne(model);
    },
    async deserializeOne(
      context: WithStoreContext,
      response: Response,
    ) {
      const body = await response.json();
      const includedMap = makeIncludedMap(body.included || []);

      return deserializeOne(context, body.data, includedMap);
    },
    async deserializeMany(
      context: WithStoreContext,
      response: Response,
    ) {
      const body = await response.json();
      const includedMap = makeIncludedMap(body.included || []);

      return deserializeMany(context, body.data, includedMap);
    },
  };
}
