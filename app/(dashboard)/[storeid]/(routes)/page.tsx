import prismadb from "@/lib/prismadb";

interface DashboardPageProps {
  storeId: string;
}

async function DashboardPage({ params }: { params: DashboardPageProps }) {
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
    },
  });

  return <div>Active Store: {store?.name}</div>;
}

export default DashboardPage;
