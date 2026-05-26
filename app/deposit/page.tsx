import { DepositModule } from "@/myComponents/DepositLayout";
import React from "react";
import { redirect } from "next/dist/client/components/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/authOptions";

export default async function DepositPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/loginpage");
  }
  return (
    <div>
      <DepositModule />
    </div>
  );
}
