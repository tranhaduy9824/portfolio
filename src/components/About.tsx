/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useRef } from "react";
import { CanvasTexture } from "three";
import Avatar from "./Avatar";
import CircularMask from "./CircularMask";
import { shaderMaterial, Text } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import SpiderNetwork from "./SpiderNetwork";
import { useAppStore } from "../store/useAppStore";

const createGradientTexture = (color1: string, color2: string) => {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    const gradient = ctx.createLinearGradient(0, size, 0, 0);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
  }

  return new CanvasTexture(canvas);
};

const BorderMaterial = shaderMaterial(
  {
    time: 0,
    thickness: 0.025,
    color1: new THREE.Color(185 / 255, 184 / 255, 184 / 255),
    color2: new THREE.Color(165 / 255, 195 / 255, 209 / 255),
  },
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  `
    varying vec2 vUv;
    uniform float thickness;
    uniform vec3 color1; // Thêm màu 1
    uniform vec3 color2; // Thêm màu 2

    void main() {
        float edgeX   = smoothstep(thickness - fwidth(vUv.x), thickness + fwidth(vUv.x), vUv.x);
        float edgeY   = smoothstep(thickness - fwidth(vUv.y), thickness + fwidth(vUv.y), vUv.y);
        float edgeX2  = smoothstep(thickness - fwidth(vUv.x), thickness + fwidth(vUv.x), 1.0 - vUv.x);
        float edgeY2  = smoothstep(thickness - fwidth(vUv.y), thickness + fwidth(vUv.y), 1.0 - vUv.y);

        float borderMask = 1.0 - (edgeX * edgeY * edgeX2 * edgeY2);

        float alpha = borderMask;

        if (alpha < 0.8) discard;

        vec3 gradient = mix(vec3(color1), vec3(color2), vUv.y);

        gl_FragColor = vec4(gradient, alpha);
    }
  `
);
extend({ BorderMaterial });

const About = ({ nodes, materials }: any) => {
  const { showNetwork, setShowNetwork } = useAppStore();

  const borderRef = useRef<any>();

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
          <SpiderNetwork />
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
