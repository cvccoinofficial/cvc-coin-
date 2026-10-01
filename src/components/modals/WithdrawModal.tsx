import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, ArrowUpRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { sound } from '../../utils/sound';

export const WithdrawModal: React.FC = () => {
  const { isWithdrawOpen, setIsWithdrawOpen, wallet, user, withdrawToTon } = useApp();
  const [address, setAddress] = useState(user.tonWallet || '');
  const [amount, setAmount] = useState<string>('50');
  const [error, setError] = useState<string | null>(null);

  if (!isWithdrawOpen) return null;

  const handleMax = () => {
    sound.playTap();
    setAmount(wallet.poolWallet.toString());
    setError(null);
  };

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    if (numAmount < 50) {
      setError('Minimum withdrawal is 50 CVC');
      return;
    }

    if (numAmount > wallet.poolWallet) {
      setError('Insufficient balance in Pool Wallet');
      return;
    }

    if (!address.trim()) {
      setError('Please provide a TON wallet address');
      return;
    }

    const result = withdrawToTon(numAmount, address);
    if (!result.success) {
      setError(result.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-[#0c0c14] border border-[#E8B94A]/30 rounded-3xl p-5 shadow-2xl animate-in slide-in-from-bottom-6 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E8B94A]/15">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#18150a] border border-[#E8B94A]/40 flex items-center justify-center text-[#FFD86B]">
              <ArrowUpRight className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-white">Withdraw to TON</h3>
          </div>

          <button
            onClick={() => {
              sound.playTap();
              setIsWithdrawOpen(false);
            }}
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleWithdraw} className="flex flex-col gap-4 mt-4">
          {/* Available balance summary */}
          <div className="bg-[#141420] border border-[#E8B94A]/20 rounded-2xl p-3 flex items-center justify-between">
            <span className="text-xs text-slate-400">Pool Wallet (Available)</span>
            <span className="text-sm font-bold font-mono text-[#FFD86B]">
              {wallet.poolWallet.toFixed(2)} CVC
            </span>
          </div>

          {/* TON Wallet Address */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">
              TON Network Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="e.g. UQC6mPv8Y91..."
              className="w-full bg-[#141420] border border-[#E8B94A]/25 focus:border-[#E8B94A] rounded-xl px-3.5 py-2.5 text-xs text-white font-mono placeholder:text-slate-600 focus:outline-none"
              required
            />
          </div>

          {/* Amount Input with MAX button */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-300">Amount (CVC)</label>
              <span className="text-[11px] text-[#FFD86B]">Min: 50 CVC</span>
            </div>

            <div className="relative">
              <input
                type="number"
                step="any"
                min="50"
                max={wallet.poolWallet}
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  setError(null);
                }}
                className="w-full bg-[#141420] border border-[#E8B94A]/25 focus:border-[#E8B94A] rounded-xl px-3.5 py-2.5 text-sm text-white font-mono placeholder:text-slate-600 focus:outline-none pr-16"
                required
              />
              <button
                type="button"
                onClick={handleMax}
                className="absolute right-2 top-2 px-2.5 py-1 rounded-lg gold-btn text-black text-[10px] font-extrabold tracking-wider"
              >
                MAX
              </button>
            </div>
          </div>

          {/* Fee & Info */}
          <div className="bg-[#141420] rounded-xl p-2.5 text-[11px] text-slate-400 flex flex-col gap-1 border border-[#E8B94A]/15">
            <div className="flex justify-between">
              <span>Network fee:</span>
              <span className="text-slate-200 font-mono">0.05 TON (Network standard)</span>
            </div>
            <div className="flex justify-between">
              <span>Processing time:</span>
              <span className="text-[#FFD86B]">Instant (~2-5 mins)</span>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-1.5 text-rose-400 text-xs bg-rose-950/30 border border-rose-500/30 p-2.5 rounded-xl">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl gold-btn text-black font-extrabold text-xs tracking-wider uppercase shadow-[0_0_20px_rgba(232,185,74,0.4)] active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-1 cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Confirm Withdrawal</span>
          </button>
        </form>
      </div>
    </div>
  );
};
