"use client"

import PTForm from "@/src/components/form/PTForm";
import PTInput from "@/src/components/form/PTInput";
import Loading from "@/src/components/UI/Loading";
import { useUserRegistration } from "@/src/hooks/auth.hook";
import registerValidationSchema from "@/src/schemas/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { FieldValues, SubmitHandler } from "react-hook-form";

export default function RegisterPage() {
  const {
    mutate: handleUserSignUp,
    isPending,
    isSuccess,
  } = useUserRegistration();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // console.log({ data });
    handleUserSignUp(data);
  };

  return (
    <div>
      {isPending && <Loading />}
      <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center">
        <div className="w-full md:w-[35%] bg-gray-600 bg-opacity-40 dark:bg-opacity-20 py-7 px-6 rounded-lg shadow-2xl">
          <div className="w-full">
            <h3 className="my-2 text-2xl font-bold">Register to ProTech</h3>
            <p className="mb-4">Empowering You with Expert Tech Solutions.</p>
          </div>
          <PTForm
            resolver={zodResolver(registerValidationSchema)}
            onSubmit={onSubmit}
          >
            <div className="py-3">
              <PTInput label="Name" name="name" type="string" />
            </div>
            <div className="py-3">
              <PTInput label="Email" name="email" type="email" />
            </div>
            <div className="py-3">
              <PTInput label="Password" name="password" type="password" />
            </div>
            <div className="py-3">
              <PTInput label="Mobile" name="phone" type="string" />
            </div>
            <Button
              className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
              size="lg"
              type="submit"
            >
              Register
            </Button>
          </PTForm>

          <div className="text-center mt-5">
            Already have an account ?{" "}
            <Link className="hover:text-blue-400" href={"/"}>
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
