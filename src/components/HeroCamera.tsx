import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { easing } from "maath";
import { ReactNode } from "react";
import * as THREE from "three";

interface HeroCameraProps {
  children: ReactNode;
  isMobile: boolean;
}

const HeroCamera = ({ children, isMobile }: HeroCameraProps) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    easing.damp3(state.camera.position, [-3.7, 1.4, 7], 0.25, delta);

      if (!isMobile) {
        if (groupRef.current) {
          easing.dampE(groupRef.current.rotation, [-state.pointer.y / 25, -state.pointer.x / 30, 0], 0.25, delta);
        }
      }
  });

  return <group ref={groupRef}>{children}</group>;
};

export default HeroCamera;
