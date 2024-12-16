/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import * as THREE from "three";

function WindChimes(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/models/windChimes.glb") as any;

  const ringRef = useRef<THREE.Group>(null);
  const pivotRef = useRef<THREE.Object3D>(null);
  const clickSound = new Audio("/sounds/wind-chimes.mp3");
  clickSound.volume = 1;

  useEffect(() => {
    if (pivotRef.current && ringRef.current) {
      const tl = gsap.timeline({ repeat: -1, yoyo: true });
      tl.to(pivotRef.current.rotation, {
        x: "+=0.07",
        z: "+=0.07",
        duration: 1,
        ease: "power1.inOut",
      })
        .to(
          ringRef.current?.rotation,
          {
            x: "-=0.03",
            z: "-=0.03",
            duration: 1,
            ease: "power1.inOut",
          },
          "<"
        )
        .to(
          pivotRef.current.rotation,
          {
            x: "-=0.07",
            z: "-=0.07",
            duration: 1,
            ease: "power1.inOut",
          },
          ">"
        )
        .to(
          ringRef.current?.rotation,
          {
            x: "+=0.03",
            z: "+=0.03",
            duration: 1,
            ease: "power1.inOut",
          },
          "<"
        )
        .to(
          pivotRef.current.rotation,
          {
            x: "-=0.07",
            z: "-=0.07",
            duration: 1,
            ease: "power1.inOut",
          },
          ">"
        )
        .to(
          ringRef.current?.rotation,
          {
            x: "+=0.03",
            z: "+=0.03",
            duration: 1,
            ease: "power1.inOut",
          },
          "<"
        )
        .to(pivotRef.current.rotation, {
          x: "+=0.07",
          z: "+=0.07",
          duration: 1,
          ease: "power1.inOut",
        }, ">")
        .to(
          ringRef.current?.rotation,
          {
            x: "-=0.03",
            z: "-=0.03",
            duration: 1,
            ease: "power1.inOut",
          },
          "<"
        );
    }
  }, []);

  useFrame(() => {
    if (pivotRef.current) {
      clickSound.play();
    }
  });

  return (
    <group {...props} dispose={null}>
      <object3D ref={pivotRef} position={[0, 1, 0]}>
        <group position={[0, -1, 0]}>
          <group position={[-0.031, 0, -0.117]}>
            <group
              position={[0, 0.257, 0]}
              rotation={[Math.PI, 0, Math.PI]}
              scale={-1}
              ref={ringRef}
            >
              <mesh
                castShadow
                receiveShadow
                geometry={nodes["G-Object012_1"].geometry}
                material={materials["1111"]}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes["G-Object012_2"].geometry}
                material={materials["[Translucent_Glass_Blue]1"]}
              />
            </group>
            <group position={[0.034, 0.121, -0.034]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes["G-Object014"].geometry}
                material={materials["[Translucent_Glass_Blue]3"]}
                position={[0.001, 0.047, -0.001]}
                rotation={[0, 0, -Math.PI / 2]}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes["C-グループ#32"].geometry}
                material={materials["*12"]}
                position={[0.003, 0.138, -0.003]}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes["C-グループ#32001"].geometry}
                material={materials["*12"]}
                position={[0.003, 0.044, -0.003]}
              />
              <group position={[0, 0, -0.001]}>
                <group position={[0, -0.003, 0]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes["G-Object018"].geometry}
                    material={materials["*4"]}
                    position={[0.002, 0.263, -0.001]}
                    rotation={[Math.PI, 0, Math.PI]}
                    scale={-1}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes["G-Object019"].geometry}
                    material={materials["*4"]}
                    position={[0.001, 0.01, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes["G-Object020"].geometry}
                    material={materials["*4"]}
                    position={[0, 0.132, -0.002]}
                    rotation={[Math.PI / 6, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[0.038, 0, -0.057]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes["G-Object022"].geometry}
                material={materials["*2"]}
                position={[0, 0.13, 0]}
                rotation={[-Math.PI, 0, 0]}
              />
            </group>
          </group>
        </group>
      </object3D>
    </group>
  );
}

export default WindChimes;

useGLTF.preload("/models/windChimes.glb");
