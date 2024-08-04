const Status = ({ status }: { status: string }) => {
  if (status === "reverted") {
    return (
      <div className="inline rounded-md bg-red-500 px-2 py-1 text-sm font-medium ring-1 ring-inset ring-red-600/20">
        Reverted
      </div>
    );
  }

  if (status === "pending") {
    return (
      <div className="inline rounded-md bg-yellow-500 px-2 py-1 text-sm font-medium  ring-1 ring-inset ring-yellow-600/20">
        Pending
      </div>
    );
  }

  return (
    <div className="inline rounded-md bg-green-500 px-2 py-1 text-sm font-medium ring-1 ring-inset ring-green-600/20">
      Success
    </div>
  );
};

export default Status;
