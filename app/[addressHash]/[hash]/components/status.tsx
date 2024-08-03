const Status = ({ status }: { status: string }) => {
  if (status === "error") {
    return (
      <div className="inline-flex items-center rounded-md bg-red-500 px-2 py-1 text-sm font-medium ring-1 ring-inset ring-red-600/20">
        Error
      </div>
    );
  }

  if (status === "pending") {
    return (
      <div className="inline-flex items-center rounded-md bg-yellow-500 px-2 py-1 text-sm font-medium  ring-1 ring-inset ring-yellow-600/20">
        Pending
      </div>
    );
  }

  return (
    <div className="inline-flex items-center rounded-md bg-green-500 px-2 py-1 text-sm font-medium ring-1 ring-inset ring-green-600/20">
      Success
    </div>
  );
};

export default Status;
