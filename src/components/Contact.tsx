import React, { useRef } from 'react';
import { motion, useAnimationFrame } from 'framer-motion';
import { Phone, Mail, Linkedin, Github, Send } from 'lucide-react';

const ContactItem = ({ icon: Icon, title, value, href, delay }: { icon: any, title: string, value: string, href: string, delay: number }) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="glass p-6 rounded-xl flex items-center space-x-6 border border-white/5 hover:border-primary/50 transition-all duration-300 group cursor-pointer relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative p-4 rounded-full bg-white/5 group-hover:bg-primary/20 transition-colors border border-white/10 group-hover:border-primary/50 group-hover:shadow-[0_0_15px_rgba(0,234,255,0.5)]">
        <Icon className="w-8 h-8 text-gray-300 group-hover:text-primary transition-colors" />
      </div>
      <div>
        <h4 className="text-sm font-orbitron text-gray-500 mb-1">{title}</h4>
        <p className="text-lg font-poppins text-white group-hover:text-primary transition-colors break-all">{value}</p>
      </div>
    </motion.a>
  );
};

const Contact = () => {
    // Basic particle animation for background
    const canvasRef = useRef<HTMLCanvasElement>(null);
    React.useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: { x: number, y: number, radius: number, vx: number, vy: number, alpha: number }[] = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        const initParticles = () => {
            particles = [];
            const numParticles = Math.floor((canvas.width * canvas.height) / 15000);
            for (let i = 0; i < numParticles; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 2 + 0.5,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    alpha: Math.random() * 0.5 + 0.1
                });
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p, index) => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 234, 255, ${p.alpha})`;
                ctx.fill();

                // Draw lines between close particles
                for (let j = index + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 100) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(123, 44, 255, ${0.2 * (1 - dist/100)})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
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
    <section id="contact" className="py-24 relative min-h-screen flex items-center justify-center bg-black overflow-hidden bg-gradient-to-b from-black via-black to-[#050510]">
      {/* Network Particle Background */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-40" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-white inline-block relative">
            <span className="glow-text text-white">COMMUNICATION LINK</span>
            <div className="absolute -bottom-4 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />
          </h2>
          <p className="mt-6 text-gray-400 font-poppins max-w-2xl mx-auto">
            Ready to establish a connection? Reach out through any of the secure channels below.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <ContactItem 
            icon={Phone} 
            title="SECURE LINE" 
            value="+91 9110571054" 
            href="tel:+919110571054"
            delay={0.1} 
          />
          <ContactItem 
            icon={Mail} 
            title="DIRECT MESSAGE" 
            value="sairitish2007@gmail.com" 
            href="mailto:sairitish2007@gmail.com"
            delay={0.2} 
          />
          <ContactItem 
            icon={Linkedin} 
            title="PROFESSIONAL NETWORK" 
            value="Allapuram Sai Ritish" 
            href="https://www.linkedin.com/in/allapuram-sai-ritish-b683b8343/"
            delay={0.3} 
          />
          <ContactItem 
            icon={Github} 
            title="CODE REPOSITORY" 
            value="Rithu2007" 
            href="https://github.com/Rithu2007"
            delay={0.4} 
          />
        </div>

        {/* Decorative send button/icon */}
        <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, type: 'spring' }}
            className="flex justify-center mt-16"
        >
            <div className="w-24 h-24 rounded-full glass border border-primary/30 flex items-center justify-center relative group cursor-pointer animate-pulse-slow">
                <div className="absolute inset-0 rounded-full border border-primary animate-ping opacity-20" />
                <Send className="w-8 h-8 text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform drop-shadow-[0_0_8px_rgba(0,234,255,0.8)]" />
            </div>
        </motion.div>
      </div>

      <style>{`
          .animate-pulse-slow {
              animation: pulse-slow 3s infinite;
          }
          @keyframes pulse-slow {
              0%, 100% { box-shadow: 0 0 0 0 rgba(0, 234, 255, 0); }
              50% { box-shadow: 0 0 20px 0 rgba(0, 234, 255, 0.3); }
          }
      `}</style>
    </section>
  );
};

export default Contact;
