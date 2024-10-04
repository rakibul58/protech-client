"use client";

import PTForm from "@/src/components/form/PTForm";
import PTInput from "@/src/components/form/PTInput";
import Loading from "@/src/components/UI/Loading";
import { useUser } from "@/src/context/user.provider";
import { useUserRegistration } from "@/src/hooks/auth.hook";
import registerValidationSchema from "@/src/schemas/register.schema";
import { handleImageUpload } from "@/src/services/ImageUpload";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";

export default function RegisterPage() {
  const {
    mutate: handleUserSignUp,
    isPending,
    isSuccess,
  } = useUserRegistration();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, setIsLoading: userLoading } = useUser();
  const [uploadingImage, setUploadingImage] = useState(false);
  const [image, setImage] = useState<any>({});

  const redirect = searchParams.get("redirect");

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // console.log({ data });
    setUploadingImage(true);
    if (image.name) {
      try {
        const uploadedImageUrl = await handleImageUpload(image);
        data.profileImg = uploadedImageUrl;
      } catch (error) {
        console.log({ error });
        setUploadingImage(false);
        return;
      }
    }
    handleUserSignUp(data);
    setUploadingImage(false);
    userLoading(true);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImage(file);
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      console.log({ redirect });
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
      {(isPending || uploadingImage) && <Loading />}
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
            <div className="py-3">
              <label
                htmlFor="profileImg"
                className="mb-2 text-sm font-medium border-medium border-dashed rounded-lg flex justify-center items-center h-24 w-full"
              >
                <span className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-12"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                    />
                  </svg>
                  <span className="text-md font-semibold">
                    {image?.name
                      ? image?.name?.slice(0, 10) + "..."
                      : "Upload Image"}
                  </span>
                </span>
              </label>
              <input
                className="hidden"
                id="profileImg"
                type="file"
                onChange={handleImageChange}
              />
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
