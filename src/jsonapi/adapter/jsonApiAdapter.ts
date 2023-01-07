import { HttpActionContext, HttpAdapter } from '@/http';
import { isNone, optionalJoin } from '@/utilities';

/**
 * Adapter implementation for JSON:API.
 */
export default class JsonApiAdapter extends HttpAdapter {
  /**
   * @inheritDoc
   */
  protected makeRequestInit(context: HttpActionContext) {
    const init = super.makeRequestInit(context);

    if (!init.headers.Accept) {
      init.headers.Accept = 'application/vnd.api+json';
    }

    if (!init.headers['Content-Type']
      && init.body !== undefined
      && !(init.body instanceof FormData)
    ) {
      init.headers['Content-Type'] = 'application/vnd.api+json';
      init.body = JSON.stringify(init.body);
    }

    return init;
  }

  /**
   * @inheritDoc
   */
  protected makeRequestURLParams(context: HttpActionContext) {
    return optionalJoin([
      super.makeRequestURLParams(context),
      this.makeIncludeParam(context),
    ], '&');
  }

  /**
   * Create an adapted include URL param for given context.
   *
   * @param context
   */
  protected makeIncludeParam(context: HttpActionContext) {
    return isNone(context.includes)
      ? undefined
      : `include=${optionalJoin(context.includes ?? [], ',')}`;
  }
}
