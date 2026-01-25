import { sepolia } from "wagmi/chains";
import CastNFTAbi from "@/abi/CastNFT.json";

// ---- Chain ----
export const SUPPORTED_CHAIN = sepolia;

// ---- Contract ----
export const CAST_NFT_ADDRESS =
  "0xde1416e10FF9F66a7Cc9aA992A9c23114877612";

export const CAST_NFT_ABI = CastNFTAbi;

// ---- Mint config (UI helpers, not authority) ----
export const MINT_PRICE_ETH = "0.001";
export const MAX_PER_WALLET = 5;
