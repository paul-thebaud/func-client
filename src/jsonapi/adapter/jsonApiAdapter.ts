import HttpAdapter from '@/http/adapter/httpAdapter';
import { HttpActionContext } from '@/http/types';
import { isNone, optionalJoin } from '@/utilities';

export default class JsonApiAdapter extends HttpAdapter {
  protected makeRequestInit(context: HttpActionContext) {
    const init = super.makeRequestInit(context);

    if (!init.headers.has('Accept')) {
      init.headers.set('Accept', 'application/vnd.api+json');
    }

    if (!init.headers.has('Content-Type')
      && context.body !== undefined
      && !(context.body instanceof FormData)
    ) {
      init.headers.set('Content-Type', 'application/vnd.api+json');
      init.body = JSON.stringify(init.body);
    }

    return init;
  }

  protected makeRequestURLParams(context: HttpActionContext) {
    return optionalJoin([
      super.makeRequestURLParams(context),
      this.makeIncludeParam(context),
    ], '&');
  }

  protected makeIncludeParam(context: HttpActionContext) {
    return isNone(context.includes)
      ? undefined
      : `include=${optionalJoin(context.includes ?? [], ',')}`;
  }
}
