/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useRef, useState } from "react";
import Avatar from "./Avatar";
import CircularMask from "./CircularMask";
import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import SpiderNetwork from "./SpiderNetwork";
import { useAppStore } from "../store/useAppStore";
import { BorderMaterial, createGradientTexture } from "../utils";
import ProjectList from "./ProjectList";

const About = ({ nodes, materials }: any) => {
  const { showNetwork, setShowNetwork } = useAppStore();
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [selectedTechStack, setSelectedTechStack] = useState<number[]>([]);

  const borderRef = useRef<any>();

  const handleProjectSelect = (techStack: number[]) => {
    setSelectedTechStack(techStack);
    setSelectedProject((prev) => (prev === null ? 1 : prev));
  };

  const gradientTexture11 = useMemo(
    () => createGradientTexture("rgb(255, 241, 235)", "rgb(172, 224, 249)"),
    []
  );
  const gradientTexture2 = useMemo(
    () => createGradientTexture("rgb(255, 241, 235)", "#FB7B8E"),
    []
  );
  const gradientTexture3 = useMemo(
    () => createGradientTexture("rgb(255, 241, 235)", "#FFDD94"),
    []
  );
  useFrame((state) => {
    if (borderRef.current) {
      borderRef.current.material.uniforms.time.value = state.clock.elapsedTime;
    }
  });

  const handleClick = () => {
    setShowNetwork(!showNetwork);
  };

  return (
    <group
      position={[1.973, 1.388, -0.9]}
      rotation={[-3.14, -Math.PI / 2, -Math.PI]}
      scale={0.56}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["C-E70647_(1)002"].geometry}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["C-E70647_(1)002_1"].geometry}
        material={materials.Color_1}
      />
      <group position={[0.25, 0.25, 0.05]} scale={0.25}>
        <group position={[-0.6, 0.6, 0]} scale={0.5}>
          <group position={[0, -2.93, 0]} scale={1.8}>
            <Avatar />
          </group>
          <CircularMask position={[0, 0, 0]} />
          <mesh castShadow receiveShadow position={[0, 0, 0.0]}>
            <circleGeometry args={[0.5, 64]} />
            <meshStandardMaterial map={gradientTexture11} transparent />
          </mesh>
          <group position={[1.5, 0, 0]} scale={1}>
            <mesh ref={borderRef} position={[0, 0, 0]}>
              <planeGeometry args={[2.75, 0.7]} />
              <primitive
                object={new BorderMaterial()}
                attach="material"
                depthWrite={false}
              />
            </mesh>
            <Text position={[-0.7, 0.1, 0]} fontSize={0.13} color={"black"}>
              Name :
            </Text>
            <Text position={[-0, 0.1, 0]} fontSize={0.13} color={"black"}>
              Age :
            </Text>
            <Text position={[0.55, 0.1, 0]} fontSize={0.13} color={"black"}>
              From :
            </Text>
            <Text
              position={[-0.645, -0.1, 0]}
              fontSize={0.15}
              color="rgb(74, 116, 132)"
              fontWeight={"bold"}
            >
              Ha Duy
            </Text>
            <Text
              position={[-0.06, -0.1, 0]}
              fontSize={0.15}
              color="rgb(74, 116, 132)"
              fontWeight={"bold"}
            >
              20
            </Text>
            <Text
              position={[0.8, -0.1, 0]}
              fontSize={0.15}
              color="rgb(74, 116, 132)"
              fontWeight={"bold"}
            >
              Quang Nam
            </Text>
          </group>
        </group>
        <group position={[-0.6, 0, 0]} scale={0.5}>
          <SpiderNetwork
            selectedLogos={selectedTechStack}
            onLogoSelect={() => {}}
          />
          <CircularMask position={[2.39, 0, 0]} />
          <mesh
            castShadow
            receiveShadow
            position={[2.39, 0, 0.0]}
            onClick={handleClick}
          >
            <circleGeometry args={[0.5, 64]} />
            <meshStandardMaterial map={gradientTexture2} transparent />
          </mesh>
          <group position={[0.93, 0, 0]} scale={1}>
            <mesh ref={borderRef} position={[0, 0, 0]}>
              <planeGeometry args={[2.75, 0.7]} />
              <primitive
                object={new BorderMaterial()}
                attach="material"
                depthWrite={false}
                color2={new THREE.Color(216 / 255, 114 / 255, 129 / 255)}
              />
            </mesh>
            <Text
              position={[-0.93, 0.2, 0]}
              fontSize={0.13}
              color="#bb4658"
              fontWeight={"bold"}
            >
              Tech Stack
            </Text>
            <Text position={[-0.195, 0, 0]} fontSize={0.115} color={"black"}>
              I specialize in JavaScript/TypeScript with
            </Text>
            <Text
              position={[-0.175, -0.15, 0]}
              fontSize={0.115}
              color={"black"}
            >
              a focus on React and Next.js ecosystems.
            </Text>
          </group>
        </group>
        <ProjectList
          showNetwork={showNetwork}
          onProjectSelect={handleProjectSelect}
          selectedProject={selectedProject}
        />
        <group position={[-0.6, -0.6, 0]} scale={0.5}>
          <mesh castShadow receiveShadow position={[0, 0, 0.0]}>
            <circleGeometry args={[0.5, 64]} />
            <meshStandardMaterial map={gradientTexture3} transparent />
          </mesh>
          <group position={[1.5, 0, 0]} scale={1}>
            <mesh ref={borderRef} position={[0, 0, 0]}>
              <planeGeometry args={[2.75, 0.7]} />
              <primitive
                object={new BorderMaterial()}
                attach="material"
                depthWrite={false}
                color2={new THREE.Color(227 / 255, 197 / 255, 132 / 255)}
              />
            </mesh>
            <Text
              position={[-0.05, 0.2, 0]}
              fontSize={0.13}
              color="#d0a11b"
              fontWeight={"bold"}
            >
              I work across timezones.
            </Text>
            <Text position={[0.07, 0, 0]} fontSize={0.115} color={"black"}>
              I'm based in Da Nang with remote
            </Text>
            <Text position={[-0.45, -0.15, 0]} fontSize={0.115} color={"black"}>
              work available.
            </Text>
          </group>
        </group>
      </group>
    </group>
  );
};

export default About;
