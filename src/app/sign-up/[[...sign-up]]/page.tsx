import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-50">
      <SignUp forceRedirectUrl="/onboarding" />
    </div>
  );
}
