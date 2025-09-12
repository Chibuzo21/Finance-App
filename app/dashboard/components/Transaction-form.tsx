"use client";
// This is a client component as useForm hook is being used
import Button from "@/app/components/button";
import Input from "@/app/components/Input";
import Label from "@/app/components/Label";
import Select from "@/app/components/Select";
import { categories, types } from "@/lib/consts";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionSchema } from "./validation";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { createTransaction } from "@/lib/Actions/createTransaction";
import { updateTransaction } from "@/lib/Actions/updateTransaction";
import FormError from "@/app/components/form-error";
export type FormData = z.infer<typeof TransactionSchema>;
type TransactionId = FormData & { id: string };
export default function TransactionForm({
  initialdata,
}: {
  initialdata?: TransactionId;
}) {
  const router = useRouter();
  const [isSaving, setSaving] = useState<boolean>(false);
  const [lastError, setLastError] = useState<null | Error>();
  const {
    register,
    formState: { errors },
    watch,
    setValue,
    handleSubmit,
  } = useForm<FormData>({
    mode: "onTouched",
    defaultValues: initialdata ?? {
      created_at: new Date().toISOString().split("T")[0],
    },
    resolver: zodResolver(TransactionSchema),
  });
  const type = watch("type");
  // setValue helps us to set the value of any input
  // watch method in react hook form monitores specific inputs in the form and returns their values. We are saying it should focus on the input which was registered with the name "type"
  //<FormData> is a generic data type where you are saying useForm is a function whose fields must match the ones in FormData. generic is used here because useForm function can be reused in this component with another data type.
  // react-hook-form has a lot of modes (onsubmit,onchange,onblur,ontouched etc) which determines when the validation should start running. ontouched means the validation is first trigged on the first blur event (when an input loses focus) and subsequently when a change event occurs
  const editing = Boolean(initialdata);
  // we are using the variable editing to check if initialdata was provided or not,Boolean will convert them to true or false depending on if the data was provided
  const onSubmit = async (data: FormData) => {
    setSaving(true);
    setLastError(null);
    try {
      // await fetch(`${proce
      // nv.NEXT_PUBLIC_API_URL}/transactions`, {
      //   method: "POST",
      //   headers: {
      //     "Content-type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     ...data,
      //     created_at: `${data.created_at}T00:00:00`,
      //   }),
      // });
      const transactionid = initialdata?.id;
      if (editing && transactionid) {
        await updateTransaction(transactionid, data);
        // Edit Action
      } else {
        await createTransaction(data);
      }
      router.push("/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        setLastError(error);
      } else {
        setLastError(new Error("An unknown error occured"));
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
      <div className='grid md:grid-cols-2 grid-cols-1 gap-4'>
        <div>
          <Label className='mb-1'>Type</Label>
          <Select
            {...register("type", {
              onChange: (e) => {
                if (e.target.value !== "Expenses") {
                  setValue("category", undefined);
                }
                // we are basically saying whenever there is a change in the input for type, if the new value is not expenses then the value for category should be changed into an empty string
              },
            })}>
            {types.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </Select>

          <FormError errors={errors} fieldName='type' />
        </div>
        <div>
          <Label className='mb-1'>Categories</Label>
          <Select {...register("category")} disabled={type !== "Expenses"}>
            <option value='' disabled>
              Select a category
            </option>
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </Select>
          {type === "Expenses" && (
            <FormError errors={errors} fieldName='category' />
          )}
        </div>
        <div>
          <Label className='mb-1'>Date</Label>
          <Input type='date' {...register("created_at")} disabled={editing} />
          <FormError errors={errors} fieldName='created_at' />
        </div>
        <div>
          <Label className='mb-1'>Amount</Label>
          <Input type='number' {...register("amount")} />
          <FormError errors={errors} fieldName='amount' />
        </div>
        <div className='md:col-span-2 col-span-1'>
          <Label className='mb-1 '>Description</Label>
          <Input type='text' {...register("description")} />
          <FormError errors={errors} fieldName='description' />
        </div>
        <div className='flex justify-between items-center '>
          {lastError && <p className='errors'>{String(lastError)}</p>}
          <button
            className='bg-[#0b1916] rounded-md hover:bg-[#29574d] text-white dark:bg-white dark:hover:bg-[#29574d] disabled:opacity-50 px-5 py-2 font-medium dark:text-[#0b1916]'
            type='submit'
            disabled={isSaving}>
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
