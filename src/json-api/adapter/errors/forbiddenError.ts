import InvalidError from '@/json-api/adapter/errors/invalidError';

export default class ForbiddenError<R> extends InvalidError<R> {
}
