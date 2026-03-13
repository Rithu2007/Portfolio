import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Float, Text } from '@react-three/drei';
import * as THREE from 'three';

const SkillSphere = ({ skill, position, color }: { skill: string; position: [number, number, number]; color: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Rotate slowly over time
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
      
      // Scale up slightly on hover
      const targetScale = hovered ? 1.2 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2} position={position}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial
          color={color}
          wireframe
          transparent
          opacity={hovered ? 0.6 : 0.2}
          emissive={color}
          emissiveIntensity={hovered ? 2 : 0.5}
        />
        
        {hovered && (
          <Text
            position={[0, 0, 0]}
            fontSize={0.5}
            color="white"
            anchorX="center"
            anchorY="middle"
            font="/fonts/Orbitron-Bold.ttf" // Note: Since we are using google fonts in CSS, this might fallback if not loaded locally. We'll use a standard font for Text component or rely on CSS overlay.
          >
            {skill}
          </Text>
        )}
      </mesh>
    </Float>
  );
};

const SkillsContent = () => {
    return (
        <div className="absolute inset-0 z-10 pointer-events-none flex flex-col items-center justify-center">
             <div className="container mx-auto px-6 h-full flex flex-col justify-between py-24">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >
                    <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary inline-block relative pointer-events-auto">
                        <span className="glow-text">SKILLS ARSENAL</span>
                        <div className="absolute -bottom-4 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />
                    </h2>
                    <p className="mt-8 text-gray-400 font-poppins max-w-2xl mx-auto pointer-events-auto">
                        Interact with the technical modules below to explore my skill stack.
                    </p>
                </motion.div>

                {/* CSS Based UI Panels for Skills as fallback/overlay for cleaner text */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12 pointer-events-auto">
                     {[
                        { title: "Programming", skills: ["C", "Python", "Java"], color: "border-primary" },
                        { title: "Web Dev", skills: ["HTML", "CSS", "JavaScript", "DOM"], color: "border-secondary" },
                        { title: "Tools", skills: ["Node.js", "Bootstrap", "Git", "VS Code"], color: "border-primary" },
                        { title: "Machine Learning", skills: ["Basic ML Concepts", "Algorithms"], color: "border-secondary" }
                     ].map((category, idx) => (
                         <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className={`glass p-6 rounded-xl border-t-2 ${category.color} hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden group`}
                         >
                            {/* Scanning effect */}
                            <div className="absolute top-0 left-0 w-full h-[2px] bg-white/20 -translate-y-[100%] group-hover:translate-y-[200px] transition-transform duration-1000 ease-in-out pointer-events-none" />
                             
                            <h3 className="text-xl font-orbitron text-white mb-4">{category.title}</h3>
                            <ul className="space-y-2">
                                {category.skills.map((skill, sIdx) => (
                                    <li key={sIdx} className="font-poppins text-gray-300 flex items-center">
                                        <span className={`w-2 h-2 rounded-full mr-2 ${category.color.replace('border-', 'bg-')}`} />
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                         </motion.div>
                     ))}
                </div>
             </div>
        </div>
    )
}

const Skills = () => {
  return (
    <section id="skills" className="relative h-screen min-h-[800px] overflow-hidden bg-black py-24">
      {/* 3D Background Elements */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#00eaff" />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#7b2cff" />
          
          {/* Abstract background spheres representing data nodes */}
          {Array.from({ length: 15 }).map((_, i) => (
            <SkillSphere
              key={i}
              skill="" // Only ambient background nodes
              position={[
                (Math.random() - 0.5) * 30,
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 10 - 5
              ]}
              color={i % 2 === 0 ? "#00eaff" : "#7b2cff"}
            />
          ))}
        </Canvas>
      </div>

      <SkillsContent />
    </section>
  );
};

export default Skills;
