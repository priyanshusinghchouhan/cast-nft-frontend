import { Navigation } from './components/navigations';
import { MintingCard } from './components/minting-card';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-accent/5">
      <Navigation />

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-73px)] px-4 py-12 md:py-0">
        <div className="text-center mb-12 md:mb-16 space-y-4 max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground text-balance">
            Cast Your Unique NFT
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground text-balance">
            Join thousands of creators in a community-driven collection. Each NFT is unique, verifiable, and yours to keep.
          </p>
        </div>

        {/* Minting Card */}
        <MintingCard />

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 w-full max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-accent mb-2">5,000</div>
            <p className="text-sm text-muted-foreground">Total Collection</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent mb-2">0.001 ETH</div>
            <p className="text-sm text-muted-foreground">Mint Price</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent mb-2">5</div>
            <p className="text-sm text-muted-foreground">Max Per Wallet</p>
          </div>
        </div>
      </div>
    </div>
  );
}
