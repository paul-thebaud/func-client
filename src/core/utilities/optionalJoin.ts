export default function optionalJoin(
  strings: (string | undefined | null)[],
  separator: string,
) {
  return strings
    .filter((s) => typeof s === 'string')
    .join(separator);
}
