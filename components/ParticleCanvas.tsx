'use client';

import React, { useEffect, useRef } from 'react';

interface ParticleCanvasProps {
  isDark?: boolean;
}

export const ParticleCanvas: React.FC<ParticleCanvasProps> = ({ isDark = true }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    // Pointer state
    const pointer = {
      x: -1000,
      y: -1000,
      radius: 130,
      isActive: false,
    };

    // Responsive particle count based on screen size
    const getParticleCount = () => {
      if (typeof window === 'undefined') return 35;
      const area = window.innerWidth * window.innerHeight;
      return Math.min(Math.floor(area / 18000), 55);
    };

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseAlpha: number;
      color: string;
    }

    let particles: Particle[] = [];

    const initParticles = () => {
      const count = getParticleCount();
      particles = [];
      const redColor = '#E30613';
      const greyColor = isDark ? '#FFFFFF' : '#333333';

      for (let i = 0; i < count; i++) {
        const isRed = Math.random() < 0.35; // 35% CVSTEC signature red particles
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.7,
          vy: (Math.random() - 0.5) * 0.7,
          radius: Math.random() * 1.8 + 1,
          baseAlpha: Math.random() * 0.5 + 0.2,
          color: isRed ? redColor : greyColor,
        });
      }
    };

    const handleResize = () => {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
      initParticles();
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    // Pointer events (Mouse + Touch)
    const onMouseMove = (e: MouseEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.isActive = true;
    };

    const onMouseLeave = () => {
      pointer.isActive = false;
      pointer.x = -1000;
      pointer.y = -1000;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        pointer.x = e.touches[0].clientX;
        pointer.y = e.touches[0].clientY;
        pointer.isActive = true;
      }
    };

    const onTouchEnd = () => {
      pointer.isActive = false;
      pointer.x = -1000;
      pointer.y = -1000;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseleave', onMouseLeave, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render & update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          // Bounce off edges
          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;

          // Cursor interaction (gentle attraction / soft deflection)
          if (pointer.isActive) {
            const dx = pointer.x - p.x;
            const dy = pointer.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < pointer.radius && dist > 0) {
              const force = (pointer.radius - dist) / pointer.radius;
              const angle = Math.atan2(dy, dx);
              // Gently draw toward or orbit cursor
              p.x += Math.cos(angle) * force * 1.5;
              p.y += Math.sin(angle) * force * 1.5;
            }
          }
        }

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.baseAlpha;
        ctx.fill();

        // Connect lines between close particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          const maxDist = 95;
          if (distance < maxDist) {
            const lineAlpha = (1 - distance / maxDist) * 0.18;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            // Highlight connections in subtle red or grey
            ctx.strokeStyle = p.color === '#E30613' || p2.color === '#E30613'
              ? 'rgba(227, 6, 19, 0.35)'
              : (isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(51, 51, 51, 0.12)');
            ctx.lineWidth = 0.75;
            ctx.globalAlpha = lineAlpha;
            ctx.stroke();
          }
        }
      }

      // Reset global alpha
      ctx.globalAlpha = 1;

      if (!document.hidden) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-500"
      aria-hidden="true"
    />
  );
};
