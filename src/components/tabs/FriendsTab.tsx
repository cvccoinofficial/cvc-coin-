import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ArtLogo } from '../ArtLogo';
import { Info, Link2, Users, Gift, Hourglass, Check, UserPlus, Copy, Send } from 'lucide-react';
import { sound } from '../../utils/sound';

export const FriendsTab: React.FC = () => {
  const {
    referral,
    claimReferralBonus,
    claimCommission,
    simulateInviteFriend,
    showToast,
  } = useApp();

  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    sound.playReward();
    navigator.clipboard.writeText(referral.inviteLink);
    setCopied(true);
    showToast('✓ Invite link copied to clipboard!');
    setTimeout(() => setCopied(false), 2400);
  };

  const handleShareTelegram = () => {
    sound.playTap();
    const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(
      referral.inviteLink
    )}&text=${encodeURIComponent(
      '☕ Mine CVC on Telegram! Claim +200 CVC bonus instantly and earn 10% mining rewards.'
    )}`;
    window.open(shareUrl, '_blank');
  };

  return (
    <div className="flex flex-col gap-4 pb-28 px-4 pt-2 animate-in fade-in duration-200">
      {/* Title Header in Gold Theme */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-white tracking-tight">
            <span className="gold-text">CVC Referral Squad</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">Invite friends & earn rewards</p>
        </div>
        <ArtLogo size={36} className="ring-2 ring-[#E8B94A]/40 rounded-full" />
      </div>

      {/* REFERRAL REWARDS Card in Gold theme */}
      <div className="bg-gradient-to-b from-[#13131A] to-[#0A0A0F] border border-[#E8B94A]/30 rounded-2xl p-4 shadow-[0_0_25px_rgba(232,185,74,0.1)] flex flex-col gap-3">
        <div className="flex items-center gap-2 text-[#FFD86B]">
          <Info className="w-4 h-4 shrink-0" />
          <span className="text-[11px] font-bold tracking-wider uppercase">REFERRAL REWARDS</span>
        </div>

        {/* Instant invite bonus item */}
        <div className="bg-[#141420] border border-[#E8B94A]/25 rounded-xl p-3 flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#18150a] border border-[#E8B94A]/40 flex items-center justify-center text-[#FFD86B] shrink-0 mt-0.5">
            <Link2 className="w-4 h-4" />
          </div>

          <div className="flex flex-col">
            <span className="text-xs font-bold text-white">Instant invite bonus</span>
            <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
              When a friend joins with your link, you get{' '}
              <span className="text-[#FFD86B] font-semibold font-mono">+200 CVC</span> per referral.
              Claim from the card below.
            </p>
          </div>
        </div>

        {/* Mining commission item */}
        <div className="bg-[#141420] border border-[#E8B94A]/25 rounded-xl p-3 flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#18150a] border border-[#E8B94A]/40 flex items-center justify-center text-[#FFD86B] shrink-0 mt-0.5 font-bold text-sm">
            %
          </div>

          <div className="flex flex-col">
            <span className="text-xs font-bold text-white">Mining commission</span>
            <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
              You earn <span className="text-[#FFD86B] font-semibold font-mono">10%</span> of every CVC
              your referrals mine. Team commission builds up automatically — claim anytime.
            </p>
          </div>
        </div>

        {/* Footer summary text */}
        <div className="text-center text-[11px] text-slate-400 pt-1">
          Bonus: <span className="text-[#FFD86B] font-bold font-mono">200 CVC</span> · Commission:{' '}
          <span className="text-[#FFD86B] font-bold font-mono">10%</span>
        </div>
      </div>

      {/* Your Invite Link Card */}
      <div className="bg-gradient-to-b from-[#13131A] to-[#0A0A0F] border border-[#E8B94A]/30 rounded-2xl p-3.5 shadow-md flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0 pr-2">
            <div className="w-10 h-10 rounded-xl bg-[#18150a] border border-[#E8B94A]/30 flex items-center justify-center text-[#FFD86B] shrink-0">
              <Link2 className="w-5 h-5" />
            </div>

            <div className="flex flex-col truncate">
              <span className="text-xs font-bold text-white">Your Invite Link</span>
              <span className="text-[11px] font-mono text-slate-400 truncate mt-0.5">
                {referral.inviteLink}
              </span>
            </div>
          </div>

          {/* Animated Copy Button with checkmark transition in Gold */}
          <button
            onClick={handleCopyLink}
            className={`min-w-[92px] h-9 px-3.5 rounded-full text-xs font-extrabold transition-all duration-300 flex items-center justify-center gap-1.5 active:scale-95 shrink-0 cursor-pointer ${
              copied
                ? 'gold-btn text-black shadow-[0_0_20px_rgba(232,185,74,0.6)] scale-105'
                : 'gold-btn text-black shadow-[0_0_15px_rgba(232,185,74,0.4)]'
            }`}
            title="Copy Invite Link"
          >
            {copied ? (
              <span className="flex items-center gap-1.5 animate-in zoom-in-75 duration-200">
                <Check className="w-3.5 h-3.5 stroke-[3] text-black animate-in zoom-in spin-in-12 duration-200" />
                <span className="font-extrabold tracking-tight">Copied!</span>
              </span>
            ) : (
              <span className="flex items-center gap-1.5 transition-all">
                <Copy className="w-3.5 h-3.5 stroke-[2.2]" />
                <span>Copy</span>
              </span>
            )}
          </button>
        </div>

        {/* Telegram Direct Share Action Button */}
        <div className="pt-1 border-t border-white/5 flex items-center gap-2">
          <button
            onClick={handleShareTelegram}
            className="w-full py-2 px-3 rounded-xl bg-[#18150a] hover:bg-[#201c0c] border border-[#E8B94A]/30 text-[#FFD86B] text-xs font-bold flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Share Link to Telegram</span>
          </button>
        </div>
      </div>

      {/* Your Referrals Card */}
      <div className="bg-gradient-to-b from-[#13131A] to-[#0A0A0F] border border-[#E8B94A]/30 rounded-2xl p-3.5 shadow-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#18150a] border border-[#E8B94A]/30 flex items-center justify-center text-[#FFD86B] shrink-0">
            <Users className="w-5 h-5" />
          </div>

          <div className="flex flex-col">
            <span className="text-xs font-bold text-white">Your Referrals</span>
            <span className="text-[11px] text-slate-400 mt-0.5 font-mono">
              {referral.referralCount} friends joined with your link
            </span>
          </div>
        </div>

        {/* Simulation button for quick friend invite */}
        <button
          onClick={simulateInviteFriend}
          className="p-2 rounded-xl bg-[#18150a] hover:bg-[#221c0b] text-[#FFD86B] text-xs font-medium flex items-center gap-1 border border-[#E8B94A]/30 active:scale-95 transition-all cursor-pointer"
          title="Simulate friend joining"
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>+ Demo</span>
        </button>
      </div>

      {/* Invite Bonus Claim Card */}
      <div className="bg-gradient-to-b from-[#13131A] to-[#0A0A0F] border border-[#E8B94A]/30 rounded-2xl p-3.5 shadow-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#18150a] border border-[#E8B94A]/30 flex items-center justify-center text-[#FFD86B] shrink-0">
            <Gift className="w-5 h-5" />
          </div>

          <div className="flex flex-col">
            <span className="text-xs font-bold text-white">Invite Bonus</span>
            <span className="text-[11px] text-slate-400 mt-0.5">
              <span className="text-slate-300 font-semibold">{referral.unclaimedBonusArt} unclaimed</span>{' '}
              · <span className="text-[#FFD86B] font-mono font-semibold">+200 CVC each</span>
            </span>
          </div>
        </div>

        <button
          onClick={claimReferralBonus}
          disabled={referral.unclaimedBonusArt <= 0}
          className={`px-5 py-2 rounded-full text-xs font-bold transition-all shrink-0 ${
            referral.unclaimedBonusArt > 0
              ? 'gold-btn text-black font-extrabold shadow-[0_0_15px_rgba(232,185,74,0.4)] active:scale-95 cursor-pointer'
              : 'bg-[#18150a] text-slate-500 cursor-not-allowed border border-white/5'
          }`}
        >
          Claim
        </button>
      </div>

      {/* Team Commission Claim Card */}
      <div className="bg-gradient-to-b from-[#13131A] to-[#0A0A0F] border border-[#E8B94A]/30 rounded-2xl p-3.5 shadow-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#18150a] border border-[#E8B94A]/30 flex items-center justify-center text-[#FFD86B] shrink-0">
            <Hourglass className="w-5 h-5" />
          </div>

          <div className="flex flex-col">
            <span className="text-xs font-bold text-white">Team Commission (10%)</span>
            <span className="text-[11px] text-slate-400 mt-0.5">
              Available:{' '}
              <span className="text-[#FFD86B] font-mono font-semibold">
                +{referral.teamCommissionArt.toFixed(2)} CVC
              </span>
            </span>
          </div>
        </div>

        <button
          onClick={claimCommission}
          disabled={referral.teamCommissionArt <= 0}
          className={`px-5 py-2 rounded-full text-xs font-bold transition-all shrink-0 ${
            referral.teamCommissionArt > 0
              ? 'gold-btn text-black font-extrabold shadow-[0_0_15px_rgba(232,185,74,0.4)] active:scale-95 cursor-pointer'
              : 'bg-[#18150a] text-slate-500 cursor-not-allowed border border-white/5'
          }`}
        >
          Claim
        </button>
      </div>
    </div>
  );
};
