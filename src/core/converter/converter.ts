import type Model from '@/core/model';
import { Store } from '@/core/store/store';
import { ExistingRecordData, NewRecordData } from '@/core/types/record';

export interface Converter {
  fromRecordData<M extends Model>(
    store: Store,
    data: ExistingRecordData[],
    related: ExistingRecordData[] | undefined,
  ): Promise<M[]>;

  toRecordData(
    model: Model,
  ): Promise<NewRecordData | ExistingRecordData>;
}
