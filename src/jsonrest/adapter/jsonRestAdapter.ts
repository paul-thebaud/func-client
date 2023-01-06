import { HttpActionContext, HttpAdapter } from '@/http';

export default class JsonRestAdapter extends HttpAdapter {
  protected makeRequestInit(context: HttpActionContext) {
    const init = super.makeRequestInit(context);

    if (!init.headers.Accept) {
      init.headers.Accept = 'application/json';
    }

    if (!init.headers['Content-Type']
      && context.body !== undefined
      && !(context.body instanceof FormData)
    ) {
      init.headers['Content-Type'] = 'application/json';
      init.body = JSON.stringify(init.body);
    }

    return init;
  }
}
