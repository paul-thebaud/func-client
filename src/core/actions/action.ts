import { ActionContext } from '@/core/actions/types';

export default class Action<C extends ActionContext> {
  private readonly $context: C;

  public constructor(context: C) {
    this.$context = context;
  }

  public get context() {
    return this.$context;
  }

  public merge<NC extends ActionContext>(context: NC): Action<C & NC> {
    return new Action({
      ...this.$context,
      ...context,
    });
  }

  public replace<NC extends ActionContext>(context: NC): Action<NC> {
    return new Action(context);
  }

  public use<NC extends ActionContext>(changer: (c: Action<C>) => Action<NC>) {
    return changer(this);
  }

  // TODO when() method.

  public run<R>(runner: (c: Action<C>) => R) {
    return runner(this);
  }
}
