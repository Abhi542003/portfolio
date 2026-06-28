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

    // Particles array
    const particles = [];
    const particleCount = 45;
    
    // Binary columns
    const binaryDigits = ['0', '1'];
    const binaryStreams = [];
    const streamCount = 15;

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.5,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        alpha: Math.random() * 0.35 + 0.1,
      });
    }

    // Initialize binary streams
    for (let i = 0; i < streamCount; i++) {
      binaryStreams.push({
        x: Math.random() * width,
        y: Math.random() * height,
        speed: Math.random() * 0.4 + 0.15,
        char: binaryDigits[Math.floor(Math.random() * 2)],
        alpha: Math.random() * 0.12 + 0.03,
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

      // Smooth mouse follow
      mouseX += (targetMouseX - mouseX) * 0.08;
      mouseY += (targetMouseY - mouseY) * 0.08;

      // Draw Mouse Reactive Glow
      const glowGrad = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 350);
      glowGrad.addColorStop(0, 'rgba(168, 85, 247, 0.05)'); // Purple tint
      glowGrad.addColorStop(0.5, 'rgba(34, 211, 238, 0.02)'); // Cyan tint
      glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, width, height);

      // Draw Subtle Digital Network Grid Lines
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.015)';
      ctx.lineWidth = 0.5;
      const gridSize = 120;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw Small Glowing Dots & Floating Particles
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
        
        // Subtle glow around particles
        if (p.radius > 1.2) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(168, 85, 247, ${p.alpha * 0.25})`;
          ctx.fill();
        }
        
        // Digital network node link lines (connect nearby particles)
        particles.forEach((other) => {
          const dx = p.x - other.x;
          const dy = p.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(34, 211, 238, ${(1 - dist / 150) * 0.02})`;
            ctx.stroke();
          }
        });
      });

      // Draw Floating Binary Digits
      binaryStreams.forEach((stream) => {
        stream.y += stream.speed;
        if (stream.y > height) {
          stream.y = -20;
          stream.x = Math.random() * width;
        }

        if (Math.random() < 0.01) {
          stream.char = binaryDigits[Math.floor(Math.random() * 2)];
        }

        ctx.font = '8.5px monospace';
        ctx.fillStyle = `rgba(34, 211, 238, ${stream.alpha})`; // Cyan binary digits
        ctx.fillText(stream.char, stream.x, stream.y);
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

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full -z-10 pointer-events-none bg-black" />;
};

export default FuturisticBackground;
