export const types = ["Income", "Expenses", "Investment", "Savings"] as const;
export const categories = [
  "Housing",
  "Transport",
  "Health",
  "Food",
  "Education",
  "Other",
] as const;
// using as const makes this array readonly that is they are immutable outside here and turns them from just string[] into literal types (tupules) "Income"|"expense"[] which is okay for zod validation. same in categories
export const dateRangeValues = [
  "last7days",
  "last24hrs",
  "last12months",
  "last30days",
] as const;
