import SignUp from "@/myComponents/SignupPage";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/authOptions";
import { redirect } from "next/dist/client/components/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }
  return (
    <>
      <SignUp />
    </>
  );
}
