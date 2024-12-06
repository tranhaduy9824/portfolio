import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import gsap from "gsap";
import { PerspectiveCamera } from "@react-three/drei";
import MyRoom from "../components/MyRoom";
import Character from "../components/Character";
import CanvasLoader from "../components/CanvasLoader";

const Hero = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    gsap.fromTo(
      buttonRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    );
  }, []);

  const hoverEffect = (scale: number, gradient: string) => {
    gsap.to(buttonRef.current, {
      scale,
      background: gradient,
      duration: 0.4,
    });
  };

  return (
    <section className="min-h-screen w-full relative">
      <div
        className="w-max mx-auto flex flex-col sm:mt-44 mt-20 gap-3 absolute ps-10 z-10"
        style={{ userSelect: "none" }}
      >
        <p className="sm:text-7xl text-2xl font-medium font-generalsans">
          Hi, my <br />
          name is Ha Duy.<span className="waving-hand">👋</span>
        </p>
        <p className="text-gray-500 text-xl my-3">
          I love creating beautiful user experiences.
        </p>
        <button
          ref={buttonRef}
          className="w-max mt-6 px-8 py-3 text-white text-lg font-medium rounded-3xl"
          style={{ background: "linear-gradient(90deg, #0284c7, #38bdf8)" }}
          onMouseEnter={() =>
            hoverEffect(1.1, "linear-gradient(90deg, #38bdf8, #06b6d4)")
          }
          onMouseLeave={() =>
            hoverEffect(1, "linear-gradient(90deg, #0284c7, #38bdf8)")
          }
        >
          Get in touch
        </button>
      </div>

      <Canvas className="w-full h-screen top-0 left-0 bottom-0" style={{position: "absolute"}}>
        <Suspense fallback={<CanvasLoader />}>
          <PerspectiveCamera makeDefault position={[-3.2, 1.6, 6]} rotation={[0, 0.1, 0]} />

          <group position={[0, 0, 0]} scale={1.5}>
            <MyRoom rotation={[0.3, Math.PI - 0.3, 0]} scale={1.3} />
            <Character />
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
