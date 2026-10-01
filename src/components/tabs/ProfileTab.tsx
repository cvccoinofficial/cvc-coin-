import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArtLogo } from '../ArtLogo';
import {
  User,
  CheckSquare,
  Volume2,
  Coins,
  CreditCard,
  Wallet,
  ArrowUpRight,
  FileText,
} from 'lucide-react';
import { sound } from '../../utils/sound';

export const ProfileTab: React.FC = () => {
  const {
    user,
    wallet,
    toggleSound,
    setIsWithdrawOpen,
    setIsHistoryOpen,
    setIsWalletModalOpen,
  } = useApp();

  const truncatedWallet = user.tonWallet
    ? `${user.tonWallet.slice(0, 4)}...${user.tonWallet.slice(-4)}`
    : 'Not connected';

  return (
    <div className="flex flex-col gap-4 pb-28 px-4 pt-2 animate-in fade-in duration-200">
      {/* Title Header in Gold Theme */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-white tracking-tight">
            <span className="gold-text">CVC Profile</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Account identity, verification, assets, and controls
          </p>
        </div>
        <ArtLogo size={36} className="ring-2 ring-[#E8B94A]/40 rounded-full" />
      </div>

      {/* Account Info Cards */}
      <div className="flex flex-col gap-2.5">
        {/* User ID */}
        <div className="bg-gradient-to-b from-[#13131A] to-[#0A0A0F] border border-[#E8B94A]/30 rounded-2xl p-3.5 shadow-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#18150a] border border-[#E8B94A]/30 flex items-center justify-center text-[#FFD86B] shrink-0">
              <User className="w-5 h-5" />
            </div>

            <div className="flex flex-col">
              <span className="text-xs font-bold text-white">User ID</span>
              <span className="text-[11px] font-mono text-slate-400 mt-0.5">{user.userId}</span>
            </div>
          </div>

          <span className="px-3 py-1 rounded-full bg-[#18150a] border border-[#E8B94A]/30 text-[11px] font-medium text-[#FFD86B]">
            TG Native
          </span>
        </div>

        {/* Account Verification */}
        <div
          onClick={() => {
            sound.playTap();
            setIsWalletModalOpen(true);
          }}
          className="bg-gradient-to-b from-[#13131A] to-[#0A0A0F] border border-[#E8B94A]/30 hover:border-[#E8B94A]/50 rounded-2xl p-3.5 shadow-md flex items-center justify-between cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#18150a] border border-[#E8B94A]/40 flex items-center justify-center text-[#FFD86B] shrink-0">
              <CheckSquare className="w-5 h-5" />
            </div>

            <div className="flex flex-col">
              <span className="text-xs font-bold text-white">Account Verification</span>
              <span className="text-[11px] text-slate-400 mt-0.5">
                <span className="text-[#FFD86B] font-medium">Verified</span> ({truncatedWallet})
              </span>
            </div>
          </div>

          <button className="px-3 py-1 rounded-full bg-[#18150a] border border-[#E8B94A]/40 text-[#FFD86B] text-xs font-semibold cursor-pointer">
            Verified ✓
          </button>
        </div>

        {/* Sound Effects Toggle Switch in Gold */}
        <div className="bg-gradient-to-b from-[#13131A] to-[#0A0A0F] border border-[#E8B94A]/30 rounded-2xl p-3.5 shadow-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#18150a] border border-[#E8B94A]/30 flex items-center justify-center text-[#FFD86B] shrink-0">
              <Volume2 className="w-5 h-5" />
            </div>

            <div className="flex flex-col">
              <span className="text-xs font-bold text-white">Sound effects</span>
              <span className="text-[11px] text-slate-400 mt-0.5">
                {user.soundEffects ? 'Enabled — haptic audio cues' : 'Disabled — muted'}
              </span>
            </div>
          </div>

          {/* Toggle Switch in Gold */}
          <button
            onClick={toggleSound}
            className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-0.5 cursor-pointer ${
              user.soundEffects ? 'gold-btn shadow-[0_0_12px_rgba(232,185,74,0.5)]' : 'bg-slate-800'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-black transition-transform ${
                user.soundEffects ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Total Assets */}
        <div className="bg-gradient-to-b from-[#13131A] to-[#0A0A0F] border border-[#E8B94A]/30 rounded-2xl p-3.5 shadow-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#18150a] border border-[#E8B94A]/30 flex items-center justify-center text-[#FFD86B] shrink-0">
              <Coins className="w-5 h-5" />
            </div>

            <div className="flex flex-col">
              <span className="text-xs font-bold text-white">Total Assets</span>
              <span className="text-[11px] font-mono text-[#FFD86B] font-semibold mt-0.5">
                {wallet.totalAssets > 0 ? wallet.totalAssets.toFixed(2) : '00.00'} CVC
              </span>
            </div>
          </div>

          <span className="px-3 py-1 rounded-full bg-[#18150a] border border-[#E8B94A]/30 text-[#FFD86B] text-xs font-mono font-medium">
            ≈ ${(wallet.totalAssets * wallet.artPriceUsd).toFixed(2)} USD
          </span>
        </div>

        {/* Holding Wallet */}
        <div className="bg-gradient-to-b from-[#13131A] to-[#0A0A0F] border border-[#E8B94A]/30 rounded-2xl p-3.5 shadow-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#18150a] border border-[#E8B94A]/30 flex items-center justify-center text-[#FFD86B] shrink-0">
              <CreditCard className="w-5 h-5" />
            </div>

            <div className="flex flex-col">
              <span className="text-xs font-bold text-white">Holding Wallet</span>
              <span className="text-[11px] font-mono text-slate-400 mt-0.5">
                {wallet.holdingWallet.toFixed(2)} CVC (Hold status)
              </span>
            </div>
          </div>
        </div>

        {/* Pool Wallet */}
        <div className="bg-gradient-to-b from-[#13131A] to-[#0A0A0F] border border-[#E8B94A]/30 rounded-2xl p-3.5 shadow-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#18150a] border border-[#E8B94A]/30 flex items-center justify-center text-[#FFD86B] shrink-0">
              <Wallet className="w-5 h-5" />
            </div>

            <div className="flex flex-col">
              <span className="text-xs font-bold text-white">Pool Wallet</span>
              <span className="text-[11px] text-slate-400 mt-0.5">Withdrawable mined earnings</span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs font-bold font-mono text-[#FFD86B] block">
              {wallet.poolWallet.toFixed(2)}
            </span>
            <span className="text-[10px] text-slate-400 font-bold">CVC</span>
          </div>
        </div>
      </div>

      {/* WALLET CONTROLS Header */}
      <div className="flex flex-col gap-2 mt-1">
        <h2 className="text-[11px] font-bold tracking-wider text-[#FFD86B]/80 uppercase px-1">
          WALLET CONTROLS
        </h2>

        {/* Withdraw Control Card */}
        <div className="bg-gradient-to-b from-[#13131A] to-[#0A0A0F] border border-[#E8B94A]/30 rounded-2xl p-3.5 shadow-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#18150a] border border-[#E8B94A]/30 flex items-center justify-center text-[#FFD86B] shrink-0">
              <ArrowUpRight className="w-5 h-5" />
            </div>

            <div className="flex flex-col">
              <span className="text-xs font-bold text-white">Withdraw</span>
              <span className="text-[11px] text-slate-400 mt-0.5">Transfer Pool to TON Wallet</span>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playTap();
              setIsWithdrawOpen(true);
            }}
            className="px-5 py-2 rounded-full gold-btn text-black text-xs font-extrabold shadow-[0_0_15px_rgba(232,185,74,0.35)] active:scale-95 transition-all shrink-0 cursor-pointer"
          >
            Withdraw
          </button>
        </div>

        {/* History Control Card */}
        <div className="bg-gradient-to-b from-[#13131A] to-[#0A0A0F] border border-[#E8B94A]/30 rounded-2xl p-3.5 shadow-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#18150a] border border-[#E8B94A]/30 flex items-center justify-center text-[#FFD86B] shrink-0">
              <FileText className="w-5 h-5" />
            </div>

            <div className="flex flex-col">
              <span className="text-xs font-bold text-white">History</span>
              <span className="text-[11px] text-slate-400 mt-0.5">Transactions log</span>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playTap();
              setIsHistoryOpen(true);
            }}
            className="px-5 py-2 rounded-full bg-[#18150a] hover:bg-[#201c0c] text-[#FFD86B] border border-[#E8B94A]/30 text-xs font-bold active:scale-95 transition-all shrink-0 cursor-pointer"
          >
            Open
          </button>
        </div>
      </div>
    </div>
  );
};
