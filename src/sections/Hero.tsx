import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import MyRoom from "../components/MyRoom";
import Character from "../components/Character";
import CanvasLoader from "../components/CanvasLoader";
import Introduce from "../components/Introduce";
import Window from "../components/Window";
import DecorPlant from "../components/DecorPlant";
import Door from "../components/Door";

const Hero = () => {
  return (
    <section className="min-h-screen w-full relative">
      <Introduce />

      <Canvas
        className="w-full h-screen top-0 left-0 bottom-0"
        style={{ position: "absolute" }}
      >
        <Suspense fallback={<CanvasLoader />}>
        <OrbitControls />
          <PerspectiveCamera
            makeDefault
            position={[-3.5, 1.4, 7]}
            rotation={[0, 0.1, 0]}
          />

          <group position={[0, 0, 0]} scale={1.5}>
            <Window position={[-0.62, 0.85, 0.05]} rotation={[0.25, 1.28, 0]} />
            <Door position={[-0.3, -0.2, 0.73]} rotation={[0.17, -1.88, -0.1]} />
            <DecorPlant position={[-71.682, 17.7, -79.45]} rotation={[0.2, -0.3, 0]} scale={0.4} />
            <DecorPlant position={[-69.982, 17.58, -78.95]} rotation={[0.2, -0.3, 0]} scale={0.4} />
            <MyRoom rotation={[0.3, Math.PI - 0.3, 0]} scale={1.3} />
            <Character position={[-1.32, -0.6, 0.68]} rotation={[0.2, Math.PI - 0.3, 0]} scale={1.15} />
          </group>

          <ambientLight intensity={1} />
          <directionalLight position={[10, 10, 10]} intensity={1} />
          <spotLight position={[5, 10, 5]} angle={0.2} intensity={0.8} />
        </Suspense>
      </Canvas>
    </section>
  );
};

export default Hero;
