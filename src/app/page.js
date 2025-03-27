"use client";

import { useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { Scene } from "./components/Scene";

export default function Home() {
  const [particleColor, setParticleColor] = useState("#ffd5a4");
  const [particlesCount, setParticlesCount] = useState(500);
  const [showParticles, setShowParticles] = useState(true);

  const handleShowParticles = () => {
    setShowParticles(!showParticles);
  };

  const handleParticlesCount = (event) => {
    const newValue = event.target.value;
    setParticlesCount(newValue);
  };

  return (
    <div className="relative h-screen w-screen">
      <div className=" absolute top-0 left-0 bg-red z-50 flex flex-col gap-4 p-10 ">
        <div>
          <button
            className="rounded-3xl p-2 px-8 bg-cyan-700 hover:bg-cyan-600 hover:cursor-pointer hover:scale-110 transform transition duration-300"
            onClick={handleShowParticles}
          >
            {showParticles ? "Hide Particles" : "Show Particles"}
          </button>
        </div>
        <div className=" text-white font-sans">
          <label className="block mb-2">
            ParticlesCount: <span>{particlesCount}</span>
          </label>
          <input
            type="range"
            min={100}
            max={1000}
            step={1}
            value={particlesCount}
            onChange={handleParticlesCount}
            className="w-52 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-cyan-500"
          />
        </div>
        <HexColorPicker color={particleColor} onChange={setParticleColor} />
      </div>
      <Scene
        showParticles={showParticles}
        particleColor={particleColor}
        particlesCount={particlesCount}
      />
    </div>
  );
}
