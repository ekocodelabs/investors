import Login from "@/myComponents/LoginPage";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/authOptions";
import { redirect } from "next/dist/client/components/navigation";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div>
      <Login />
    </div>
  );
}
