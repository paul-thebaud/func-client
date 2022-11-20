import { AdapterError } from '@/core';
import { JsonApiErrorResponse, JsonApiResponse } from '@/json-api/adapter/types';
import { JsonApiError } from '@/json-api/types';

export default class JsonApiAdapterError<R>
  extends AdapterError implements JsonApiErrorResponse<R> {
  public response: JsonApiResponse<R>;

  public errors: JsonApiError[];

  public constructor(response: JsonApiResponse<R>) {
    super(
      response.document.errors?.[0].detail
      ?? response.document.errors?.[0].title
      ?? 'Unknown error',
    );

    this.response = response;
    this.errors = response.document.errors ?? [];
  }
}
