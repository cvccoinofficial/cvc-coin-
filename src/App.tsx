/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { TelegramHeader } from './components/TelegramHeader';
import { BottomNav } from './components/BottomNav';
import { MineTab } from './components/tabs/MineTab';
import { TasksTab } from './components/tabs/TasksTab';
import { MinersTab } from './components/tabs/MinersTab';
import { FriendsTab } from './components/tabs/FriendsTab';
import { ProfileTab } from './components/tabs/ProfileTab';
import { CashViewPortal } from './components/CashViewPortal';

import { WithdrawModal } from './components/modals/WithdrawModal';
import { HistoryModal } from './components/modals/HistoryModal';
import { HashrateModal } from './components/modals/HashrateModal';
import { WatchAdModal } from './components/modals/WatchAdModal';
import { GuideModal } from './components/modals/GuideModal';
import { WalletConnectModal } from './components/modals/WalletConnectModal';

const MainApp: React.FC = () => {
  const { activeTab, toast } = useApp();
  // View mode: 'mining-app' (Telegram Mini App) or 'portal' (CashView Club Web Landing)
  const [viewMode, setViewMode] = useState<'mining-app' | 'portal'>('portal');

  return (
    <div className="min-h-screen bg-[#050509] flex flex-col text-white antialiased">
      {/* Top Universal Mode Switcher Bar */}
      <div className="w-full bg-[#0a0a14] border-b border-[#E8B94A]/20 px-4 py-1.5 flex items-center justify-between text-xs z-50">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-gray-400 font-medium hidden sm:inline">CashView Club Network:</span>
          <span className="text-[#FFD86B] font-bold font-mono">CVC Live</span>
        </div>

        {/* View Switcher Pills in Luxury Gold */}
        <div className="flex items-center bg-[#141422] p-0.5 rounded-full border border-[#E8B94A]/30 shadow-inner">
          <button
            onClick={() => setViewMode('portal')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'portal'
                ? 'gold-btn text-black font-extrabold shadow-[0_0_18px_rgba(232,185,74,0.5)]'
                : 'text-gray-400 hover:text-[#FFD86B]'
            }`}
          >
            <span>🌐</span>
            <span>CVC Portal</span>
          </button>
          <button
            onClick={() => setViewMode('mining-app')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'mining-app'
                ? 'gold-btn text-black font-extrabold shadow-[0_0_18px_rgba(232,185,74,0.5)]'
                : 'text-gray-400 hover:text-[#FFD86B]'
            }`}
          >
            <span>⛏️</span>
            <span>Mining App</span>
          </button>
        </div>
      </div>

      {/* Main Content Render */}
      {viewMode === 'portal' ? (
        <CashViewPortal onStartMining={() => setViewMode('mining-app')} />
      ) : (
        <div className="flex-1 flex justify-center bg-[#050509]">
          {/* Mobile Telegram Frame Container matching snippet max-w-[430px] */}
          <div className="w-full max-w-[430px] min-h-screen bg-[#08080C] flex flex-col relative pb-8 shadow-2xl border-x border-[#E8B94A]/15">
            {/* Telegram Top Header & Profile Bar */}
            <TelegramHeader />

            {/* Tab Content Display */}
            <main className="flex-1 overflow-y-auto no-scrollbar">
              {activeTab === 'mine' && <MineTab />}
              {activeTab === 'tasks' && <TasksTab />}
              {activeTab === 'miners' && <MinersTab />}
              {activeTab === 'friends' && <FriendsTab />}
              {activeTab === 'profile' && <ProfileTab />}
            </main>

            {/* Floating Rounded 5-Tab Bottom Dock matching snippet */}
            <BottomNav />
          </div>
        </div>
      )}

      {/* Active Modals across views */}
      <WithdrawModal />
      <HistoryModal />
      <HashrateModal />
      <WatchAdModal />
      <GuideModal />
      <WalletConnectModal />

      {/* Toast notifications */}
      {toast && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-2xl bg-[#18150a] text-[#FFD86B] border border-[#E8B94A]/50 text-xs font-bold shadow-[0_0_20px_rgba(232,185,74,0.4)] backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-150 text-center max-w-[90vw]">
          {toast}
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
