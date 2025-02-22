/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react";
import * as THREE from "three";

export default function CircularMask(props: any) {
  const material = useMemo(() => {
    const mat = new THREE.MeshBasicMaterial({
      colorWrite: false,
      stencilWrite: true,
      stencilRef: 1,
      stencilFunc: THREE.AlwaysStencilFunc,
      stencilZPass: THREE.ReplaceStencilOp,
    });
    return mat;
  }, []);
  return (
    <mesh {...props} material={material} renderOrder={0}>
      <circleGeometry args={[0.5, 64]} />
    </mesh>
  );
}
