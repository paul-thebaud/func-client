import { ActionContext } from '@/core/actions/types';
import { NewDeserializerI } from '@/core/types';
import { Optional } from '@/core/utilities/types';

export type JsonExtractedResources<R> = {
  data?: Optional<R[] | R>;
  included?: Optional<R[] | R>;
};

export default abstract class JsonDeserializer<D, R> implements NewDeserializerI<D> {
  public async deserialize(data: D, context: ActionContext) {
    const extracted = await this.extractResources(data, context);
  }

  protected abstract extractResources(
    data: D,
    context: ActionContext,
  ): Promise<JsonExtractedResources<R>>;
}
