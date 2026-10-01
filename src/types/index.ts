export type TabType = 'mine' | 'tasks' | 'miners' | 'friends' | 'profile';

export interface UserProfile {
  name: string;
  userId: string;
  level: number;
  verified: boolean;
  tonWallet: string;
  soundEffects: boolean;
}

export interface WalletState {
  totalAssets: number;
  holdingWallet: number;
  poolWallet: number; // withdrawable
  artPriceUsd: number;
  priceChangePercent: number;
  priceChangeUsd: number;
}

export interface MinerTier {
  level: number;
  costArt: number;
  speedTh: number;
  rateArtPerHour: number;
  status: 'active' | 'available' | 'locked';
}

export interface MiningState {
  isMining: boolean;
  cycleRemainingSeconds: number; // e.g. 27710s (07:41:50)
  totalCycleSeconds: number; // 8 hours = 28800s
  currentReward: number; // 1.5139 ART
  totalHashrate: number; // 0.30 TH/s
  miners: MinerTier[];
  todayPnl: number;
}

export interface TaskItem {
  id: string;
  title: string;
  rewardArt: number;
  isDone: boolean;
  actionText?: string;
  category: 'partner' | 'ad' | 'social';
  url?: string;
}

export interface ReferralState {
  inviteLink: string;
  referralCount: number;
  unclaimedBonusArt: number;
  teamCommissionArt: number;
  referralsList: {
    id: string;
    name: string;
    joinedDate: string;
    reward: number;
  }[];
}

export interface TransactionRecord {
  id: string;
  type: 'mine_claim' | 'task_reward' | 'miner_buy' | 'referral_bonus' | 'commission_claim' | 'withdrawal' | 'ad_reward';
  title: string;
  amountArt: number;
  timestamp: string;
  status: 'Completed' | 'Pending' | 'Failed';
  txHash?: string;
}
