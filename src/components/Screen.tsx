/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTexture, useVideoTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const Screen = ({ nodes, materials, stateAnimate }: any) => {
  const videoTxt = useVideoTexture("textures/coding.mp4", {
    start: true,
    loop: true,
  });

  const codingStartTxt = useTexture("textures/coding_start.jpg");
  const codingEndTxt = useTexture("textures/coding_end.jpg");

  const canvasRef = useRef(document.createElement("canvas"));
  const ctxRef = useRef(canvasRef.current.getContext("2d"));
  const combinedTexture = useRef(new THREE.CanvasTexture(canvasRef.current));
  const [isLoaded, setIsLoaded] = useState(false);

  const applyTextureSettings = (texture: THREE.Texture | null) => {
    if (texture) {
      texture.flipY = false;
      texture.repeat.set(2.1, 1.6);
      texture.offset.set(-0.55, -0.15);
    }
  };

  applyTextureSettings(videoTxt);
  applyTextureSettings(codingEndTxt);
  applyTextureSettings(codingStartTxt);

  useEffect(() => {
    if (codingStartTxt.image && codingEndTxt.image) {
      applyTextureSettings(codingStartTxt);
      applyTextureSettings(codingEndTxt);

      const imageWidth = codingStartTxt.image.width;
      const imageHeight = codingStartTxt.image.height;

      const canvas = canvasRef.current;
      canvas.width = imageWidth;
      canvas.height = imageHeight * 2;

      const ctx = ctxRef.current;
      if (ctx) {
        ctx.drawImage(codingStartTxt.image, 0, 0, imageWidth, imageHeight);
        ctx.drawImage(
          codingEndTxt.image,
          0,
          imageHeight,
          imageWidth,
          imageHeight
        );
      }

      combinedTexture.current.needsUpdate = true;
      combinedTexture.current.wrapS = THREE.ClampToEdgeWrapping;
      combinedTexture.current.wrapT = THREE.ClampToEdgeWrapping;
      combinedTexture.current.flipY = false;
      combinedTexture.current.repeat.set(2.1, 0.8);
      combinedTexture.current.offset.set(-0.55, -0.075);

      setIsLoaded(true);
    }
  }, [codingStartTxt, codingEndTxt]);

  const startY = -0.075;
  const endY = 0.4;
  const totalDuration = 2;
  const startTime = useRef<number | null>(null);

  useFrame(({ clock }) => {
    if (!combinedTexture.current || !isLoaded) return;

    if (stateAnimate !== 6) {
      combinedTexture.current.offset.y = startY;
      combinedTexture.current.needsUpdate = true;
      startTime.current = null;
      return;
    }

    startTime.current ??= clock.getElapsedTime();
    const progress =
      ((clock.getElapsedTime() - startTime.current) % totalDuration) /
      totalDuration;
    const easedProgress =
      progress < 0.5
        ? 2 * progress * progress
        : -1 + (4 - 2 * progress) * progress;

    combinedTexture.current.offset.y = startY + easedProgress * (endY - startY);
    combinedTexture.current.needsUpdate = true;
  });

  useEffect(() => {
    if (videoTxt.image) {
      if (stateAnimate === 4) {
        videoTxt.image.currentTime = 0;
        videoTxt.image.play();
      } else if (stateAnimate === 3) {
        videoTxt.image.pause();
        videoTxt.image.currentTime = 0;
      } else {
        videoTxt.image.pause();
        videoTxt.image.currentTime = videoTxt.image.duration - 0.001;
      }
    }
  }, [stateAnimate, videoTxt]);

  useEffect(() => {
    if (stateAnimate === 6) {
      combinedTexture.current.needsUpdate = true;
    } else {
      videoTxt.needsUpdate = true;
    }
  }, [stateAnimate, videoTxt, combinedTexture]);

  return (
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
      >
        {isLoaded ? (
          <meshBasicMaterial
            map={stateAnimate === 6 ? combinedTexture.current : videoTxt}
            toneMapped={false}
            side={THREE.DoubleSide}
            transparent={true}
          />
        ) : (
          <meshBasicMaterial color="black" />
        )}
      </mesh>
    </group>
  );
};

export default Screen;
