import InvalidError from '@/json-api/adapter/errors/invalidError';

export default class UnauthorizedError<R> extends InvalidError<R> {
}
