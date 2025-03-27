import { useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";

export function Particles({ particlesCount, particleColor, showParticles }) {
  const groupRef = useRef();
  const currentCountRef = useRef(0); // Store the current particle count

  // Memoize the initial particle data
  const particles = useMemo(
    () =>
      Array.from({ length: particlesCount }, (_, index) => ({
        id: index,
        initialX: (Math.random() - 0.5) * 2,
        initialY: (Math.random() - 0.5) * 2,
        initialZ: (Math.random() - 0.5) * 2,
        speed: Math.random() * 0.5 + 0.5,
      })),
    [particlesCount]
  );

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Gradually change currentCountRef to match target particle count
    if (showParticles) {
      currentCountRef.current = Math.min(
        currentCountRef.current + 2,
        particlesCount
      );
    } else {
      currentCountRef.current = Math.max(currentCountRef.current - 2, 0);
    }

    if (groupRef.current) {
      groupRef.current.children.forEach((particle, index) => {
        if (index < currentCountRef.current) {
          const particleData = particles[index];
          particle.position.x =
            particleData.initialX + Math.sin(time * particleData.speed) * 1;
          particle.position.y =
            particleData.initialY + Math.cos(time * particleData.speed) * 1;
          particle.position.z =
            particleData.initialZ + Math.tan(time * particleData.speed) * 1;
          particle.visible = true;
        } else {
          particle.visible = false;
        }
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
