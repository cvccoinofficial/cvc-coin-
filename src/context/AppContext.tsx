import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  WalletState,
  MiningState,
  MinerTier,
  TaskItem,
  ReferralState,
  TransactionRecord,
  TabType,
} from '../types';
import { sound } from '../utils/sound';
import confetti from 'canvas-confetti';

interface AppContextType {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  user: UserProfile;
  wallet: WalletState;
  mining: MiningState;
  tasks: TaskItem[];
  adsWatchedToday: number;
  adDailyLimit: number;
  referral: ReferralState;
  transactions: TransactionRecord[];
  // Actions
  claimCycleReward: () => void;
  startMiningCycle: () => void;
  fastForwardMining: () => void;
  buyMiner: (tierLevel: number) => { success: boolean; message: string };
  completeTask: (taskId: string) => Promise<void>;
  watchAd: () => Promise<void>;
  claimReferralBonus: () => void;
  claimCommission: () => void;
  simulateInviteFriend: () => void;
  withdrawToTon: (amount: number, address: string) => { success: boolean; message: string };
  toggleSound: () => void;
  updateTonWallet: (address: string) => void;
  // Modals
  isWithdrawOpen: boolean;
  setIsWithdrawOpen: (open: boolean) => void;
  isHistoryOpen: boolean;
  setIsHistoryOpen: (open: boolean) => void;
  isHashrateOpen: boolean;
  setIsHashrateOpen: (open: boolean) => void;
  isGuideOpen: boolean;
  setIsGuideOpen: (open: boolean) => void;
  isWalletModalOpen: boolean;
  setIsWalletModalOpen: (open: boolean) => void;
  isAdModalOpen: boolean;
  setIsAdModalOpen: (open: boolean) => void;
  // Toast notifications
  toast: string | null;
  showToast: (msg: string) => void;
}

// 20M Fixed Supply: Base Level 1 yields 0.30 CVC per 24h (0.10 CVC / 8h cycle, 0.0125 CVC/h)
const initialMiners: MinerTier[] = [
  { level: 1, costArt: 0, speedTh: 0.30, rateArtPerHour: 0.0125, status: 'active' }, // 0.30 CVC/24h (0.10/8h)
  { level: 2, costArt: 10, speedTh: 1.00, rateArtPerHour: 0.0250, status: 'available' }, // 0.60 CVC/24h
  { level: 3, costArt: 25, speedTh: 2.50, rateArtPerHour: 0.0500, status: 'available' }, // 1.20 CVC/24h
  { level: 4, costArt: 50, speedTh: 6.00, rateArtPerHour: 0.1000, status: 'available' }, // 2.40 CVC/24h
  { level: 5, costArt: 100, speedTh: 15.00, rateArtPerHour: 0.2500, status: 'available' }, // 6.00 CVC/24h
  { level: 6, costArt: 200, speedTh: 35.00, rateArtPerHour: 0.5000, status: 'available' }, // 12.00 CVC/24h
  { level: 7, costArt: 450, speedTh: 80.00, rateArtPerHour: 1.2000, status: 'available' }, // 28.80 CVC/24h
  { level: 8, costArt: 1000, speedTh: 200.00, rateArtPerHour: 3.0000, status: 'available' }, // 72.00 CVC/24h
];

const initialTasks: TaskItem[] = [
  { id: 't1', title: 'CVC OFFICIAL TELEGRAM (JOIN)', rewardArt: 5, isDone: true, category: 'partner' },
  { id: 't2', title: 'CVC GLOBAL COMMUNITY (JOIN)', rewardArt: 5, isDone: true, category: 'partner' },
  { id: 't3', title: 'CashView Club (X/Twitter) Follow', rewardArt: 5, isDone: false, category: 'social', actionText: 'Go', url: 'https://twitter.com' },
  { id: 't4', title: 'Join CVC Staking Announcement', rewardArt: 5, isDone: true, category: 'partner' },
  { id: 't5', title: 'JOIN TON ECOSYSTEM PARTNER', rewardArt: 2.5, isDone: true, category: 'partner' },
  { id: 't6', title: 'React And Join CVC Portal', rewardArt: 2.5, isDone: true, category: 'partner' },
  { id: 't7', title: 'AIRDROP FILTER BOT', rewardArt: 2.5, isDone: false, category: 'partner', actionText: 'Go' },
  { id: 't8', title: 'CRYPTO NEWSLETTER SUB', rewardArt: 2.5, isDone: false, category: 'partner', actionText: 'Go' },
  { id: 't9', title: 'Retweet & Like CVC Tokenomics', rewardArt: 2.5, isDone: false, category: 'social', actionText: 'Go' },
  { id: 't10', title: 'SPONSOR DEX LISTING', rewardArt: 2.5, isDone: false, category: 'partner', actionText: 'Go' },
];

const initialTransactions: TransactionRecord[] = [
  { id: 'tx-1', type: 'task_reward', title: 'Task: CVC OFFICIAL TELEGRAM', amountArt: 5, timestamp: 'Today, 03:12', status: 'Completed' },
  { id: 'tx-2', type: 'task_reward', title: 'Task: CVC GLOBAL COMMUNITY', amountArt: 5, timestamp: 'Today, 03:15', status: 'Completed' },
  { id: 'tx-3', type: 'ad_reward', title: 'Daily Video Ads Bonus', amountArt: 10, timestamp: 'Today, 04:10', status: 'Completed' },
  { id: 'tx-4', type: 'mine_claim', title: '8-Hour Mining Cycle Claimed', amountArt: 0.10, timestamp: 'Today, 04:25', status: 'Completed' },
];

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<TabType>('mine');

  // Modals state
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isHashrateOpen, setIsHashrateOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isAdModalOpen, setIsAdModalOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Core App State
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('art_user');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return {
      name: 'Mr.',
      userId: '888089443',
      level: 1,
      verified: true,
      soundEffects: true,
      tonWallet: 'UQC6mPv8Y91u7X4K_zT5mFvLq0WbRn2pKs4YtV8u_Vu-T',
    };
  });

  const [wallet, setWallet] = useState<WalletState>(() => {
    const saved = localStorage.getItem('art_wallet');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...parsed,
          artPriceUsd: 0.02,
        };
      } catch {}
    }
    return {
      totalAssets: 150.00,
      holdingWallet: 0.00,
      poolWallet: 150.00,
      artPriceUsd: 0.02,
      priceChangePercent: 3.45,
      priceChangeUsd: 0.0007,
    };
  });

  const [mining, setMining] = useState<MiningState>(() => {
    const saved = localStorage.getItem('art_mining');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...parsed,
          miners: initialMiners,
          currentReward: Math.min(parsed.currentReward || 0.038, 0.10),
          totalHashrate: 0.30,
        };
      } catch {}
    }
    return {
      isMining: true,
      cycleRemainingSeconds: 27710, // 07:41:50
      totalCycleSeconds: 28800, // 8 hours
      currentReward: 0.0038, // 1090s elapsed of 28800s * 0.10 CVC
      totalHashrate: 0.30,
      miners: initialMiners,
      todayPnl: 0.00,
    };
  });

  const [tasks, setTasks] = useState<TaskItem[]>(() => {
    const saved = localStorage.getItem('art_tasks');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return initialTasks;
  });

  const [adsWatchedToday, setAdsWatchedToday] = useState<number>(() => {
    const saved = localStorage.getItem('art_ads_watched');
    return saved !== null ? parseInt(saved, 10) : 5;
  });

  const adDailyLimit = 5;

  const [referral, setReferral] = useState<ReferralState>(() => {
    const saved = localStorage.getItem('art_referral');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return {
      inviteLink: 'https://t.me/CashViewClub_Bot?start=ref_888089443',
      referralCount: 0,
      unclaimedBonusArt: 0,
      teamCommissionArt: 0.00,
      referralsList: [],
    };
  });

  const [transactions, setTransactions] = useState<TransactionRecord[]>(() => {
    const saved = localStorage.getItem('art_transactions');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return initialTransactions;
  });

  // Sound sync
  useEffect(() => {
    sound.enabled = user.soundEffects;
  }, [user.soundEffects]);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('art_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('art_wallet', JSON.stringify(wallet));
  }, [wallet]);

  useEffect(() => {
    localStorage.setItem('art_mining', JSON.stringify(mining));
  }, [mining]);

  useEffect(() => {
    localStorage.setItem('art_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('art_ads_watched', adsWatchedToday.toString());
  }, [adsWatchedToday]);

  useEffect(() => {
    localStorage.setItem('art_referral', JSON.stringify(referral));
  }, [referral]);

  useEffect(() => {
    localStorage.setItem('art_transactions', JSON.stringify(transactions));
  }, [transactions]);

  // Mining countdown timer calibrated to 0.30 CVC per 24h (0.10 CVC per 8h cycle)
  useEffect(() => {
    if (!mining.isMining) return;

    const activeMiners = mining.miners.filter((m) => m.status === 'active');
    const hourlyRate = activeMiners.reduce((acc, m) => acc + m.rateArtPerHour, 0); // 0.0125 for Level 1 = 0.30 CVC / 24h
    const cycleTotalReward = hourlyRate * 8; // 0.10 CVC per 8-hour cycle

    const timer = setInterval(() => {
      setMining((prev) => {
        if (prev.cycleRemainingSeconds <= 1) {
          return {
            ...prev,
            cycleRemainingSeconds: 0,
            isMining: false,
            currentReward: Number(cycleTotalReward.toFixed(4)),
          };
        }
        const remaining = prev.cycleRemainingSeconds - 1;
        const elapsed = prev.totalCycleSeconds - remaining;
        const calculatedReward = Number(((elapsed / prev.totalCycleSeconds) * cycleTotalReward).toFixed(4));
        return {
          ...prev,
          cycleRemainingSeconds: remaining,
          currentReward: calculatedReward,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [mining.isMining, mining.miners]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast(null);
    }, 2800);
  };

  const toggleSound = () => {
    setUser((prev) => ({
      ...prev,
      soundEffects: !prev.soundEffects,
    }));
    sound.playTap();
  };

  const updateTonWallet = (address: string) => {
    setUser((prev) => ({
      ...prev,
      tonWallet: address,
      verified: true,
    }));
    showToast('TON Wallet updated successfully!');
    sound.playSuccess();
  };

  // Start a new 8h mining cycle
  const startMiningCycle = () => {
    sound.playTap();
    setMining((prev) => ({
      ...prev,
      isMining: true,
      cycleRemainingSeconds: 28800, // 8h
      currentReward: 0.0000,
    }));
    showToast('⚡ Mining cycle started! (0.30 CVC / 24h rate)');
  };

  // Claim cycle reward
  const claimCycleReward = () => {
    const reward = mining.currentReward > 0 ? mining.currentReward : 0.1000;
    sound.playReward();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#FFD86B', '#E8B94A', '#ffffff'],
    });

    setWallet((prev) => ({
      ...prev,
      totalAssets: Number((prev.totalAssets + reward).toFixed(4)),
      poolWallet: Number((prev.poolWallet + reward).toFixed(4)),
    }));

    setMining((prev) => ({
      ...prev,
      todayPnl: Number((prev.todayPnl + reward).toFixed(4)),
      cycleRemainingSeconds: 28800,
      currentReward: 0.0000,
      isMining: true,
    }));

    const newTx: TransactionRecord = {
      id: `tx-${Date.now()}`,
      type: 'mine_claim',
      title: 'Mining Cycle Reward Claimed',
      amountArt: reward,
      timestamp: 'Just now',
      status: 'Completed',
    };
    setTransactions((prev) => [newTx, ...prev]);

    showToast(`Claimed +${reward.toFixed(4)} CVC to Pool Wallet!`);
  };

  // Fast forward mining for demo / testing
  const fastForwardMining = () => {
    sound.playTap();
    setMining((prev) => {
      const activeMiners = prev.miners.filter((m) => m.status === 'active');
      const hourlyRate = activeMiners.reduce((acc, m) => acc + m.rateArtPerHour, 0);
      const cycleTotalReward = hourlyRate * 8;
      const newRemaining = Math.max(0, prev.cycleRemainingSeconds - 3600);
      const elapsed = prev.totalCycleSeconds - newRemaining;
      const calculatedReward = Number(((elapsed / prev.totalCycleSeconds) * cycleTotalReward).toFixed(4));
      return {
        ...prev,
        cycleRemainingSeconds: newRemaining,
        currentReward: calculatedReward,
        isMining: newRemaining > 0,
      };
    });
    showToast('⏩ Fast-forwarded 1 Hour (+0.0125 CVC)!');
  };

  // Buy miner tier
  const buyMiner = (tierLevel: number) => {
    sound.playTap();
    const targetMiner = mining.miners.find((m) => m.level === tierLevel);
    if (!targetMiner) return { success: false, message: 'Miner not found' };

    if (targetMiner.status === 'active') {
      return { success: false, message: 'This miner is already active!' };
    }

    if (wallet.poolWallet < targetMiner.costArt) {
      sound.playTap();
      showToast(`Insufficient CVC! Need ${targetMiner.costArt} CVC.`);
      return { success: false, message: 'Insufficient CVC balance' };
    }

    // Deduct cost and update miner list
    sound.playUpgrade();
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.5 },
      colors: ['#FFD86B', '#E8B94A', '#ffffff'],
    });

    const newPoolBalance = Number((wallet.poolWallet - targetMiner.costArt).toFixed(4));
    const newTotalAssets = Number((wallet.totalAssets - targetMiner.costArt).toFixed(4));

    setWallet((prev) => ({
      ...prev,
      poolWallet: newPoolBalance,
      totalAssets: newTotalAssets,
    }));

    const newSpeed = Number((mining.totalHashrate + targetMiner.speedTh).toFixed(2));

    setMining((prev) => ({
      ...prev,
      totalHashrate: newSpeed,
      miners: prev.miners.map((m) => {
        if (m.level === tierLevel) {
          return { ...m, status: 'active' };
        }
        // Unlock next tier
        if (m.level === tierLevel + 1 && m.status === 'locked') {
          return { ...m, status: 'available' };
        }
        return m;
      }),
    }));

    const newTx: TransactionRecord = {
      id: `tx-${Date.now()}`,
      type: 'miner_buy',
      title: `Upgraded to Tier ${tierLevel} Miner`,
      amountArt: -targetMiner.costArt,
      timestamp: 'Just now',
      status: 'Completed',
    };
    setTransactions((prev) => [newTx, ...prev]);

    showToast(`🎉 Tier ${tierLevel} Miner Activated! Speed: +${targetMiner.speedTh} TH/s`);
    return { success: true, message: 'Miner activated' };
  };

  // Complete a task
  const completeTask = async (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task || task.isDone) return;

    if (task.url) {
      window.open(task.url, '_blank');
    }

    // Simulation delay
    await new Promise((res) => setTimeout(res, 1400));

    sound.playReward();
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#FFD86B', '#E8B94A', '#ffffff'],
    });

    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, isDone: true } : t))
    );

    setWallet((prev) => ({
      ...prev,
      totalAssets: Number((prev.totalAssets + task.rewardArt).toFixed(4)),
      poolWallet: Number((prev.poolWallet + task.rewardArt).toFixed(4)),
    }));

    const newTx: TransactionRecord = {
      id: `tx-${Date.now()}`,
      type: 'task_reward',
      title: `Task: ${task.title}`,
      amountArt: task.rewardArt,
      timestamp: 'Just now',
      status: 'Completed',
    };
    setTransactions((prev) => [newTx, ...prev]);

    showToast(`✓ Task Completed! +${task.rewardArt} CVC to Pool`);
  };

  // Watch video ad simulation
  const watchAd = async () => {
    if (adsWatchedToday >= adDailyLimit) {
      showToast('Daily video limit reached (5/5). Resets at 00:00 UTC.');
      return;
    }
    setIsAdModalOpen(true);
  };

  // Claim referral signup bonus
  const claimReferralBonus = () => {
    if (referral.unclaimedBonusArt <= 0) return;
    const bonus = referral.unclaimedBonusArt;

    sound.playReward();
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFD86B', '#E8B94A', '#ffffff'],
    });

    setWallet((prev) => ({
      ...prev,
      totalAssets: Number((prev.totalAssets + bonus).toFixed(4)),
      poolWallet: Number((prev.poolWallet + bonus).toFixed(4)),
    }));

    setReferral((prev) => ({
      ...prev,
      unclaimedBonusArt: 0,
    }));

    const newTx: TransactionRecord = {
      id: `tx-${Date.now()}`,
      type: 'referral_bonus',
      title: `Squad Bonus: +${bonus} CVC`,
      amountArt: bonus,
      timestamp: 'Just now',
      status: 'Completed',
    };
    setTransactions((prev) => [newTx, ...prev]);

    showToast(`🎉 Claimed +${bonus} CVC Referral Bonus!`);
  };

  // Claim 10% ongoing team commission
  const claimCommission = () => {
    if (referral.teamCommissionArt <= 0) return;
    const comm = referral.teamCommissionArt;

    sound.playReward();
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFD86B', '#E8B94A', '#ffffff'],
    });

    setWallet((prev) => ({
      ...prev,
      totalAssets: Number((prev.totalAssets + comm).toFixed(4)),
      poolWallet: Number((prev.poolWallet + comm).toFixed(4)),
    }));

    setReferral((prev) => ({
      ...prev,
      teamCommissionArt: 0,
    }));

    const newTx: TransactionRecord = {
      id: `tx-${Date.now()}`,
      type: 'commission_claim',
      title: `Team 10% Commission Claimed`,
      amountArt: comm,
      timestamp: 'Just now',
      status: 'Completed',
    };
    setTransactions((prev) => [newTx, ...prev]);

    showToast(`🎉 Claimed +${comm.toFixed(2)} CVC Team Commission!`);
  };

  // Simulate friend joining for testing
  const simulateInviteFriend = () => {
    sound.playSuccess();
    setReferral((prev) => ({
      ...prev,
      referralCount: prev.referralCount + 1,
      unclaimedBonusArt: prev.unclaimedBonusArt + 200,
      teamCommissionArt: Number((prev.teamCommissionArt + 0.15).toFixed(2)),
      referralsList: [
        {
          id: `ref-${Date.now()}`,
          name: `User_${Math.floor(1000 + Math.random() * 9000)}`,
          joinedDate: 'Just now',
          reward: 200,
        },
        ...prev.referralsList,
      ],
    }));

    showToast('🎉 Friend joined via your link! +200 CVC bonus ready to claim!');
  };

  // Withdraw to TON
  const withdrawToTon = (amount: number, address: string) => {
    sound.playTap();
    if (amount < 50) {
      showToast('Minimum withdrawal is 50 CVC');
      return { success: false, message: 'Minimum withdrawal is 50 CVC' };
    }

    if (amount > wallet.poolWallet) {
      showToast('Insufficient Pool Wallet balance');
      return { success: false, message: 'Insufficient Pool Wallet balance' };
    }

    // Process withdrawal
    sound.playSuccess();
    setWallet((prev) => ({
      ...prev,
      totalAssets: Number((prev.totalAssets - amount).toFixed(4)),
      poolWallet: Number((prev.poolWallet - amount).toFixed(4)),
    }));

    const newTx: TransactionRecord = {
      id: `tx-${Date.now()}`,
      type: 'withdrawal',
      title: `Withdraw to ${address.slice(0, 4)}...${address.slice(-4)}`,
      amountArt: -amount,
      timestamp: 'Just now',
      status: 'Completed',
    };
    setTransactions((prev) => [newTx, ...prev]);

    setIsWithdrawOpen(false);
    showToast(`Withdrawal of ${amount} CVC sent to TON!`);
    return { success: true, message: 'Withdrawal processed' };
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        user,
        wallet,
        mining,
        tasks,
        adsWatchedToday,
        adDailyLimit,
        referral,
        transactions,
        claimCycleReward,
        startMiningCycle,
        fastForwardMining,
        buyMiner,
        completeTask,
        watchAd,
        claimReferralBonus,
        claimCommission,
        simulateInviteFriend,
        withdrawToTon,
        toggleSound,
        updateTonWallet,
        isWithdrawOpen,
        setIsWithdrawOpen,
        isHistoryOpen,
        setIsHistoryOpen,
        isHashrateOpen,
        setIsHashrateOpen,
        isGuideOpen,
        setIsGuideOpen,
        isWalletModalOpen,
        setIsWalletModalOpen,
        isAdModalOpen,
        setIsAdModalOpen,
        toast,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
