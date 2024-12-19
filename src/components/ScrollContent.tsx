import { RefObject } from "react";
import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { easing } from "maath";

interface ScrollContentProps {
  cameraRef: RefObject<THREE.Camera>;
}

const ScrollContent = ({ cameraRef }: ScrollContentProps) => {
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
        break;
      case 1:
        targetPosition.set(-2, 1.4, 15);
        targetRotation.set(0, 0, 0);
        break;
      case 2:
        targetPosition.set(0, 1.4, 3);
        targetRotation.set(0, -0.1, 0);
        break;
      case 3:
        targetPosition.set(-2, 1.4, 3);
        targetRotation.set(0, -0.1, 0);
        break;
      default:
        break;
    }

    easing.damp3(cameraRef.current.position, targetPosition, 0.3, delta);
    easing.dampE(cameraRef.current.rotation, targetRotation, 0.3, delta);
  }); 

  return null;
};

export default ScrollContent;