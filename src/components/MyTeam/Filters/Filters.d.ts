import { DailyFilters } from "../../daily/DailyFilters/DailyFilters";

export type FiltersProps = {
  filters: DailyFilters;
  setFilters: (filters: DailyFilters) => void;
};
