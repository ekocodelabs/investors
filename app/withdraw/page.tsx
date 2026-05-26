import { WithdrawalModule } from "@/myComponents/WithdrawalLayout";
import React from "react";
import { redirect } from "next/dist/client/components/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/authOptions";

export default async function WithdrawalPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/loginpage");
  }

  return (
    <div>
      <WithdrawalModule />
    </div>
  );
}
