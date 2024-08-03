type Transaction = {
  hash: string;
  timestamp: number;
  value: number;
  gas: string;
  [key: string]: string | number | Date;
};

export default Transaction;
