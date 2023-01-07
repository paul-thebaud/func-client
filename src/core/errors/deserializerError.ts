import FuncClientError from '@/core/errors/funcClientError';

/**
 * Error which occurs during deserialization.
 *
 * It should be thrown when encountering a deserializer configuration error
 * or a data source's data format mismatch.
 */
export default class DeserializerError extends FuncClientError {
}
