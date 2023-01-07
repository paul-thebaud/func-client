/**
 * Extendable error class used inside FuncClient.
 */
export default class FuncClientError extends Error {
  /**
   * Construct a new FuncClientError. Prefix the given message with "[func-client]".
   *
   * @param message
   */
  public constructor(message: string) {
    super(`[func-client] ${message}`);

    Object.defineProperty(this, 'name', {
      value: new.target.name,
      enumerable: false,
      configurable: true,
    });

    Object.setPrototypeOf(this, new.target.prototype);

    const { captureStackTrace } = (Error as any);
    if (captureStackTrace) {
      captureStackTrace(this, this.constructor);
    }
  }
}
