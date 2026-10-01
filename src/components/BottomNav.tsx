import React from 'react';
import { useApp } from '../context/AppContext';
import { TabType } from '../types';
import { sound } from '../utils/sound';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab } = useApp();

  const handleTabChange = (tab: TabType) => {
    sound.playTap();
    setActiveTab(tab);
  };

  return (
    <nav className="fixed bottom-4 left-4 right-4 max-w-[400px] mx-auto z-40 bg-[#0A0A12]/95 backdrop-blur-xl border border-[#E8B94A]/30 rounded-[28px] flex justify-around items-center py-2.5 shadow-[0_10px_40px_rgba(0,0,0,0.85)]">
      {/* Mine */}
      <button
        onClick={() => handleTabChange('mine')}
        className={`flex flex-col items-center justify-center transition-all cursor-pointer ${
          activeTab === 'mine' ? 'text-[#FFD86B]' : 'text-gray-400 hover:text-gray-200'
        }`}
      >
        <div className="text-xl leading-none">⛏️</div>
        <p className={`text-[11px] mt-1 font-semibold ${activeTab === 'mine' ? 'text-[#FFD86B] font-extrabold' : 'text-gray-400'}`}>
          Mine
        </p>
      </button>

      {/* Tasks */}
      <button
        onClick={() => handleTabChange('tasks')}
        className={`flex flex-col items-center justify-center transition-all cursor-pointer ${
          activeTab === 'tasks' ? 'text-[#FFD86B]' : 'text-gray-400 hover:text-gray-200'
        }`}
      >
        <div className="text-xl leading-none">☑</div>
        <p className={`text-[11px] mt-1 font-semibold ${activeTab === 'tasks' ? 'text-[#FFD86B] font-extrabold' : 'text-gray-400'}`}>
          Tasks
        </p>
      </button>

      {/* Elevated Miners Center Button in Gold matching theme */}
      <button
        onClick={() => handleTabChange('miners')}
        className="flex flex-col items-center justify-center -mt-6 group active:scale-95 transition-transform cursor-pointer"
      >
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all text-xl shadow-lg ${
            activeTab === 'miners'
              ? 'gold-btn border-[#FFD86B] text-black shadow-[0_0_25px_rgba(232,185,74,0.65)] scale-105'
              : 'bg-[#18150a] border-[#E8B94A]/40 text-[#FFD86B] hover:border-[#FFD86B] shadow-[0_0_15px_rgba(232,185,74,0.3)]'
          }`}
        >
          ⚡
        </div>
        <p className={`text-[11px] mt-1 font-bold ${activeTab === 'miners' ? 'text-[#FFD86B]' : 'text-gray-400 group-hover:text-[#FFD86B]'}`}>
          Miners
        </p>
      </button>

      {/* Friends */}
      <button
        onClick={() => handleTabChange('friends')}
        className={`flex flex-col items-center justify-center transition-all cursor-pointer ${
          activeTab === 'friends' ? 'text-[#FFD86B]' : 'text-gray-400 hover:text-gray-200'
        }`}
      >
        <div className="text-xl leading-none">👥</div>
        <p className={`text-[11px] mt-1 font-semibold ${activeTab === 'friends' ? 'text-[#FFD86B] font-extrabold' : 'text-gray-400'}`}>
          Friends
        </p>
      </button>

      {/* Profile */}
      <button
        onClick={() => handleTabChange('profile')}
        className={`flex flex-col items-center justify-center transition-all cursor-pointer ${
          activeTab === 'profile' ? 'text-[#FFD86B]' : 'text-gray-400 hover:text-gray-200'
        }`}
      >
        <div className="text-xl leading-none">👤</div>
        <p className={`text-[11px] mt-1 font-semibold ${activeTab === 'profile' ? 'text-[#FFD86B] font-extrabold' : 'text-gray-400'}`}>
          Profile
        </p>
      </button>
    </nav>
  );
};
