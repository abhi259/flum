"use client";
import { CameraControls, Environment } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { Particles } from "./components/Particles";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

export default function Home() {
  const cameraControlsRef = useRef();

  return (
    <div className="relative h-screen w-screen">
      <Canvas className="absolute top-0 left-0">
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <CameraControls ref={cameraControlsRef} />

        <Environment
          files="/HDR_blue_nebulae-1.hdr"
          ground={{ height: 50, radius: 100, scale: 200 }}
          background
        />

        {/* Box at center */}
        <mesh>
          <sphereGeometry args={[0.4, 16, 16]} />
          <meshStandardMaterial
            color="yellow"
            emissive="yellow"
            emissiveIntensity={1}
          />
        </mesh>
        <EffectComposer>
          <Bloom
            intensity={2} // Strength of the bloom effect
            luminanceThreshold={1} // Only bright areas glow (adjust this)
            luminanceSmoothing={0.6} // Smoothness of the glow transition
            height={300} // Resolution of the bloom effect
          />
        </EffectComposer>

        {/* Render the Particle component */}
        <Particles />
      </Canvas>
    </div>
  );
}
