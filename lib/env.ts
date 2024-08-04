import { z } from "zod";

if (!global.process?.env) {
  global.process = {
    env: {
      NODE_ENV: process.env.NODE_ENV,
    },
  } as NodeJS.Process;
}

/**
 * Get the raw environment into a single object.
 * Note: we cannot loop over process.env using Object.entries() because the process.env.VAR_NAME is replaced directly
 * during the build process.
 */
const raw = {
  NEXT_PUBLIC_APP_ENV: process.env.NEXT_PUBLIC_APP_ENV || "production",
  NEXT_PUBLIC_ETHERSCAN_API_KEY: process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY,
  NEXT_PUBLIC_POLYGONSCAN_API_KEY: process.env.NEXT_PUBLIC_POLYGONSCAN_API_KEY,
};

const schema = z.object({
  NEXT_PUBLIC_APP_ENV: z.string().min(1),
  NEXT_PUBLIC_ETHERSCAN_API_KEY: z.string().optional(),
  NEXT_PUBLIC_POLYGONSCAN_API_KEY: z.string().optional(),
});

const env = schema.parse(raw);

export default env;
