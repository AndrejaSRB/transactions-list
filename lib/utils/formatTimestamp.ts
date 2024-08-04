import format from "date-fns/format";

const formatTimestamp = (timestamp: number | undefined) => {
  if (!timestamp) return;
  const date = new Date(timestamp * 1000);

  return format(date, "do MMM yyyy");
};

export default formatTimestamp;
