import type { ActionContext, ActionHooksDefinition, ContextEnhancer, ContextRunner } from '@/core/actions/types';
import runHook from '@/core/hooks/runHook';
import { HooksRegistrar } from '@/core/hooks/types';
import withoutHooks from '@/core/hooks/withoutHooks';
import sequentialTransform from '@/core/utilities/sequentialTransform';

export default class Action<C extends ActionContext> {
  public $hooks: HooksRegistrar<ActionHooksDefinition> | null;

  private $enhancementsQueue: ContextEnhancer<any, any>[];

  private $context: C;

  public constructor() {
    this.$enhancementsQueue = [];
    this.$context = {} as C;
    this.$hooks = {};
  }

  public get context() {
    return this.$context;
  }

  public async getContext() {
    await this.dequeueEnhancements();

    return this.$context;
  }

  public setContext<NC extends ActionContext>(newContext: NC): Action<NC> {
    this.$context = newContext as any;

    return this as any;
  }

  public use<NC extends ActionContext = C>(
    enhancer: ContextEnhancer<C, NC>,
  ): Action<NC> {
    this.$enhancementsQueue.push(enhancer);

    return this as any;
  }

  public async run<NR>(runner: ContextRunner<C, NR>): Promise<Awaited<NR>> {
    await runHook(this, 'preparing', undefined);

    const context = await this.getContext();

    await runHook(this, 'running', { context });

    try {
      // Context runner might use other context runners, so we must disable
      // hooks at this point to avoid duplicated hooks runs.
      const result = await withoutHooks(this, () => runner(this));

      await runHook(this, 'success', { context, result });

      return result;
    } catch (error) {
      await runHook(this, 'error', { context, error });

      throw error;
    } finally {
      await runHook(this, 'finally', { context });
    }
  }

  private async dequeueEnhancements() {
    const enhancements = this.$enhancementsQueue.map((e) => async () => {
      await e(this);

      // Any enhancement might push other enhancement in the queue,
      // so we must process those too.
      await this.dequeueEnhancements();
    });

    this.$enhancementsQueue = [];

    await sequentialTransform(enhancements);
  }
}
