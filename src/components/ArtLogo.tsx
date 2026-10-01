import React, { useState } from 'react';
import cvcCoinImg from '../assets/images/cvc_coin_logo_1790815924567.jpg';

interface CvcLogoProps {
  className?: string;
  size?: number | string;
  theme?: 'white-on-dark' | 'black-on-white' | 'cyan' | 'plain';
}

export const CvcLogo: React.FC<CvcLogoProps> = ({
  className = '',
  size = 28,
}) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={`rounded-full overflow-hidden shrink-0 flex items-center justify-center relative select-none ${className}`}
      style={{ width: size, height: size }}
    >
      {!hasError ? (
        <img
          src={cvcCoinImg}
          alt="CVC Coin Logo"
          referrerPolicy="no-referrer"
          onError={() => setHasError(true)}
          className="w-full h-full object-cover rounded-full shadow-md"
        />
      ) : (
        /* Styled fallback SVG if image fails */
        <div className="w-full h-full rounded-full bg-gradient-to-tr from-amber-600 via-yellow-500 to-amber-700 flex items-center justify-center p-1 border-2 border-yellow-300 shadow-lg text-black font-black text-xs font-mono">
          CVC
        </div>
      )}
    </div>
  );
};

export const ChaiLogo = CvcLogo;
export const ArtLogo = CvcLogo;
