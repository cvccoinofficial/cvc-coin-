import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, ArrowUpRight, CheckCircle2, Gift, Zap, Tv } from 'lucide-react';
import { sound } from '../../utils/sound';

export const HistoryModal: React.FC = () => {
  const { isHistoryOpen, setIsHistoryOpen, transactions } = useApp();
  const [filter, setFilter] = useState<'all' | 'mine' | 'tasks' | 'withdraw'>('all');

  if (!isHistoryOpen) return null;

  const filteredTx = transactions.filter((tx) => {
    if (filter === 'mine') return tx.type === 'mine_claim' || tx.type === 'miner_buy';
    if (filter === 'tasks') return tx.type === 'task_reward' || tx.type === 'ad_reward';
    if (filter === 'withdraw') return tx.type === 'withdrawal';
    return true;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'mine_claim':
        return <Zap className="w-4 h-4 text-[#FFD86B]" />;
      case 'task_reward':
        return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
      case 'ad_reward':
        return <Tv className="w-4 h-4 text-[#FFD86B]" />;
      case 'referral_bonus':
      case 'commission_claim':
        return <Gift className="w-4 h-4 text-[#FFD86B]" />;
      case 'withdrawal':
        return <ArrowUpRight className="w-4 h-4 text-rose-400" />;
      case 'miner_buy':
        return <Zap className="w-4 h-4 text-[#FFD86B]" />;
      default:
        return <CheckCircle2 className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-md max-h-[85vh] bg-[#0c0c14] border border-[#E8B94A]/30 rounded-3xl p-5 shadow-2xl flex flex-col animate-in slide-in-from-bottom-6 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E8B94A]/15">
          <div>
            <h3 className="text-base font-bold text-white">Transactions Log</h3>
            <p className="text-xs text-slate-400">Complete history of rewards & transfers</p>
          </div>

          <button
            onClick={() => {
              sound.playTap();
              setIsHistoryOpen(false);
            }}
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter pills in Gold */}
        <div className="flex items-center gap-1.5 py-3 border-b border-[#E8B94A]/15 overflow-x-auto no-scrollbar">
          {[
            { id: 'all', label: 'All' },
            { id: 'mine', label: 'Mining' },
            { id: 'tasks', label: 'Tasks' },
            { id: 'withdraw', label: 'Withdrawals' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                sound.playTap();
                setFilter(item.id as typeof filter);
              }}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                filter === item.id
                  ? 'gold-btn text-black font-extrabold shadow-[0_0_12px_rgba(232,185,74,0.4)]'
                  : 'bg-[#18150a] text-slate-400 hover:text-[#FFD86B] border border-[#E8B94A]/20'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* List of transactions */}
        <div className="flex-1 overflow-y-auto py-2 flex flex-col gap-2 no-scrollbar pr-0.5">
          {filteredTx.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-500">
              No transactions recorded in this category.
            </div>
          ) : (
            filteredTx.map((tx) => {
              const isPositive = tx.amountArt > 0;
              return (
                <div
                  key={tx.id}
                  className="bg-[#141420] border border-[#E8B94A]/20 rounded-2xl p-3 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <div className="w-9 h-9 rounded-xl bg-[#18150a] border border-[#E8B94A]/30 flex items-center justify-center shrink-0">
                      {getIcon(tx.type)}
                    </div>
                    <div className="flex flex-col truncate">
                      <span className="text-xs font-semibold text-white truncate">{tx.title}</span>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                        <span>{tx.timestamp}</span>
                        <span>·</span>
                        <span className="text-emerald-400">{tx.status}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span
                      className={`text-xs font-bold font-mono ${
                        isPositive ? 'text-[#FFD86B]' : 'text-slate-300'
                      }`}
                    >
                      {isPositive ? `+${tx.amountArt.toFixed(2)}` : `${tx.amountArt.toFixed(2)}`} CVC
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
