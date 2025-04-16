import React, { useRef, useMemo } from 'react'; // Ajout de useMemo
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

import vertexShader from '../../shaders/backgroundVertex.glsl?raw';
import fragmentShader from '../../shaders/backgroundFragment.glsl?raw';

const BackgroundPlane: React.FC = () => {
  const meshRef = useRef<THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial>>(null); // Type plus précis
  const { size, viewport, pointer } = useThree(); // Retire camera, on ne l'utilise pas directement ici

  // Uniforms mémorisés pour éviter recréation inutile
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    // Initialiser uMouse avec les dimensions actuelles pour éviter division par zéro au début
    uMouse: { value: new THREE.Vector2(size.width / 2, size.height / 2) },
    uResolution: { value: new THREE.Vector2(size.width * viewport.dpr, size.height * viewport.dpr) },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [size.width, size.height, viewport.dpr]); // Recalculer si dimensions changent

  useFrame((state) => {
    if (meshRef.current) {
      uniforms.uTime.value = state.clock.elapsedTime;

      // Convertir state.pointer (-1 à 1, centre = 0,0) en coords UV (0 à 1, origine = bas gauche)
      const mouseX_UV = (state.pointer.x + 1.0) / 2.0;
      const mouseY_UV = (state.pointer.y + 1.0) / 2.0;
      uniforms.uMouse.value.set(mouseX_UV, mouseY_UV);

      // console.log("Mouse Coords (UV):", mouseX_UV, mouseY_UV); // Débogage souris (0-1)

      // Mise à jour résolution (important pour la responsivité du shader)
      const currentWidth = size.width * viewport.dpr;
      const currentHeight = size.height * viewport.dpr;
      if (currentWidth !== uniforms.uResolution.value.x || currentHeight !== uniforms.uResolution.value.y) {
          uniforms.uResolution.value.set(currentWidth, currentHeight);
          console.log("Resolution updated:", currentWidth, currentHeight); // Log pour voir si ça update
      }
    }
  });

   // Calcule la taille du plan pour qu'il remplisse la vue à Z=0
   // Si la caméra est à z=5, fov=50 (vertical), la hauteur visible est 2 * tan(fov/2 * PI/180) * distance
   // const visibleHeight = 2 * Math.tan((50 / 2) * Math.PI / 180) * 5;
   // const visibleWidth = visibleHeight * (size.width / size.height);
   // Utiliser viewport est plus direct
   const planeWidth = viewport.width;
   const planeHeight = viewport.height;


  return (
    <mesh ref={meshRef}>
       {/* Utiliser la taille du viewport calculée par R3F */}
      <planeGeometry args={[planeWidth, planeHeight]} />
      <shaderMaterial
        key={Date.now()} // Force recompile shader if needed (debug)
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms} // Passe l'objet memoïsé
        depthWrite={false}
      />
    </mesh>
  );
};

export default BackgroundPlane;