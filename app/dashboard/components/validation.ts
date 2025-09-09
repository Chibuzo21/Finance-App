import { categories, types, dateRangeValues } from "@/lib/consts";
import { z } from "zod";
// type FormFields=z.infer<typeof schema>;
export const TransactionSchema = z
  .object({
    type: z.enum(types),
    category: z.string().optional(),
    amount: z.coerce.number().min(1, {
      // data entered inside our input is always in string format, so we use coerce to convert it to a number so that our validation can take place
      message: "amount must be atleast one",
    }),
    description: z.string().optional(),
    // optional makes the validation not compulsory if the field is left vacant
    created_at: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Date needs to contain a valid date",
    }),
    // Date.parse returns a number in miliseconds from a string if what is passed down is actually in  a date format
    // refine is used on a string to ensure that it passes some extra constraint
  })
  .refine(
    (data) => {
      if (data.type === "Expenses") {
        return (
          data.category !== undefined &&
          categories.includes(
            data.category as (typeof categories)[number]
            // as is used for data assertion since we said earlier that this category field expects a field, we are saying here that whatever is input should match the data type in categories(food,housing etc)
            // typeof categories returns the data type of categories. [number] changes the categories data type from just readonly["food","housing" etc] to a union of tupules from the values in the categories array. ie just :"food"|"housing"|"transport"
          )
        );
      }
      return true;
    },
    {
      message: "Category is required for Expenses",
      path: ["category"],
      // path is indicated to show the particular field that has this error message as the refine function written above was general and not specified to any field
    }
  );
// this time we are refining the whole data, and we are saying if the data.type is expenses return true or false. now it checks if the data.category(The value you input) matches any item in categories (ie [ "Housing","Transport","Health","Food""Education","Other",]). if there is a match it returns true, else it returns false and o0nly when the function returns false, the error message runs. but if the type is not expense ie it is income, expense, investment or savings. then there is no need for validation and the function returns true.
export const settingsSchema = z.object({
  fullName: z.string().min(2),
  defaultView: z.enum(dateRangeValues),
});
