export type JsonApiSerializerOptions = {
  transformKeys?: (localKey: string) => string;
  keepUnchanged?: boolean;
};
