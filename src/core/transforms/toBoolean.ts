export default function toBoolean(trueValues: unknown[] = [true, 1, '1', 'true', 'yes']) {
  return (value: unknown) => trueValues.indexOf(value) !== -1;
}
