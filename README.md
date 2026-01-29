# CastNFT – Full-Stack Web3 NFT Minting dApp

CastNFT is a full-stack Web3 NFT minting application built with **Solidity + Next.js + wagmi**.  
It allows users to mint NFTs from a deployed ERC-721 smart contract with **real-time UI updates**, **wallet-based limits**, and **transaction-aware UX**.

⚡ Built, deployed, and shipped end-to-end by **Priyanshu Singh**.

---

## 🔥 Key Features (Why This Project Stands Out)

- ✅ ERC-721 NFT Smart Contract (custom logic, not copy-paste)
- ✅ Payable minting with fixed ETH price
- ✅ Max supply enforcement
- ✅ Per-wallet mint limit
- ✅ Real-time supply & user mint tracking
- ✅ Transaction-aware UI states (pending / success / error)
- ✅ Automatic UI refresh after on-chain confirmation
- ✅ Wallet-connected UX (wagmi)
- ✅ Production deployment (Vercel)
- ✅ Clean, minimal, professional UI

This project demonstrates **real Web3 product thinking**, not just tutorial completion.

---

## 🧱 Tech Stack

### Smart Contract
- Solidity `^0.8.x`
- OpenZeppelin (`ERC721`, `Ownable`)
- Deployed on **Sepolia testnet**

### Frontend
- Next.js (App Router)
- TypeScript
- wagmi + viem
- WalletConnect / MetaMask
- TailwindCSS + shadcn/ui

### Deployment
- Frontend: **Vercel**
- Contract: **Sepolia (Ethereum testnet)**

---

## 📦 Project Structure
```
cast-nft-frontend/
├── app/
│ ├── page.tsx
│ └── layout.tsx
├── components/
│ └── MintingCard.tsx
├── hooks/
│ └── useNFTMint.ts
├── abi/
│ └── castNft.ts
├── constants/
│ └── constants.ts
└── README.md
```
---

## 🚀 Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/priyanshusinghchouhan/cast-nft-frontend.git
cd cast-nft-frontend
```
### 2️⃣ Install Dependencies
```
npm install
```
### 3️⃣ Configure Contract Address

Update your deployed contract address:
// constants/constants.ts
```
export const NFT_CONTRACT_ADDRESS = "0x8E01B5fA249D02879eE11AFD967B741c8a60e011";
```

Make sure the ABI in abi/castNft.ts matches the deployed contract.

### 4️⃣ Run Locally
```
npm run dev
```

### Open:
```
http://localhost:3000
```
---

## 🧠 How Minting Works (End-to-End)

- User connects wallet (MetaMask / WalletConnect)
- App reads:
    - Total supply
    - Remaining supply
    - Mint price
    - User’s minted count
- User selects quantity (auto-clamped to wallet limit)
- On clicking Mint NFT:
- ETH value calculated (price × quantity)
- Transaction sent via writeContract
- UI enters pending state
- App waits for on-chain confirmation
- On success:
     - Supply, remaining, and user data auto-refetch
     - UI updates without refresh

- If mint fails → error state shown

This mimics real production Web3 UX.

---

## 🧪 Smart Contract Logic Highlights

- MAX_SUPPLY enforced
- MAX_PER_WALLET enforced
- Exact ETH payment required
- Per-wallet mint tracking
- Owner-only withdrawal
- Custom remainingSupply() helper

---

## 🌍 Deployment
Frontend (Vercel)
```
vercel
```
or deploy directly via GitHub → Vercel dashboard.
Every push can auto-deploy.

---

## 👨‍💻 Author

### Priyanshu Singh Chouhan
### Web3 / Solidity Developer

- Built smart contracts + frontend integration
- Shipped production-ready dApp
