/* eslint-disable react/prop-types */
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { easing } from "maath";

const HeroCamera = ({ children, isMobile }) => {
  const groupRef = useRef();

  useFrame((state, delta) => {
    easing.damp3(state.camera.position, [-3.7, 1.4, 7], 0.25, delta);

    if (!isMobile) {
      easing.dampE(groupRef.current.rotation, [-state.pointer.y / 25, -state.pointer.x / 30, 0], 0.25, delta);
    }
  });

  return <group ref={groupRef}>{children}</group>;
};

export default HeroCamera;
