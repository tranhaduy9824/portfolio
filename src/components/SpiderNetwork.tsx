import { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { useLoader, useFrame, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useAppStore } from "../store/useAppStore";
import { useSpring, animated } from "@react-spring/three";
import { createSpiderNetwork, glowMaterial, normalMaterial } from "../utils";
import { logoModels } from "../constants";

const SpiderNetwork = () => {
  const [selectedLogos, setSelectedLogos] = useState<number[]>([]);
  const networkRef = useRef<THREE.Group>(null);
  const isDragging = useRef(false);
  const { camera } = useThree();
  const {
    showNetwork,
    isAnimationComplete,
    setIsAnimationComplete,
    positionCamera,
    setShowNetwork,
  } = useAppStore();

  const models = useLoader(
    GLTFLoader,
    logoModels.map((item) => item.model)
  );

  useEffect(() => {
    if (networkRef.current) {
      networkRef.current.traverse((object) => {
        if (
          object instanceof THREE.Mesh &&
          object.material instanceof THREE.Material
        ) {
          object.material.stencilWrite = !showNetwork && isAnimationComplete;
          object.material.stencilRef =
            !showNetwork && isAnimationComplete ? 1 : 0;
          object.material.stencilFunc = THREE.AlwaysStencilFunc;

          object.material.stencilFail = THREE.KeepStencilOp;
          object.material.stencilZFail = THREE.KeepStencilOp;
          object.material.stencilZPass = THREE.KeepStencilOp;
        }
      });
    }
  }, [showNetwork, isAnimationComplete, positionCamera]);

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
    position: showNetwork ? [1.3, -0.4, 5] : [2.37, 0, 0.1],
    scale: showNetwork ? [1, 1, 1] : [0.38, 0.38, 0.38],
    config: { tension: 100, friction: 20 },
    onStart: () => {
      rotationVelocity.current = [0, Math.PI * 2, 0];
      setIsAnimationComplete(false);
    },
    onRest: () => {
      rotationVelocity.current = [0, 0, 0];
      setIsAnimationComplete(true);
    },
  });

  const handleLogoClick = (index: number) => {
    setSelectedLogos((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  useFrame(({ camera }) => {
    glowMaterial.uniforms.viewVector.value = camera.position;
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight
        position={[2, 1, 5]}
        intensity={1}
        distance={10}
        color="#00aaff"
      />

      {!showNetwork && isAnimationComplete && (
        <mesh position={[2.27, -0.06, 1]} renderOrder={0}>
          <planeGeometry args={[2, 2]} />
          <meshBasicMaterial
            color="black"
            transparent
            opacity={0}
            stencilWrite={true}
            stencilRef={1}
            stencilFunc={THREE.AlwaysStencilFunc}
            stencilZPass={THREE.ReplaceStencilOp}
          />
        </mesh>
      )}

      <animated.group
        ref={networkRef}
        position={position as unknown as [number, number, number]}
        scale={scale as unknown as [number, number, number]}
        renderOrder={1}
      >
        <group position={[0, 0, 0]} ref={(el) => (logoRefs.current[0] = el!)}>
          <mesh>
            <primitive
              object={models[0].scene}
              scale={[1.2, 1.2, 1.2]}
              rotation={[0, 0, 0.3]}
            />
            <mesh material={glowMaterial} scale={0.12}>
              <sphereGeometry args={[1.3, 16, 16]} />
            </mesh>
          </mesh>
        </group>
        {createSpiderNetwork().map((point, index) => {
          const offsetPoint = point.clone().multiplyScalar(1.1);
          const isSelected = selectedLogos.includes(index);

          return (
            <group
              key={index}
              position={[offsetPoint.x, offsetPoint.y, offsetPoint.z]}
              ref={(el) => (logoRefs.current[index + 1] = el!)}
            >
              <mesh onClick={() => handleLogoClick(index)}>
                <primitive
                  object={models[index + 1].scene}
                  scale={logoModels[index + 1].scale}
                  rotation={[0, 0, 0.3]}
                  position={logoModels[index + 1].position}
                />
                <mesh
                  material={isSelected ? glowMaterial : normalMaterial}
                  scale={0.4}
                >
                  <sphereGeometry args={[0.3, 16, 16]} />
                </mesh>
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
            <meshBasicMaterial
              color={"#111"}
              stencilWrite={!showNetwork && isAnimationComplete}
              stencilRef={!showNetwork && isAnimationComplete ? 1 : 0}
              stencilFunc={THREE.EqualStencilFunc}
              stencilFail={THREE.KeepStencilOp}
              stencilZFail={THREE.KeepStencilOp}
              stencilZPass={THREE.KeepStencilOp}
            />
          </line>
        ))}
      </animated.group>
    </>
  );
};

export default SpiderNetwork;
