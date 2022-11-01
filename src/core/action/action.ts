export default class Action<C> {
  private context: C;

  public constructor(context: C) {
    this.context = context;
  }

  public use<NC>(changer: (c: C) => NC) {
    return new Action(changer(this.context));
  }

  public run<R>(runner: (c: C) => R) {
    return runner(this.context);
  }

  public getContext() {
    return this.context;
  }
}
