import { ActionResult, Adapter } from '@/core/adapter/adapter';
import Relationship from '@/core/attributes/relationship';
import { Connection, ConnectionAction, ConnectionResult, ConnectionResultOrAny } from '@/core/connection/connection';
import { Converter } from '@/core/converter/converter';
import type Model from '@/core/model';
import { Pagination } from '@/core/pagination/pagination';
import { Store } from '@/core/store/store';
import { PaginatedQuery, Query } from '@/core/types/query';
import {
  ExistingRecordData,
  RecordId,
  RecordType,
  RelationshipIdentifier,
  RelationshipValue,
} from '@/core/types/record';

export default class BaseConnection implements Connection {
  private readonly adapter: Adapter;

  private readonly converter: Converter;

  private readonly store: Store;

  public constructor(
    adapter: Adapter,
    converter: Converter,
    store: Store,
  ) {
    this.adapter = adapter;
    this.converter = converter;
    this.store = store;
  }

  public async actionAll<M extends Model, A extends ConnectionAction, P extends Pagination>(
    model: M,
    action: A,
    query: Partial<PaginatedQuery<P>>,
  ): Promise<ConnectionResultOrAny<A, M[]>> {
    const result = await this.adapter.actionAll(model.type, action, query);
    const data = action.returnsRecords
      ? await this.parseResult<M>(result)
      : result.data as any;

    return {
      data,
      meta: result.meta,
      raw: result,
    };
  }

  public async action<M extends Model, A extends ConnectionAction, P extends Pagination>(
    model: M,
    action: A,
    query: Partial<PaginatedQuery<P>>,
  ): Promise<ConnectionResultOrAny<A, M>> {
    const record = await this.converter.toRecordData(model) as ExistingRecordData;
    const result = await this.adapter.actionRecord(record, action, query);
    const data = action.returnsRecords
      ? (await this.parseResult<M>(result) || model)
      : result.data as any;

    return {
      data,
      meta: result.meta,
      raw: result,
    };
  }

  public async findAll<M extends Model, P extends Pagination>(
    model: M,
    query: Partial<PaginatedQuery<P>>,
  ): Promise<ConnectionResult<M[]>> {
    // TODO Cache?

    const result = await this.adapter.findAll(model.type, query);
    const data = await this.parseResult<M>(result) as M[];

    return {
      data,
      meta: result.meta,
      raw: result,
    };
  }

  public async findInStore<M extends Model>(
    type: RecordType,
    id: RecordId,
  ): Promise<M | null> {
    return this.store.findOne<M>(type, id);
  }

  public async find<M extends Model>(
    type: RecordType,
    id: RecordId,
    query: Partial<Query>,
  ): Promise<ConnectionResult<M | null>> {
    const model = await this.store.findOrMakeOne<M>(type, id);

    // TODO Mark relationships.
    await model.loading();

    const result = await this.adapter.findRecord(type, id, query);
    const data = await this.parseResult(result) as M | null;

    return {
      data,
      meta: result.meta,
      raw: result,
    };
  }

  public async create<M extends Model>(
    model: M,
    query: Partial<Query>,
  ): Promise<ConnectionResult<M>> {
    await model.creating();

    const record = await this.converter.toRecordData(model);
    const result = await this.adapter.createRecord(record, query);
    const data = (await this.parseResult(result) || model) as M;

    await model.created();

    return {
      data,
      meta: result.meta,
      raw: result,
    };
  }

  public async update<M extends Model>(
    model: M,
    query: Partial<Query>,
  ): Promise<ConnectionResult<M>> {
    await model.updating();

    const record = await this.converter.toRecordData(model) as ExistingRecordData;
    const result = await this.adapter.updateRecord(record, query);
    const data = (await this.parseResult(result) || model) as M;

    await model.updated();

    return {
      data,
      meta: result.meta,
      raw: result,
    };
  }

  public async delete<M extends Model>(
    model: M,
    query: Partial<Query>,
  ): Promise<ConnectionResult<M>> {
    await model.deleting();

    const record = await this.converter.toRecordData(model) as ExistingRecordData;
    const result = await this.adapter.deleteRecord(record, query);
    const data = (await this.parseResult(result) || model) as M;

    await model.deleted();

    return {
      data,
      meta: result.meta,
      raw: result,
    };
  }

  public async findRelated<M extends Model, V extends RelationshipValue<M>, P extends Pagination>(
    relationship: Relationship<M, Model, V>,
    query: Partial<PaginatedQuery<P>>,
  ): Promise<ConnectionResult<V>> {
    const result = await this.adapter.findRelated(
      this.relationshipIdentifier(relationship),
      query,
    );
    const data = await this.parseResult<M>(result) as V;

    return {
      data,
      meta: result.meta,
      raw: result,
    };
  }

  public async updateRelationship<M extends Model, V extends RelationshipValue<M>>(
    relationship: Relationship<M, Model, V>,
  ): Promise<ConnectionResult<null>> {
    const record = await this.converter.toRecordData(relationship.getParent());
    const result = await this.adapter.updateRelationship(
      this.relationshipIdentifier(relationship),
      record?.relationships?.[relationship.getParentKey()] as any,
    );

    return {
      data: null,
      meta: result.meta,
      raw: result,
    };
  }

  private relationshipIdentifier(
    relationship: Relationship,
  ): RelationshipIdentifier {
    return {
      type: relationship.getParent().type,
      id: relationship.getParent().id as RecordId,
      parentKey: relationship.getParentKey(),
      relatedType: relationship.getRelated()?.type,
      relatedKey: relationship.getRelatedKey(),
    };
  }

  private async parseResult<M extends Model>(
    result: ActionResult<ExistingRecordData[] | ExistingRecordData | null>,
  ) {
    if (Array.isArray(result.data)) {
      return await this.converter.fromRecordData(
        this.store,
        result.data,
        result.related,
      ) as M[];
    }

    if (result.data) {
      const records = await this.converter.fromRecordData(
        this.store,
        [result.data],
        result.related,
      );

      return records[0] as M;
    }

    return result.data;
  }
}
