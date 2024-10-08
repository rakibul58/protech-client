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
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
// import { protectedRoutes } from "@/src/constant";

export default function NavbarDropdown() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, setIsLoading: userLoading } = useUser();
  const [isNavigateLoading, setIsNavigateLoading] = useState(false);

  const handleLogout = async () => {
    setIsNavigateLoading(true);
    logout();
    userLoading(true);

    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
      setIsNavigateLoading(false);
    }

    setIsNavigateLoading(false);
  };

  const handleNavigation = (pathname: string) => {
    setIsNavigateLoading(true);
    router.push(pathname);
    setIsNavigateLoading(false);
  };

  return (
    <div>
      {isNavigateLoading && <Loading />}
      <Dropdown>
        <DropdownTrigger>
          <Avatar
            isBordered
            className="cursor-pointer"
            src={user?.profileImg}
            name={user?.email?.slice(0, 2).toUpperCase()}
          />
        </DropdownTrigger>
        {user?.role === "user" ? (
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem>
              <div>
                <div className="flex gap-1">
                  <span className="text-secondary font-semibold">
                    {user?.name}
                  </span>{" "}
                  <span>
                    {user.isVerified && (
                      <CheckBadgeIcon className="size-5 text-primary" />
                    )}
                  </span>
                </div>
                <span>{user?.email}</span>
              </div>
            </DropdownItem>
            <DropdownItem onClick={() => handleNavigation("/user/profile")}>
              Profile
            </DropdownItem>
            <DropdownItem onClick={() => handleNavigation("/user/feed")}>
              Feed
            </DropdownItem>
            <DropdownItem
              onClick={() => handleNavigation("/user/get-verified")}
            >
              Get Verified
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
