/* eslint-disable react-hooks/rules-of-hooks */
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { useLoader, useFrame, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useAppStore } from "../store/useAppStore";
import { useSpring, animated } from "@react-spring/three";
import {
  createSpiderNetwork,
  glowLineMaterial,
  glowMaterial,
  normalLineMaterial,
} from "../utils";
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
          if (
            object.material instanceof THREE.MeshStandardMaterial ||
            object.material instanceof THREE.MeshPhysicalMaterial
          ) {
            object.material.envMap = null;
            object.material.envMapIntensity = 0;
          }
          object.material.needsUpdate = true;
        }
      });

      models.forEach((model) => {
        model.scene.traverse((child) => {
          if (
            child instanceof THREE.Mesh &&
            child.material instanceof THREE.Material
          ) {
            if (
              child.material instanceof THREE.MeshStandardMaterial ||
              child.material instanceof THREE.MeshPhysicalMaterial
            ) {
              child.material.envMap = null;
              child.material.envMapIntensity = 0;
            }
            child.material.needsUpdate = true;
          }
        });
      });
    }
  }, [showNetwork, isAnimationComplete, positionCamera, models]);

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

    glowMaterial.uniforms.time.value += 0.016;
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
      {showNetwork && (
        <pointLight
          position={[2, 1, 5]}
          intensity={0.5}
          distance={10}
          color="#00aaff"
        />
      )}

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

          const { color: sphereColor, opacity: sphereOpacity } = useSpring({
            color: isSelected ? "#00ccff" : "#006688",
            opacity: isSelected ? 0.7 : 0.1,
            config: { tension: 200, friction: 20 },
          });

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
                <mesh scale={0.4}>
                  <sphereGeometry args={[0.3, 16, 16]} />
                  <animated.meshBasicMaterial
                    color={sphereColor}
                    transparent
                    opacity={sphereOpacity}
                    side={THREE.BackSide}
                    depthWrite={false}
                  />
                </mesh>
              </mesh>
            </group>
          );
        })}
        {createSpiderNetwork().map((point, index) => {
          const isSelected = selectedLogos.includes(index);
          const centerSphereRadius = 1.3 * 0.12; // Bán kính sphere trung tâm
          const iconSphereRadius = 0.3 * 0.4; // Bán kính sphere icon
          const start = new THREE.Vector3(0, 0, 0);
          const end = new THREE.Vector3(
            point.x,
            point.y,
            point.z
          ).multiplyScalar(1.1);
          const direction = end.clone().sub(start).normalize();
          const startAdjusted = start
            .clone()
            .add(direction.clone().multiplyScalar(centerSphereRadius));
          const endAdjusted = end
            .clone()
            .sub(direction.clone().multiplyScalar(iconSphereRadius));
          const distance = startAdjusted.distanceTo(endAdjusted);
          const cylinderRadius = isSelected ? 0.008 : 0.004;

          const { color: lineColor, opacity: lineOpacity } = useSpring({
            color: isSelected ? "#00ccff" : "#333333",
            opacity: isSelected ? 0.8 : 0.2,
            config: { tension: 200, friction: 20 },
          });

          return (
            <mesh
              key={index}
              position={startAdjusted.clone().lerp(endAdjusted, 0.5)}
              quaternion={new THREE.Quaternion().setFromUnitVectors(
                new THREE.Vector3(0, 1, 0),
                direction
              )}
            >
              <cylinderGeometry
                args={[cylinderRadius, cylinderRadius, distance, 16]}
              />
              <animated.meshBasicMaterial
                color={lineColor}
                transparent
                opacity={lineOpacity}
                stencilWrite={!showNetwork && isAnimationComplete}
                stencilRef={!showNetwork && isAnimationComplete ? 1 : 0}
                stencilFunc={THREE.EqualStencilFunc}
                stencilFail={THREE.KeepStencilOp}
                stencilZFail={THREE.KeepStencilOp}
                stencilZPass={THREE.KeepStencilOp}
              />
            </mesh>
          );
        })}
      </animated.group>
    </>
  );
};

export default SpiderNetwork;
