import { Metadata } from "next";
import Details from "./components/details";
import Hash from "@/lib/types/Hash";
import Summary from "./components/summary";

type PageProps = {
  params: { hash: Hash; addressHash: Hash };
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const hash = params?.hash;

  return {
    title: `Hash: ${hash}`,
    description: `Details of transactions with the hash ${hash}`,
  };
}

export default function HashDetailsPage({ params }: PageProps) {
  const { hash, addressHash } = params;

  return (
    <div className="p-4 lg:p-16 flex justify-center items-center ">
      <div className="lg:col-start-3 w-full lg:row-end-1 lg:max-w-[620px]">
        <div className="rounded-lg bg-slate-900 shadow-sm ring-1 ring-rose-900/50">
          <Summary hash={hash} />

          <Details hash={hash} addressHash={addressHash} />
        </div>
      </div>
    </div>
  );
}
