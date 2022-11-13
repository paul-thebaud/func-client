import type { ActionContext, ContextEnhancer } from '@/core/actions/types';
import { ContextConsumer } from '@/core/actions/types';
import sequentialPromiseAll from '@/core/utilities/sequentialPromiseAll';

export default class Action<C extends ActionContext> {
  private $enhancementsQueue: ContextEnhancer<any, any>[];

  private $context: C;

  public constructor() {
    this.$enhancementsQueue = [];
    this.$context = {} as C;
  }

  public get context() {
    return this.$context;
  }

  public setContext<NC extends ActionContext>(newContext: NC): Action<NC> {
    this.$context = newContext as any;

    return this as any;
  }

  public use<NC extends ActionContext>(enhancer: ContextEnhancer<C, NC>): Action<NC> {
    this.$enhancementsQueue.push(enhancer);

    return this as any;
  }

  public async run<NR>(runner: ContextConsumer<C, NR>): Promise<NR> {
    await this.dequeueEnhancements();

    return runner(this);
  }

  private async dequeueEnhancements() {
    const enhancements = this.$enhancementsQueue.map((e) => async () => {
      await e(this);

      // Any enhancement might push other enhancement in the queue,
      // so we must process those too.
      await this.dequeueEnhancements();
    });

    this.$enhancementsQueue = [];

    await sequentialPromiseAll(enhancements);
  }
}
