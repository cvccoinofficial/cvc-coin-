import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Zap, TrendingUp, Cpu, Award } from 'lucide-react';
import { sound } from '../../utils/sound';

export const HashrateModal: React.FC = () => {
  const { isHashrateOpen, setIsHashrateOpen, mining } = useApp();

  if (!isHashrateOpen) return null;

  const activeMiners = mining.miners.filter((m) => m.status === 'active');
  const totalHourlyRate = activeMiners.reduce((acc, m) => acc + m.rateArtPerHour, 0);
  const dailyYieldArt = (totalHourlyRate * 24).toFixed(4);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-[#0c0c14] border border-[#E8B94A]/30 rounded-3xl p-5 shadow-2xl flex flex-col gap-4 animate-in slide-in-from-bottom-6 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E8B94A]/15">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#18150a] border border-[#E8B94A]/40 flex items-center justify-center text-[#FFD86B]">
              <Zap className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Hashrate & P&L Analytics</h3>
              <p className="text-xs text-slate-400">Real-time performance metrics</p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playTap();
              setIsHashrateOpen(false);
            }}
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2-Grid Stat Overview */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#141420] border border-[#E8B94A]/20 rounded-2xl p-3 flex flex-col gap-1">
            <span className="text-[11px] text-slate-400 flex items-center gap-1">
              <Cpu className="w-3.5 h-3.5 text-[#FFD86B]" />
              Active Hashrate
            </span>
            <span className="text-lg font-bold font-mono text-[#FFD86B]">
              {mining.totalHashrate.toFixed(2)} TH/s
            </span>
            <span className="text-[10px] text-slate-500">Global Pool Tier 1</span>
          </div>

          <div className="bg-[#141420] border border-[#E8B94A]/20 rounded-2xl p-3 flex flex-col gap-1">
            <span className="text-[11px] text-slate-400 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-[#FFD86B]" />
              Est. Daily Yield
            </span>
            <span className="text-lg font-bold font-mono text-[#FFD86B]">
              +{dailyYieldArt} CVC
            </span>
            <span className="text-[10px] text-slate-500">Based on 3 cycles/day</span>
          </div>
        </div>

        {/* Active Miners Breakdown */}
        <div className="bg-[#141420] border border-[#E8B94A]/20 rounded-2xl p-3 flex flex-col gap-2">
          <span className="text-xs font-bold text-slate-300">Active Miners Roster</span>
          <div className="flex flex-col gap-1.5 max-h-40 overflow-y-auto no-scrollbar">
            {activeMiners.map((m) => (
              <div
                key={m.level}
                className="bg-[#1a1a2b] border border-[#E8B94A]/20 rounded-xl px-3 py-2 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2">
                  <Award className="w-3.5 h-3.5 text-[#FFD86B]" />
                  <span className="font-semibold text-white">Tier Level {m.level} Miner</span>
                </div>
                <div className="flex items-center gap-3 font-mono">
                  <span className="text-[#FFD86B]">{m.speedTh >= 1000000 ? m.speedTh.toFixed(2) : m.speedTh.toFixed(2)} TH/s</span>
                  <span className="text-[#FFD86B] font-semibold">+{m.rateArtPerHour.toFixed(4)} cvc/h</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={() => {
            sound.playTap();
            setIsHashrateOpen(false);
          }}
          className="w-full py-2.5 rounded-xl gold-btn text-black font-extrabold text-xs transition-all cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
};
