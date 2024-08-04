import formatBN from "./formatBN";

const calculateTransactionFee = (
  gasUsed: bigint | undefined,
  gasPrice: bigint | undefined
) => {
  if (!gasUsed || !gasPrice) return 0;
  return formatBN(gasPrice * gasUsed, 18, 15);
};

export default calculateTransactionFee;
