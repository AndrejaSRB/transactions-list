import Skeleton from "@/components/skeleton";

const LoadingState = () => (
  <>
    <div className="block lg:hidden">
      {Array.from({ length: 4 }).map((_, index) => (
        <div className="flex flex-col w-full" key={`balance-${index}`}>
          <div className="w-full flex justyfy-between items-center py-2 gap-1">
            <div className="w-1/2 pl-2">
              <Skeleton />
            </div>
            <div className="w-1/2">
              <Skeleton />
            </div>
          </div>
        </div>
      ))}
    </div>
    <div className="hidden lg:block">
      {Array.from({ length: 2 }).map((_, index) => (
        <div className="flex items-center" key={`balance-${index}`}>
          <div className="w-1/4 flex justify-center items-center lg:p-4">
            <Skeleton />
          </div>
          <div className="w-1/4 flex justify-center items-center lg:p-4">
            <Skeleton />
          </div>
          <div className="w-1/4 flex justify-center items-center lg:p-4">
            <Skeleton />
          </div>
          <div className="w-1/4 flex justify-center items-center lg:p-4">
            <Skeleton />
          </div>
        </div>
      ))}
    </div>
  </>
);

export default LoadingState;
