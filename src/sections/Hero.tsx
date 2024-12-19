import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useRef } from "react";
import { OrbitControls, PerspectiveCamera, ScrollControls, Scroll } from "@react-three/drei";
import MyRoom from "../components/MyRoom";
import Character from "../components/Character";
import CanvasLoader from "../components/CanvasLoader";
import Introduce from "../components/Introduce";
import Window from "../components/Window";
import DecorPlant from "../components/DecorPlant";
import Door from "../components/Door";
import WindChimes from "../components/WindChimes";
import { useMediaQuery } from "react-responsive";
import HeroCamera from "../components/HeroCamera";
import * as THREE from "three";
import ScrollContent from "../components/ScrollContent";

const Hero = () => {
  const [mouseMove, setMouseMove] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  return (
    <section className="min-h-screen w-full relative">
      <Introduce />

      <Canvas
        className="w-full h-screen top-0 left-0 bottom-0"
        style={{ position: "absolute" }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <ScrollControls pages={4}>
            <PerspectiveCamera  
              ref={cameraRef}
              makeDefault
              position={[-3.5, 1.4, 7]}
              rotation={[0, 0.1, 0]}
            />
            <HeroCamera isMobile={isMobile}>
              <group position={[0, 0, 0]} scale={1.6}>
                <Scroll>
                  <WindChimes
                    position={[-1.2, 1.5, 0.2]}
                    scale={1.5}
                    rotation={[0.2, 0, 0]}
                  />
                  <Window
                    position={[-0.62, 0.85, 0.05]}
                    rotation={[0.25, 1.28, 0]}
                  />
                  <Door
                    position={[-0.3, -0.2, 0.73]}
                    rotation={[0.17, -1.88, -0.1]}
                  />
                  <DecorPlant
                    position={[-71.682, 17.7, -79.45]}
                    rotation={[0.2, -0.3, 0]}
                    scale={0.4}
                  />
                  <DecorPlant
                    position={[-69.982, 17.58, -78.95]}
                    rotation={[0.2, -0.3, 0]}
                    scale={0.4}
                  />
                  <MyRoom
                    rotation={[0.3, Math.PI - 0.3, 0]}
                    scale={1.3}
                    mouseMove={mouseMove}
                  />
                  <Character
                    position={[-1.32, -0.6, 0.68]}
                    rotation={[0.2, Math.PI - 0.3, 0]}
                    scale={1.15}
                    setMouseMove={setMouseMove}
                  />
                </Scroll>
              </group>
            </HeroCamera>
          </ScrollControls>

          <ambientLight intensity={1} />
          <directionalLight position={[10, 10, 10]} intensity={1} />
          <spotLight position={[5, 10, 5]} angle={0.2} intensity={0.8} />

          <ScrollControls pages={3}>
            <Scroll>
              <ScrollContent cameraRef={cameraRef} />
            </Scroll>
          </ScrollControls>
        </Suspense>
      </Canvas>
    </section>
  );
};


export default Hero;