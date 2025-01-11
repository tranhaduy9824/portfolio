/* eslint-disable @typescript-eslint/no-explicit-any */
import { RefObject } from "react";
import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { easing } from "maath";

interface ScrollContentProps {
  cameraRef: RefObject<THREE.Camera>;
  setPointer?: any;
}

const ScrollContent = ({ cameraRef, setPointer }: ScrollContentProps) => {
  const scroll = useScroll();
  const totalPages = 4;
  const maxScroll = totalPages - 1;

  useFrame((_, delta) => {
    if (!cameraRef.current) return;

    const scrollOffset = scroll.offset; 
    const segment = Math.round(scrollOffset * maxScroll);

    const targetPosition = new THREE.Vector3();
    const targetRotation = new THREE.Euler();

    switch (segment) {
      case 0:
        targetPosition.set(-3.5, 1.4, 7);
        targetRotation.set(0, 0.1, 0);
        setPointer({ x: 30, y: 30 });
        break;
      case 1:
        // targetPosition.set(-3.5, 5, -6.5);
        // targetPosition.set(0, 26, -87);
        targetPosition.set(-3.5, 2.8, 1.5);
        targetRotation.set(0.32, 1.3, 0);
        setPointer({ x: 300, y: 300 });
        break;
      case 2:
        targetPosition.set(0, 1.4, 3);
        targetRotation.set(0, -0.1, 0);
        setPointer({ x: 300, y: 300 });
        break;
      case 3:
        targetPosition.set(0, 1.4, -40);
        targetRotation.set(0, -0.1, 0);
        setPointer({ x: 300, y: 300 });
        break;
      default:
        break;
    }

    easing.damp3(cameraRef.current.position, targetPosition, 0.001, delta);
    easing.dampE(cameraRef.current.rotation, targetRotation, 1, delta);
  }); 

  return null;
};

export default ScrollContent;