import isNone from '@/core/utilities/isNone';
import optionalJoin from '@/core/utilities/optionalJoin';
import HttpAdapter from '@/http/adapter/httpAdapter';
import { HttpActionContext } from '@/http/types';

export default class JsonApiAdapter extends HttpAdapter {
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
