"use client";

import PTForm from "@/src/components/form/PTForm";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import loginValidationSchema from "@/src/schemas/login.schema";
import PTInput from "@/src/components/form/PTInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useUserLogin } from "@/src/hooks/auth.hook";
import Loading from "@/src/components/UI/Loading";
import { useUser } from "@/src/context/user.provider";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const { mutate: handleUserLogin, isPending, isSuccess } = useUserLogin();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, setIsLoading: userLoading } = useUser();

  const redirect = searchParams.get("redirect");

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handleUserLogin(data);
    userLoading(true);
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      if (redirect) {
        router.push(redirect);
      } else {
        if (user?.role === "user") {
          router.push("/user/feed");
        } else {
          router.push("/admin/profile");
        }
      }
    }
  }, [isPending, isSuccess, userLoading, user]);

  return (
    <div>
      {isPending && <Loading />}
      <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center">
        <div className="w-full md:w-[35%] bg-gray-600 bg-opacity-40 dark:bg-opacity-20 py-7 px-6 rounded-lg shadow-2xl">
          <div className="w-full">
            <h3 className="my-2 text-2xl font-bold">Login to ProTech</h3>
            <p className="mb-4">Welcome Back! Let&lsquo;s Get Started</p>
          </div>
          <PTForm
            resolver={zodResolver(loginValidationSchema)}
            onSubmit={onSubmit}
          >
            <div className="py-3">
              <PTInput label="Email" name="email" type="email" />
            </div>
            <div className="py-3">
              <PTInput label="Password" name="password" type="password" />
            </div>

            <Button
              className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
              size="lg"
              type="submit"
            >
              Login
            </Button>
            <div className="flex justify-end">
              <Link className="hover:text-blue-400" href={"/reset-password"}>
                Reset Password
              </Link>
            </div>
          </PTForm>

          <div className="text-center mt-5">
            Don&lsquo;t have an account ?{" "}
            <Link className="hover:text-blue-400" href={"/register"}>
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
