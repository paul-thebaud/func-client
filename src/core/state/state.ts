export type State = {
  isNew: boolean;
  isLoading: boolean;
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  isDeleted: boolean;
  lastLoadedAt: number | null;
};
