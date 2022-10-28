import { Converter } from '@/core/converter/converter';
import type Model from '@/core/model';
import { Store } from '@/core/store/store';
import resolveTransformer from '@/core/transformers/resolveTransformer';
import { TransformersRegistry } from '@/core/transformers/transformer';
import transformFromRaw from '@/core/transformers/transformFromRaw';
import transformToRaw from '@/core/transformers/transformToRaw';
import { ExistingRecordData, ExistingRecordIdentifier, NewRecordData, RelationshipValue } from '@/core/types/record';
import { Serializable } from '@/core/types/serializable/serializable';
import { Dictionary } from '@/core/types/utilities/dictionary';

export default class BaseConverter implements Converter {
  private readonly transformersRegistry: TransformersRegistry;

  public constructor(
    transformersRegistry: TransformersRegistry,
  ) {
    this.transformersRegistry = transformersRegistry;
  }

  public async fromRecordData<M extends Model>(
    store: Store,
    data: ExistingRecordData[],
    related: ExistingRecordData[] | undefined,
  ): Promise<M[]> {
    const relatedMap = this.relatedMap(related);

    return Promise.all(data.map(
      (r) => this.fromRecordDataToNewOrExisting<M>(store, r, relatedMap),
    ));
  }

  public async toRecordData(
    model: Model,
  ): Promise<NewRecordData | ExistingRecordData> {
    const recordData = {
      type: model.type,
      id: model.id,
      attributes: {} as Dictionary<Serializable>,
      relationships: {} as Dictionary<RelationshipValue<ExistingRecordIdentifier>>,
    };

    // TODO Diff to only send updated values.
    await Promise.all(Object.entries(model.getAttributesDefs()).map(
      async ([key, def]) => {
        const value = model.getValue(key);
        if (value !== undefined) {
          if (def.transformer) {
            const { transformer, params } = await resolveTransformer(
              this.transformersRegistry,
              def.transformer,
            );

            recordData.attributes[key] = await transformToRaw(transformer, value, params);
          } else {
            recordData.attributes[key] = value as any;
          }
        }
      },
    ));

    return recordData;
  }

  private relatedMap(
    related: ExistingRecordData[] | undefined,
  ): Map<string, ExistingRecordData> {
    const relatedMap = new Map();

    related?.forEach((data) => relatedMap.set(this.relatedMapKey(data), data));

    return relatedMap;
  }

  private relatedMapKey(
    identifier: ExistingRecordIdentifier,
  ): string {
    return `${identifier.type}-${identifier.id}`;
  }

  private async fromRelated(
    store: Store,
    identifier: ExistingRecordIdentifier,
    related: Map<string, ExistingRecordData>,
  ): Promise<Model> {
    const data = related.get(this.relatedMapKey(identifier));
    if (data) {
      return this.fromRecordDataToNewOrExisting(store, data, related);
    }

    // TODO
    throw new Error('TODO');
  }

  private async fromRecordDataToNewOrExisting<M extends Model>(
    store: Store,
    data: ExistingRecordData,
    related: Map<string, ExistingRecordData>,
  ): Promise<M> {
    return this.fromRecordDataToExisting(
      store,
      data,
      related,
      await store.findOrMakeOne<M>(data.type, data.id),
    );
  }

  private async fromRecordDataToExisting<M extends Model>(
    store: Store,
    data: ExistingRecordData,
    related: Map<string, ExistingRecordData>,
    model: M,
  ): Promise<M> {
    // eslint-disable-next-line no-param-reassign
    model.id = data.id;

    await store.putOne(model.type, model.id, model);

    await Promise.all(Object.entries(model.getAttributesDefs()).map(
      async ([key, def]) => {
        const value = data.attributes?.[key];
        if (value !== undefined) {
          if (def.transformer) {
            const { transformer, params } = await resolveTransformer(
              this.transformersRegistry,
              def.transformer,
            );

            model.setValue(key, await transformFromRaw(transformer, value, params));
          } else {
            model.setValue(key, value);
          }
        }
      },
    ));

    await Promise.all(Object.entries(model.getRelationshipsDefs()).map(
      async ([key]) => {
        const value = data.relationships?.[key];
        if (value !== undefined) {
          let transformedValue = value as unknown;
          if (Array.isArray(value)) {
            transformedValue = await Promise.all(value.map(
              (identifier) => this.fromRelated(store, identifier, related),
            ));
          } else if (value !== null) {
            transformedValue = await this.fromRelated(store, value, related);
          }

          model.setValue(key, transformedValue);
        }
      },
    ));

    // TODO Relationship state?
    // TODO Mark model as synced.
    await model.loaded();

    return model;
  }
}
