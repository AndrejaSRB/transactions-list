import { Metadata } from "next";
import Heading from "./components/heading";
import Table from "./components/table";
import Hash from "@/lib/types/Hash";
import { notFound } from "next/navigation";

type PageProps = {
  params: { addressHash: Hash };
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const addressHash = params?.addressHash;

  return {
    title: `Address: ${addressHash}`,
    description: `List of transactions for ${addressHash}`,
  };
}

export default function TrasnactionsListPage({ params }: PageProps) {
  const { addressHash } = params;

  // TODO: If the API returns error or data is undefined, redirect to the not found page
  if (!addressHash) {
    return notFound();
  }

  return (
    <main className="flex flex-col items-center justify-between p-4 xl:p-6">
      <Heading addressHash={addressHash} />

      <h2 className="text-sm lg:text-2xl mb-4 lg:mb-6 uppercase font-bold text-rose-600">
        List of transactions
      </h2>
      <Table addressHash={addressHash} />
    </main>
  );
}
