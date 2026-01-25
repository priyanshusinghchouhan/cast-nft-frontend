'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Loader2, Check, AlertCircle } from 'lucide-react';

type MintState = 'idle' | 'loading' | 'success' | 'error';

export function MintingCard() {
  const [state, setState] = useState<MintState>('idle');
  const [quantity, setQuantity] = useState(1);

  // Mock data
  const totalMinted = 4250;
  const maxSupply = 5000;
  const mintPrice = 0.001;
  const userMinted = 3;
  const maxPerWallet = 5;
  const remaining = maxSupply - totalMinted;
  const percentageMinted = (totalMinted / maxSupply) * 100;

  const handleMint = () => {
    setState('loading');
    // Simulate minting
    setTimeout(() => {
      setState('success');
      setTimeout(() => setState('idle'), 3000);
    }, 2000);
  };

  const canMint = userMinted + quantity <= maxPerWallet && remaining > 0;

  return (
    <Card className="w-full max-w-md bg-card border border-border rounded-lg p-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-2">Mint NFT</h2>
        <p className="text-sm text-muted-foreground">Join the collection</p>
      </div>

      {/* Progress Section */}
      <div className="mb-8 space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Progress</span>
            <span className="text-sm text-muted-foreground">
              {totalMinted.toLocaleString()} / {maxSupply.toLocaleString()}
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
            {remaining.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="border-t border-border mb-8" />

      {/* Mint Details */}
      <div className="space-y-4 mb-8">
        {/* Price */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Mint Price</span>
          <span className="text-sm font-medium text-foreground">{mintPrice} ETH</span>
        </div>

        {/* User Minted */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Your Mints</span>
          <span className="text-sm font-medium text-foreground">
            {userMinted} / {maxPerWallet}
          </span>
        </div>

        {/* Total Cost */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <span className="text-sm font-medium text-foreground">Total</span>
          <span className="text-lg font-semibold text-muted-foreground">
            {(mintPrice * quantity).toFixed(4)} ETH
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
            disabled={quantity === 1 || state !== 'idle'}
            className="w-10 h-10 p-0"
          >
            −
          </Button>
          <input
            type="number"
            min="1"
            max={maxPerWallet - userMinted}
            value={quantity}
            onChange={(e) => {
              const val = Math.min(
                maxPerWallet - userMinted,
                Math.max(1, parseInt(e.target.value) || 1)
              );
              setQuantity(val);
            }}
            disabled={state !== 'idle'}
            className="flex-1 h-10 px-3 text-center border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setQuantity(Math.min(maxPerWallet - userMinted, quantity + 1))
            }
            disabled={quantity >= maxPerWallet - userMinted || state !== 'idle'}
            className="w-10 h-10 p-0"
          >
            +
          </Button>
        </div>
      </div>

      {/* Status Messages */}
      {state === 'success' && (
        <div className="mb-6 p-3 bg-accent/10 border border-accent rounded-md flex items-center gap-2">
          <Check className="w-4 h-4 text-accent" />
          <span className="text-sm text-accent font-medium">Mint successful!</span>
        </div>
      )}

      {state === 'error' && (
        <div className="mb-6 p-3 bg-destructive/10 border border-destructive rounded-md flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-destructive" />
          <span className="text-sm text-destructive font-medium">
            Minting failed. Please try again.
          </span>
        </div>
      )}

      {remaining === 0 && (
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
        disabled={!canMint || state !== 'idle'}
        className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90 font-medium transition-colors"
      >
        {state === 'loading' && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
        {state === 'success' && <Check className="w-4 h-4 mr-2" />}
        {state === 'loading' ? 'Minting...' : state === 'success' ? 'Minted!' : 'Mint NFT'}
      </Button>

      {!canMint && remaining > 0 && state === 'idle' && (
        <p className="text-xs text-muted-foreground text-center mt-3">
          {userMinted >= maxPerWallet
            ? 'Max mints per wallet reached'
            : 'Connect wallet to mint'}
        </p>
      )}
    </Card>
  );
}
