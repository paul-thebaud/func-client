import { HttpActionContext, HttpAdapter } from '@/http';

export default class JsonRestAdapter extends HttpAdapter {
  // TODO Manage include.
  protected makeRequestInit(context: HttpActionContext) {
    const init = super.makeRequestInit(context);

    if (!init.headers.Accept) {
      init.headers.Accept = 'application/json';
    }

    if (!init.headers['Content-Type']
      && init.body !== undefined
      && !(init.body instanceof FormData)
    ) {
      init.headers['Content-Type'] = 'application/json';
      init.body = JSON.stringify(init.body);
    }

    return init;
  }
}
