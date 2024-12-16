/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGLTF } from "@react-three/drei";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import * as THREE from "three";

function MyRoom(props: any) {
  const { nodes, materials } = useGLTF("/models/desk.glb") as any;
  const mouseRef = useRef<THREE.Group>(null);

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1, yoyo: true });

    if (mouseRef.current && props.mouseMove) {
      tl.to(mouseRef.current.position, {
        x: "+=0.09",
        z: "+=0.01",
        duration: 2,
        ease: "power1.inOut",
        onUpdate: () => {
          console.log("Position after move:", mouseRef.current?.position);
        },
      }).to(
        mouseRef.current.position,
        {
          x: "-=0.09",
          z: "-=0.01",  
          duration: 2,
          ease: "power1.inOut",
          onUpdate: () => {
            console.log("Position after return:", mouseRef.current?.position);
          },
        },
        ">+3"
      );
    }

    return () => {
      tl.kill();
    };
  }, [props.mouseMove]);

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["G-Object034"].geometry}
        material={materials["*5"]}
        position={[2, 1.687, 0]}
        rotation={[0, Math.PI / 2, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["G-Object035"].geometry}
        material={materials["*2"]}
        position={[0, 0.747, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["G-Object035"].geometry}
        material={materials["*2"]}
        position={[2, 0.747, 0]}
        rotation={[0, Math.PI / 2, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["G-Object036"].geometry}
        material={materials["*5"]}
        position={[2, 1.347, 0]}
        rotation={[0, Math.PI / 2, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["G-Object037"].geometry}
        material={materials["*5"]}
        position={[2, 0.621, 0]}
        scale={[0.636, 1.242, 1]}
        rotation={[0, Math.PI / 2, 0]}
      />
      <group position={[1.4, 0.497, -0.039]} rotation={[0, Math.PI / 2, 0]}>
        <group rotation={[Math.PI, -1.567, Math.PI]} scale={0.81}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["C-livro_1002"].geometry}
            material={materials.capa_oca}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["C-livro_1002_1"].geometry}
            material={materials.Material}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["C-livro_1002_2"].geometry}
            material={materials["[Sketchy_Lines_Wavy_Vertical]"]}
          />
        </group>
        <group
          position={[0.007, 0.024, -0.002]}
          rotation={[Math.PI, -1.567, Math.PI]}
          scale={0.81}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["C-livro_2002"].geometry}
            material={materials.capa_400w}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["C-livro_2002_1"].geometry}
            material={materials["[Sketchy_Lines_Wavy_Vertical]"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["C-livro_2002_2"].geometry}
            material={materials.Material}
          />
        </group>
      </group>
      <group
        position={[1.53, 0.539, -0.35]}
        rotation={[Math.PI, -Math.PI / 2, -Math.PI / 2]}
        scale={0.113}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["C-_2_Bo11002"].geometry}
          material={materials.cp9}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["C-_2_Bo11002_1"].geometry}
          material={materials.Color_001}
        />
      </group>
      {/* Screen */}
      <group position={[1.064, 0.748, -0.356]}>
        <group position={[-0.1, -0.008, 0.06]} rotation={[0, 0, 0]} scale={1.3}>
          <group rotation={[0, Math.PI / 2, 0]} scale={0.012}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes["C-apple_imac_keyboard002_1"].geometry}
              material={materials["imac_teclado-top"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes["C-apple_imac_keyboard002_2"].geometry}
              material={materials.Material4}
            />
          </group>
          <group
            position={[-0.236, 0.011, -0.001]}
            rotation={[3.009, 1.571, 0]}
            scale={[-0.028, -0.028, -0.036]}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes["G-Object038_1"].geometry}
              material={materials.Material12}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes["G-Object038_2"].geometry}
              material={materials.Material13}
            />
          </group>
          <group
            position={[0.051, 0.011, -0.001]}
            rotation={[3.009, 1.571, 0]}
            scale={[-0.028, -0.028, -0.036]}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes["G-Object039_1"].geometry}
              material={materials.Material12}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes["G-Object039_2"].geometry}
              material={materials.Material13}
            />
          </group>
        </group>
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
            material={materials.overview_hero4_20091020}
          />
        </group>
        <group position={[-0.576, 0, -0.12]} ref={mouseRef}>
          <group position={[-0.001, 0, 0.002]}>
            <group position={[0.018, 0, -0.021]}>
              <group
                position={[-0.018, 0, 0.022]}
                rotation={[-Math.PI, 0, -Math.PI]}
                scale={0.074}
              >
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes["C-Component#14002"].geometry}
                  material={materials["[Color_002]"]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes["C-Component#14002_1"].geometry}
                  material={materials["[Color_008]1"]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes["C-Component#14002_2"].geometry}
                  material={materials["[Color_006]"]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes["C-Component#14002_3"].geometry}
                  material={materials["[Color_000]"]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes["C-Component#14002_4"].geometry}
                  material={materials["[Color_A01]"]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes["C-Component#14002_5"].geometry}
                  material={materials["[Color_007]"]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes["C-Component#14002_6"].geometry}
                  material={materials["[Translucent_Glass_Gray]"]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes["C-Component#14002_7"].geometry}
                  material={materials["[Color_B25]"]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes["C-Component#14002_8"].geometry}
                  material={materials["[Color_G01]"]}
                />
              </group>
            </group>
          </group>
        </group>
      </group>
      {/* Chair */}
      <group position={[0.848, 0.001, -0.7]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["3DGeom~2_(C-3DGeom~2_Defintion#2)"].geometry}
          material={materials["*14"]}
          position={[0.154, 0.365, -0.073]}
          rotation={[0, -0.02, 0]}
          scale={0.015}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["3DGeom~3_(C-3DGeom~3_Defintion#1)"].geometry}
          material={materials["*14"]}
          position={[-0.25, 0.365, -0.081]}
          rotation={[0, -0.02, 0]}
          scale={0.015}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["3DGeom~1_(C-3DGeom~1_Defintion)"].geometry}
          material={materials["*14"]}
          position={[0.084, 0.373, -0.217]}
          rotation={[0, -0.02, 0]}
          scale={0.001}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["3DGeom~4_(C-3DGeom~4_Defintion#1)"].geometry}
          material={materials.Material}
          position={[0.079, 0.373, 0.034]}
          rotation={[0, -0.02, 0]}
          scale={0.001}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["3DGeom~5_(C-3DGeom~5_Defintion#1)"].geometry}
          material={materials.Material}
          position={[-0.158, 0.373, -0.221]}
          rotation={[0, -0.02, 0]}
          scale={0.001}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["3DGeom~6_(C-3DGeom~6_Defintion#1)"].geometry}
          material={materials.Material}
          position={[-0.163, 0.373, 0.029]}
          rotation={[0, -0.02, 0]}
          scale={0.001}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["3DGeom~8_(C-3DGeom~8_Defintion#1)"].geometry}
          material={materials["*14"]}
          position={[0.188, 0.086, 0.12]}
          rotation={[0, -0.02, 0]}
          scale={0.019}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["3DGeom~9_(C-3DGeom~9_Defintion#1)"].geometry}
          material={materials["*14"]}
          position={[-0.275, 0.086, 0.111]}
          rotation={[0, -0.02, 0]}
          scale={0.019}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["3DGeom~7_(C-3DGeom~7_Defintion#1)"].geometry}
          material={materials["Material~7"]}
          position={[-0.073, 0.769, -0.389]}
          rotation={[0, -0.02, 0]}
          scale={0.023}
        />
      </group>
      {/* Plant pot */}
      <group
        position={[1.76, 1.728, -0.362]}
        rotation={[0, Math.PI / 2, 0]}
        scale={1.5}
      >
        <group
          position={[0, 0, 0.002]}
          rotation={[0, 0, -Math.PI]}
          scale={-0.127}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["C-Componente#19002"].geometry}
            material={materials.METAL}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["C-Componente#19002_1"].geometry}
            material={
              materials.Cobertura_do_solo_de_lascas_de_madeiras_variadas
            }
          />
        </group>
        <group position={[0.004, 0.005, -0.001]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["C-Obj_000003"].geometry}
            material={materials.Cor_F16}
            position={[0.057, 0.036, 0.033]}
            rotation={[0.197, -0.988, -2.938]}
            scale={[-0.044, -0.083, -0.048]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["C-Obj_000003#1"].geometry}
            material={materials.Cor_F16}
            position={[0.038, 0.043, 0.032]}
            rotation={[0.197, -0.988, -2.938]}
            scale={[-0.044, -0.083, -0.048]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["C-Obj_000003#2"].geometry}
            material={materials.Cor_F16}
            position={[0.077, 0.034, 0.042]}
            rotation={[0.197, -0.988, -2.938]}
            scale={[-0.044, -0.083, -0.048]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["C-Obj_000003#3"].geometry}
            material={materials.Cor_F16}
            position={[0.038, 0.043, 0.046]}
            rotation={[0.197, -0.988, -2.938]}
            scale={[-0.044, -0.083, -0.048]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["C-Obj_000003#4"].geometry}
            material={materials.Cor_F16}
            position={[0.069, 0.038, 0.033]}
            rotation={[0.197, -0.988, -2.938]}
            scale={[-0.044, -0.083, -0.048]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["C-Obj_000003001"].geometry}
            material={materials.Cor_F16}
            position={[0.07, 0.017, 0.039]}
            rotation={[0.889, -1.424, -2.285]}
            scale={[-0.044, -0.083, -0.048]}
          />
        </group>
      </group>
      {/* Plant pot */}
      <group
        position={[1.76, 1.728, -0.062]}
        rotation={[0, Math.PI / 2, 0]}
        scale={1.5}
      >
        <group
          position={[0, 0, 0.002]}
          rotation={[0, 0, -Math.PI]}
          scale={-0.127}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["C-Componente#19002"].geometry}
            material={materials.METAL}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["C-Componente#19002_1"].geometry}
            material={
              materials.Cobertura_do_solo_de_lascas_de_madeiras_variadas
            }
          />
        </group>
        <group position={[0.004, 0.005, -0.001]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["C-Obj_000003#1001"].geometry}
            material={materials.Cor_F16}
            position={[0.038, 0.043, 0.032]}
            rotation={[0.197, -0.988, -2.938]}
            scale={[-0.044, -0.083, -0.048]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["C-Obj_000003#2001"].geometry}
            material={materials.Cor_F16}
            position={[0.077, 0.034, 0.042]}
            rotation={[0.197, -0.988, -2.938]}
            scale={[-0.044, -0.083, -0.048]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["C-Obj_000003#3001"].geometry}
            material={materials.Cor_F16}
            position={[0.038, 0.043, 0.046]}
            rotation={[0.197, -0.988, -2.938]}
            scale={[-0.044, -0.083, -0.048]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["C-Obj_000003#4001"].geometry}
            material={materials.Cor_F16}
            position={[0.069, 0.038, 0.033]}
            rotation={[0.197, -0.988, -2.938]}
            scale={[-0.044, -0.083, -0.048]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["C-Obj_000003002"].geometry}
            material={materials.Cor_F16}
            position={[0.057, 0.036, 0.033]}
            rotation={[0.197, -0.988, -2.938]}
            scale={[-0.044, -0.083, -0.048]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["C-Obj_000003003"].geometry}
            material={materials.Cor_F16}
            position={[0.07, 0.017, 0.039]}
            rotation={[0.889, -1.424, -2.285]}
            scale={[-0.044, -0.083, -0.048]}
          />
        </group>
      </group>
      {/* Dior */}
      <group position={[1.95, 1.254, -1.016]} rotation={[0, Math.PI / 2, 0]}>
        <group position={[0.532, 0.071, -0.283]}>
          <group
            position={[-0.415, 0.133, 0.021]}
            rotation={[-0.011, -0.038, 1.57]}
            scale={[-2.864, -1.757, -1.324]}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes["G-Object049_1"].geometry}
              material={materials["[Color_E05]"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes["G-Object049_2"].geometry}
              material={materials.capa1}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes["G-Object049_3"].geometry}
              material={materials.P_20150603_120611}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes["G-Object049_4"].geometry}
              material={materials.P_20150603_120227}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes["G-Object049_5"].geometry}
              material={materials.P_20150603_120619}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes["G-Object049_6"].geometry}
              material={materials.P_20150603_120627}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes["G-Object049_7"].geometry}
              material={materials.paginas}
            />
          </group>
        </group>
      </group>
      {/* Museums */}
      <group
        position={[2.28, 1.387, -0.294]}
        rotation={[0, 1.571 + Math.PI / 2, 0]}
        scale={[0.148, 0.08, 0.08]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["C-_2_Bo4002"].geometry}
          material={materials.cp2}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["C-_2_Bo4002_1"].geometry}
          material={materials.Color_001}
        />
      </group>
      <group
        position={[1.82, 1.477, -0.193]}
        rotation={[Math.PI, 0 - Math.PI / 2, -Math.PI / 2]}
        scale={0.085}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["C-_2_Bo11002"].geometry}
          material={materials.cp9}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["C-_2_Bo11002_1"].geometry}
          material={materials.Color_001}
        />
      </group>
      <group position={[1.6, 1.728, -1.147]} rotation={[0, Math.PI / 2, 0]}>
        <group position={[0.13, 0.001, 0.214]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["3DGeom~23_(C-3DGeom~23_Defintion#3)"].geometry}
            material={materials["Cover 59"]}
            position={[0.186, 0, 0]}
            rotation={[0, 0.001, -1.571]}
            scale={-0.012}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["3DGeom~24_(C-3DGeom~24_Defintion#3)"].geometry}
            material={materials.Material}
            position={[0.186, 0, 0]}
            rotation={[0, 0.001, -1.571]}
            scale={-0.012}
          />
        </group>
      </group>
      {/* Home */}
      <group
        position={[1.973, 1.388, -0.9]}
        rotation={[-3.12, -Math.PI / 2, -Math.PI]}
        scale={0.56}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["C-E70647_(1)002"].geometry}
          material={materials["*17"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["C-E70647_(1)002_1"].geometry}
          material={materials.Color_1}
        />
      </group>
      <group
        position={[1.82, 1.477, -0.193]}
        rotation={[Math.PI, -Math.PI / 2, -Math.PI / 2]}
        scale={0.085}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["C-_2_Books002"].geometry}
          material={materials.cp8}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["C-_2_Books002_1"].geometry}
          material={materials.Color_001}
        />
      </group>
      <group
        position={[1.82, 1.477, -0.193]}
        rotation={[Math.PI, -Math.PI / 2, -Math.PI / 2]}
        scale={0.085}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["C-_2_Bo002"].geometry}
          material={materials.cp2}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["C-_2_Bo002_1"].geometry}
          material={materials.Color_001}
        />
      </group>
      <group position={[-75.041, 1.608, -43.052]}>
        <group position={[76.746, 0.15, 41.795]} rotation={[0, Math.PI / 2, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["C-Componente#68"].geometry}
            material={materials.METAL}
            position={[0.028, 0.059, -0.006]}
            rotation={[-0.002, 0, -3.141]}
            scale={-0.69}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["C-Componente#69"].geometry}
            material={materials.METAL}
            position={[0.002, 0, 0.005]}
            rotation={[-0.002, 0, -3.141]}
            scale={[-0.69, -2.933, -0.69]}
          />
        </group>
      </group>
      <group position={[1.65, 1.458, -1.512]} rotation={[0, Math.PI / 2, 0]}>
        <group position={[0, 0, 0.054]}>
          <group rotation={[-Math.PI, 0, -Math.PI]} scale={1.36}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes["C-Component#1002"].geometry}
              material={materials.capa_livro_steve_sdfs0015w5w5s5g}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes["C-Component#1002_1"].geometry}
              material={materials.capa_livro_steve_jobs_sf0w555s8aaa}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes["C-Component#1002_2"].geometry}
              material={
                materials.borda_livro_capa_steve_jobst_sdfs0w5415ss5s5aaa
              }
            />
          </group>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["C-Component#10"].geometry}
            material={materials.folhas_livro_steve_sdfskljsdwkws51451}
            position={[-0.001, 0.003, 0.004]}
            rotation={[-Math.PI, 0, -Math.PI]}
            scale={[1.365, 1.36, 1.357]}
          />
        </group>
      </group>
      <group position={[1.7, 1.728, -0.662]} rotation={[0, Math.PI / 2, 0]}>
        <group
          position={[0.3, 0, -0.001]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={-1}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["G-Object050_1"].geometry}
            material={materials.Material}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["G-Object050_2"].geometry}
            material={materials["*8"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["G-Object050_3"].geometry}
            material={materials["*10"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["G-Object050_4"].geometry}
            material={materials["*11"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["G-Object050_5"].geometry}
            material={materials["*15"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["G-Object050_6"].geometry}
            material={materials["[Color_009]"]}
          />
        </group>
      </group>
      {/* Laptop */}
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
              material={materials["[0129_WhiteSmoke]"]}
            />
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
      <group position={[-15.247, -0.33, -16.328]}>
        <group position={[0, 0.326, -8.461]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["C-Macbook_Pro001"].geometry}
            material={materials["[0129_WhiteSmoke]"]}
            position={[5.477, 0.11, 0.409]}
            rotation={[2.88, 0, 0]}
            scale={[0.094, 0.167, 0.094]}
          />
        </group>
      </group>
    </group>
  );
}

export default MyRoom;

useGLTF.preload("/models/desk.glb");
