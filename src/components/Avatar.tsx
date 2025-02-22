/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGLTF } from "@react-three/drei";
import { useGraph, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useEffect, useRef } from "react";
import * as THREE from "three";
import { SkeletonUtils } from "three-stdlib";

interface AvatarProps {
  [key: string]: any;
}

export default function Avatar({ ...props }: AvatarProps): JSX.Element {
  const { scene } = useGLTF("/models/avatar.glb");
  const clone = useMemo(() => {
    const cloned = SkeletonUtils.clone(scene);
    const bbox = new THREE.Box3().setFromObject(cloned);
    const center = bbox.getCenter(new THREE.Vector3());
    cloned.position.sub(center);
    return cloned;
  }, [scene]);
  const { nodes, materials } = useGraph(clone) as {
    nodes: Record<string, THREE.Mesh & { skeleton: THREE.Skeleton }>;
    materials: Record<string, THREE.Material>;
  };

  const { mouse } = useThree((state) => ({
    mouse: state.mouse,
  }));
  const lastMousePosition = useRef({ x: 0, y: 0 });
  const idleTime = useRef(0);
  const resetTime = 2;

  useEffect(() => {
    Object.values(materials).forEach((material) => {
      if (material instanceof THREE.Material) {
        material.stencilWrite = true;
        material.stencilRef = 1;
        material.stencilFunc = THREE.EqualStencilFunc;
        material.stencilFail = THREE.KeepStencilOp;
        material.stencilZFail = THREE.KeepStencilOp;
        material.stencilZPass = THREE.KeepStencilOp;
      }
    });
  }, [materials]);

  useFrame((_, delta) => {
    const headNode = nodes.Head || nodes.Wolf3D_Head;
    if (headNode) {
      const maxRotationY = Math.PI / 8;
      const maxRotationX = Math.PI / 12;

      if (
        lastMousePosition.current.x !== mouse.x ||
        lastMousePosition.current.y !== mouse.y
      ) {
        lastMousePosition.current.x = mouse.x;
        lastMousePosition.current.y = mouse.y;
        idleTime.current = 0;
      } else {
        idleTime.current += delta;
      }

      const isResetting = idleTime.current >= resetTime;
      const targetAngleY = isResetting
        ? 0
        : THREE.MathUtils.clamp(
            -mouse.x * maxRotationY,
            -maxRotationY,
            maxRotationY
          );
      const targetAngleX = isResetting
        ? 0
        : THREE.MathUtils.clamp(
            mouse.y * maxRotationX,
            -maxRotationX,
            maxRotationX
          );

      const targetEuler = new THREE.Euler(
        -targetAngleX,
        -targetAngleY,
        0,
        "YXZ"
      );
      const targetQuaternion = new THREE.Quaternion().setFromEuler(targetEuler);

      headNode.quaternion.slerp(targetQuaternion, 0.04);
    }
  });

  return (
    <group {...props} dispose={null} renderOrder={1}>
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

useGLTF.preload("/models/avatar.glb");
