"use client";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { usePathname, useRouter } from "next/navigation";
import { Avatar } from "@nextui-org/avatar";

import { logout } from "@/src/services/AuthService";
import { useUser } from "@/src/context/user.provider";
import { protectedRoutes } from "@/src/constant";
import Loading from "./Loading";
import { useState } from "react";
// import { protectedRoutes } from "@/src/constant";

export default function NavbarDropdown() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, setIsLoading: userLoading } = useUser();
  const [isNavigateLoading , setIsNavigateLoading] = useState(false);

  const handleLogout = () => {
    setIsNavigateLoading(true)
    logout();
    userLoading(true);

    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
      setIsNavigateLoading(false)
    }

    setIsNavigateLoading(false)
  };

  const handleNavigation = (pathname: string) => {
    setIsNavigateLoading(true)
    router.push(pathname);
    setIsNavigateLoading(false)
  };

  return (
    <div>
      {isNavigateLoading && <Loading />}
      <Dropdown>
        <DropdownTrigger>
          <Avatar
            className="cursor-pointer"
            name={user?.email?.slice(0, 2).toUpperCase()}
          />
        </DropdownTrigger>
        {user?.role === "user" ? (
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem onClick={() => handleNavigation("/user/profile")}>
              Profile
            </DropdownItem>
            <DropdownItem onClick={() => handleNavigation("/user/feed")}>
              Feed
            </DropdownItem>

            <DropdownItem
              key="delete"
              className="text-danger"
              color="danger"
              onClick={() => handleLogout()}
            >
              Logout
            </DropdownItem>
          </DropdownMenu>
        ) : (
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem onClick={() => handleNavigation("/admin/profile")}>
              Profile
            </DropdownItem>

            <DropdownItem
              key="delete"
              className="text-danger"
              color="danger"
              onClick={() => handleLogout()}
            >
              Logout
            </DropdownItem>
          </DropdownMenu>
        )}
      </Dropdown>
    </div>
  );
}
