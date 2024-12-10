/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGLTF } from '@react-three/drei'

function DecorPlant(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/models/decorPlant.glb') as any;
  return (
    <group {...props} dispose={null}> 
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['3DGeom~1_(C-3DGeom~1_Defintion)'].geometry}
        material={materials['Material~1']}
        position={[225.882, -0.847, 141.47]}
        scale={0.084}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['3DGeom~2_(C-3DGeom~2_Defintion)'].geometry}
        material={materials['Material~2']}
        position={[0.33, 0, 0.2]}
        scale={0.087}
      />
    </group>
  )
}

export default DecorPlant

useGLTF.preload('/models/decorPlant.glb')