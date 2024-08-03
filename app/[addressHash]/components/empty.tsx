import { ArrowsRightLeftIcon } from "@heroicons/react/20/solid";

const Empty = () => (
  <tr>
    <td colSpan={4} className="h-60">
      <div className="flex flex-col items-center justify-center h-full text-center">
        <ArrowsRightLeftIcon
          aria-hidden="true"
          className="h-8 w-8 flex-shrink-0 mb-5 text-rose-500/40"
        />
        <p className="text-sm lg:text-lg antialiased font-normal leading-normal text-rose-500">
          No transactions found.
        </p>
      </div>
    </td>
  </tr>
);
export default Empty;
