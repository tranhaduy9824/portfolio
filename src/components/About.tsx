/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useRef } from "react";
import { CanvasTexture } from "three";
import Avatar from "./Avatar";
import CircularMask from "./CircularMask";
import { shaderMaterial, Text } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";

const createGradientTexture = () => {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const gradient = ctx.createLinearGradient(0, size, 0, 0);
    gradient.addColorStop(0, "#fff1eb");
    gradient.addColorStop(1, "#ace0f9");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
  }
  return new CanvasTexture(canvas);
};

const BorderMaterial = shaderMaterial(
  { time: 0, borderRadius: 0.1 }, // Giảm giá trị để có hiệu ứng bo góc rõ hơn
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  `
    varying vec2 vUv;
    uniform float borderRadius;

    void main() {
      float thickness = 0.01;  // Độ dày viền (2px)
      vec3 color1 = vec3(1.0, 0.2, 0.5);
      vec3 color2 = vec3(0.2, 0.2, 1.0);
      vec3 gradient = mix(color1, color2, vUv.x);

      // 🎯 Chỉ giữ viền, làm trong suốt phần giữa
      float borderMask = 
        step(thickness, vUv.x) * step(thickness, vUv.y) *
        step(thickness, 1.0 - vUv.x) * step(thickness, 1.0 - vUv.y);

      // 🎯 Bo góc (rounded corners)
      float cornerRadius = 0.3; // Điều chỉnh để làm tròn góc 50px
      float cornerMask = 
        smoothstep(cornerRadius, cornerRadius + 0.02, length(vUv - 0.5));

      gl_FragColor = vec4(gradient, borderMask * cornerMask);
    }
  `
);
extend({ BorderMaterial });

const About = ({ nodes, materials }: any) => {
  const borderRef = useRef<any>();
  const gradientTexture = useMemo(() => createGradientTexture(), []);
  useFrame((state) => {
    if (borderRef.current) {
      borderRef.current.material.uniforms.time.value = state.clock.elapsedTime;
    }
  });

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
            <meshStandardMaterial map={gradientTexture} transparent />
          </mesh>
          <group position={[1.6, 0, 0]} scale={1}>
            <mesh ref={borderRef} position={[0, 0, -0.02]}>
              <planeGeometry args={[2, 0.5]} />
              <primitive object={new BorderMaterial()} attach="material" />
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
            <Text position={[-0.645, -0.1, 0]} fontSize={0.16} color={"black"}>
              Ha Duy
            </Text>
            <Text position={[-0.06, -0.1, 0]} fontSize={0.16} color={"black"}>
              20
            </Text>
            <Text position={[0.8, -0.1, 0]} fontSize={0.16} color={"black"}>
              Quang Nam
            </Text>
          </group>
        </group>
      </group>
    </group>
  );
};

export default About;
