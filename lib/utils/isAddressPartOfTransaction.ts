import Hash from "../types/Hash";

/**
 * Checks if the requested address is part of the transaction.
 *
 * @param {Hash} requestedAddress - The address to check.
 * @param {Hash} from - The 'from' address of the transaction.
 * @param {Hash} to - The 'to' address of the transaction.
 * @return {boolean} Returns true if the requested address is part of the transaction, false otherwise.
 */
const isAddressPartOfTransaction = (
  requestedAddress: Hash | string,
  from: Hash,
  to: Hash
) => {
  if (!requestedAddress) return false;

  if (
    requestedAddress.toLowerCase() === from.toLowerCase() ||
    requestedAddress.toLowerCase() === to.toLowerCase()
  )
    return true;

  return false;
};

export default isAddressPartOfTransaction;
