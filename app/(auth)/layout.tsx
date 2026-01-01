import { getAuth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import AuthClientLayout from "./AuthClientLayout";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const auth = await getAuth();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user) {
    redirect("/dashboard");
  }

  return <AuthClientLayout>{children}</AuthClientLayout>;
};

export default layout;
