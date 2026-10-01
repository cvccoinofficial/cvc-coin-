import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ArtLogo } from '../ArtLogo';
import { Tv, Award, Check, Loader2 } from 'lucide-react';
import { sound } from '../../utils/sound';

export const TasksTab: React.FC = () => {
  const {
    tasks,
    adsWatchedToday,
    adDailyLimit,
    watchAd,
    completeTask,
    setIsAdModalOpen,
  } = useApp();

  const [verifyingTaskId, setVerifyingTaskId] = useState<string | null>(null);

  const handleGoTask = async (taskId: string) => {
    sound.playTap();
    setVerifyingTaskId(taskId);
    try {
      await completeTask(taskId);
    } finally {
      setVerifyingTaskId(null);
    }
  };

  const remainingAds = Math.max(0, adDailyLimit - adsWatchedToday);
  const adProgressPercent = (adsWatchedToday / adDailyLimit) * 100;

  return (
    <div className="flex flex-col gap-4 pb-28 px-4 pt-2 animate-in fade-in duration-200">
      {/* Title Header in Gold Theme */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-white tracking-tight">
            <span className="gold-text">CVC Tasks</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">Complete tasks & watch ads to earn CVC</p>
        </div>
        <ArtLogo size={36} className="ring-2 ring-[#E8B94A]/40 rounded-full" />
      </div>

      {/* Watch Ads Card */}
      <div className="bg-gradient-to-b from-[#13131A] to-[#0A0A0F] border border-[#E8B94A]/30 rounded-2xl p-4 shadow-[0_0_25px_rgba(232,185,74,0.1)] flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#18150a] border border-[#E8B94A]/40 flex items-center justify-center text-[#FFD86B]">
            <Tv className="w-6 h-6" />
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-bold text-white">Watch Ads</span>
            <span className="text-xs text-[#FFD86B] font-medium">
              +10 CVC per ad · {adsWatchedToday}/{adDailyLimit} today
            </span>
          </div>
        </div>

        {/* Progress bar in Gold */}
        <div className="w-full bg-[#18150a] h-1.5 rounded-full overflow-hidden border border-[#E8B94A]/20">
          <div
            className="h-full bg-gradient-to-r from-[#FFD86B] to-[#E8B94A] rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(232,185,74,0.5)]"
            style={{ width: `${adProgressPercent}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span>{remainingAds} left today</span>
          <span>Resets in 23h 27m</span>
        </div>

        {/* Action Button */}
        {remainingAds === 0 ? (
          <button
            onClick={() => {
              sound.playTap();
              setIsAdModalOpen(true);
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-[#18150a] border border-[#E8B94A]/30 text-[#FFD86B] text-xs font-semibold text-center hover:bg-[#201c0c] transition-all cursor-pointer"
          >
            Limit reached · resets in 23h 27m (Watch Bonus)
          </button>
        ) : (
          <button
            onClick={() => {
              sound.playTap();
              watchAd();
            }}
            className="w-full py-2.5 px-4 rounded-xl gold-btn text-black text-xs font-extrabold text-center shadow-[0_0_18px_rgba(232,185,74,0.35)] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Tv className="w-4 h-4" />
            <span>Watch Ad (+10 CVC)</span>
          </button>
        )}
      </div>

      {/* PARTNER TASKS Header */}
      <div className="flex flex-col gap-2">
        <h2 className="text-[11px] font-bold tracking-wider text-[#FFD86B]/80 uppercase px-1">
          PARTNER TASKS
        </h2>

        {/* Task Items List */}
        <div className="flex flex-col gap-2.5">
          {tasks.map((task) => {
            const isVerifying = verifyingTaskId === task.id;

            return (
              <div
                key={task.id}
                className="bg-[#141420] border border-[#E8B94A]/25 hover:border-[#E8B94A]/45 rounded-2xl px-3.5 py-3 flex items-center justify-between transition-colors shadow-md"
              >
                {/* Left: Medal Icon + Title + Reward */}
                <div className="flex items-center gap-3 min-w-0 pr-2">
                  <div className="w-10 h-10 rounded-xl bg-[#18150a] border border-[#E8B94A]/30 flex items-center justify-center text-[#FFD86B] shrink-0">
                    <Award className="w-5 h-5" />
                  </div>

                  <div className="flex flex-col truncate">
                    <span className="text-xs font-bold text-white truncate">{task.title}</span>
                    <span className="text-[11px] font-mono font-semibold text-[#FFD86B] mt-0.5">
                      +{task.rewardArt} CVC
                    </span>
                  </div>
                </div>

                {/* Right: Done or Go Button */}
                {task.isDone ? (
                  <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#18150a] border border-[#E8B94A]/40 text-[#FFD86B] text-xs font-bold shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Done</span>
                  </div>
                ) : (
                  <button
                    onClick={() => handleGoTask(task.id)}
                    disabled={isVerifying}
                    className="px-5 py-1.5 rounded-full gold-btn text-black text-xs font-extrabold shadow-[0_0_15px_rgba(232,185,74,0.35)] active:scale-95 transition-all flex items-center gap-1.5 shrink-0 disabled:opacity-70 cursor-pointer"
                  >
                    {isVerifying ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Wait</span>
                      </>
                    ) : (
                      <span>Go</span>
                    )}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
