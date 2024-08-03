import format from "date-fns/format";

const formatTimestamp = (timestamp: number) => {
  const date = new Date(timestamp * 1000);

  return format(date, "dd/MM/yyyy");
};

export default formatTimestamp;
