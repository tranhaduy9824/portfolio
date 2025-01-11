/* eslint-disable @typescript-eslint/no-explicit-any */
import { useVideoTexture } from "@react-three/drei";
import * as THREE from "three";

const Screen = ({ nodes, materials }: any) => {
  const screenTxt = useVideoTexture("textures/typing.mp4", {
    start: true,
    loop: true,
  });

  if (screenTxt) {
    screenTxt.flipY = false;
    screenTxt.repeat.set(1.5, 1.5);
    screenTxt.offset.set(-0.25, -0.1);
  }

  return (
    <group
      position={[2.485, -0.079, -2.249]}
      rotation={[Math.PI, 0, Math.PI]}
      scale={0.655}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["C-apple_imac_pro002"].geometry}
        material={materials.Color_}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["C-apple_imac_pro002_1"].geometry}
        material={materials["*19"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["C-apple_imac_pro002_2"].geometry}
        material={materials["*20"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["C-apple_imac_pro002_3"].geometry}
        material={materials.Material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["C-apple_imac_pro002_4"].geometry}
        material={materials["*22"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["C-apple_imac_pro002_5"].geometry}
      >
        <meshBasicMaterial
          map={screenTxt}
          toneMapped={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};

export default Screen;
