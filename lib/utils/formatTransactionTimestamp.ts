import format from "date-fns/format";
import formatDistanceStrict from "date-fns/formatDistanceStrict";

const formatTransactionTimestamp = (timestamp: bigint | undefined) => {
  if (!timestamp) return;
  console.log("timestamp", timestamp);
  const date = new Date(Number(timestamp) * 1000);

  return `${formatDistanceStrict(new Date(), date)} ago (${format(
    date,
    "do MMM yyyy - HH:mm:ss aaa"
  )})`;
};

export default formatTransactionTimestamp;
