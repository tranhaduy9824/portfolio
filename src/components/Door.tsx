/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGLTF } from '@react-three/drei'

function Door(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/models/door.glb') as any;
  
  return (
    <group {...props} dispose={null}>
      <group position={[0, 0.003, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['C-Ex_Door_01_component_03'].geometry}
          material={materials.Material}
          position={[0.003, -0.014, -0.053]}    
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['C-Ex_Door_35_component_02'].geometry}
          material={materials.PDM_Ex_Door_Frame_01}
          position={[0.003, 0.039, -0.053]}
        />
      </group>
      <group position={[0.053, 0.042, -0.111]}>
        <group position={[0.838, 0, -0.044]} rotation={[Math.PI, 0, Math.PI]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['C-Ex_Door_40_component_05_1'].geometry}
            material={materials.PDM_Light_Green_Front_Door}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['C-Ex_Door_40_component_05_2'].geometry}
            material={materials.Material}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['C-Ex_Door_40_component_06'].geometry}
          material={materials.PDM_Light_Green_Front_Door}
          position={[0.264, 0.755, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['C-Ex_Door_40_component_06001'].geometry}
          material={materials.PDM_Light_Green_Front_Door}
          position={[0.162, 0.755, -0.044]}
          rotation={[Math.PI, 0, Math.PI]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['C-Ex_Door_40_component_06002'].geometry}
          material={materials.PDM_Light_Green_Front_Door}
          position={[0.506, 0.755, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['C-Ex_Door_40_component_06003'].geometry}
          material={materials.PDM_Light_Green_Front_Door}
          position={[0.404, 0.755, -0.044]}
          rotation={[Math.PI, 0, Math.PI]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['C-Ex_Door_40_component_06004'].geometry}
          material={materials.PDM_Light_Green_Front_Door}
          position={[0.747, 0.755, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['C-Ex_Door_40_component_06005'].geometry}
          material={materials.PDM_Light_Green_Front_Door}
          position={[0.645, 0.755, -0.044]}
          rotation={[Math.PI, 0, Math.PI]}
        />
        <group position={[0.219, 1.004, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['_C-Ex_Door_40_component_07_(Loose_Mesh)'].geometry}
            material={materials.PDM_Light_Green_Front_Door}
            rotation={[0, 0, Math.PI / 2]}
            scale={[1, 1, 1.257]}
          />
        </group>
        <group position={[0.444, 1.004, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['_C-Ex_Door_40_component_07_(Loose_Mesh)001'].geometry}
            material={materials.PDM_Light_Green_Front_Door}
            rotation={[0, 0, Math.PI / 2]}
            scale={[1, 1, 1.257]}
          />
        </group>
        <group position={[0.669, 1.004, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['_C-Ex_Door_40_component_07_(Loose_Mesh)002'].geometry}
            material={materials.PDM_Light_Green_Front_Door}
            rotation={[0, 0, Math.PI / 2]}
            scale={[1, 1, 1.257]}
          />
        </group>
        <group position={[0.444, 1.235, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['_C-Ex_Door_40_component_07_(Loose_Mesh)003'].geometry}
            material={materials.PDM_Light_Green_Front_Door}
            rotation={[0, 0, Math.PI / 2]}
            scale={[1, 1, 1.257]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['G-Object021'].geometry}
            material={materials.PDM_Door_glass_12}
            position={[0.101, 0.01, -0.022]}
            rotation={[0, 0, Math.PI / 2]}
            scale={[0.189, 0.723, 1]}
          />
        </group>
        <group position={[0.669, 1.235, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['_C-Ex_Door_40_component_07_(Loose_Mesh)004'].geometry}
            material={materials.PDM_Light_Green_Front_Door}
            rotation={[0, 0, Math.PI / 2]}
            scale={[1, 1, 1.257]}
          />
        </group>
        <group position={[0.219, 1.235, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['_C-Ex_Door_40_component_07_(Loose_Mesh)005'].geometry}
            material={materials.PDM_Light_Green_Front_Door}
            rotation={[0, 0, Math.PI / 2]}
            scale={[1, 1, 1.257]}
          />
        </group>
        <group position={[0.219, 1.466, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['_C-Ex_Door_40_component_07_(Loose_Mesh)006'].geometry}
            material={materials.PDM_Light_Green_Front_Door}
            rotation={[0, 0, Math.PI / 2]}
            scale={[1, 1, 1.257]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['G-Object024'].geometry}
            material={materials.PDM_Door_glass_12}
            position={[0.101, 0.01, -0.022]}
            rotation={[0, 0, Math.PI / 2]}
            scale={[0.189, 0.723, 1]}
          />
        </group>
        <group position={[0.669, 1.466, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['_C-Ex_Door_40_component_07_(Loose_Mesh)007'].geometry}
            material={materials.PDM_Light_Green_Front_Door}
            rotation={[0, 0, Math.PI / 2]}
            scale={[1, 1, 1.257]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['G-Object025'].geometry}
            material={materials.PDM_Door_glass_12}
            position={[0.101, 0.01, -0.022]}
            rotation={[0, 0, Math.PI / 2]}
            scale={[0.189, 0.723, 1]}
          />
        </group>
        <group position={[0.444, 1.466, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['_C-Ex_Door_40_component_07_(Loose_Mesh)008'].geometry}
            material={materials.PDM_Light_Green_Front_Door}
            rotation={[0, 0, Math.PI / 2]}
            scale={[1, 1, 1.257]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['G-Object026'].geometry}
            material={materials.PDM_Door_glass_12}
            position={[0.101, 0.01, -0.022]}
            rotation={[0, 0, Math.PI / 2]}
            scale={[0.189, 0.723, 1]}
          />
        </group>
        <group position={[0.669, 1.697, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['_C-Ex_Door_40_component_07_(Loose_Mesh)009'].geometry}
            material={materials.PDM_Light_Green_Front_Door}
            rotation={[0, 0, Math.PI / 2]}
            scale={[1, 1, 1.257]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['G-Object027'].geometry}
            material={materials.PDM_Door_glass_12}
            position={[0.101, 0.01, -0.022]}
            rotation={[0, 0, Math.PI / 2]}
            scale={[0.189, 0.723, 1]}
          />
        </group>
        <group position={[0.219, 1.697, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['_C-Ex_Door_40_component_07_(Loose_Mesh)010'].geometry}
            material={materials.PDM_Light_Green_Front_Door}
            rotation={[0, 0, Math.PI / 2]}
            scale={[1, 1, 1.257]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['G-Object028'].geometry}
            material={materials.PDM_Door_glass_12}
            position={[0.101, 0.01, -0.022]}
            rotation={[0, 0, Math.PI / 2]}
            scale={[0.189, 0.723, 1]}
          />
        </group>
        <group position={[0.444, 1.697, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['_C-Ex_Door_40_component_07_(Loose_Mesh)011'].geometry}
            material={materials.PDM_Light_Green_Front_Door}
            rotation={[0, 0, Math.PI / 2]}
            scale={[1, 1, 1.257]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['G-Object029'].geometry}
            material={materials.PDM_Door_glass_12}
            position={[0.101, 0.01, -0.022]}
            rotation={[0, 0, Math.PI / 2]}
            scale={[0.189, 0.723, 1]}
          />
        </group>
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['C-Ex_Door_House_Number'].geometry}
        material={materials.PDM_Brass_Door_01}
        position={[0.467, 1.997, -0.111]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.415}
      />
      <group position={[0.877, 1.341, -0.111]} rotation={[0, -1.571, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['C-Ex_Door_Latch_01#5_1'].geometry}
          material={materials.PDM_Brass_Door_01}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['C-Ex_Door_Latch_01#5_2'].geometry}
          material={materials.PDM_Keyhole}
        />
      </group>
      <group position={[1.001, 1.423, -0.153]}>
        <group position={[-0.036, 0, -0.002]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['G-Object012'].geometry}
            material={materials.PDM_Brass_Door_01}
            position={[-0.002, 0, 0.002]}
            rotation={[0, 0, -Math.PI]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['G-Object013'].geometry}
            material={materials.PDM_Brass_Door_01}
            position={[-0.08, -0.024, -0.025]}
            rotation={[-Math.PI / 2, 0, 0]}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['G-Object014'].geometry}
          material={materials.PDM_Brass_Door_01}
          rotation={[0, 0, -Math.PI]}
        />
      </group>
      <group position={[0.643, 0.926, -0.111]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['G-Object016'].geometry}
          material={materials.PDM_Brass_Door_01}
          rotation={[Math.PI, 0, Math.PI]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['G-Object017'].geometry}
          material={materials.PDM_Brass_Door_01}
          position={[-0.035, 0.014, 0.004]}
          rotation={[Math.PI, 0, Math.PI]}
        />
      </group>
      <group position={[0.885, 0.894, -0.103]}>
        <group position={[0.034, 0, -0.061]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['G-Object001'].geometry}
            material={materials.PDM_Brass_Door_01}
            rotation={[Math.PI, 0, Math.PI]}
          />
          <group position={[-0.011, 0.031, 0.003]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes['G-Object003'].geometry}
              material={materials.PDM_Brass_Door_01}
              rotation={[Math.PI, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes['G-Object004'].geometry}
              material={materials.PDM_Brass_Door_01}
              position={[0, 0, -0.001]}
              rotation={[Math.PI, 0, Math.PI]}
            />
          </group>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['G-Object005'].geometry}
            material={materials.PDM_Brass_Door_01}
            position={[0, 0, 0.003]}
            rotation={[Math.PI, 0, Math.PI]}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['G-Object006'].geometry}
          material={materials.PDM_Brass_Door_01}
        />
        <group position={[0.011, 0.031, -0.003]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['G-Object008'].geometry}
            material={materials.PDM_Brass_Door_01}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['G-Object009'].geometry}
            material={materials.PDM_Brass_Door_01}
            position={[0, 0, 0.001]}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['G-Object010'].geometry}
          material={materials.PDM_Brass_Door_01}
          position={[0, 0, -0.003]}
        />
      </group>
    </group>
  )
}

export default Door

useGLTF.preload('/models/door.glb')