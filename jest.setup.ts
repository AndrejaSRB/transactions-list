import { TextEncoder } from "util";

// This is necessary because TextEncoder is used by viem
global.TextEncoder = TextEncoder;
