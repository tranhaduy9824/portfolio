import { useGLTF } from "@react-three/drei";
import { useGraph } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { SkeletonUtils } from "three-stdlib";
import gsap from "gsap";

export default function Character(props: JSX.IntrinsicElements["group"]) {
  const groupRef = useRef<THREE.Group>(null);

  const { scene } = useGLTF("/models/character.glb");
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone) as {
    nodes: Record<string, THREE.Mesh & { skeleton: THREE.Skeleton }>;
    materials: Record<string, THREE.Material>;
  };

  useEffect(() => {
    if (groupRef.current) {
      console.log(nodes);

      const tl = gsap.timeline();
      tl.to(nodes.Head.rotation, { x: 0, duration: 1 })
        .to(nodes.Hips.rotation, { x: -Math.PI / 2, duration: 1 })
        .to(nodes.Spine.rotation, { x: Math.PI / 2, duration: 1 }, "<")
        
        // Leg
        .to(nodes.LeftUpLeg.rotation, { x: Math.PI / 10, duration: 1 }, "<")
        .to(nodes.RightUpLeg.rotation, { x: Math.PI / 10, duration: 1 }, "<")
        .to(nodes.LeftLeg.rotation, { x: -Math.PI / 3, duration: 1 }, "<")
        .to(nodes.RightLeg.rotation, { x: -Math.PI / 3, duration: 1 }, "<")
        
        // Arm
        .to(nodes.LeftArm.rotation, { x: 0, y: 0.7, z: 1.2, duration: 1 }, "<")
        .to(
          nodes.LeftForeArm.rotation,
          { x: -0.4, y: -0.8, z: 0.8, duration: 1 },
          "<"
        )
        .to(nodes.LeftHand.rotation, { x: 0, y: 0.8, z: 0, duration: 1 }, "<")
        .to(nodes.RightArm.rotation, { x: 0, y: -0.7, z: -0.9, duration: 1 }, "<")
        .to(
          nodes.RightForeArm.rotation,
          { x: -0.45, y: 0.7, z: -0.4, duration: 1 },
          "<"
        )
        .to(nodes.RightHand.rotation, { x: 0, y: -0.5, z: 0, duration: 1 }, "<")
        
        // Finger
        .to(nodes.LeftHandThumb1.rotation, { x: -0.2, duration: 1 }, "<")
        .to(nodes.LeftHandIndex1.rotation, { x: Math.PI / 12, duration: 1 }, "<")
        .to(nodes.LeftHandIndex2.rotation, { x: Math.PI / 6, duration: 1 }, "<")
        .to(nodes.LeftHandIndex3.rotation, { x: Math.PI / 6, duration: 1 }, "<")
        .to(
          nodes.LeftHandMiddle1.rotation,
          { x: Math.PI / 12, duration: 1 },
          "<"
        )
        .to(
          nodes.LeftHandMiddle2.rotation,
          { x: Math.PI / 6, duration: 1 },
          "<"
        )
        .to(
          nodes.LeftHandMiddle3.rotation,
          { x: Math.PI / 6, duration: 1 },
          "<"
        )
        .to(nodes.LeftHandRing1.rotation, { x: Math.PI / 12, duration: 1 }, "<")
        .to(nodes.LeftHandRing2.rotation, { x: Math.PI / 6, duration: 1 }, "<")
        .to(nodes.LeftHandRing3.rotation, { x: Math.PI / 6, duration: 1 }, "<")
        .to(
          nodes.LeftHandPinky1.rotation,
          { x: Math.PI / 12, duration: 1 },
          "<"
        )
        .to(
          nodes.LeftHandPinky2.rotation,
          { x: Math.PI / 6, duration: 1 },
          "<"
        )
        .to(
          nodes.LeftHandPinky3.rotation,
          { x: Math.PI / 6, duration: 1 },
          "<"
        )
        
        .to(nodes.RightHandThumb1.rotation, { x: -0.2, duration: 1 }, "<")
        .to(nodes.RightHandRing1.rotation, { x: Math.PI / 12, duration: 1 }, "<")
        .to(nodes.RightHandRing2.rotation, { x: Math.PI / 6, duration: 1 }, "<")
        .to(nodes.RightHandRing3.rotation, { x: Math.PI / 6, duration: 1 }, "<")
        .to(
          nodes.RightHandPinky1.rotation,
          { x: Math.PI / 12, duration: 1 },
          "<"
        )
        .to(
          nodes.RightHandPinky2.rotation,
          { x: Math.PI / 6, duration: 1 },
          "<"
        )
        .to(
          nodes.RightHandPinky3.rotation,
          { x: Math.PI / 6, duration: 1 },
          "<"
        );
    }
  }, [nodes]);

  return (
    <group ref={groupRef} {...props} dispose={null}>
      <primitive object={nodes.Hips} />
      <skinnedMesh
        name="EyeLeft"
        geometry={nodes.EyeLeft.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeLeft.skeleton}
        morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
      />
      <skinnedMesh
        name="EyeRight"
        geometry={nodes.EyeRight.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeRight.skeleton}
        morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Head"
        geometry={nodes.Wolf3D_Head.geometry}
        material={materials.Wolf3D_Skin}
        skeleton={nodes.Wolf3D_Head.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Teeth"
        geometry={nodes.Wolf3D_Teeth.geometry}
        material={materials.Wolf3D_Teeth}
        skeleton={nodes.Wolf3D_Teeth.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Hair.geometry}
        material={materials.Wolf3D_Hair}
        skeleton={nodes.Wolf3D_Hair.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Glasses.geometry}
        material={materials.Wolf3D_Glasses}
        skeleton={nodes.Wolf3D_Glasses.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Top.geometry}
        material={materials.Wolf3D_Outfit_Top}
        skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
        material={materials.Wolf3D_Outfit_Bottom}
        skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
        material={materials.Wolf3D_Outfit_Footwear}
        skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Body.geometry}
        material={materials.Wolf3D_Body}
        skeleton={nodes.Wolf3D_Body.skeleton}
      />
    </group>
  );
}

useGLTF.preload("/models/character.glb");
