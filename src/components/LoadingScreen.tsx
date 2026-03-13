import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden"
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 1, ease: 'easeInOut' }}
    >
      {/* Particle Sphere Simulation purely with CSS/Framer Motion */}
      <div className="relative flex items-center justify-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: showText ? 2.5 : 1, opacity: showText ? 0 : 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="absolute w-48 h-48 rounded-full border border-primary/50 shadow-[0_0_50px_rgba(0,234,255,0.8)] border-dashed animate-spin-slow"
        />
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: showText ? 3 : 1, opacity: showText ? 0 : 1 }}
          transition={{ duration: 1.5, ease: 'easeOut', delay: 0.2 }}
          className="absolute w-64 h-64 rounded-full border border-secondary/40 shadow-[0_0_60px_rgba(123,44,255,0.6)] border-dotted animate-reverse-spin"
        />

        <motion.div
          initial={{ opacity: 0, filter: 'blur(10px)', scale: 0.8 }}
          animate={{ opacity: showText ? 1 : 0, filter: showText ? 'blur(0px)' : 'blur(10px)', scale: showText ? 1 : 0.8 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center"
        >
          <h1 className="text-4xl md:text-6xl font-orbitron font-bold tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary glow-text">
            ALLAPURAM
            <br />
            SAI RITISH
          </h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: showText ? '100%' : '0%' }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent mt-4"
          />
        </motion.div>
      </div>

      <style>{`
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        .animate-reverse-spin {
          animation: reverse-spin 10s linear infinite;
        }
        @keyframes reverse-spin {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
      `}</style>
    </motion.div>
  );
};

export default LoadingScreen;
