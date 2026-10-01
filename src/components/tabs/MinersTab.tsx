import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArtLogo } from '../ArtLogo';
import { Zap, BarChart2 } from 'lucide-react';
import { sound } from '../../utils/sound';

export const MinersTab: React.FC = () => {
  const { wallet, mining, buyMiner, setIsHashrateOpen } = useApp();

  const activeMiners = mining.miners.filter((m) => m.status === 'active');
  const highestLevel = Math.max(...activeMiners.map((m) => m.level), 1);
  const progressPercent = (highestLevel / 8) * 100;

  return (
    <div className="flex flex-col gap-4 pb-28 px-4 pt-2 animate-in fade-in duration-200">
      {/* Title Header in Gold Theme */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-white tracking-tight">
            <span className="gold-text">Miner Store</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">Unlock tiers for higher CVC hashrate</p>
        </div>
        <ArtLogo size={36} className="ring-2 ring-[#E8B94A]/40 rounded-full" />
      </div>

      {/* Top Assets Overview Card in Gold theme */}
      <div className="bg-gradient-to-b from-[#13131A] to-[#0A0A0F] border border-[#E8B94A]/30 rounded-2xl p-4 shadow-[0_0_25px_rgba(232,185,74,0.1)] flex flex-col gap-2.5 text-xs">
        <div className="flex items-center justify-between pb-2 border-b border-[#E8B94A]/15">
          <span className="text-slate-400 font-medium">Total Assets</span>
          <span className="font-mono text-[#FFD86B] font-bold text-sm">
            {wallet.totalAssets > 0 ? wallet.totalAssets.toFixed(2) : '00.00'} CVC
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-400">Holding Wallet</span>
          <span className="font-mono text-[#FFD86B] font-medium">
            {wallet.holdingWallet.toFixed(2)} CVC
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-400">Pool Wallet</span>
          <span className="font-mono text-[#FFD86B] font-medium">
            {wallet.poolWallet.toFixed(2)} CVC
          </span>
        </div>
      </div>

      {/* MY MINING LEVEL Card in Gold theme */}
      <div className="bg-gradient-to-b from-[#13131A] to-[#0A0A0F] border border-[#E8B94A]/30 rounded-2xl p-4 shadow-[0_0_25px_rgba(232,185,74,0.1)] flex flex-col gap-2.5">
        <span className="text-[10px] font-bold text-[#FFD86B] uppercase tracking-wider">
          MY MINING LEVEL
        </span>

        <div className="flex items-center justify-between">
          <h2 className="text-base font-extrabold text-white">Level {highestLevel} of 8</h2>
          <span className="text-xs font-mono text-slate-300">
            Today's P&L:{' '}
            <span className="text-[#FFD86B] font-bold">
              {mining.todayPnl > 0 ? `+${mining.todayPnl.toFixed(2)}` : '00.00'} CVC
            </span>
          </span>
        </div>

        {/* Progress Bar in Gold */}
        <div className="w-full bg-[#18150a] h-2 rounded-full overflow-hidden mt-0.5 border border-[#E8B94A]/20">
          <div
            className="h-full bg-gradient-to-r from-[#FFD86B] to-[#E8B94A] rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(232,185,74,0.5)]"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <button
          onClick={() => {
            sound.playTap();
            setIsHashrateOpen(true);
          }}
          className="text-xs text-[#FFD86B] hover:text-[#E8B94A] font-medium flex items-center gap-1.5 pt-1 group text-left cursor-pointer"
        >
          <BarChart2 className="w-3.5 h-3.5" />
          <span>View hashrate & PNL →</span>
        </button>
      </div>

      {/* 2-Column Grid of Miner Tiers matching gold theme */}
      <div className="grid grid-cols-2 gap-3">
        {mining.miners.map((miner) => {
          const isActive = miner.status === 'active';

          return (
            <div
              key={miner.level}
              className={`bg-[#141420] rounded-2xl p-3.5 flex flex-col justify-between border transition-all ${
                isActive
                  ? 'border-[#E8B94A] shadow-[0_0_20px_rgba(232,185,74,0.3)] ring-1 ring-[#FFD86B]/40'
                  : 'border-[#E8B94A]/25 hover:border-[#E8B94A]/45'
              }`}
            >
              {/* Top Row: Level badge + active status */}
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#FFD86B] bg-[#18150a] px-2 py-0.5 rounded-md border border-[#E8B94A]/30">
                  Lvl {miner.level}
                </span>
                {isActive && (
                  <span className="w-2 h-2 rounded-full bg-[#FFD86B] animate-pulse shadow-[0_0_8px_#FFD86B]" />
                )}
              </div>

              {/* Big Price Display in Gold */}
              <div className="my-3 py-1.5 rounded-xl bg-[#18150a] border border-[#E8B94A]/40 text-center">
                <div className="text-base font-extrabold text-[#FFD86B] font-mono tracking-tight">
                  {miner.costArt} <span className="text-xs font-sans text-white">CVC</span>
                </div>
              </div>

              {/* Specs: Speed & Rate */}
              <div className="flex flex-col gap-1 text-[11px] mb-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Speed</span>
                  <span className="font-mono text-slate-200 font-semibold truncate max-w-[95px]">
                    {miner.speedTh >= 1000000
                      ? `${miner.speedTh.toFixed(2)}`
                      : `${miner.speedTh.toFixed(2)}`}{' '}
                    TH/s
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Rate</span>
                  <span className="font-mono text-[#FFD86B] font-semibold">
                    +{miner.rateArtPerHour.toFixed(4)} cvc/h
                  </span>
                </div>
              </div>

              {/* Action Button: ACTIVE or BUY {cost} CVC in Gold */}
              {isActive ? (
                <div className="w-full py-2 rounded-xl bg-[#18150a] border border-[#E8B94A] text-[#FFD86B] text-xs font-bold text-center tracking-wider uppercase shadow-[0_0_12px_rgba(232,185,74,0.2)]">
                  ACTIVE
                </div>
              ) : (
                <button
                  onClick={() => buyMiner(miner.level)}
                  className="w-full py-2 rounded-xl gold-btn text-black text-xs font-extrabold shadow-[0_0_18px_rgba(232,185,74,0.35)] active:scale-95 transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5 fill-current" />
                  <span>BUY {miner.costArt} CVC</span>
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
