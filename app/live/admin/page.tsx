import type { Metadata } from "next";
import { AdminPanel } from "@/components/live/admin-panel";

export const metadata: Metadata = {
  title: "Mibbles LIVE — control panel",
  robots: { index: false, follow: false },
};

/** Protected by basic auth in middleware.ts (same credentials as /admin). */
export default function LiveAdminPage() {
  return <AdminPanel />;
}
