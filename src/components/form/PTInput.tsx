"use client";

import { Input } from "@nextui-org/input";
import { useFormContext } from "react-hook-form";

import { IInput } from "@/src/types";
import { ReactNode } from "react";

interface IProps extends IInput {}

export default function PTInput({
  size = "md",
  required = false,
  type = "text",
  label,
  name,
}: IProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Input
      {...register(name)}
      errorMessage={errors[name] ? (errors[name]?.message as string) : ""}
      isInvalid={!!errors[name]}
      label={label}
      required={required}
      size={size}
      type={type}
      radius="sm"
      isClearable
    />
  );
}