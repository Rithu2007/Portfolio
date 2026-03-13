import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden flex flex-col items-center justify-center min-h-screen">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary inline-block relative">
            <span className="glow-text">ABOUT ME</span>
            <div className="absolute -bottom-4 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />
          </h2>
        </motion.div>

        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
            whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring" }}
            whileHover={{ scale: 1.02, rotateX: 5, rotateY: 5 }}
            className="glass neon-border-purple p-8 md:p-12 rounded-2xl max-w-4xl w-full relative group perspective-1000 transform-style-3d cursor-pointer"
          >
            {/* Holographic lines effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100%_4px] rounded-2xl pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity" />
            
            <p className="text-lg md:text-2xl font-poppins leading-relaxed text-gray-300 relative z-10 group-hover:text-white transition-colors duration-300">
              <span className="text-primary text-4xl mr-2 font-orbitron">"</span>
              I am a B.Tech 2nd-year Computer Science (AI & ML) student at CMR Technical Campus, passionate about web development, programming, and machine learning. I enjoy building modern web applications, solving real-world problems, and continuously learning new technologies.
              <span className="text-secondary text-4xl ml-2 font-orbitron">"</span>
            </p>

            {/* Corner glowing accents */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-primary rounded-tl-2xl opacity-50 group-hover:scale-110 transition-transform origin-top-left" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-secondary rounded-br-2xl opacity-50 group-hover:scale-110 transition-transform origin-bottom-right" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
