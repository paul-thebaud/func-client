import type Model from '@/core/model';
import { Pagination } from '@/core/pagination/pagination';
import { DeepRelationshipsKey } from '@/core/attributes/relationships';
import { ModelClass } from '@/core/types/model';
import { PaginatedQuery, Query } from '@/core/types/query';
import { RecordId } from '@/core/types/record';
import { Serializable } from '@/core/types/serializable/serializable';

export default class Builder<M extends Model, P extends Pagination | undefined> {
  public readonly model: M;

  public readonly pagination: P;

  private readonly query: Query;

  public constructor(model: M, pagination: P) {
    this.model = model;
    this.pagination = pagination;
    this.query = {
      selects: new Map(),
      relations: new Map(),
      filters: undefined,
      sortBys: new Map(),
    };
  }

  public with<D extends number = 5>(relation: DeepRelationshipsKey<M, D>) {
    this.query.relations.set(relation, null);

    return this;
  }

  public where(filters: Serializable) {
    this.query.filters = filters;

    return this;
  }

  public allRaw() {
    return this.useConnection().findAll(this.model, this.query);
  }

  public findRaw(id: RecordId) {
    return this.useConnection().find<M>(this.model.type, id, this.query);
  }

  public updateRaw() {
    return this.useConnection().update(this.model, this.query);
  }

  public async all() {
    return (await this.allRaw()).data;
  }

  public async find(id: RecordId) {
    return (await this.findRaw(id)).data;
  }

  public async update() {
    return (await this.updateRaw()).data;
  }

  public async findOrFail(id: RecordId) {
    const model = await this.find(id);
    if (!model) {
      throw new Error('TODO');
    }

    return model;
  }

  public paginate(
    ...params: P extends Pagination ? Parameters<P['paginateUsing']>[0] : never
  ) {
    if (!this.pagination) {
      throw new Error('TODO');
    }

    (this.query as PaginatedQuery).page = {
      pagination: this.pagination,
      page: params,
    };

    return this.all();
  }

  private useConnection() {
    // TODO Throw if undefined!
    return (this.model.constructor as ModelClass).connection;
  }
}
