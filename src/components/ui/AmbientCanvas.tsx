'use client';

import { useEffect, useRef } from 'react';

interface AmbientCanvasProps {
  intensity?: 'subtle' | 'medium' | 'deep';
}

export default function AmbientCanvas({ intensity = 'medium' }: AmbientCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle count based on intensity
    const count = intensity === 'subtle' ? 25 : intensity === 'medium' ? 45 : 65;

    // Create particles (floating dust specs in candle warm light)
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.4 + 0.1,
      speedX: (Math.random() - 0.5) * 0.2,
      speedY: -Math.random() * 0.3 - 0.1,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render warm candle ambient radial gradient top center
      const gradient = ctx.createRadialGradient(
        width / 2,
        height * 0.2,
        10,
        width / 2,
        height * 0.2,
        width * 0.6
      );
      gradient.addColorStop(0, 'rgba(201, 164, 92, 0.06)');
      gradient.addColorStop(0.5, 'rgba(169, 130, 74, 0.02)');
      gradient.addColorStop(1, 'rgba(18, 17, 14, 0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Render floating gold dust particles
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 164, 92, ${p.alpha})`;
        ctx.shadowBlur = 4;
        ctx.shadowColor = '#C9A45C';
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
    />
  );
}
