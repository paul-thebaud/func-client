import { Dictionary } from '@/core/utilities/types';

export type JsonApiErrorObject = {
  status?: string;
  code?: string;
  title?: string;
  detail?: string;
  source?: {
    pointer?: string;
    parameter?: string;
    header?: string;
  };
  meta?: Dictionary;
};
