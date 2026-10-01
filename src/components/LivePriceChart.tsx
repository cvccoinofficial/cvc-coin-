import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { sound } from '../utils/sound';

type Timeframe = 'H' | 'D' | 'W' | 'M';

export const LivePriceChart: React.FC = () => {
  const { wallet } = useApp();
  const [timeframe, setTimeframe] = useState<Timeframe>('D');

  // Datasets for different timeframes centered around $0.02
  const chartConfigs: Record<Timeframe, {
    points: number[];
    minPrice: string;
    maxPrice: string;
    minTime: string;
    maxTime: string;
    changePct: string;
    changeAmount: string;
    label: string;
  }> = {
    H: {
      points: [40, 42, 38, 45, 52, 48, 55, 51, 60, 58, 62],
      minPrice: '$ 0.0198',
      maxPrice: '$ 0.0202',
      minTime: '12:00',
      maxTime: '13:00',
      changePct: '+0.45%',
      changeAmount: '+$0.0001',
      label: 'Last hour',
    },
    D: {
      points: [60, 55, 62, 50, 45, 30, 25, 45, 65, 75, 45, 50, 60, 52, 48, 42, 45, 38, 35],
      minPrice: '$ 0.0194',
      maxPrice: '$ 0.0206',
      minTime: '19:34',
      maxTime: '05:15',
      changePct: '+3.45%',
      changeAmount: '+$0.0007',
      label: 'Last day',
    },
    W: {
      points: [25, 35, 45, 40, 55, 65, 50, 60, 70, 65, 80, 75, 85],
      minPrice: '$ 0.0185',
      maxPrice: '$ 0.0215',
      minTime: 'Mon',
      maxTime: 'Sun',
      changePct: '+8.50%',
      changeAmount: '+$0.0016',
      label: 'Last 7 days',
    },
    M: {
      points: [20, 25, 30, 45, 40, 50, 65, 60, 75, 70, 85, 90, 80],
      minPrice: '$ 0.0160',
      maxPrice: '$ 0.0230',
      minTime: 'Sep 01',
      maxTime: 'Sep 30',
      changePct: '+25.00%',
      changeAmount: '+$0.0040',
      label: 'Last month',
    },
  };

  const current = chartConfigs[timeframe];

  // Generate SVG path from points
  const width = 360;
  const height = 110;
  const paddingX = 10;
  const paddingY = 15;
  const usableWidth = width - paddingX * 2;
  const usableHeight = height - paddingY * 2;

  const minVal = Math.min(...current.points);
  const maxVal = Math.max(...current.points);
  const valRange = maxVal - minVal || 1;

  const coords = current.points.map((val, idx) => {
    const x = paddingX + (idx / (current.points.length - 1)) * usableWidth;
    const y = height - paddingY - ((val - minVal) / valRange) * usableHeight;
    return { x, y };
  });

  // Smooth path
  const makeSmoothPath = (pts: { x: number; y: number }[]) => {
    if (pts.length < 2) return '';
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i === 0 ? 0 : i - 1];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2] || p2;

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
    }
    return d;
  };

  const linePath = makeSmoothPath(coords);
  const areaPath = `${linePath} L ${coords[coords.length - 1].x} ${height} L ${coords[0].x} ${height} Z`;

  const isPositive = current.changePct.startsWith('+');

  return (
    <div className="bg-gradient-to-b from-[#13131A] to-[#0A0A0F] border border-[#E8B94A]/30 rounded-2xl p-4 shadow-[0_0_30px_rgba(232,185,74,0.1)]">
      {/* Price Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="text-2xl font-bold font-mono tracking-tight text-white flex items-baseline gap-1">
            <span className="text-base text-[#FFD86B] font-sans">$</span>
            {wallet.artPriceUsd.toFixed(4)}
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span
              className={`text-xs font-medium font-mono flex items-center gap-0.5 ${
                isPositive ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              <span>{isPositive ? '▲' : '▼'}</span>
              <span>{current.changePct}</span>
            </span>
            <span className="text-xs font-mono text-[#FFD86B]">{current.changeAmount}</span>
            <span className="text-[11px] text-slate-400">{current.label}</span>
          </div>
        </div>

        {/* CVC LIVE Badge in Gold */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#18150a] border border-[#E8B94A]/50 shadow-[0_0_12px_rgba(232,185,74,0.25)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FFD86B] animate-ping" />
          <span className="text-[10px] font-bold text-[#FFD86B] tracking-wider">CVC LIVE</span>
        </div>
      </div>

      {/* SVG Chart Area in Gold */}
      <div className="relative mt-2 h-28 w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="chartGradientGold" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFD86B" stopOpacity="0.45" />
              <stop offset="60%" stopColor="#E8B94A" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#0A0A0F" stopOpacity="0.0" />
            </linearGradient>
            <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Area fill in Gold */}
          <path d={areaPath} fill="url(#chartGradientGold)" />

          {/* Glow Line in Gold #E8B94A */}
          <path
            d={linePath}
            fill="none"
            stroke="#E8B94A"
            strokeWidth="2.5"
            strokeLinecap="round"
            filter="url(#goldGlow)"
          />
        </svg>

        {/* Min/Max Marker Labels */}
        <div className="absolute top-1 right-2 text-[10px] font-mono text-slate-300 flex flex-col items-end">
          <span className="text-[#FFD86B] font-bold">{current.maxPrice}</span>
          <span className="text-slate-500 text-[9px]">{current.maxTime}</span>
        </div>

        <div className="absolute bottom-1 left-2 text-[10px] font-mono text-slate-300 flex flex-col">
          <span className="text-slate-500 text-[9px]">{current.minTime}</span>
          <span className="text-[#FFD86B] font-bold">{current.minPrice}</span>
        </div>
      </div>

      {/* Timeframe selector tabs in Gold */}
      <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#E8B94A]/15 px-4">
        {(['H', 'D', 'W', 'M'] as Timeframe[]).map((tf) => {
          const isSelected = timeframe === tf;
          return (
            <button
              key={tf}
              onClick={() => {
                sound.playTap();
                setTimeframe(tf);
              }}
              className={`w-9 h-8 rounded-lg text-xs font-bold transition-all flex items-center justify-center cursor-pointer ${
                isSelected
                  ? 'gold-btn text-black font-extrabold shadow-[0_0_15px_rgba(232,185,74,0.45)]'
                  : 'text-slate-400 hover:text-[#FFD86B]'
              }`}
            >
              {tf}
            </button>
          );
        })}
      </div>
    </div>
  );
};
