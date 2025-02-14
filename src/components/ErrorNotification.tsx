import { useTexture } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";
import { useEffect } from "react";

const ErrorNotification = ({ stateAnimate }: { stateAnimate: number }) => {
  const errorTxt = useTexture("textures/error-message.png");
  const errorSound = new Audio("sounds/error.mp3");
  errorSound.volume = 0.2;

  const { opacity, scale } = useSpring({
    opacity: stateAnimate === 1 || stateAnimate === 5 ? 1 : 0,
    scale: stateAnimate === 1 || stateAnimate === 5 ? 0.3 : 0.1,
    config: { tension: 200, friction: 15 },
  });

  useEffect(() => {
    if (stateAnimate === 5) {
      errorSound.currentTime = 0;
      errorSound.play();
    }
  }, [stateAnimate]);

  return (
    <animated.mesh
      position={[-1.55, 1.55, -0.1]}
      scale={scale}
      rotation={[0, 0.3, 0]}
    >
      <planeGeometry args={[1, 1]} />
      <animated.meshBasicMaterial
        map={errorTxt}
        transparent={true}
        opacity={opacity}
      />
    </animated.mesh>
  );
};

export default ErrorNotification;
