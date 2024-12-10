/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGLTF } from "@react-three/drei";
import { MeshStandardMaterial } from "three";

function Window(props: JSX.IntrinsicElements["group"]) {
  const { nodes } = useGLTF("/models/window.glb") as any;

  const customMaterial1 = new MeshStandardMaterial({ color: "#FFF" });

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["_(Loose_Entity)_1"].geometry}
        material={customMaterial1}
      />
    </group>
  );
}

export default Window;

useGLTF.preload("/models/window.glb");
