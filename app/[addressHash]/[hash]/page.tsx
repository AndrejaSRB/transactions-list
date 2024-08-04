import ellipsis from "@/lib/utils/ellipsis";
import { Metadata } from "next";
import Details from "./components/details";
import Hash from "@/lib/types/Hash";

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
          <div className="flex flex-col">
            <div className="flex-auto pl-6 pt-6">
              <h1 className=" font-bold mb-4">Summary</h1>

              <h4 className="text-sm font-semibold leading-6 ">
                Transaction Hash:
              </h4>
              <p className="mt-1 text-xs leading-6  block lg:hidden">
                {ellipsis(hash, 18)}
              </p>
              <p className="mt-1 text-sm leading-6  hidden lg:block">{hash}</p>
            </div>
          </div>

          <Details hash={hash} addressHash={addressHash} />
        </div>
      </div>
    </div>
  );
}
