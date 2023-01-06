import { ModelId } from '@/core';
import { Optional } from '@/utilities';

export type JsonOptionalIdentifier = {
  type?: string;
  id?: ModelId;
};

export type JsonNormalizedIdentifier = {
  type: string;
  id?: ModelId;
};

export type JsonExtractedData<R> = {
  resources: Optional<R[] | R>;
};
