import { DateRange } from "./types";

export const dateRangeOptions: { label: string; value: DateRange }[] = [
  {
    label: "All time",
    value: DateRange.ALL_TIME,
  },
  {
    label: "Today",
    value: DateRange.TODAY,
  },
  {
    label: "This month",
    value: DateRange.THIS_MONTH,
  },
  {
    label: "This year",
    value: DateRange.THIS_YEAR,
  },
  {
    label: "Last 7 days",
    value: DateRange.LAST_7_DAYS,
  },
  {
    label: "Last 30 days",
    value: DateRange.LAST_30_DAYS,
  },
];
