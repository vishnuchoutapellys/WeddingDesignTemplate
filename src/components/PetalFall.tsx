import React, { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  color: string;
  type: 'rose' | 'marigold' | 'goldSparkle';
  oscillationSpeed: number;
  oscillationDistance: number;
  angle: number;
}

export const PetalFall: React.FC = () => {
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

    const petalColors = [
      '#e63946', // Vibrant Rose
      '#f28482', // Soft Pink Petal
      '#d62828', // Deep Red
      '#f77f00', // Marigold Orange
      '#fcbf49', // Golden Yellow
      '#e05780', // Magenta Pink
    ];

    const petalCount = Math.min(32, Math.floor(window.innerWidth / 35));
    const petals: Petal[] = [];

    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        size: 10 + Math.random() * 14,
        speedY: 0.8 + Math.random() * 1.5,
        speedX: (Math.random() - 0.5) * 0.8,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 2,
        opacity: 0.55 + Math.random() * 0.4,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
        type: Math.random() > 0.3 ? 'rose' : (Math.random() > 0.5 ? 'marigold' : 'goldSparkle'),
        oscillationSpeed: 0.02 + Math.random() * 0.03,
        oscillationDistance: 1 + Math.random() * 2,
        angle: Math.random() * Math.PI * 2,
      });
    }

    const drawPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = p.opacity;

      if (p.type === 'goldSparkle') {
        // Shimmering Golden Star / Sparkle
        ctx.fillStyle = '#f3de8a';
        ctx.beginPath();
        ctx.arc(0, 0, p.size * 0.25, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Organic Rose / Marigold Curved Petal
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.moveTo(0, -p.size * 0.8);
        ctx.bezierCurveTo(
          p.size * 0.6, -p.size * 0.5,
          p.size * 0.7, p.size * 0.4,
          0, p.size * 0.9
        );
        ctx.bezierCurveTo(
          -p.size * 0.7, p.size * 0.4,
          -p.size * 0.6, -p.size * 0.5,
          0, -p.size * 0.8
        );
        ctx.fill();

        // Subtle Petal Center Vein
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(0, -p.size * 0.6);
        ctx.lineTo(0, p.size * 0.6);
        ctx.stroke();
      }

      ctx.restore();
    };

    const update = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.angle += p.oscillationSpeed;
        p.x += Math.sin(p.angle) * p.oscillationDistance + p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        drawPetal(p);
      }

      animationFrameId = requestAnimationFrame(update);
    };

    update();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30 w-full h-full"
      style={{ opacity: 0.85 }}
    />
  );
};
