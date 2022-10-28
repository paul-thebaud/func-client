import type { State } from '@/core/state/state';

export default class TrackableState {
  protected $state = {
    isNew: true,
    isLoading: false,
    isCreating: false,
    isUpdating: false,
    isDeleting: false,
    isDeleted: false,
    lastLoadedAt: null,
  } as State;

  public get isNew() {
    return this.$state.isNew;
  }

  public get isExisting() {
    return !this.$state.isNew;
  }

  public get isLoading() {
    return this.$state.isLoading;
  }

  public get isLoaded() {
    return !this.$state.isLoading;
  }

  public get isCreating() {
    return this.$state.isCreating;
  }

  public get isUpdating() {
    return this.$state.isUpdating;
  }

  public get isDeleting() {
    return this.$state.isUpdating;
  }

  public get isSaving() {
    return this.isCreating || this.isUpdating || this.isDeleting;
  }

  public async loading(): Promise<void> {
    this.$state.isLoading = true;
  }

  public async loaded(): Promise<void> {
    this.$state.isLoading = false;
    this.$state.lastLoadedAt = new Date().getTime();
  }

  public async creating(): Promise<void> {
    this.$state.isCreating = true;
  }

  public async created(): Promise<void> {
    this.$state.isCreating = false;
    this.$state.isNew = false;
  }

  public async updating(): Promise<void> {
    this.$state.isUpdating = true;
  }

  public async updated(): Promise<void> {
    this.$state.isUpdating = false;
  }

  public async deleting(): Promise<void> {
    this.$state.isDeleting = true;
  }

  public async deleted(): Promise<void> {
    this.$state.isDeleting = false;
    this.$state.isNew = true;
    this.$state.isDeleted = true;
  }
}
