export default function joinStrings(
  parts: (string | undefined)[],
  separator: string,
) {
  return parts
    .filter((s) => typeof s === 'string')
    .join(separator);
}
