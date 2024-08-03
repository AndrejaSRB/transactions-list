/**
 * Returns a string with the first and last `length` characters of a hexadecimal string,
 * with "..." in between. If the input is not a string, returns undefined.
 *
 */
export default function ellipsis(hex: unknown, length = 3) {
  if (typeof hex !== "string") return;

  return hex.replace(
    new RegExp(`^(0x.{${length}}).*(.{${length}})`),
    "$1...$2"
  );
}
