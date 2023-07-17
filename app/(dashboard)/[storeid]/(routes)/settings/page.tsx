import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface SettingsPageProps {
  storeId: string;
}

async function SettingsPage({ storeId }: SettingsPageProps) {
  const user = auth();
  const userId = user.userId;

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: storeId,
      userId,
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <div className="frex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">SettingsPage</div>
    </div>
  );
}

export default SettingsPage;
