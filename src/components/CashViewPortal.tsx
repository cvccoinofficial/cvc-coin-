import React, { useState } from 'react';
import cvcCoinImg from '../assets/images/cvc_coin_logo_1790815924567.jpg';
import { useApp } from '../context/AppContext';
import { X, FileText, CheckCircle2 } from 'lucide-react';
import { sound } from '../utils/sound';

interface CashViewPortalProps {
  onStartMining: () => void;
}

export const CashViewPortal: React.FC<CashViewPortalProps> = ({ onStartMining }) => {
  const { setIsWalletModalOpen, showToast } = useApp();
  const [activeSection, setActiveSection] = useState<'home' | 'tokenomics' | 'roadmap' | 'how-to-mine' | 'features'>('home');
  const [isWhitepaperOpen, setIsWhitepaperOpen] = useState(false);
  const [isDocsOpen, setIsDocsOpen] = useState(false);

  const scrollToSection = (id: string, section: typeof activeSection) => {
    sound.playTap();
    setActiveSection(section);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#050509] text-white flex flex-col font-['Inter',sans-serif]">
      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-4 sm:px-6 md:px-10 py-4 bg-[#0A0A12] border-b border-[#E8B94A]/15 sticky top-0 z-50 backdrop-blur-md">
        <div
          onClick={() => scrollToSection('hero-section', 'home')}
          className="flex items-center gap-3 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full bg-black border border-[#E8B94A]/40 flex items-center justify-center font-black text-[#E8B94A] text-sm shadow-[0_0_12px_rgba(232,185,74,0.3)]">
            CVC
          </div>
          <span className="text-xl sm:text-2xl md:text-3xl font-black text-[#E8B94A] tracking-wide">
            CVC Coin
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 text-[13px] text-gray-300">
          <button
            onClick={() => scrollToSection('hero-section', 'home')}
            className={`transition-colors cursor-pointer ${
              activeSection === 'home'
                ? 'text-[#E8B94A] border-b-2 border-[#E8B94A] pb-1 font-semibold'
                : 'hover:text-[#E8B94A]'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection('features-section', 'tokenomics')}
            className={`transition-colors cursor-pointer ${
              activeSection === 'tokenomics'
                ? 'text-[#E8B94A] border-b-2 border-[#E8B94A] pb-1 font-semibold'
                : 'hover:text-[#E8B94A]'
            }`}
          >
            Tokenomics
          </button>
          <button
            onClick={() => scrollToSection('features-section', 'roadmap')}
            className={`transition-colors cursor-pointer ${
              activeSection === 'roadmap'
                ? 'text-[#E8B94A] border-b-2 border-[#E8B94A] pb-1 font-semibold'
                : 'hover:text-[#E8B94A]'
            }`}
          >
            Roadmap
          </button>
          <button
            onClick={() => scrollToSection('features-section', 'how-to-mine')}
            className={`transition-colors cursor-pointer ${
              activeSection === 'how-to-mine'
                ? 'text-[#E8B94A] border-b-2 border-[#E8B94A] pb-1 font-semibold'
                : 'hover:text-[#E8B94A]'
            }`}
          >
            How to Mine
          </button>
          <button
            onClick={() => scrollToSection('features-section', 'features')}
            className={`transition-colors cursor-pointer ${
              activeSection === 'features'
                ? 'text-[#E8B94A] border-b-2 border-[#E8B94A] pb-1 font-semibold'
                : 'hover:text-[#E8B94A]'
            }`}
          >
            Features
          </button>
          <button
            onClick={() => {
              sound.playTap();
              setIsDocsOpen(true);
            }}
            className="hover:text-[#E8B94A] transition-colors cursor-pointer"
          >
            Docs
          </button>

          <button
            onClick={() => {
              sound.playTap();
              setIsWalletModalOpen(true);
            }}
            className="gold-btn text-black font-bold px-5 py-2 rounded-lg text-sm active:scale-95 transition-transform cursor-pointer"
          >
            Connect Wallet
          </button>

          {/* Quick jump to Mining App */}
          <button
            onClick={onStartMining}
            className="bg-[#18150a] border border-[#E8B94A]/40 text-[#FFD86B] hover:bg-[#201c0c] px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(232,185,74,0.25)] active:scale-95 cursor-pointer"
          >
            <span>⛏️</span> Mining App
          </button>
        </div>

        {/* Mobile Buttons */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onStartMining}
            className="bg-[#18150a] border border-[#E8B94A]/40 text-[#FFD86B] px-3 py-1.5 rounded-lg text-xs font-bold"
          >
            ⛏️ App
          </button>
          <button
            onClick={() => {
              sound.playTap();
              setIsWalletModalOpen(true);
            }}
            className="gold-btn text-black px-3.5 py-1.5 rounded-lg text-xs font-bold active:scale-95"
          >
            Connect
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section id="hero-section" className="relative bg-black overflow-hidden flex-1">
        {/* Ambient Golden Radial Glow */}
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 70% 50%, rgba(232,185,74,0.18), transparent 60%), linear-gradient(90deg, transparent, rgba(232,185,74,0.06))',
          }}
        />

        <div className="relative max-w-[1280px] mx-auto px-6 md:px-10 py-12 md:py-20 flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Left Text Column */}
          <div className="md:w-[52%] text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18150a] border border-[#E8B94A]/30 text-[#E8B94A] text-xs font-semibold mb-4">
              <span>⚡</span> CashView Club Official Token
            </div>

            <h1 className="text-[36px] sm:text-[44px] md:text-[56px] font-black leading-[1.0] tracking-tight">
              <span className="gold-text">CashView Club</span>
              <br />
              <span className="text-white">Future of Digital Earning</span>
            </h1>

            <p className="text-gray-300 text-[13px] md:text-[15px] mt-5 max-w-[520px] leading-relaxed mx-auto md:mx-0">
              The next-generation digital currency empowering secure, transparent, and profitable earnings through decentralized mining & staking.
            </p>

            {/* Action Buttons matching snippet */}
            <div className="flex flex-wrap gap-4 mt-8 justify-center md:justify-start">
              <button
                onClick={onStartMining}
                className="gold-btn text-black font-extrabold px-7 py-3.5 rounded-xl flex items-center gap-2 text-sm active:scale-95 transition-transform cursor-pointer"
              >
                <span>💎</span> Start Mining
              </button>

              <button
                onClick={() => {
                  sound.playTap();
                  setIsWhitepaperOpen(true);
                }}
                className="border border-[#E8B94A]/50 text-[#E8B94A] hover:bg-[#E8B94A]/10 px-7 py-3.5 rounded-xl flex items-center gap-2 text-sm bg-black/60 active:scale-95 transition-all cursor-pointer shadow-sm"
              >
                <span>📄</span> Whitepaper
              </button>
            </div>

            {/* Live Token Stats Strip */}
            <div className="grid grid-cols-3 gap-3 mt-10 pt-6 border-t border-white/5 max-w-[480px]">
              <div>
                <p className="text-[11px] text-gray-500 uppercase font-semibold">Price</p>
                <p className="text-base font-bold text-[#FFD86B] font-mono mt-0.5">$ 0.02</p>
              </div>
              <div>
                <p className="text-[11px] text-gray-500 uppercase font-semibold">Total Supply</p>
                <p className="text-base font-bold text-white font-mono mt-0.5">20M CVC</p>
              </div>
              <div>
                <p className="text-[11px] text-gray-500 uppercase font-semibold">Mining Pool</p>
                <p className="text-base font-bold text-emerald-400 font-mono mt-0.5">8M (40%)</p>
              </div>
            </div>
          </div>

          {/* Right Floating 3D Gold CVC Coin */}
          <div className="md:w-[48%] flex justify-center md:justify-end py-4">
            <div className="relative">
              {/* Outer Golden Aura Ring */}
              <div className="absolute inset-0 rounded-full bg-[#E8B94A]/20 blur-3xl animate-pulse" />

              <img
                src={cvcCoinImg}
                alt="CVC Coin Gold Emblem"
                className="coin-float relative w-[260px] sm:w-[320px] md:w-[440px] drop-shadow-[0_0_60px_rgba(232,185,74,0.5)] rounded-full select-none"
              />
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#E8B94A]/40 to-transparent" />
      </section>

      {/* FEATURES CARDS matching snippet */}
      <section id="features-section" className="bg-[#08080C] py-12 px-4 md:px-8">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {/* Card 1: Tokenomics */}
          <div className="card-glow bg-gradient-to-b from-[#13131A] to-[#0A0A0F] border border-[#E8B94A]/20 rounded-2xl p-6 text-center relative overflow-hidden transition-transform hover:-translate-y-1 duration-200">
            <div className="absolute -top-10 -left-10 w-20 h-20 bg-[#E8B94A]/10 blur-2xl pointer-events-none" />
            <div className="text-4xl mb-4">💎</div>
            <h3 className="text-[#FFD86B] font-bold text-lg">Tokenomics</h3>
            <p className="text-gray-300 text-[12px] mt-3 leading-relaxed">
              <span className="font-bold text-white">Total Supply: 20M CVC</span>
              <br />
              8M Mining (40%) • 4.4M Founder (22%)
              <br />
              4M Ecosystem (20%) • 2.6M Liquidity (13%)
              <br />
              1M Reserve (5%) • Price: $0.02
            </p>
          </div>

          {/* Card 2: Roadmap */}
          <div className="card-glow bg-gradient-to-b from-[#13131A] to-[#0A0A0F] border border-[#E8B94A]/20 rounded-2xl p-6 text-center transition-transform hover:-translate-y-1 duration-200">
            <div className="text-4xl mb-4">📈</div>
            <h3 className="text-[#FFD86B] font-bold text-lg">Roadmap</h3>
            <p className="text-gray-400 text-[12px] mt-3 leading-relaxed">
              Q4 2024: Mainnet Launch •<br />
              Q1 2025: Staking Live •<br />
              Q2 2025: Mobile App •<br />
              Q3 2025: Global Exchange
            </p>
          </div>

          {/* Card 3: How to Mine */}
          <div
            onClick={onStartMining}
            className="card-glow bg-gradient-to-b from-[#13131A] to-[#0A0A0F] border border-[#E8B94A]/20 rounded-2xl p-6 text-center transition-transform hover:-translate-y-1 duration-200 cursor-pointer group"
          >
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">⛏️</div>
            <h3 className="text-[#FFD86B] font-bold text-lg group-hover:text-white transition-colors">How to Mine</h3>
            <p className="text-gray-400 text-[12px] mt-3 leading-relaxed">
              Download App • Verify Wallet •<br />
              Start Earning CVC •<br />
              Stake for Rewards
            </p>
            <div className="mt-4 text-xs font-semibold text-[#E8B94A] group-hover:underline">
              Open Mining App →
            </div>
          </div>

          {/* Card 4: Features */}
          <div className="card-glow bg-gradient-to-b from-[#13131A] to-[#0A0A0F] border border-[#E8B94A]/20 rounded-2xl p-6 text-center transition-transform hover:-translate-y-1 duration-200">
            <div className="text-4xl mb-4">🛡️</div>
            <h3 className="text-[#FFD86B] font-bold text-lg">Features</h3>
            <p className="text-gray-400 text-[12px] mt-3 leading-relaxed">
              Secure • Low Fees • Fast
              <br />
              Transactions •<br />
              DeFi Ready
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER matching snippet */}
      <footer className="bg-[#0A0A12] border-t border-[#E8B94A]/10 py-5 text-center text-[12px] text-[#E8B94A]/70 tracking-wide px-4">
        © 2024 CashView Club • Secure • Decentralized • Audited • Privacy Policy • Terms
      </footer>

      {/* WHITEPAPER MODAL */}
      {isWhitepaperOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-xl bg-[#0c0c14] border border-[#E8B94A]/30 rounded-3xl p-6 shadow-2xl flex flex-col gap-4 text-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8B94A]/15">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#E8B94A]" />
                <h3 className="text-lg font-bold text-[#FFD86B]">CVC Coin Official Whitepaper</h3>
              </div>
              <button
                onClick={() => setIsWhitepaperOpen(false)}
                className="text-gray-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs leading-relaxed flex flex-col gap-3 text-gray-300 max-h-[60vh] overflow-y-auto pr-1">
              <p className="font-semibold text-white">
                Abstract: CashView Club (CVC) is a community-first decentralized token built on ultra-fast blockchain rails to power gamified cloud mining, yield farming, and decentralized commerce.
              </p>
              <div className="bg-[#141420] p-3 rounded-xl border border-white/5 flex flex-col gap-1.5">
                <span className="text-white font-bold">1. Token Economics (CVC)</span>
                <p>• Total Cap: 20,000,000 CVC fixed supply.</p>
                <p>• Reference Price: $0.02 USD</p>
                <p>• 40% (8,000,000 CVC) reserved for decentralized 8-hour mining cycles.</p>
                <p>• 22% (4,400,000 CVC) Founder allocation vested linearly over 36 months.</p>
                <p>• 20% (4,000,000 CVC) Ecosystem development, community & airdrops.</p>
                <p>• 13% (2,600,000 CVC) Liquidity pools & exchange listings.</p>
                <p>• 5% (1,000,000 CVC) Strategic treasury & emergency security reserve.</p>
              </div>
              <div className="bg-[#141420] p-3 rounded-xl border border-white/5 flex flex-col gap-1.5">
                <span className="text-white font-bold">2. Proof of Engagement Mining</span>
                <p>
                  CVC implements Proof-of-Engagement (PoE) automated 8-hour mining intervals with daily yield optimization. Hashrates range from 0.00 TH/s up to 59,494,664.00 TH/s across 8 unlocked store tiers.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2 border-t border-[#E8B94A]/15">
              <button
                onClick={() => {
                  setIsWhitepaperOpen(false);
                  showToast('Whitepaper PDF link ready');
                }}
                className="gold-btn text-black font-bold px-5 py-2.5 rounded-xl text-xs"
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DOCS MODAL */}
      {isDocsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-lg bg-[#0c0c14] border border-[#E8B94A]/30 rounded-3xl p-6 shadow-2xl flex flex-col gap-4 text-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8B94A]/15">
              <h3 className="text-lg font-bold text-[#FFD86B]">CashView Club Documentation</h3>
              <button
                onClick={() => setIsDocsOpen(false)}
                className="text-gray-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="text-xs text-gray-300 flex flex-col gap-2.5 leading-relaxed">
              <p className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#E8B94A]" /> Smart Contract Audits completed by top industry auditors.
              </p>
              <p className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#E8B94A]" /> Zero gas friction with TON / Web3 wallet compatibility.
              </p>
              <p className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#E8B94A]" /> High-yield referral commission system (10% ongoing team commission).
              </p>
            </div>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setIsDocsOpen(false)}
                className="bg-white/10 hover:bg-white/20 text-white font-semibold px-4 py-2 rounded-xl text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
