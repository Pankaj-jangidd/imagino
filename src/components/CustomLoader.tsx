"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  hue: number;
}

export default function CustomLoader() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 200;
    canvas.height = 200;

    const particles: Particle[] = [];
    const particleCount = 60;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const radius = 30 + Math.random() * 40;
      particles.push({
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        size: Math.random() * 3 + 1,
        speedX: Math.cos(angle) * (0.5 + Math.random() * 0.5),
        speedY: Math.sin(angle) * (0.5 + Math.random() * 0.5),
        hue: 260 + Math.random() * 40,
      });
    }

    let rotation = 0;

    function animate() {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      rotation += 0.02;

      particles.forEach((p, i) => {
        const angle = rotation + (i / particleCount) * Math.PI * 2;
        const radius = 40 + Math.sin(rotation * 2 + i * 0.1) * 20;
        
        p.x = centerX + Math.cos(angle) * radius;
        p.y = centerY + Math.sin(angle) * radius;

        // Draw glow
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
        gradient.addColorStop(0, `hsla(${p.hue}, 100%, 70%, 0.8)`);
        gradient.addColorStop(1, `hsla(${p.hue}, 100%, 50%, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
        ctx.fill();

        // Draw particle
        ctx.fillStyle = `hsl(${p.hue}, 100%, 70%)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby particles
        particles.forEach((p2, j) => {
          if (j <= i) return;
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 50) {
            ctx.beginPath();
            ctx.strokeStyle = `hsla(${(p.hue + p2.hue) / 2}, 100%, 60%, ${0.3 * (1 - distance / 50)})`;
            ctx.lineWidth = 1;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

      // Draw center glow
      const centerGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 30);
      centerGradient.addColorStop(0, "rgba(139, 92, 246, 0.3)");
      centerGradient.addColorStop(1, "rgba(139, 92, 246, 0)");
      ctx.fillStyle = centerGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 30, 0, Math.PI * 2);
      ctx.fill();

      requestAnimationFrame(animate);
    }

    const animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="relative">
        {/* Outer glow ring */}
        <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-xl animate-pulse" />
        
        <canvas
          ref={canvasRef}
          className="rounded-full"
          width={200}
          height={200}
        />
      </div>
      
      <div className="mt-8 text-center">
        <h3 className="text-xl font-semibold text-gradient mb-2">Creating Magic</h3>
        <p className="text-sm text-white/50 animate-pulse">
          Transforming your imagination into art...
        </p>
      </div>
    </div>
  );
}
