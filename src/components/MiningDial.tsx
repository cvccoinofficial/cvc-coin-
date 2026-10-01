import React from 'react';
import { useApp } from '../context/AppContext';
import { ArtLogo } from './ArtLogo';
import { sound } from '../utils/sound';

export const MiningDial: React.FC = () => {
  const { mining, claimCycleReward } = useApp();

  const formatTime = (secs: number) => {
    const hours = Math.floor(secs / 3600);
    const minutes = Math.floor((secs % 3600) / 60);
    const seconds = secs % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Progress offset matching snippet (691 circumference for r=110)
  const pct = 1 - mining.cycleRemainingSeconds / mining.totalCycleSeconds;
  const strokeOffset = 691 - 691 * Math.min(1, Math.max(0, pct));

  const handleDialClick = () => {
    sound.playTap();
    if (mining.cycleRemainingSeconds <= 0) {
      claimCycleReward();
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Top Cycle Reward in Luxury Gold */}
      <div className="flex items-center gap-1.5 text-center">
        <p className="text-[11px] tracking-[0.2em] text-[#FFD86B]/80 uppercase font-semibold">
          CYCLE REWARD (8H)
        </p>
        <span className="text-[10px] text-gray-400 font-mono">· 0.30 CVC/24h</span>
      </div>
      <div className="text-center mt-1">
        <span className="inline-flex items-center gap-2 bg-[#18150a] border border-[#E8B94A]/40 px-4 py-1 rounded-full text-[#FFD86B] text-lg shadow-[0_0_15px_rgba(232,185,74,0.25)]">
          <span>⚡</span>
          <b className="font-mono text-[#FFD86B]">+{mining.currentReward.toFixed(4)}</b>
          <span className="text-sm font-bold text-[#E8B94A]">CVC</span>
        </span>
      </div>

      {/* CIRCLE MINER with Gold Theme */}
      <div
        onClick={handleDialClick}
        className="relative w-[260px] h-[260px] mx-auto mt-6 cursor-pointer select-none active:scale-95 transition-transform"
      >
        {/* Outer gold glow ring */}
        <div className="absolute inset-0 rounded-full border border-[#E8B94A]/30 shadow-[0_0_35px_rgba(232,185,74,0.25)]" />

        {/* Spinning dashed ring in gold */}
        <div className="absolute inset-4 rounded-full border border-dashed border-[#E8B94A]/35 spin" />

        {/* Progress ring SVG with gold gradient (#E8B94A to #FFD86B) & gold glow */}
        <svg className="absolute inset-0 w-full h-full progress-ring" viewBox="0 0 260 260">
          <defs>
            {/* User requested gradient: #E8B94A to #FFD86B */}
            <linearGradient id="goldProgressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E8B94A" />
              <stop offset="100%" stopColor="#FFD86B" />
            </linearGradient>

            {/* SVG Filter for rich Gold Glow */}
            <filter id="goldGlowFilter" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="6" result="blur1" />
              <feGaussianBlur stdDeviation="3" result="blur2" />
              <feMerge>
                <feMergeNode in="blur1" />
                <feMergeNode in="blur2" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background Track Circle in Deep Gold-Black (replaces any cyan track) */}
          <circle
            cx="130"
            cy="130"
            r="110"
            fill="none"
            stroke="#20180B"
            strokeWidth="12"
          />

          {/* Active Progress Ring in Gold Gradient #E8B94A -> #FFD86B with Gold Glow */}
          <circle
            cx="130"
            cy="130"
            r="110"
            fill="none"
            stroke="url(#goldProgressGradient)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray="691"
            strokeDashoffset={strokeOffset}
            filter="url(#goldGlowFilter)"
            className="glow-gold-ring transition-all duration-1000 ease-linear"
          />
        </svg>

        {/* Inner circle with CVC logo badge and gold shadow */}
        <div className="absolute inset-[24px] bg-black rounded-full flex flex-col items-center justify-center shadow-[0_0_60px_rgba(232,185,74,0.45)] overflow-hidden p-2 border border-[#E8B94A]/30">
          {/* CVC Mascot Coin Badge */}
          <div className="relative w-44 h-44 rounded-full flex items-center justify-center">
            <ArtLogo size={176} className="w-full h-full" />
          </div>

          <span className="absolute bottom-4 bg-[#141209] text-[#FFD86B] text-[10px] font-bold px-3 py-1 rounded-full border border-[#E8B94A]/50 tracking-wider shadow-[0_0_10px_rgba(232,185,74,0.3)]">
            CVC
          </span>
        </div>
      </div>

      {/* Speed badge and Timer badge: Gold background with Black text */}
      <div className="flex justify-center gap-3 mt-6 text-[13px]">
        {/* Gold Speed Badge with Black Text */}
        <span className="gold-btn text-black font-extrabold px-3.5 py-1 rounded-full flex items-center gap-1 shadow-[0_0_18px_rgba(232,185,74,0.45)]">
          <span>Speed:</span>
          <b className="font-mono">{mining.totalHashrate.toFixed(2)} TH/s</b>
        </span>

        {/* Gold Timer Badge with Black Text */}
        <span className="gold-btn text-black font-extrabold px-3.5 py-1 rounded-full flex items-center gap-1.5 shadow-[0_0_18px_rgba(232,185,74,0.45)]">
          <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
          <span className="font-mono">{formatTime(mining.cycleRemainingSeconds)}</span>
        </span>
      </div>
    </div>
  );
};
