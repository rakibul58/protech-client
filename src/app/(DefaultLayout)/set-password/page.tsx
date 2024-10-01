"use client"

import PTForm from "@/src/components/form/PTForm";
import PTInput from "@/src/components/form/PTInput";
import setPasswordValidationSchema from "@/src/schemas/setPassword.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { FieldValues, SubmitHandler } from "react-hook-form";

export default function SetPasswordPage() {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log({ data });
  };
  return (
    <div>
      {/* {isPending && <Loading />} */}
      <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center">
        <div className="w-full md:w-[35%] bg-gray-600 bg-opacity-40 dark:bg-opacity-20 py-7 px-6 rounded-lg shadow-2xl">
          <div className="w-full">
            <h3 className="my-2 text-2xl font-bold">Add Password</h3>
            <p className="mb-4">Add your new password to ProTech</p>
          </div>
          <PTForm
            resolver={zodResolver(setPasswordValidationSchema)}
            onSubmit={onSubmit}
          >
            <div className="py-3">
              <PTInput label="Password" name="password" type="password" />
            </div>

            <Button
              className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
              size="lg"
              type="submit"
            >
              Update
            </Button>
          </PTForm>
        </div>
      </div>
    </div>
  );
}
