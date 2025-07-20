import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import { CanvasTexture } from "three";
import * as THREE from "three";

// About
export const createGradientTexture = (color1: string, color2: string) => {
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

export const BorderMaterial = shaderMaterial(
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

export const createSpiderNetwork = () => {
  const points: THREE.Vector3[] = [];
  const radius = 0.95;
  const numPoints = 15;

  for (let i = 0; i < numPoints; i++) {
    const y = 1 - (i / (numPoints - 1)) * 2;
    const theta = Math.acos(y);
    const phi = Math.PI * (3 - Math.sqrt(5)) * i;

    const x = radius * Math.sin(theta) * Math.cos(phi);
    const z = radius * Math.sin(theta) * Math.sin(phi);

    points.push(new THREE.Vector3(x, y * radius, z));
  }

  return points;
};

export const glowMaterial = new THREE.ShaderMaterial({
  uniforms: {
    glowColor: { value: new THREE.Color("#00ccff") },
    intensity: { value: 1.5 },
    viewVector: { value: new THREE.Vector3() },
    glowWidth: { value: 1 },
    time: { value: 0.0 },
  },
  vertexShader: `
    varying vec3 vNormal;
    varying vec3 vPosition;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 glowColor;
    uniform float intensity;
    uniform vec3 viewVector;
    uniform float glowWidth;
    uniform float time;
    varying vec3 vNormal;
    varying vec3 vPosition;

    void main() {
      float viewAngle = dot(normalize(vNormal), normalize(viewVector));
      float edge = 1.0 - abs(viewAngle);
      float glow = smoothstep(1.0 - glowWidth, 1.0, edge) * intensity;
      glow *= (0.8 + 0.2 * sin(time * 2.0));
      gl_FragColor = vec4(glowColor, glow * 0.7); // Màu độc lập, không bị ánh sáng môi trường
    }
  `,
  side: THREE.BackSide,
  blending: THREE.AdditiveBlending,
  transparent: true,
  depthWrite: false,
});

export const normalMaterial = new THREE.MeshBasicMaterial({
  color: "#006688",
  transparent: true,
  opacity: 0.1,
  side: THREE.BackSide,
  depthWrite: false,
});
