'use client';

import { NFT_CONTRACT_ADDRESS } from '../constants/constants';
import castNftABI from '../abi/castNft.json';
import { useAccount, useReadContract } from 'wagmi';
import { Address } from 'viem';


export function useNFTMint() {
  const { address, isConnected } = useAccount();

  const { data: totalSupply } = useReadContract({
    address: NFT_CONTRACT_ADDRESS,
    abi: castNftABI,
    functionName: 'totalSupply',
  });

  const { data: maxSupply } = useReadContract({
    address: NFT_CONTRACT_ADDRESS,
    abi: castNftABI,
    functionName: 'MAX_SUPPLY'
  });

  const { data: remainingSupply } = useReadContract({
    address: NFT_CONTRACT_ADDRESS,
    abi: castNftABI,
    functionName: 'remainingSupply'
  });

  const {data: mintPrice} = useReadContract({
    address: NFT_CONTRACT_ADDRESS,
    abi: castNftABI,
    functionName: 'MINT_PRICE'
  });

  const {data: maxPerWallet} = useReadContract({
    address: NFT_CONTRACT_ADDRESS,
    abi: castNftABI,
    functionName: 'MAX_PER_WALLET'
  });

  const {data: userMinted} = useReadContract({
    address: NFT_CONTRACT_ADDRESS,
    abi: castNftABI,
    functionName: 'mintedPerWallet',
    args: address ? [address] : undefined
  });

  return {
    address,
    isConnected,

    totalSupply,
    maxSupply,
    remainingSupply,
    mintPrice,
    maxPerWallet,
    userMinted
  };
}
