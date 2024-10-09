import { ReactNode, SVGProps } from "react";

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
  startContent?: ReactNode;
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
  isBlocked: boolean;
  isVerified: boolean;
  followers: any[];
  following: any[];
  profileImg: string;
  createdAt: string;
  updatedAt: string;
  followedBack?: boolean
  __v: number;
}

export type IMember = {
  name: string;
  title: string;
  imageUrl: string;
};

export interface IPost {
  _id: string;
  author: IUser | string;
  content: string;
  categories: string[];
  isPremium: boolean;
  upvotes: string[];
  downvotes: string[];
  comments?: string[];
  upvoteCount?: number;
  downvoteCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface IComment {
  _id: string;
  content: string;
  author: Partial<IUser>;
  post: string;
  parent: any;
  createdAt: string;
  updatedAt: string;
  replies: IComment[];
}
