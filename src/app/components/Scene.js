import { CameraControls, Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Particles } from "./Particles";

export const Scene = ({ showParticles, particleColor, particlesCount }) => {
  const cameraControlsRef = useRef();
  return (
    <Canvas
      camera={{ position: [15, 0, 0], fov: 75 }}
      target={[0, 0, 0]}
      className="absolute top-0 left-0"
    >
      <CameraControls ref={cameraControlsRef} />

      <Environment
        files="/HDR_blue_nebulae-1.hdr"
        ground={{ height: 50, radius: 100, scale: 200 }}
        background
      />

      <mesh>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial
          color={particleColor}
          emissive={particleColor}
          emissiveIntensity={1}
        />
      </mesh>

      <EffectComposer>
        <Bloom
          intensity={1}
          luminanceThreshold={0.1}
          luminanceSmoothing={0.1}
          height={300}
        />
      </EffectComposer>


        <Particles
          particlesCount={particlesCount}
          particleColor={particleColor}
          showParticles={showParticles}
        />

    </Canvas>
  );
};
