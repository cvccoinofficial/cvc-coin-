import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ArtLogo } from './ArtLogo';
import { HelpCircle, Volume2, VolumeX, RefreshCw, Share2 } from 'lucide-react';
import { sound } from '../utils/sound';

export const TelegramHeader: React.FC = () => {
  const { user, setIsWalletModalOpen, setIsGuideOpen, toggleSound, showToast } = useApp();
  const [showMenu, setShowMenu] = useState(false);

  const truncatedWallet = user.tonWallet
    ? `${user.tonWallet.slice(0, 6)}...${user.tonWallet.slice(-6)}`
    : 'UQC6mP...u_Vu-T';

  return (
    <header className="sticky top-0 z-40 bg-[#0A0A12] transition-colors border-b border-[#E8B94A]/20">
      {/* Top Chrome: Telegram WebApp Controls matching snippet */}
      <div className="flex items-center justify-between p-4 bg-[#0A0A12]">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              sound.playTap();
              showToast('Telegram Mini App minimized');
            }}
            className="text-xl leading-none text-white hover:text-[#FFD86B] transition-colors cursor-pointer"
            title="Close"
          >
            ✕
          </button>
          <h1
            onClick={() => setIsGuideOpen(true)}
            className="text-xl font-bold cursor-pointer text-[#FFD86B] hover:text-[#E8B94A] transition-colors flex items-center gap-1"
          >
            CVC ⛏️
          </h1>
        </div>

        <div className="flex items-center gap-2 relative">
          <button
            onClick={() => setIsGuideOpen(true)}
            className="text-gray-400 hover:text-[#FFD86B] transition-colors text-lg cursor-pointer"
            title="Info"
          >
            ⌄
          </button>
          <button
            onClick={() => {
              sound.playTap();
              setShowMenu(!showMenu);
            }}
            className="text-gray-400 hover:text-[#FFD86B] transition-colors ml-2 text-lg cursor-pointer"
            title="Menu"
          >
            ⋮
          </button>

          {showMenu && (
            <div className="absolute right-0 top-8 w-44 bg-[#141420] border border-[#E8B94A]/30 rounded-xl shadow-2xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
              <button
                onClick={() => {
                  setShowMenu(false);
                  setIsGuideOpen(true);
                }}
                className="w-full px-3.5 py-2 text-left text-xs text-slate-200 hover:bg-[#1f1f30] flex items-center gap-2"
              >
                <HelpCircle className="w-4 h-4 text-[#FFD86B]" />
                How to Mine
              </button>
              <button
                onClick={() => {
                  setShowMenu(false);
                  toggleSound();
                }}
                className="w-full px-3.5 py-2 text-left text-xs text-slate-200 hover:bg-[#1f1f30] flex items-center gap-2"
              >
                {user.soundEffects ? (
                  <>
                    <Volume2 className="w-4 h-4 text-[#FFD86B]" />
                    Sound: Enabled
                  </>
                ) : (
                  <>
                    <VolumeX className="w-4 h-4 text-slate-400" />
                    Sound: Muted
                  </>
                )}
              </button>
              <button
                onClick={() => {
                  setShowMenu(false);
                  navigator.clipboard.writeText(window.location.href);
                  showToast('App link copied to clipboard!');
                }}
                className="w-full px-3.5 py-2 text-left text-xs text-slate-200 hover:bg-[#1f1f30] flex items-center gap-2"
              >
                <Share2 className="w-4 h-4 text-[#E8B94A]" />
                Share App
              </button>
              <button
                onClick={() => {
                  setShowMenu(false);
                  window.location.reload();
                }}
                className="w-full px-3.5 py-2 text-left text-xs text-slate-200 hover:bg-[#1f1f30] flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4 text-slate-400" />
                Reload
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Profile Bar matching snippet */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#0D0D18] border-t border-[#E8B94A]/15">
        <div className="flex items-center gap-3">
          <div className="relative">
            <ArtLogo size={40} className="rounded-full ring-2 ring-[#E8B94A]/40" />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#FFD86B] border border-[#0A0A12] rounded-full" />
          </div>

          <div>
            <p className="font-bold text-white text-sm">{user.name}</p>
            <div className="flex gap-2 text-[11px] mt-0.5">
              <span className="bg-white/10 px-2 py-0.5 rounded-full text-slate-200">
                Lvl {user.level}
              </span>
              {user.verified && (
                <span className="bg-[#18150a] text-[#FFD86B] px-2 py-0.5 rounded-full border border-[#E8B94A]/30 font-medium">
                  ✓ Verified
                </span>
              )}
            </div>
          </div>
        </div>

        {/* TON Wallet Pill in Gold */}
        <button
          onClick={() => {
            sound.playTap();
            setIsWalletModalOpen(true);
          }}
          className="bg-[#18150a] border border-[#E8B94A]/40 px-3 py-1.5 rounded-full text-xs flex items-center gap-1.5 text-[#FFD86B] font-mono active:scale-95 transition-transform shadow-[0_0_12px_rgba(232,185,74,0.15)] cursor-pointer"
        >
          <span className="text-[#FFD86B]">◆</span>
          <span className="truncate max-w-[130px]">{truncatedWallet}</span>
        </button>
      </div>
    </header>
  );
};
