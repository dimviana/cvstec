'use client';

import React from 'react';
import Image from 'next/image';
import logoSemFundo from '@/src/assets/images/logo-sem-fundo.png';

interface CvstecLogoProps {
  className?: string;
  isDark?: boolean;
}

export const CvstecLogo: React.FC<CvstecLogoProps> = ({
  className = 'w-56 sm:w-64 h-auto',
  isDark = true,
}) => {
  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
      <Image
        src={isDark ? logoSemFundo : '/logo-sem-fundo-dark.png'}
        alt="CVSTEC — Soluções Automotivas & Especialista em Eletrônica"
        priority
        className="w-full h-auto max-w-[280px] sm:max-w-[340px] drop-shadow-md object-contain transition-opacity duration-300"
        referrerPolicy="no-referrer"
      />
    </div>
  );
};
