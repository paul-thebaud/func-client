import HttpAdapter from '@/http/adapter/httpAdapter';
import { HttpActionContext } from '@/http/types';

export default class RestAdapter extends HttpAdapter {
  protected makeRequestInit(context: HttpActionContext) {
    const init = super.makeRequestInit(context);

    if (!init.headers.has('Accept')) {
      init.headers.set('Accept', 'application/json');
    }

    if (!init.headers.has('Content-Type')
      && context.body !== undefined
      && !(context.body instanceof FormData)
    ) {
      init.headers.set('Content-Type', 'application/json');
      init.body = JSON.stringify(init.body);
    }

    return init;
  }
}
