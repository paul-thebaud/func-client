export default function wrap<T>(value: T[] | T) {
  return Array.isArray(value) ? value : [value];
}
