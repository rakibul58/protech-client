import { useFollowUser, useUnFollowUser } from "@/src/hooks/auth.hook";
import { IUser } from "@/src/types";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import RecommendedUserSkeleton from "./RecommendedUserSkeleton";

export default function FollowingCard({ user }: { user: Partial<IUser> }) {
  const { mutate: handleUnFollow, isPending } = useUnFollowUser();

  //   console.log({ user });

  return (
    <div>
      {isPending ? (
        <RecommendedUserSkeleton />
      ) : (
        <div className="border-b flex justify-between items-center gap-3 p-2">
          <div className="flex gap-3 items-center">
            <Avatar
              isBordered
              className="cursor-pointer"
              src={user?.profileImg}
              name={user?.email?.slice(0, 2).toUpperCase()}
            />
            <div className="flex flex-col">
              <div className="flex gap-2 items-center">
                <span className="font-semibold">{user.name}</span>{" "}
                <span>
                  {user.isVerified && (
                    <CheckBadgeIcon className="size-5 text-primary" />
                  )}
                </span>
              </div>
              <span>{user.email}</span>
            </div>
          </div>

          <div>
            <Button
              onClick={() => handleUnFollow({ userId: user._id as string })}
              color="primary"
              variant="bordered"
            >
              Unfollow
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
