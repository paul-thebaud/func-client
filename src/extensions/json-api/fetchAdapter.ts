import { ActionResultOrAny, Adapter } from '@/core/adapter/adapter';
import { ConnectionAction } from '@/core/connection/connection';
import { Pagination } from '@/core/pagination/pagination';
import { PaginatedQuery, Query } from '@/core/types/query';
import {
  ExistingRecordData,
  ExistingRecordIdentifier,
  NewRecordData,
  RecordId,
  RecordType,
  RelationshipIdentifier,
  RelationshipValue,
} from '@/core/types/record';
import { Serializable } from '@/core/types/serializable/serializable';
import { Dictionary } from '@/core/types/utilities/dictionary';
import isNil from '@/core/utilities/isNil';
import prepareQueryParams from '@/extensions/json-api/utilities/prepareQueryParams';
import serializeQueryParams from '@/extensions/json-api/utilities/serializeQueryParams';

// TODO Manage more fetch options (headers, etc.).
type FetchQuery<Q> = Q & {};

type FetchActionResult<R> = R & {
  url: string;
  request: RequestInit;
  response: Response;
};

type JsonApiRecord = {
  type: RecordType;
  id: RecordId;
  attributes?: Dictionary<Serializable>;
  relationships?: Dictionary<{ data: RelationshipValue<ExistingRecordIdentifier> }>;
};

export default class FetchAdapter implements Adapter {
  private readonly baseURL: string;

  public constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  public async actionAll<A extends ConnectionAction, P extends Pagination>(
    type: RecordType,
    action: A,
    query: Partial<FetchQuery<PaginatedQuery<P>>>,
  ) {
    return this.action<A, ExistingRecordData[], P>(
      this.prepareManyEndpoint(type, action),
      action,
      query,
    );
  }

  public async actionRecord<A extends ConnectionAction, P extends Pagination>(
    record: ExistingRecordData,
    action: A,
    query: Partial<FetchQuery<PaginatedQuery<P>>>,
  ) {
    return this.action<A, ExistingRecordData | null, P>(
      this.prepareOneEndpoint(record),
      action,
      query,
    );
  }

  public async findAll<P extends Pagination>(
    type: RecordType,
    query: Partial<FetchQuery<PaginatedQuery<P>>>,
  ) {
    const action = { method: 'get' } as ConnectionAction;

    return this.action<ConnectionAction, ExistingRecordData[], P>(
      this.prepareManyEndpoint(type),
      action,
      query,
    );
  }

  public async findRecord(
    type: RecordType,
    id: RecordId,
    query: Partial<FetchQuery<Query>>,
  ) {
    const action = { method: 'get' } as ConnectionAction;

    return this.action<ConnectionAction, ExistingRecordData>(
      this.prepareOneEndpoint({ type, id }),
      action,
      query,
    );
  }

  public async createRecord(
    record: NewRecordData,
    query: Partial<FetchQuery<Query>>,
  ) {
    const action = {
      method: 'post',
      payload: record,
    } as ConnectionAction;

    return this.action<ConnectionAction, ExistingRecordData | null>(
      this.prepareManyEndpoint(record.type),
      action,
      query,
    );
  }

  public async updateRecord(
    record: ExistingRecordData,
    query: Partial<FetchQuery<Query>>,
  ) {
    return this.actionRecord(record, {
      method: 'patch',
      payload: record,
    }, query);
  }

  public async deleteRecord(
    record: ExistingRecordData,
    query: Partial<FetchQuery<Query>>,
  ) {
    return this.actionRecord(record, {
      method: 'delete',
    }, query);
  }

  public async findRelated<P extends Pagination>(
    relationship: RelationshipIdentifier,
    query: Partial<FetchQuery<PaginatedQuery<P>>>,
  ) {
    const action = {
      method: 'get',
      path: relationship.parentKey,
    } as ConnectionAction;

    return this.action<ConnectionAction, RelationshipValue<ExistingRecordData>, P>(
      this.prepareOneEndpoint(relationship),
      action,
      query,
    );
  }

  public async updateRelationship(
    relationship: RelationshipIdentifier,
    data: RelationshipValue<ExistingRecordIdentifier>,
  ) {
    const action = {
      method: 'patch',
      path: relationship.parentKey,
      payload: data,
    } as ConnectionAction;

    return this.action<ConnectionAction, RelationshipValue<ExistingRecordIdentifier> | null>(
      this.prepareOneEndpoint(relationship),
      action,
      {},
    );
  }

  private async action<A extends ConnectionAction, D, P extends Pagination = Pagination>(
    endpoint: string,
    action: A,
    query: Partial<FetchQuery<PaginatedQuery<P>>>,
  ): Promise<FetchActionResult<ActionResultOrAny<A, D>>> {
    const queryString = serializeQueryParams(prepareQueryParams(query));
    const path = action.path ? `${endpoint}/${action.path}` : endpoint;
    const pathWithQuery = queryString ? `${path}?${queryString}` : path;
    const url = `${this.baseURL}/${pathWithQuery}`;
    const payload = this.preparePayload(action);

    // TODO Manage hooks: request, error, etc.
    const request: RequestInit = {
      method: action.method.toUpperCase(),
      headers: {
        Accept: 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
      },
      body: payload !== undefined ? JSON.stringify({
        data: payload,
      }) : undefined,
    };

    try {
      const response = await fetch(url, request);
      const data = await response.json();

      if (response.ok) {
        // TODO Deserialize document (relationships.data => relationships for example).
        return {
          url,
          request,
          response,
          data: this.prepareResult(action, data.data) as any,
          related: this.prepareRecordsResult(data.included || []),
          meta: data.meta,
        };
      }

      // TODO Manage error.
      throw new Error('fetch error');
    } catch (error) {
      console.log(error);
      // TODO Manage error.
      throw error;
    }
  }

  private prepareManyEndpoint(
    type: RecordType,
    action?: ConnectionAction,
  ) {
    return action?.path ? `${type}/${action.path}` : type;
  }

  private prepareOneEndpoint(
    recordOrRelationship: ExistingRecordData,
    action?: ConnectionAction,
  ) {
    const recordEndpoint = `${this.prepareManyEndpoint(recordOrRelationship.type)}/${recordOrRelationship.id}`;

    return action?.path ? `${recordEndpoint}/${action.path}` : recordEndpoint;
  }

  private preparePayload(action: ConnectionAction): Serializable {
    if (isNil(action.payload) || action.sendsRecord === false) {
      return action.payload;
    }

    return this.prepareRecordPayload(
      action.payload as NewRecordData | ExistingRecordData,
    );
  }

  private prepareRecordPayload(
    payload: NewRecordData | ExistingRecordData,
  ): Serializable {
    return {
      type: payload.type,
      id: payload.id,
      attributes: payload.attributes || {},
      relationships: Object.entries(payload.relationships || {}).reduce(
        (relationships, [key, value]) => ({
          ...relationships,
          [key]: { data: value },
        }),
        {} as Dictionary<{ data: RelationshipValue<ExistingRecordIdentifier> }>,
      ),
    };
  }

  private prepareResult(
    action: ConnectionAction,
    data: Serializable,
  ): Serializable {
    if (isNil(data) || action.returnsRecords === false) {
      return data;
    }

    if (Array.isArray(data)) {
      return this.prepareRecordsResult(data as JsonApiRecord[]);
    }

    return this.prepareRecordResult(data as JsonApiRecord);
  }

  private prepareRecordsResult(data: JsonApiRecord[]): ExistingRecordData[] {
    return data.map((r) => this.prepareRecordResult(r));
  }

  private prepareRecordResult(data: JsonApiRecord): ExistingRecordData {
    return {
      type: data.type,
      id: data.id,
      attributes: data.attributes || {},
      relationships: Object.entries(data.relationships || {}).reduce(
        (relationships, [key, value]) => ({
          ...relationships,
          [key]: value.data,
        }),
        {} as Dictionary<RelationshipValue<ExistingRecordIdentifier>>,
      ),
    };
  }
}
