import { ActionContext } from '@/core/actions/types';
import { NewNormalizerI } from '@/core/types';
import wrap from '@/core/utilities/wrap';
import { JsonNormalizedData } from '@/json/types';

export default abstract class JsonNormalizer<RD, R> implements NewNormalizerI<R, JsonNormalizedData> {
  public async normalize(result: R, context: ActionContext) {
    const normalized = { data: [], included: [] };
    const records = wrap(await this.extractRecords(result, context, normalized));

    await this.hydrateRecords(records, normalized);

    return normalized;
  }

  protected abstract extractResources(
    result: R,
    context: ActionContext,
    normalized: JsonNormalizedData,
  ): Promise<RD[] | RD | null>;

  protected hydrateRecords(
    records: RD[],
    normalized: JsonNormalizedData,
  ) {

  }

  protected normalizeRecords(
    records: RD[],
    normalized: JsonNormalizedData,
  ) {

  }

  protected normalizeRecord(
    record: RD,
    normalized: JsonNormalizedData,
  ) {
    // TODO Guess type/model.
  }
}
