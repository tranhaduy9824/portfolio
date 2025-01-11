/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTexture, useVideoTexture } from "@react-three/drei";
import * as THREE from "three";

const Laptop = ({ nodes, materials }: any) => {
  const loadingTxt = useVideoTexture("textures/loading.mp4", {
    start: true,
    loop: true,
  });

  if (loadingTxt) {  
    const geometry = nodes["G-ecran_1"].geometry;
  
    const box = new THREE.Box3().setFromObject(new THREE.Mesh(geometry));
    const size = new THREE.Vector3();
    box.getSize(size);
  
    const width = size.x;
    const height = size.y;
  
    const video = loadingTxt.image;
    
    const scaleFactor = Math.max(width / video.videoWidth, height / video.videoHeight) * 15; 
  
    loadingTxt.repeat.set(scaleFactor * (width / video.videoWidth), scaleFactor * (height / video.videoHeight) * 330);
  
    loadingTxt.offset.set(
      (1 - (width / video.videoWidth * scaleFactor)) / 1.2,
      (1 - (height / video.videoHeight * scaleFactor)) / 1.1
    );
  }

  return (
    <group position={[-29.917, -0.34, -16.228]}>
      <group
        position={[31.303, 1.083, 15.735]}
        rotation={[3.089, -0.603, 3.109]}
        scale={0.034}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["G-clavier_1"].geometry}
          material={materials["[Metal_Corrogated_Shiny]"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["G-clavier_2"].geometry}
          material={materials["[0136_Charcoal]"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["G-clavier_3"].geometry}
          material={materials["<LightGray>"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["G-clavier_4"].geometry}
          material={materials["[0129_WhiteSmoke]"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["G-clavier_5"].geometry}
          material={materials["[Color_004]"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["G-clavier_6"].geometry}
          material={materials["[0137_Black]"]}
        />
      </group>
      <group position={[0, 0.146, -8.405]}>
        <group
          position={[31.465, 0.954, 24.374]}
          rotation={[1.864, -0.194, 2.566]}
          scale={0.034}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["G-ecran_1"].geometry}
            rotation={[0, Math.PI, 0]}
            position={[12.4, 0, -8.4]}
          >
            <meshBasicMaterial
              map={loadingTxt}
              toneMapped={false}
              side={THREE.DoubleSide}
            />
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["G-ecran_2"].geometry}
            material={materials["[Metal_Corrogated_Shiny]"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["G-ecran_3"].geometry}
            material={materials["<LightGray>"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["G-ecran_4"].geometry}
            material={materials["[Translucent_Glass_Gray]"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["G-ecran_5"].geometry}
            material={materials["[Color_009]"]}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["C-Macbook_Pro"].geometry}
          material={materials["[0129_WhiteSmoke]"]}
          position={[31.275, 0.963, 24.469]}
          rotation={[1.923, -0.159, 2.746]}
          scale={[0.003, 0.006, 0.003]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["G-Object052"].geometry}
          material={materials["[0136_Charcoal]"]}
          position={[31.395, 0.942, 24.405]}
          rotation={[1.7, -0.096, 2.537]}
          scale={0.034}
        />
      </group>
    </group>
  );
};

export default Laptop;
