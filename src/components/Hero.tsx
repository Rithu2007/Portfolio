import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { ChevronDown } from 'lucide-react';
import gsap from 'gsap';

const AnimatedText = () => {
  const roles = [
    "Software Developer",
    "Web Developer",
    "AI & Machine Learning Enthusiast"
  ];
  const [currentRole, setCurrentRole] = React.useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-8 md:h-12 overflow-hidden mt-4">
      <motion.div
        key={currentRole}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="text-xl md:text-3xl font-poppins font-light text-primary"
      >
        {roles[currentRole]}
      </motion.div>
    </div>
  );
};

// Rotating Interactive Element
const HeroObj = () => {
  const meshRef = useRef<any>();
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[10, 3, 100, 16]} />
      <meshStandardMaterial color="#7b2cff" wireframe opacity={0.15} transparent />
    </mesh>
  );
};

const Hero = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 20], fov: 60 }}>
          <ambientLight intensity={0.5} />
          <HeroObj />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        </Canvas>
      </div>
      
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/20 via-black/60 to-black pointer-events-none" />

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-5xl md:text-7xl lg:text-8xl font-orbitron font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 glow-text drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]"
        >
          Allapuram Sai Ritish
        </motion.h1>

        <AnimatedText />

        <motion.a
          href="#projects"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="mt-12 px-8 py-3 rounded-full neon-border text-primary font-orbitron uppercase tracking-widest hover:bg-primary/10 transition-all duration-300 relative overflow-hidden group"
        >
          <span className="relative z-10">Explore My Work</span>
          <div className="absolute inset-0 h-full w-full bg-primary/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
        </motion.a>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center cursor-pointer"
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-sm font-poppins text-gray-400 mb-2 tracking-widest uppercase">Scroll</span>
        <ChevronDown className="text-primary w-6 h-6" />
      </motion.div>
    </section>
  );
};

export default Hero;
