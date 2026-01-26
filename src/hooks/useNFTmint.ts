'use client';

import { NFT_CONTRACT_ADDRESS } from '../constants/constants';
import castNftABI from '../abi/castNft.json';
import { useAccount, useReadContract } from 'wagmi';

export function useNFTMint() {
  const { address, isConnected } = useAccount();

  const { data: totalSupply } = useReadContract({
    address: NFT_CONTRACT_ADDRESS,
    abi: castNftABI,
    functionName: 'totalSupply',
  });

  const { data: maxSupply } = useReadContract({
    address: NFT_CONTRACT_ADDRESS
  })

  return {
    address,
    isConnected,
    totalSupply,
  };
}
