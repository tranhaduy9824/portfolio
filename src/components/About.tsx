import { Text } from "@react-three/drei";

const About = ({ nodes, materials }: any) => {
  return (
    <group
      position={[1.973, 1.388, -0.9]}
      rotation={[-3.14, -Math.PI / 2, -Math.PI]}
      scale={0.56}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["C-E70647_(1)002"].geometry}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["C-E70647_(1)002_1"].geometry}
        material={materials.Color_1}
      />
      <group position={[0.25, 0.2, 0.04]} scale={0.2}>
        <Text
          position={[0, 0, 0]}
          fontSize={0.1}
          color="black"
          anchorX="center"
          anchorY="bottom"
        >
          About
        </Text>
      </group>
    </group>
  );
};

export default About;
