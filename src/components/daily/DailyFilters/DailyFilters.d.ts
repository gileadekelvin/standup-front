export type DailyFilters = {
  RangeDate?: { endDate?: Date | null; startDate?: Date | null } | null;
  UserId?: string | null;
};

export type DailyFiltersProps = {
  currentUserId: string;
  filters: DailyFilters;
  setFilters: (filters: DailyFilters) => void;
};
