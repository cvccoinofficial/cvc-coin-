import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, HelpCircle, Pickaxe, Zap, Users, ShieldCheck } from 'lucide-react';
import { sound } from '../../utils/sound';

export const GuideModal: React.FC = () => {
  const { isGuideOpen, setIsGuideOpen } = useApp();

  if (!isGuideOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-md max-h-[85vh] bg-[#0c0c14] border border-[#E8B94A]/30 rounded-3xl p-5 shadow-2xl flex flex-col gap-4 animate-in slide-in-from-bottom-6 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E8B94A]/15">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#18150a] border border-[#E8B94A]/40 flex items-center justify-center text-[#FFD86B]">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">How CVC Mining Works</h3>
              <p className="text-xs text-slate-400">Beginner guide & tokenomics</p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playTap();
              setIsGuideOpen(false);
            }}
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list in Gold theme */}
        <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-3 text-xs text-slate-300 no-scrollbar">
          <div className="bg-[#141420] border border-[#E8B94A]/20 rounded-2xl p-3.5 flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-[#FFD86B] font-bold">
              <Pickaxe className="w-4 h-4" />
              <span>1. 8-Hour Mining Cycles (0.30 CVC / 24h)</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              With the calibrated 20M supply, base miners yield 0.30 CVC per 24 hours (0.10 CVC per 8-hour cycle).
              When the timer expires, tap "Claim Reward" to transfer earnings to your Pool Wallet.
            </p>
          </div>

          <div className="bg-[#141420] border border-[#E8B94A]/20 rounded-2xl p-3.5 flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-[#FFD86B] font-bold">
              <Zap className="w-4 h-4 fill-current" />
              <span>2. Miner Tiers & Hashrate</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Upgrade your hardware in the Miner Store up to Level 8. Higher tiers provide massive
              TH/s speed multipliers and higher CVC/h yield rates.
            </p>
          </div>

          <div className="bg-[#141420] border border-[#E8B94A]/20 rounded-2xl p-3.5 flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-[#FFD86B] font-bold">
              <Users className="w-4 h-4" />
              <span>3. Referral Squad (200 CVC + 10%)</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Share your personal link on Telegram. Every friend who joins gives you +200 CVC
              instantly, plus a lifetime 10% commission on every cycle they mine.
            </p>
          </div>

          <div className="bg-[#141420] border border-[#E8B94A]/20 rounded-2xl p-3.5 flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-[#FFD86B] font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>4. TON Network Withdrawals</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Your Pool Wallet balance is withdrawable anytime to your connected TON wallet address
              (minimum 50 CVC).
            </p>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => {
            sound.playTap();
            setIsGuideOpen(false);
          }}
          className="w-full py-2.5 rounded-xl gold-btn text-black font-extrabold text-xs cursor-pointer shadow-[0_0_15px_rgba(232,185,74,0.35)]"
        >
          Got It!
        </button>
      </div>
    </div>
  );
};
