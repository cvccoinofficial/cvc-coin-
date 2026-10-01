import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Check, Copy } from 'lucide-react';
import { sound } from '../../utils/sound';

export const WalletConnectModal: React.FC = () => {
  const { isWalletModalOpen, setIsWalletModalOpen, user, updateTonWallet, showToast } = useApp();
  const [address, setAddress] = useState(user.tonWallet || '');

  if (!isWalletModalOpen) return null;

  const handleCopy = () => {
    sound.playTap();
    navigator.clipboard.writeText(user.tonWallet);
    showToast('✓ Wallet address copied!');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim()) return;
    updateTonWallet(address.trim());
    setIsWalletModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-[#0c0c14] border border-[#E8B94A]/30 rounded-3xl p-5 shadow-2xl flex flex-col gap-4 animate-in slide-in-from-bottom-6 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E8B94A]/15">
          <div className="flex items-center gap-2">
            {/* TON Gem Icon */}
            <div className="w-8 h-8 rounded-xl bg-[#18150a] border border-[#E8B94A]/40 flex items-center justify-center text-[#FFD86B]">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2L3 8L12 22L21 8L12 2Z" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-bold text-white">TON Wallet Connection</h3>
              <p className="text-xs text-slate-400">The Open Network (TON)</p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playTap();
              setIsWalletModalOpen(false);
            }}
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current status */}
        <div className="bg-[#141420] border border-[#E8B94A]/20 rounded-2xl p-3 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Status</span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#18150a] border border-[#E8B94A]/40 text-[#FFD86B] text-[11px] font-semibold flex items-center gap-1">
              <Check className="w-3 h-3 stroke-[2.5]" />
              Verified Account
            </span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-xs font-mono text-[#FFD86B] truncate max-w-[240px]">
              {user.tonWallet}
            </span>
            <button
              onClick={handleCopy}
              className="p-1.5 rounded-lg bg-[#18150a] hover:bg-[#221d0d] text-slate-300 hover:text-[#FFD86B] transition-colors cursor-pointer"
              title="Copy Address"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Edit or change address form */}
        <form onSubmit={handleSave} className="flex flex-col gap-3">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">
              Change TON Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="e.g. UQC6mPv8Y91..."
              className="w-full bg-[#141420] border border-[#E8B94A]/25 focus:border-[#E8B94A] rounded-xl px-3.5 py-2 text-xs text-white font-mono placeholder:text-slate-600 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl gold-btn text-black font-extrabold text-xs shadow-[0_0_15px_rgba(232,185,74,0.4)] active:scale-95 transition-all mt-1 cursor-pointer"
          >
            Save Wallet Address
          </button>
        </form>
      </div>
    </div>
  );
};
