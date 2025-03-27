import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export function Particles({ particlesCount, particleColor }) {
  const groupRef = useRef();
  const particleCount = particlesCount;

  const particles = Array.from({ length: particleCount }, (_, index) => ({
    id: index,
    initialX: (Math.random() - 0.5) * 2,
    initialY: (Math.random() - 0.5) * 2,
    initialZ: (Math.random() - 0.5) * 2,
    speed: Math.random() * 0.5 + 0.5,
  }));

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();

      groupRef.current.children.forEach((particle, index) => {
        const particleData = particles[index];
        particle.position.x =
          particleData.initialX + Math.sin(time * particleData.speed) * 1;
        particle.position.y =
          particleData.initialY + Math.cos(time * particleData.speed) * 1;
        particle.position.z =
          particleData.initialZ + Math.tan(time * particleData.speed) * 1;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {particles.map((particle) => (
        <mesh
          key={particle.id}
          position={[particle.initialX, particle.initialY, particle.initialZ]}
        >
          <sphereGeometry args={[0.02, 32, 32]} />
          <meshStandardMaterial
            color={particleColor}
            emissive={particleColor}
            emissiveIntensity={1}
          />
        </mesh>
      ))}
    </group>
  );
}
