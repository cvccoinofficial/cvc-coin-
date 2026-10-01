import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Tv, Sparkles, CheckCircle2 } from 'lucide-react';
import { sound } from '../../utils/sound';
import confetti from 'canvas-confetti';

export const WatchAdModal: React.FC = () => {
  const { isAdModalOpen, setIsAdModalOpen, showToast } = useApp();
  const [secondsLeft, setSecondsLeft] = useState(5);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (!isAdModalOpen) {
      setSecondsLeft(5);
      setIsCompleted(false);
      return;
    }

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsCompleted(true);
          sound.playReward();
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.6 },
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isAdModalOpen]);

  if (!isAdModalOpen) return null;

  const handleClaimAdReward = () => {
    sound.playReward();
    showToast('🎉 +10 CVC Ad Bonus Claimed!');
    setIsAdModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-sm bg-[#0c0c14] border border-[#E8B94A]/30 rounded-3xl p-5 shadow-[0_0_50px_rgba(232,185,74,0.2)] flex flex-col gap-4 animate-in zoom-in-95 duration-200">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Tv className="w-4 h-4 text-[#FFD86B]" />
            <span className="text-xs font-bold text-[#FFD86B]">Sponsor Video Ad</span>
          </div>

          <button
            onClick={() => setIsAdModalOpen(false)}
            className="p-1 rounded-full text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video Simulation Box */}
        <div className="relative aspect-video rounded-2xl bg-gradient-to-tr from-[#1b170b] via-[#101018] to-[#141209] border border-[#E8B94A]/30 flex flex-col items-center justify-center p-4 text-center overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(232,185,74,0.15),transparent_70%)] animate-pulse" />

          <div className="relative z-10 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#18150a] border border-[#E8B94A]/40 flex items-center justify-center text-[#FFD86B] mb-2">
              <Sparkles className="w-6 h-6 animate-spin-slow" />
            </div>
            <h4 className="text-sm font-bold text-white">CashView Club Spotlight</h4>
            <p className="text-[11px] text-[#FFD86B]/80 mt-1 max-w-[200px]">
              Discover fast, decentralized Web3 earning inside Telegram
            </p>
          </div>

          {/* Countdown indicator */}
          <div className="absolute top-2 right-2 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#E8B94A]/30 text-[10px] font-mono font-bold text-[#FFD86B]">
            {isCompleted ? 'Reward Ready' : `Reward in ${secondsLeft}s`}
          </div>

          {/* Progress bar in Gold */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/40">
            <div
              className="h-full bg-gradient-to-r from-[#FFD86B] to-[#E8B94A] transition-all duration-1000 ease-linear shadow-[0_0_8px_rgba(232,185,74,0.5)]"
              style={{ width: `${((5 - secondsLeft) / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* Action Button */}
        {isCompleted ? (
          <button
            onClick={handleClaimAdReward}
            className="w-full py-3 rounded-xl gold-btn text-black font-extrabold text-xs tracking-wider uppercase shadow-[0_0_20px_rgba(232,185,74,0.4)] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Claim +10 CVC</span>
          </button>
        ) : (
          <div className="w-full py-2.5 rounded-xl bg-[#141209] border border-[#E8B94A]/20 text-[#FFD86B]/60 text-xs font-semibold text-center font-mono">
            Watching ad ({secondsLeft}s remaining)...
          </div>
        )}
      </div>
    </div>
  );
};
