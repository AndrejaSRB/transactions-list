import Skeleton from "@/components/skeleton";

const SkeletonRow = () => (
  <tr className="border border-rose-900/20">
    {Array.from({ length: 4 }).map((_, index) => (
      <td className="p-4" key={`table-skeleton-${index}`}>
        <Skeleton />
      </td>
    ))}
  </tr>
);

export default SkeletonRow;
