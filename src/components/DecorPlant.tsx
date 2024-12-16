import { useGLTF } from "@react-three/drei";
import { useGraph } from "@react-three/fiber";
import gsap from "gsap";
import React, { useEffect } from "react";
import * as THREE from "three";
import { SkeletonUtils } from "three-stdlib";

function DecorPlant(props: JSX.IntrinsicElements["group"]) {
  const { scene } = useGLTF("/models/decorPlant.glb");
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone) as {
    nodes: Record<string, THREE.Mesh & { skeleton: THREE.Skeleton }>;
    materials: Record<string, THREE.Material>;
  };

  useEffect(() => {
    const object1 = nodes["3DGeom~1_(C-3DGeom~1_Defintion)"];
    const object2 = nodes["3DGeom~2_(C-3DGeom~2_Defintion)"];
  
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(
      { z: object1.rotation.z },
      {
        z: 0.05,
        duration: 2,
        onUpdate: function () {
          object1.rotation.z = this.targets()[0].z;
          object1.updateMatrixWorld();
        },
      }
    );
    tl.to(
      { z: object2.rotation.z },
      {
        z: -0.05,
        duration: 2,
        onUpdate: function () {
          object2.rotation.z = this.targets()[0].z;
          object2.updateMatrixWorld();
        },
      },
      "<"
    );
  }, [nodes]);  

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["3DGeom~1_(C-3DGeom~1_Defintion)"].geometry}
        material={materials["Material~1"]}
        position={[225.882, -0.847, 141.47]}
        scale={0.084}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["3DGeom~2_(C-3DGeom~2_Defintion)"].geometry}
        material={materials["Material~2"]}
        position={[0.33, 0, 0.2]}
        scale={0.087}
      />
    </group>
  );
}

export default DecorPlant;

useGLTF.preload("/models/decorPlant.glb");
