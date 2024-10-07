import { Button } from "@nextui-org/button";
import Link from "next/link";

export default function PayWall() {
  return (
    <div className="bg-gray-900/10 fixed inset-0 z-[999] backdrop-blur-md flex justify-center items-center rounded-lg">
      <Link href="/">
        <Button size="md" color="primary"> Get Verified</Button>
      </Link>
    </div>
  );
}
