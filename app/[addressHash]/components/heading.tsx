import Hash from "@/lib/types/Hash";
import ellipsis from "@/lib/utils/ellipsis";
import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import Skeleton from "@/components/skeleton";

// TODO: remove dummy loading state with the real one
const isLoading = false;

const Heading = ({ addressHash }: { addressHash: Hash }) => {
  return (
    <div className="lg:flex lg:items-center lg:justify-between bg-rose-900/30 w-full rounded mb-4 lg:mb-8 p-4 lg:px-6">
      <div className="min-w-0 flex-1">
        <nav aria-label="Breadcrumb" className="flex mb-5">
          <ol role="list" className="flex items-center space-x-4">
            <li>
              <div className="flex">
                <Link
                  href="/"
                  className="text-sm font-medium transition-colors hover:text-rose-600">
                  Home
                </Link>
              </div>
            </li>

            <li>
              <div className="flex items-center">
                <ChevronRightIcon
                  aria-hidden="true"
                  className="h-5 w-5 flex-shrink-0"
                />
                <Link
                  href={`/${addressHash}`}
                  className="ml-4 text-sm font-medium transition-colors hover:text-rose-600">
                  Transactions List
                </Link>
              </div>
            </li>
          </ol>
        </nav>

        <div className="flex items-center mt-2 gap-2">
          <h2 className="text-white/80">Hash:</h2>

          <span className="block lg:hidden text-xs italic text-white">
            {ellipsis(addressHash, 10)}
          </span>

          <span className="hidden lg:block italic text-white">
            {addressHash}
          </span>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <h2 className="text-white/80">Current Balance:</h2>

          {isLoading ? (
            <Skeleton />
          ) : (
            <span className="text-sm italic text-white">0.25647</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Heading;
