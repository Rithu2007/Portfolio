import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github } from 'lucide-react';

const projectsData = [
  {
    title: "Plouton Finance Web App",
    description: "Built a responsive finance themed website using HTML CSS and JavaScript. Deployed on Netlify.",
    tech: ["HTML", "CSS", "JavaScript"],
    liveLink: "https://ploutonfinanceweb.netlify.app",
    githubLink: "#",
    glowColor: "rgba(0, 234, 255, 0.4)",
  },
  {
    title: "Portfolio Website",
    description: "Personal website to showcase projects and skills, featuring 3D graphics and futuristic animations.",
    tech: ["React", "Three.js", "Tailwind", "GSAP"],
    liveLink: "#",
    githubLink: "https://github.com/Rithu2007",
    glowColor: "rgba(123, 44, 255, 0.4)",
  },
  {
    title: "To-Do List Web App",
    description: "Task management application utilizing JavaScript and DOM manipulation for dynamic state handling.",
    tech: ["JavaScript", "HTML", "CSS", "DOM"],
    liveLink: "#",
    githubLink: "https://github.com/Rithu2007",
    glowColor: "rgba(0, 234, 255, 0.4)",
  },
  {
    title: "AI Assistant",
    description: "Simple automation assistant created using Python scripting to handle basic tasks efficiently.",
    tech: ["Python", "Automation", "Scripting"],
    liveLink: "#",
    githubLink: "https://github.com/Rithu2007",
    glowColor: "rgba(123, 44, 255, 0.4)",
  },
  {
    title: "JavaScript Web Games",
    description: "Interactive browser games including Simon Game and Dice Game demonstrating core game logic.",
    tech: ["JavaScript", "Game Logic"],
    liveLink: "#",
    githubLink: "https://github.com/Rithu2007",
    glowColor: "rgba(0, 234, 255, 0.4)",
  }
];

const ProjectCard = ({ project, index }: { project: any, index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate rotation based on mouse position relative to card center
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Max rotation is 15 degrees
    const rotateXValue = ((y - centerY) / centerY) * -15;
    const rotateYValue = ((x - centerX) / centerX) * 15;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="perspective-1000"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: rotateX,
          rotateY: rotateY,
          boxShadow: `0 20px 40px -20px ${project.glowColor}`
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="glass rounded-xl p-6 h-full border border-white/5 relative group transform-style-3d cursor-pointer"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Animated gradient background on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none" />
        
        {/* Glow orb that follows mouse slightly (simplified here as static corner glows) */}
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" style={{ background: project.glowColor }} />

        <div className="relative z-10 transform translate-z-10">
          <h3 className="text-2xl font-orbitron text-white mb-3 group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-gray-400 font-poppins text-sm mb-6 min-h-[60px]">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.tech.map((t: string, i: number) => (
              <span key={i} className="text-xs font-inter px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">
                {t}
              </span>
            ))}
          </div>

          <div className="absolute bottom-6 left-6 right-6 flex justify-end items-center transform translate-z-20">
            <a 
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sm font-poppins text-gray-400 hover:text-white transition-colors"
            >
              <Github className="w-4 h-4 mr-2" /> GitHub
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <section id="projects" ref={containerRef} className="py-24 relative overflow-hidden bg-black min-h-screen">
      {/* Dynamic Grid Background */}
      <motion.div 
        style={{ y: yBackground }}
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none opacity-50"
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary inline-block relative">
            <span className="glow-text">SYSTEM PROJECTS</span>
            <div className="absolute -bottom-4 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-secondary to-transparent" />
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
