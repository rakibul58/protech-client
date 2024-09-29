import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center">
      <div className="w-full md:w-[35%] bg-gray-600 bg-opacity-40 dark:bg-opacity-80 py-7 px-6 rounded-lg shadow-2xl">
        <div className="w-full">
          <h3 className="my-2 text-2xl font-bold">Register to ProTech</h3>
          <p className="mb-4">Empowering You with Expert Tech Solutions.</p>
        </div>
        <form
        // resolver={zodResolver(loginValidationSchema)}
        // onSubmit={onSubmit}
        >
          <div className="py-3">
            <Input label="Name" name="name" type="string" />
          </div>
          <div className="py-3">
            <Input label="Email" name="email" type="email" />
          </div>
          <div className="py-3">
            <Input label="Password" name="password" type="password" />
          </div>
          <div className="py-3">
            <Input label="Mobile" name="phone" type="string" />
          </div>
          <Button
            className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
            size="lg"
            type="submit"
          >
            Register
          </Button>
        </form>

        <div className="text-center mt-5">
          Already have an account ?{" "}
          <Link className="hover:text-blue-400" href={"/"}>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
