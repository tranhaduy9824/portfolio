import { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { useLoader, useFrame, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useAppStore } from "../store/useAppStore";
import { useSpring, animated } from "@react-spring/three";

const SpiderNetwork = () => {
  const networkRef = useRef<THREE.Group>(null);
  const isDragging = useRef(false);
  const { camera } = useThree();
  const { showNetwork } = useAppStore();

  const reactGlb = useLoader(GLTFLoader, "/models/logos/react_logo.glb");
  const htmlGlb = useLoader(GLTFLoader, "/models/logos/html_logo.glb");
  const jsGlb = useLoader(GLTFLoader, "/models/logos/html_logo.glb");
  const vscodeGlb = useLoader(GLTFLoader, "/models/logos/html_logo.glb");
  const tsGlb = useLoader(GLTFLoader, "/models/logos/html_logo.glb");
  const threeGlb = useLoader(GLTFLoader, "/models/logos/html_logo.glb");

  const logoModels = [htmlGlb, jsGlb, vscodeGlb, tsGlb, threeGlb];
  const repeatedLogos = [...logoModels, ...logoModels];

  const createSpiderNetwork = () => {
    const points: THREE.Vector3[] = [];
    const radius = 0.95;
    const numPoints = 10;

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

  const [rotation, setRotation] = useState([0, 0, 0]);
  const rotationVelocity = useRef([0, 0, 0]);
  const logoRefs = useRef<THREE.Group[]>([]);

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (isDragging.current) {
      const deltaX = event.movementX * 0.0005;
      rotationVelocity.current = [0, rotationVelocity.current[1] + deltaX, 0];
    }
  };

  useEffect(() => {
    if (showNetwork) {
      window.addEventListener("mousedown", handleMouseDown);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (showNetwork) {
        window.removeEventListener("mousedown", handleMouseDown);
        window.removeEventListener("mouseup", handleMouseUp);
        window.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [showNetwork]);

  useFrame(() => {
    if (networkRef.current) {
      rotationVelocity.current = [0, rotationVelocity.current[1] * 0.9, 0];

      setRotation((prevRotation) => [
        0,
        prevRotation[1] + rotationVelocity.current[1],
        0,
      ]);

      networkRef.current.rotation.set(0, rotation[1], 0);
    }

    logoRefs.current.forEach((logo) => {
      if (logo) {
        logo.lookAt(camera.position);
      }
    });
  });

  const { position, scale } = useSpring({
    position: showNetwork ? [1.3, -0.4, 5] : [2.39, 0, 0],
    scale: showNetwork ? [1, 1, 1] : [0.4, 0.4, 0.4],
    config: { tension: 100, friction: 20 },
    onStart: () => {
      rotationVelocity.current = [0, Math.PI * 2, 0];
    },
    onRest: () => {
      rotationVelocity.current = [0, 0, 0];
    },
  });

  return (
    <>
      {showNetwork && (
        <mesh position={[1, 0, 3.8]}>
          <planeGeometry args={[15, 13]} />
          <meshBasicMaterial color={"black"} transparent opacity={0.5} />
        </mesh>
      )}
      <animated.group
        ref={networkRef}
        position={position as unknown as [number, number, number]}
        scale={scale as unknown as [number, number, number]}
      >
        <group position={[0, 0, 0]} ref={(el) => (logoRefs.current[0] = el!)}>
          <mesh>
            <primitive
              object={reactGlb.scene}
              scale={[1.2, 1.2, 1.2]}
              rotation={[0, 0, 0.3]}
            />
          </mesh>
        </group>
        {createSpiderNetwork().map((point, index) => {
          const offsetPoint = point.clone().multiplyScalar(1.1);

          return (
            <group
              key={index}
              position={[offsetPoint.x, offsetPoint.y, offsetPoint.z]}
              ref={(el) => (logoRefs.current[index + 1] = el!)}
            >
              <mesh>
                <primitive
                  object={repeatedLogos[index].scene}
                  scale={0.025}
                  rotation={[0, 0, 0.3]}
                />
              </mesh>
              <mesh>
                <circleGeometry args={[0.1, 32]} />
                <meshBasicMaterial
                  color={"white"}
                  transparent
                  opacity={0.6}
                  depthTest={false}
                />
              </mesh>
            </group>
          );
        })}
        {createSpiderNetwork().map((point, index) => (
          <line key={index}>
            <bufferGeometry attach="geometry">
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array([0, 0, 0, point.x, point.y, point.z])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial attach="material" color={"#111"} linewidth={3} />
          </line>
        ))}
      </animated.group>
    </>
  );
};

export default SpiderNetwork;
