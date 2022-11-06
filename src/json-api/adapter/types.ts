export type JsonApiRequestContext = {
  url: string;
  init: RequestInit;
};

export type JsonApiAdapterOptions = {
  baseURL?: string;
  fetch?: typeof fetch;
  headers?: HeadersInit;
  transformTypes?: (localType: string) => string;
  transformRelations?: (localRelation: string) => string;
  transformParamKeys?: (localParam: string) => string;
  transformParamValues?: (localParam: unknown) => string | undefined;
};
