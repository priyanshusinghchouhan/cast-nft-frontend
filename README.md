# CastNFT – Full-Stack Web3 NFT Minting dApp

CastNFT is a full-stack Web3 NFT minting application built with **Solidity + Next.js + wagmi**.  
It allows users to mint NFTs from a deployed ERC-721 smart contract with **real-time UI updates**, **wallet-based limits**, and **transaction-aware UX**.

<small> Production-ready Web3 NFT minting dApp built with Solidity + Next.js. **Built, deployed, and shipped end-to-end**. </small>

<img width="1469" height="780" alt="image" src="https://github.com/user-attachments/assets/3d81491b-3396-4d93-9fa1-6511203f0152" />
<img width="1460" height="798" alt="image" src="https://github.com/user-attachments/assets/dc437bb3-d0e7-4421-9a97-202fac584ff8" />

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
- Solidity `^0.8.20`
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
- 
  <img width="1469" height="772" alt="image" src="https://github.com/user-attachments/assets/868af415-ef2d-4a93-a4c3-cfd846f2eeff" />

- App reads:
    - Total supply
    - Remaining supply
    - Mint price
    - User’s minted count

      <img width="1467" height="777" alt="image" src="https://github.com/user-attachments/assets/73d16a3d-bc5f-48d3-9c98-2ed97fd3e6c7" />

- User selects quantity (auto-clamped to wallet limit)

  <img width="1467" height="792" alt="image" src="https://github.com/user-attachments/assets/27b512ad-baac-44ce-8ca2-d9f9ecb90e80" />

- On clicking Mint NFT:
- ETH value calculated (price × quantity)
- Transaction sent via writeContract
- UI enters pending state
- App waits for on-chain confirmation

  <img width="1468" height="797" alt="image" src="https://github.com/user-attachments/assets/8626f25c-dd37-46d4-8cff-09984e5337bd" />

- On success:
     - Supply, remaining, and user data auto-refetch
     - UI updates without refresh
 
       <img width="1431" height="710" alt="image" src="https://github.com/user-attachments/assets/bf3a5afa-6533-491f-9d55-57cba871adc7" />


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
