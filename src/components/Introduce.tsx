/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useEffect } from "react";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

const Introduce = ({ ...props }: { [key: string]: any }) => {
  const buttonRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (buttonRef.current) {
      gsap.fromTo(
        buttonRef.current.position,
        { y: -0.2, opacity: 0 },
        { y: -0.15, opacity: 1, duration: 1 }
      );
    }
  }, []);

  const hoverEffect = (scale: number, color: string) => {
    if (buttonRef.current) {
      gsap.to(buttonRef.current.scale, {
        x: scale,
        y: scale,
        z: scale,
        duration: 0.4,
      });
      if (buttonRef.current.material instanceof THREE.MeshStandardMaterial) {
        gsap.to(buttonRef.current.material.color, {
          r: new THREE.Color(color).r,
          g: new THREE.Color(color).g,
          b: new THREE.Color(color).b,
          duration: 0.4,
        });
      }
    }
  };

  const createRoundedRectShape = (
    width: number,
    height: number,
    radius: number
  ) => {
    const shape = new THREE.Shape();
    shape.moveTo(-width / 2 + radius, -height / 2);
    shape.lineTo(width / 2 - radius, -height / 2);
    shape.quadraticCurveTo(
      width / 2,
      -height / 2,
      width / 2,
      -height / 2 + radius
    );
    shape.lineTo(width / 2, height / 2 - radius);
    shape.quadraticCurveTo(
      width / 2,
      height / 2,
      width / 2 - radius,
      height / 2
    );
    shape.lineTo(-width / 2 + radius, height / 2);
    shape.quadraticCurveTo(
      -width / 2,
      height / 2,
      -width / 2,
      height / 2 - radius
    );
    shape.lineTo(-width / 2, -height / 2 + radius);
    shape.quadraticCurveTo(
      -width / 2,
      -height / 2,
      -width / 2 + radius,
      -height / 2
    );
    return shape;
  };

  const roundedRectShape = createRoundedRectShape(2, 0.5, 0.2);
  const geometry = new THREE.ExtrudeGeometry(roundedRectShape, {
    depth: 0.1,
    bevelEnabled: false,
  });

  return (
    <group {...props}>
      <Text
        fontSize={0.6}
        fontWeight={600}
        position={[0, 1, 0]}
        color="black"
        anchorX="left"
        anchorY="middle"
      >
        Hi, my name is Ha Duy. 👋
      </Text>
      <Text
        fontSize={0.2}
        position={[0.05, 0.5, 0]}
        color="gray"
        anchorX="left"
        anchorY="middle"
      >
        I love creating beautiful user experiences.
      </Text>
      <mesh
        ref={buttonRef}
        geometry={geometry}
        position={[1.11, 0, 0]}
        onPointerEnter={() => hoverEffect(1.01, "#06b6d4")}
        onPointerLeave={() => hoverEffect(1, "#0284c7")}
      >
        <meshStandardMaterial color="#0284c7" />
        <Text
          fontSize={0.2}
          position={[0, 0, 0.11]}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          Get in touch
        </Text>
      </mesh>
    </group>
  );
};

export default Introduce;
