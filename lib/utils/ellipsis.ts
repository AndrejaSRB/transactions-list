export default function ellipsis(hex: unknown, length = 3) {
  if (typeof hex !== "string") return;

  return hex.replace(
    new RegExp(`^(0x.{${length}}).*(.{${length}})`),
    "$1...$2"
  );
}
