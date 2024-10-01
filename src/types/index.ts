import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface IInput {
  variant?: "flat" | "bordered" | "faded" | "underlined";
  size?: "sm" | "md" | "lg";
  required?: boolean;
  type?: string;
  label: string;
  name: string;
  disabled?: boolean;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  phone: string;
  address: any;
  preferences: any;
  isDeleted: boolean;
  isVerified: boolean;
  followedProfiles: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type IMember = {
  name: string;
  title: string;
  imageUrl: string;
};
