import InvalidError from '@/json-api/adapter/errors/invalidError';

export default class TooManyRequestsError<R> extends InvalidError<R> {
}
