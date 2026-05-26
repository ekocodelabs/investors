"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { TradeLayout } from "@/myComponents/TradesLayout";
import { useSession, signOut } from "next-auth/react";

export default function Trades() {
  const { data: session, status } = useSession({
    required: true,
  });

  if (status === "loading") {
    return null;
  }

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" className="bg-blue-700">
        <SidebarContent className="bg-blue-700">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="text-white hover:bg-gray-300"
              >
                <Link href="/dashboard">Overview</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="text-white hover:bg-gray-300"
              >
                <Link href="/markets">Markets</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="text-white hover:bg-gray-300"
              >
                <Link href="/trades">Trades</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="text-white hover:bg-gray-300"
              >
                <Link href="/staking">Staking</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="text-white hover:bg-gray-300"
              >
                <Link href="/assets">Assets</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="text-white hover:bg-gray-300"
              >
                <Link href="/profile">Profile</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="bg-blue-700">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => signOut({ callbackUrl: "/loginpage" })}
                className="bg-white text-black hover:bg-gray-200"
              >
                Logout
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <main className="flex-1 p-4 bg-gray-100">
        {/* The Trigger button allows users to collapse/expand the sidebar */}
        <header className="p-4 border-b bg-white flex items-center gap-4">
          <SidebarTrigger />
        </header>
        {<TradeLayout />}
      </main>
    </SidebarProvider>
  );
}
