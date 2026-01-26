'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';

export function Navigation() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-border bg-background">
      <div className="flex items-center gap-8">
        <h1 className="text-xl font-semibold text-foreground">CastNFT</h1>
        <div className="hidden md:flex items-center gap-8">
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            About
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Docs
          </a>
        </div>
      </div>
      <ConnectButton />
    </nav>
  );
}
