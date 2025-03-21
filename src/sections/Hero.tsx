import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useRef } from "react";
import {
  OrbitControls,
  PerspectiveCamera,
  ScrollControls,
} from "@react-three/drei";
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
import { responsive } from "../constants";
import { Lamp } from "../components/Lamp";
import ErrorNotification from "../components/ErrorNotification";
import { useAppStore } from "../store/useAppStore";

interface HeroProps {
  sound: boolean;
  setMouseSelected: (value: boolean) => void;
  setIsLoaded: (value: boolean) => void;
  isLampOn: boolean;
  toggleLamp: () => void;
}

const Hero = ({
  sound,
  setMouseSelected,
  setIsLoaded,
  isLampOn,
  toggleLamp,
}: HeroProps) => {
  const [mouseMove, setMouseMove] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isSmallTablet = useMediaQuery({ maxWidth: 1024 });
  const isTablet = useMediaQuery({ maxWidth: 1200 });
  const isSmallDesktop = useMediaQuery({ maxWidth: 1340 });

  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  const [pointer, setPointer] = useState({ x: 30, y: 30 });
  const {positionCamera, setPositionCamera} = useAppStore()

  const [stateAnimate, setStateAnimate] = useState(1);

  const currentConfig = isMobile
    ? responsive.mobile
    : isSmallTablet
    ? responsive.smallTablet
    : isTablet
    ? responsive.tablet
    : isSmallDesktop
    ? responsive.smallDesktop
    : responsive.desktop;

  return (
    <section className="min-h-screen w-full relative">
      <Canvas
        className="w-full h-screen top-0 left-0 bottom-0"
        style={{ position: "absolute" }}
        gl={{
          localClippingEnabled: true,
          stencil: true,
          powerPreference: "high-performance",
          alpha: true,
          antialias: true,
        }}
        dpr={[1, 2]}
      >
        <Suspense fallback={<CanvasLoader setIsLoaded={setIsLoaded} />}>
          {/* <OrbitControls /> */}
          <PerspectiveCamera
            ref={cameraRef}
            makeDefault
            position={[-3.5, 1.4, 7]}
            rotation={[0, 0.1, 0]}
          />
          <ambientLight intensity={1} />
          <directionalLight position={[10, 10, 10]} intensity={1} />
          <spotLight position={[5, 10, 5]} angle={0.2} intensity={0.8} />

          <Introduce
            position={currentConfig.introducePosition}
            rotation={[0, 0.2, 0]}
            scale={currentConfig.introduceScale}
            setMouseSelected={setMouseSelected}
            isLampOn={isLampOn}
          />

          <HeroCamera
            isMobile={isMobile}
            pointer={pointer}
            positionCamera={positionCamera}
          >
            <group position={[0, 0, 0]} scale={currentConfig.groupScale}>
              <ErrorNotification stateAnimate={stateAnimate} sound={sound} />
              <Lamp
                position={[-1.2, 2.5, 0.15]}
                scale={[0.9, 0.5, 0.9]}
                rotation={[0.2, 0, 0]}
                setMouseSelected={setMouseSelected}
                isLampOn={isLampOn}
                onClick={toggleLamp}
              />
              <WindChimes
                position={[-1.2, 1.5, 0.2]}
                scale={1.5}
                rotation={[0.2, 0, 0]}
                sound={sound}
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
                stateAnimate={stateAnimate}
              />
              <Character
                position={[-1.32, -0.6, 0.68]}
                rotation={[0.2, Math.PI - 0.3, 0]}
                scale={1.15}
                setMouseMove={setMouseMove}
                sound={sound}
                setStateAnimate={setStateAnimate}
              />
            </group>
          </HeroCamera>

          <ScrollControls pages={4}>
            <ScrollContent
              cameraRef={cameraRef}
              setPointer={setPointer}
              setPositionCamera={setPositionCamera}
            />
          </ScrollControls>
        </Suspense>
      </Canvas>
    </section>
  );
};

export default Hero;
