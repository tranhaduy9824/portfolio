/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useEffect } from "react";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { useFrame } from "@react-three/fiber";
import { createRoundedRectShape } from "../constants";

interface IntroduceProps {
  setMouseSelected: (value: boolean) => void;
  position: any;
  rotation: [number, number, number];
  scale: any;
}

const WavingHand = ({ position }: { position: [number, number, number] }) => {
  const handRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (handRef.current) {
      handRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 3) * 0.2;
    }
  });

  return (
    <group ref={handRef} position={position}>
      <Text
        fontSize={0.6}
        fontWeight={600}
        color="black"
        position={[-0.2, 0.3, 0]}
      >
        👋
      </Text>
    </group>
  );
};

const Introduce: React.FC<IntroduceProps> = ({
  setMouseSelected,
  ...props
}) => {
  const buttonRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (buttonRef.current) {
      gsap.fromTo(
        buttonRef.current.position,
        { y: -0.9, opacity: 0 },
        { y: -0.8, opacity: 1, duration: 1 }
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

  const roundedRectShape = createRoundedRectShape(2, 0.5, 0.2);
  const geometry = new THREE.ExtrudeGeometry(roundedRectShape, {
    depth: 0.1,
    bevelEnabled: false,
  });

  return (
    <group {...props}>
      <>
        <Text
          fontSize={0.6}
          fontWeight={600}
          position={[0, 1, 0]}
          color="black"
          anchorX="left"
          anchorY="middle"
        >
          Hi, my {"\n"}
          name is Ha Duy.
        </Text>
        <WavingHand position={[5.3, 0.3, 0]} />
      </>
      <Text
        fontSize={0.2}
        position={[0.05, 0, 0]}
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
        onPointerEnter={() => {
          hoverEffect(1.01, "#06b6d4");
          setMouseSelected(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerLeave={() => {
          hoverEffect(1, "#38bdf8");
          setMouseSelected(false);
          document.body.style.cursor = "auto";
        }}
      >
        <meshStandardMaterial color="#38bdf8" />
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
