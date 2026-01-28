"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, Check, AlertCircle } from "lucide-react";
import { useNFTMint } from "@/hooks/useNFTmint";
import { formatEther } from "viem";

type TxState = "idle" | "pending" | "success" | "error";

export function MintingCard() {
  const [quantity, setQuantity] = useState(1);
  const [txState, setTxState] = useState<TxState>("idle");

  const {
    isConnected,
    address,
    isLoadingLimits,
    totalSupply,
    remainingSupply,
    maxSupply,
    maxPerWallet,
    mintPrice,
    userMinted,
    maxMintable,
    mintNFT,
    isPending,
    isSuccess,
  } = useNFTMint();
  console.log("total supply", totalSupply);
  console.log("maxSupply", maxSupply);
  console.log("mintPrice", mintPrice);

  const totalMinted = totalSupply ? Number(totalSupply) : 0;
  const maxSupplyNum = maxSupply ? Number(maxSupply) : 0;

  const percentageMinted =
    maxSupplyNum > 0 ? (totalMinted / maxSupplyNum) * 100 : 0;

  console.log("maxmintable: ", maxMintable);

  const handleMint = async () => {
    try {
      setTxState("pending");
      await mintNFT(quantity);
      console.log("Mint Successful");
    } catch (e) {
      console.error(e);
      setTxState("error");
    }
  };

  useEffect(() => {
    if (maxMintable > 0 && quantity > maxMintable) {
      setQuantity(maxMintable);
    }
  }, [maxMintable, quantity]);

  useEffect(() => {
    if (isSuccess) {
      setTxState("success");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (txState === "success") {
      setQuantity(1);
      const timer = setTimeout(() => setTxState("idle"), 3000);
      return () => clearTimeout(timer);
    }
  }, [txState]);

  const totalMintPrice = useMemo(() => {
    if (!mintPrice || quantity <= 0) return 0n;
    return mintPrice * BigInt(quantity);
  }, [mintPrice, quantity]);

  const canMint =
    !isLoadingLimits &&
    isConnected &&
    quantity > 0 &&
    quantity <= maxMintable &&
    (remainingSupply ?? 0n) > 0n;

  return (
    <Card className="w-full max-w-md bg-card border border-border rounded-lg p-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Mint NFT
        </h2>
        <p className="text-sm text-muted-foreground">Join the collection</p>
      </div>

      {/* Progress Section */}
      <div className="mb-8 space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">
              Progress
            </span>
            <span className="text-sm text-muted-foreground">
              {totalSupply?.toLocaleString()} / {maxSupply?.toLocaleString()}
            </span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-black transition-all duration-300"
              style={{ width: `${percentageMinted}%` }}
            />
          </div>
        </div>

        {/* Remaining */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-sm text-muted-foreground">Remaining</span>
          <span className="text-sm font-medium text-foreground">
            {remainingSupply?.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="border-t border-border mb-8" />

      {/* Mint Details */}
      <div className="space-y-4 mb-8">
        {/* Price */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Mint Price</span>
          <span className="text-sm font-medium text-foreground">
            {mintPrice ? formatEther(mintPrice) : "0.001"} ETH
          </span>
        </div>

        {/* User Minted */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Your Mints</span>
          <span className="text-sm font-medium text-foreground">
            {userMinted?.toLocaleString() || "0"} /{" "}
            {maxPerWallet?.toLocaleString() || "5"}
          </span>
        </div>

        {/* Total Cost */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <span className="text-sm font-medium text-foreground">Total</span>
          <span className="text-lg font-semibold text-muted-foreground">
            {formatEther(totalMintPrice)} ETH
          </span>
        </div>
      </div>

      {/* Quantity Selector */}
      <div className="mb-8">
        <label className="text-sm text-muted-foreground block mb-3">
          Quantity
        </label>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity === 1 || txState !== "idle"}
            className="w-10 h-10 p-0"
          >
            −
          </Button>

          <input
            type="number"
            min="1"
            max={maxMintable}
            value={quantity}
            onChange={(e) => {
              const val = Math.min(
                maxMintable,
                Math.max(1, parseInt(e.target.value) || 1),
              );
              setQuantity(val);
            }}
            disabled={txState !== "idle"}
            className="flex-1 h-10 px-3 text-center border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50"
          />

          <Button
            variant="outline"
            size="sm"
            onClick={() => setQuantity((q) => Math.min(maxMintable, q + 1))}
            disabled={isLoadingLimits || quantity >= maxMintable || txState !== "idle"}
            className="w-10 h-10 p-0"
          >
            +
          </Button>
        </div>
      </div>

      {/* Status Messages */}
      {txState == "success" && (
        <div className="mb-6 p-3 bg-green-50 border border-green-500 rounded-md flex items-center gap-2">
          <Check className="w-4 h-4 text-green-600" />
          <span className="text-sm text-green-700 font-medium">
            Mint successful!
          </span>
        </div>
      )}

      {txState == "error" && (
        <div className="mb-6 p-3 bg-destructive/10 border border-destructive rounded-md flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-destructive" />
          <span className="text-sm text-destructive font-medium">
            Minting failed. Please try again.
          </span>
        </div>
      )}

      {remainingSupply === 0n && (
        <div className="mb-6 p-3 bg-muted border border-border rounded-md flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground font-medium">
            Collection sold out
          </span>
        </div>
      )}

      {/* Mint Button */}
      <Button
        onClick={handleMint}
        disabled={!canMint || txState == "pending"}
        className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90 font-medium transition-colors"
      >
        {txState == "pending" && (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        )}
        {txState === "pending" ? "Minting..." : txState === "success" ? "Minted!" : "Mint NFT"}
      </Button>

      {!canMint &&
        remainingSupply !== undefined &&
        remainingSupply > 0n &&
        !isPending && (
          <p className="text-2xl font-bold mb-2 text-muted-foreground text-center mt-3">
            {!isConnected
              ? "Connect wallet to mint"
              : quantity > maxMintable
                ? "Max mints per wallet reached"
                : "Mint unavailable"}
          </p>
        )}
    </Card>
  );
}
