export type SerializerOptions = {
  transformKeys?: (localKey: string) => string;
  keepUnchanged?: boolean;
};
