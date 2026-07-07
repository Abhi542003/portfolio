import React, { useEffect, useRef } from 'react';

export const FuturisticBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // 1. Drifting particles configuration
    const particles = [];
    const particleCount = 45;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.6 + 0.6,
        vx: (Math.random() - 0.5) * 0.1,
        vy: (Math.random() - 0.5) * 0.1,
        alpha: Math.random() * 0.25 + 0.05,
      });
    }

    // 2. Faint moving stars configuration
    const stars = [];
    const starCount = 50;
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.1 + 0.4,
        speedX: (Math.random() - 0.5) * 0.05,
        speedY: (Math.random() - 0.5) * 0.05,
        twinkleSpeed: Math.random() * 0.03 + 0.008,
        phase: Math.random() * Math.PI * 2,
        baseAlpha: Math.random() * 0.3 + 0.05
      });
    }

    // Track mouse
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;

    const handleMouseMove = (e) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      const time = Date.now() * 0.0005; // Animation time scale

      // Smooth mouse follow
      mouseX += (targetMouseX - mouseX) * 0.08;
      mouseY += (targetMouseY - mouseY) * 0.08;

      // Draw Mouse Reactive Ambient Glow
      const glowGrad = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 400);
      glowGrad.addColorStop(0, 'rgba(168, 85, 247, 0.04)'); // Purple glow
      glowGrad.addColorStop(0.5, 'rgba(34, 211, 238, 0.02)'); // Cyan glow
      glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, width, height);

      // Draw 3. Soft Animated Ambient purple & cyan fog
      const fogX1 = width / 2 + Math.sin(time * 0.3) * (width * 0.15);
      const fogY1 = height / 2 + Math.cos(time * 0.4) * (height * 0.15);
      const fogGrad1 = ctx.createRadialGradient(fogX1, fogY1, 0, fogX1, fogY1, width * 0.5);
      fogGrad1.addColorStop(0, 'rgba(168, 85, 247, 0.025)'); // Ambient purple fog
      fogGrad1.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = fogGrad1;
      ctx.fillRect(0, 0, width, height);

      const fogX2 = width * 0.3 + Math.cos(time * 0.25) * (width * 0.1);
      const fogY2 = height * 0.7 + Math.sin(time * 0.35) * (height * 0.1);
      const fogGrad2 = ctx.createRadialGradient(fogX2, fogY2, 0, fogX2, fogY2, width * 0.4);
      fogGrad2.addColorStop(0, 'rgba(34, 211, 238, 0.015)'); // Ambient cyan fog
      fogGrad2.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = fogGrad2;
      ctx.fillRect(0, 0, width, height);

      // Draw 4. Barely visible cyber grid movement (slowly scrolling grid lines)
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.008)';
      ctx.lineWidth = 0.5;
      const gridSize = 110;
      const gridOffset = (time * 12) % gridSize;
      
      for (let x = gridOffset; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = gridOffset; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw faint stars
      stars.forEach((star) => {
        star.x += star.speedX;
        star.y += star.speedY;
        star.phase += star.twinkleSpeed;
        
        // Wrap coordinates
        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;

        const currentAlpha = star.baseAlpha + Math.sin(star.phase) * 0.08;
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.01, Math.min(0.4, currentAlpha))})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw slowly drifting particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(168, 85, 247, ${p.alpha})`; // Purple dots
        ctx.fill();
        
        // Subtle glow around larger particles
        if (p.radius > 1.3) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 3.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(168, 85, 247, ${p.alpha * 0.25})`;
          ctx.fill();
        }
        
        // Connect nearby particles to mouse cursor for interactive feel
        const dxMouse = p.x - mouseX;
        const dyMouse = p.y - mouseY;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < 180) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouseX, mouseY);
          ctx.strokeStyle = `rgba(168, 85, 247, ${(1 - distMouse / 180) * 0.04})`;
          ctx.stroke();
        }

        // Digital network node link lines (connect nearby particles)
        particles.forEach((other) => {
          const dx = p.x - other.x;
          const dy = p.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(34, 211, 238, ${(1 - dist / 130) * 0.02})`;
            ctx.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none opacity-0 dark:opacity-100 transition-opacity duration-500 bg-transparent" 
    />
  );
};

export default FuturisticBackground;
