import { AuthNavbar } from "@/src/components/UI/AuthNavbar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex flex-col h-screen">
      <AuthNavbar />
      <main className="w-full max-w-6xl mx-auto lg:px-0 px-4">{children}</main>
    </div>
  );
}
