import FetchAdapter from '@/extensions/json-api/fetchAdapter';

type MakeJsonApiOptions = {
  baseURL: string;
};

export default function makeJsonApi(options?: Partial<MakeJsonApiOptions>) {
  return new FetchAdapter(options?.baseURL || '/api');
}
