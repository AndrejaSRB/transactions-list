import Skeleton from "@/components/skeleton";
import Status from "./status";

const Detail = ({
  label,
  value,
  status,
  isLoading,
}: {
  label: string;
  value?: string | number;
  status?: string;
  isLoading: boolean;
}) => (
  <div className="mt-4 flex flex-col lg:flex-row w-full lg:items-center gap-x-4 px-6">
    <div className="flex items-center min-w-16">
      <span className="text-gray-500 text-sm font-bold">{label}:</span>
    </div>

    {/*
     * If it's loading state active then show skeleton
     * else if it's the status true present Status, otherwise print the value
     */}
    {isLoading ? (
      <Skeleton />
    ) : status ? (
      <div>
        <Status status={status} />
      </div>
    ) : (
      <div className=" text-xs lg:text-sm leading-6 ">
        <p>{value}</p>
      </div>
    )}
  </div>
);

export default Detail;
