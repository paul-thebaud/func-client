export default function sequentialPromiseAll(
  promisesFactories: (() => Promise<unknown>)[],
): Promise<void> {
  return promisesFactories.reduce(async (previous, promiseFactory) => {
    await previous;
    await promiseFactory();
  }, Promise.resolve());
}
