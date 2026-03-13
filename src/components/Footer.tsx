import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: { x: number, y: number, speed: number, alpha: number }[] = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = 300; // Fixed height for footer
            initParticles();
        };

        const initParticles = () => {
            particles = [];
            for (let i = 0; i < 100; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    speed: Math.random() * 0.5 + 0.1,
                    alpha: Math.random() * 0.5 + 0.1
                });
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Subtle gradient background
            const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            bgGradient.addColorStop(0, '#000000');
            bgGradient.addColorStop(1, '#050510');
            ctx.fillStyle = bgGradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#ffffff';
            particles.forEach((p) => {
                p.y -= p.speed;
                if (p.y < 0) {
                    p.y = canvas.height;
                    p.x = Math.random() * canvas.width;
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, 1, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
                ctx.fill();
            });
            animationFrameId = requestAnimationFrame(draw);
        };

        window.addEventListener('resize', resize);
        resize();
        draw();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

  return (
    <footer className="relative h-[300px] overflow-hidden flex items-center justify-center border-t border-white/5">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
      
      <div className="relative z-10 text-center px-4">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
        >
          <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full border border-white/10 glass">
              {/* Abstract logo mark */}
              <div className="w-8 h-8 rounded-sm bg-gradient-to-tr from-primary to-secondary rotate-45 transform" />
          </div>
          
          <h3 className="text-xl md:text-2xl font-orbitron font-bold text-white mb-2 tracking-widest">
            ALLAPURAM SAI RITISH
          </h3>
          
          <p className="text-sm font-poppins text-gray-400 mt-8 mb-4 tracking-widest uppercase">
            Designed and Developed
          </p>
          
          <div className="h-[1px] w-24 mx-auto bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          
          <p className="text-xs font-poppins text-gray-600 mt-4">
            &copy; {new Date().getFullYear()} All Rights Reserved.
          </p>
        </motion.div>
      </div>

      {/* Cyberpunk style corner accents */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/30 m-4" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-secondary/30 m-4" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-secondary/30 m-4" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary/30 m-4" />
    </footer>
  );
};

export default Footer;
