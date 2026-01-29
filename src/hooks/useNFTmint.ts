"use client";

import { NFT_CONTRACT_ADDRESS } from "../constants/constants";
import { castNftABI } from "../abi/castNft";
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { useEffect, useMemo, useState } from "react";

export function useNFTMint() {
  const { address, isConnected } = useAccount();

  const { data: totalSupply, refetch: refetchTotalSupply } = useReadContract({
    address: NFT_CONTRACT_ADDRESS,
    abi: castNftABI,
    functionName: "totalSupply",
  });

  const { data: maxSupply } = useReadContract({
    address: NFT_CONTRACT_ADDRESS,
    abi: castNftABI,
    functionName: "MAX_SUPPLY",
  });

  const { data: remainingSupply, refetch: refetchRemainingSupply } = useReadContract({
    address: NFT_CONTRACT_ADDRESS,
    abi: castNftABI,
    functionName: "remainingSupply",
  });

  const { data: mintPrice } = useReadContract({
    address: NFT_CONTRACT_ADDRESS,
    abi: castNftABI,
    functionName: "MINT_PRICE",
  });

  const { data: maxPerWallet } = useReadContract({
    address: NFT_CONTRACT_ADDRESS,
    abi: castNftABI,
    functionName: "MAX_PER_WALLET",
  });

  const { data: userMinted, refetch: refetchUserMinted } = useReadContract({
    address: NFT_CONTRACT_ADDRESS,
    abi: castNftABI,
    functionName: "mintedPerWallet",
    args: address ? [address] : undefined,
  });

  const isLoadingLimits =
    maxPerWallet === undefined || userMinted === undefined;

  const maxMintable = useMemo(() => {
    if (isLoadingLimits) return 0;
    return Math.max(0, Number(maxPerWallet) - Number(userMinted));
  }, [isLoadingLimits, maxPerWallet, userMinted]);

  const { writeContractAsync, isPending } = useWriteContract();
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>();

  const mintNFT = async (quantity: number) => {
    if (!isConnected) return;

    if (!mintPrice) throw new Error("Mint price not loaded");
    if (quantity <= 0) throw new Error("Invalid quantity");

    const totalCost = mintPrice * BigInt(quantity);

    const hash = await writeContractAsync({
      address: NFT_CONTRACT_ADDRESS,
      abi: castNftABI,
      functionName: "mint",
      args: [BigInt(quantity)],
      value: totalCost,
    });

    setTxHash(hash);
  };

  const { isSuccess } = useWaitForTransactionReceipt({
    hash: txHash,
    query: {
      enabled: !!txHash,
    },
  });

  useEffect(() => {
    if (isSuccess) {
      refetchTotalSupply();
      refetchRemainingSupply();
      refetchUserMinted();
    }
  }, [isSuccess]);

  return {
    address,
    isConnected,
    isLoadingLimits,

    totalSupply,
    maxSupply,
    remainingSupply,
    mintPrice,
    maxPerWallet,
    userMinted,

    maxMintable,

    mintNFT,
    isPending,
    isSuccess,
    txHash
  };
}
