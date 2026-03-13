import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const achievements = [
  {
    year: "Current",
    title: "Web Development Projects",
    description: "Built and deployed multiple web development projects on GitHub including Plouton Finance and utility applications.",
    color: "from-primary to-blue-500",
    glow: "rgba(0, 234, 255, 0.5)"
  },
  {
    year: "Ongoing",
    title: "Continuous Learning",
    description: "Strong interest in artificial intelligence and software development, continuously exploring new technologies and frameworks.",
    color: "from-secondary to-purple-500",
    glow: "rgba(123, 44, 255, 0.5)"
  },
  {
    year: "Past",
    title: "Competitions",
    description: "Participated in college coding competitions, enhancing problem-solving and algorithmic skills.",
    color: "from-pink-500 to-red-500",
    glow: "rgba(236, 72, 153, 0.5)"
  }
];

const Achievements = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="achievements" ref={containerRef} className="py-24 relative overflow-hidden bg-background min-h-[800px]">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 inline-block relative">
            <span className="glow-text text-white drop-shadow-[0_0_15px_rgba(236,72,153,0.8)]">MILESTONES</span>
            <div className="absolute -bottom-4 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-pink-500 to-transparent" />
          </h2>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Animated Line */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gray-800 -translate-x-1/2">
             <motion.div 
               className="absolute top-0 left-0 w-full bg-gradient-to-b from-primary via-secondary to-pink-500 origin-top"
               style={{ scaleY: pathLength, height: '100%' }}
             />
          </div>

          <div className="space-y-24 relative">
            {achievements.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={index} className={`flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Timeline Node */}
                  <div className="absolute left-[20px] md:left-1/2 top-12 -translate-x-1/2 -translate-y-1/2 md:top-1/2 z-10 hidden md:block">
                     <motion.div 
                       initial={{ scale: 0, opacity: 0 }}
                       whileInView={{ scale: 1, opacity: 1 }}
                       viewport={{ once: true, margin: "-50px" }}
                       transition={{ duration: 0.5, delay: 0.2 }}
                       className="w-8 h-8 rounded-full bg-black border-4 border-gray-800 flex items-center justify-center"
                       style={{ borderColor: item.color.split(' ')[1].replace('to-', 'bg-') }} // rough extraction for border color
                     >
                        <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${item.color} animate-pulse`} style={{ boxShadow: `0 0 10px ${item.glow}` }} />
                     </motion.div>
                  </div>
                  
                  {/* Mobile Timeline Node */}
                   <div className="absolute left-[20px] top-12 -translate-x-1/2 -translate-y-1/2 z-10 md:hidden">
                     <motion.div 
                       initial={{ scale: 0, opacity: 0 }}
                       whileInView={{ scale: 1, opacity: 1 }}
                       viewport={{ once: true, margin: "-50px" }}
                       transition={{ duration: 0.5, delay: 0.2 }}
                       className="w-8 h-8 rounded-full bg-black border-4 border-gray-800 flex items-center justify-center"
                       style={{ borderColor: item.color.split(' ')[1].replace('to-', 'bg-') }} // rough extraction for border color
                     >
                        <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${item.color} animate-pulse`} style={{ boxShadow: `0 0 10px ${item.glow}` }} />
                     </motion.div>
                  </div>

                  {/* Content Card */}
                  <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pr-16 text-left md:text-right' : 'md:pl-16 text-left'}`}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -50 : 50, y: 30 }}
                      whileInView={{ opacity: 1, x: 0, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
                      whileHover={{ scale: 1.05 }}
                      className={`glass p-8 rounded-2xl relative overflow-hidden group border border-white/5 hover:border-white/20 transition-all duration-300`}
                    >
                      {/* Background Glow */}
                      <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" style={{ backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))`, '--tw-gradient-from': item.color.split(' ')[0].replace('from-', ''), '--tw-gradient-to': item.color.split(' ')[1].replace('to-', '') } as React.CSSProperties} />
                      
                      <span className={`inline-block px-4 py-1 rounded-full text-xs font-orbitron font-bold mb-4 bg-gradient-to-r ${item.color} text-white`}>
                        {item.year}
                      </span>
                      <h3 className="text-2xl font-orbitron text-white mb-3 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-400 font-poppins leading-relaxed">
                        {item.description}
                      </p>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
