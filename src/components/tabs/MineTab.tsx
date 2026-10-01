import React from 'react';
import { useApp } from '../../context/AppContext';
import { MiningDial } from '../MiningDial';
import { LivePriceChart } from '../LivePriceChart';
import { ArtLogo } from '../ArtLogo';
import { HelpCircle, FastForward } from 'lucide-react';
import { sound } from '../../utils/sound';

export const MineTab: React.FC = () => {
  const {
    wallet,
    mining,
    claimCycleReward,
    startMiningCycle,
    fastForwardMining,
    setActiveTab,
    setIsWithdrawOpen,
    setIsGuideOpen,
  } = useApp();

  const formatTime = (secs: number) => {
    const hours = Math.floor(secs / 3600);
    const minutes = Math.floor((secs % 3600) / 60);
    const seconds = secs % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const isCycleFinished = mining.cycleRemainingSeconds <= 0;

  return (
    <div className="flex flex-col gap-4 pb-28 pt-2 animate-in fade-in duration-200">
      {/* CVC COIN HEADER in Gold Theme */}
      <div className="text-center py-2 relative px-4">
        <button
          onClick={() => {
            sound.playTap();
            setIsGuideOpen(true);
          }}
          className="absolute left-4 top-2 w-8 h-8 rounded-full bg-[#18150a] border border-[#E8B94A]/30 flex items-center justify-center text-[#FFD86B] hover:text-white cursor-pointer shadow-sm"
          title="Mining Info"
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        <h2 className="text-xl font-bold flex items-center justify-center gap-2">
          <span className="gold-text">CVC Coin (CVC)</span>
          <span
            onClick={fastForwardMining}
            className="text-gray-500 hover:text-[#FFD86B] text-sm cursor-pointer"
            title="Fast Forward 1h (Demo)"
          >
            ⋯
          </span>
        </h2>

        <div className="w-12 h-12 mx-auto mt-2 flex items-center justify-center">
          <ArtLogo size={48} className="ring-2 ring-[#E8B94A]/40 rounded-full" />
        </div>
      </div>

      {/* MINING CARD - MAIN matching CVC Portal luxury gradient */}
      <div className="mx-4 bg-gradient-to-b from-[#13131A] to-[#0A0A0F] rounded-[24px] p-5 border border-[#E8B94A]/30 relative overflow-hidden shadow-[0_0_35px_rgba(232,185,74,0.15)]">
        <MiningDial />
      </div>

      {/* MINING BUTTON in Gold theme */}
      <div className="px-4 flex flex-col gap-1">
        {isCycleFinished ? (
          <button
            onClick={claimCycleReward}
            className="w-full gold-btn py-4 rounded-2xl font-extrabold text-black tracking-wider shadow-[0_0_25px_rgba(232,185,74,0.5)] active:scale-[0.98] transition-all cursor-pointer"
          >
            CLAIM REWARD (+{mining.currentReward.toFixed(4)} CVC)
          </button>
        ) : !mining.isMining ? (
          <button
            onClick={startMiningCycle}
            className="w-full gold-btn py-4 rounded-2xl font-extrabold text-black tracking-wider active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(232,185,74,0.35)] cursor-pointer"
          >
            START MINING (8h CYCLE)
          </button>
        ) : (
          <button
            onClick={fastForwardMining}
            className="w-full bg-[#18150a] border border-[#E8B94A]/50 py-4 rounded-2xl font-bold text-[#FFD86B] tracking-wider flex items-center justify-center gap-2 shadow-inner active:scale-[0.99] transition-all cursor-pointer"
            title="Click to skip 1 hour"
          >
            <span>MINING...</span>
            <span className="font-mono text-white">{formatTime(mining.cycleRemainingSeconds)}</span>
          </button>
        )}

        {mining.isMining && !isCycleFinished && (
          <div className="flex justify-end pr-1 mt-1">
            <button
              onClick={fastForwardMining}
              className="text-[11px] text-gray-400 hover:text-[#FFD86B] flex items-center gap-1 py-0.5 px-2 rounded-lg bg-white/5 cursor-pointer"
            >
              <FastForward className="w-3 h-3" />
              Skip 1 Hour (Demo)
            </button>
          </div>
        )}
      </div>

      {/* ACTION BUTTONS: Buy Miners and Withdraw in Gold #E8B94A */}
      <div className="grid grid-cols-2 gap-3 mx-4">
        <button
          onClick={() => {
            sound.playTap();
            setActiveTab('miners');
          }}
          className="bg-[#141420] hover:bg-[#1f1f30] py-3.5 rounded-2xl border border-[#E8B94A]/40 font-semibold text-sm flex items-center justify-center gap-2 transition-all active:scale-95 text-[#FFD86B] shadow-[0_0_15px_rgba(232,185,74,0.15)] cursor-pointer"
        >
          <span className="text-base text-[#E8B94A]">👜</span>
          <span className="font-extrabold text-[#FFD86B]">Buy Miners</span>
        </button>

        <button
          onClick={() => {
            sound.playTap();
            setIsWithdrawOpen(true);
          }}
          className="bg-[#141420] hover:bg-[#1f1f30] py-3.5 rounded-2xl border border-[#E8B94A]/40 font-semibold text-sm flex items-center justify-center gap-2 transition-all active:scale-95 text-[#FFD86B] shadow-[0_0_15px_rgba(232,185,74,0.15)] cursor-pointer"
        >
          <span className="text-base text-[#E8B94A]">⬇</span>
          <span className="font-extrabold text-[#FFD86B]">Withdraw</span>
        </button>
      </div>

      {/* WALLETS in CVC Portal Gold Theme */}
      <div className="mx-4 mt-2">
        <p className="text-xs tracking-widest text-[#FFD86B]/80 mb-3 uppercase font-semibold">YOUR WALLETS</p>
        <div className="bg-gradient-to-b from-[#13131A] to-[#0A0A0F] rounded-2xl p-4 border border-[#E8B94A]/30 shadow-lg">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <ArtLogo size={40} className="rounded-full ring-1 ring-[#E8B94A]/40" />
              <div>
                <p className="text-xs text-gray-400">Total Assets</p>
                <p className="text-xl font-bold font-mono">
                  <span>{wallet.totalAssets > 0 ? wallet.totalAssets.toFixed(2) : '00.00'}</span>{' '}
                  <span className="text-sm font-bold text-[#FFD86B]">CVC</span>
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-400 font-mono">
              ≈ ${(wallet.totalAssets * wallet.artPriceUsd).toFixed(2)}
            </p>
          </div>

          <div className="h-[1px] bg-white/5 my-4" />

          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Holding Wallet</span>
            <span className="text-[#FFD86B] font-mono font-semibold">
              <span>{wallet.holdingWallet.toFixed(2)}</span> CVC
            </span>
          </div>

          <div className="flex justify-between text-sm mt-2">
            <span className="text-gray-400">
              Pool Wallet <span className="text-[10px] text-[#FFD86B]/70">(withdrawable)</span>
            </span>
            <span className="text-[#FFD86B] font-mono font-semibold">
              <span>{wallet.poolWallet.toFixed(2)}</span> CVC
            </span>
          </div>
        </div>
      </div>

      {/* PRICE CHART */}
      <div className="mx-4">
        <LivePriceChart />
      </div>
    </div>
  );
};
