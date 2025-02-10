import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { GroupProps } from "@react-three/fiber";

interface LampProps extends GroupProps {
  setMouseSelected: (value: boolean) => void;
  isLampOn: boolean;
  onClick: () => void;
}

export function Lamp({
  setMouseSelected,
  isLampOn,
  onClick,
  ...props
}: LampProps) {
  const { nodes, materials } = useGLTF("/models/lamp.glb") as unknown as {
    nodes: Record<string, THREE.Mesh & { skeleton: THREE.Skeleton }>;
    materials: Record<string, THREE.Material>;
  };

  return (
    <group
      {...props}
      dispose={null}
      onClick={onClick}
      onPointerEnter={() => {
        setMouseSelected(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerLeave={() => {
        setMouseSelected(false);
        document.body.style.cursor = "auto";
      }}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["G-Object"].geometry}
        material={materials.FD}
        position={[-0.1, 0, 0.1]}
        scale={[1, 1.6, 1]}
      />
      <group position={[0, 0.565, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["3DGeom~27_(C-3DGeom~27_Defintion)"].geometry}
          material={materials.FD}
          position={[0, 0.714, 0]}
          rotation={[Math.PI / 2, 0, 0.12]}
          scale={0.005}
        />
        <group position={[0.031, -0.412, 0.032]}>
          <group position={[0, 0.037, 0]} rotation={[0, 0, Math.PI]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes["C-コンポーネント#2_1"].geometry}
              material={materials.Material}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes["C-コンポーネント#2_2"].geometry}
              material={materials["[Color_000]"]}
              scale={[1, 1.6, 1]}
            />
          </group>
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["G-Object001"].geometry}
          material={materials.Material}
          position={[0.027, -0.1, 0.027]}
          rotation={[0, 0, -Math.PI]}
          scale={[1, 1.6, 1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["G-Object002"].geometry}
          material={materials.FD}
          position={[-0.004, -0.165, 0.004]}
        />
      </group>
      {isLampOn && (
        <directionalLight
          position={[-1.2, 2.2, 0.15]}
          intensity={1}
          color="yellow"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-bias={-0.0001}
        />
      )}
    </group>
  );
}

useGLTF.preload("/models/lamp.glb");
