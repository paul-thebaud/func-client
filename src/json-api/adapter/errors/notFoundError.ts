import InvalidError from '@/json-api/adapter/errors/invalidError';

export default class NotFoundError<R> extends InvalidError<R> {
}
