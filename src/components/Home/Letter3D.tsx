import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text3D } from '@react-three/drei';
import * as THREE from 'three';

interface Letter3DProps {
  char: string;
  font: string; // Chemin vers le fichier de police JSON
  initialPosition: THREE.Vector3;
  targetPosition: THREE.Vector3;
  animationState: 'idle' | 'exploding' | 'floating' | 'imploding';
  animationTrigger: number; // Pour forcer le re-rendu/reset si nécessaire
  index: number; // Pour décaler les animations
}

// Constantes pour l'animation
const EXPLODE_DURATION = 0.8; // Durée de l'explosion
const IMPLODE_DURATION = 0.8; // Durée de l'implosion
const FLOAT_RADIUS = 1.5; // Rayon max du flottement
const FLOAT_SPEED = 0.5; // Vitesse du flottement
const ROTATION_SPEED = 0.8; // Vitesse de rotation pdt flottement

export const Letter3D: React.FC<Letter3DProps> = ({
  char, font, initialPosition, targetPosition, animationState, animationTrigger, index
}) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const randomVec = useMemo(() => new THREE.Vector3(
      (Math.random() - 0.5) * 2,
      (Math.random() - 0.5) * 2,
      (Math.random() - 0.5) * 2
    ).normalize().multiplyScalar(FLOAT_RADIUS * (0.5 + Math.random() * 0.5)), // Direction aléatoire pour flotter
   [animationTrigger]); // Recalcule si trigger change
  const randomRotationAxis = useMemo(() => new THREE.Vector3(
      Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5
    ).normalize(), [animationTrigger]);
  const randomRotationSpeed = useMemo(() => (Math.random() - 0.5) * ROTATION_SPEED, [animationTrigger]);

  const [currentPosition] = useState(() => initialPosition.clone()); // Position actuelle gérée par useFrame
  const [currentRotation] = useState(() => new THREE.Euler()); // Rotation actuelle
  const [startTime, setStartTime] = useState<number | null>(null);

  useEffect(() => {
    // Reset start time when animation state changes to exploding or imploding
    if (animationState === 'exploding' || animationState === 'imploding') {
      setStartTime(null); // Will be set on first frame update
    }
    if (animationState === 'idle') {
        meshRef.current.position.copy(targetPosition);
        meshRef.current.rotation.set(0, 0, 0);
    }
     // Reset position/rotation when trigger changes and it's idle
     if (animationState === 'idle' && meshRef.current) {
      // Force la position/rotation idle quand l'état le demande OU quand le trigger change
      if (!meshRef.current.position.equals(targetPosition) || animationTrigger > 0) {
           meshRef.current.position.copy(targetPosition);
           currentPosition.copy(targetPosition); // Met aussi à jour l'état interne
      }
       if (meshRef.current.rotation.x !== 0 || meshRef.current.rotation.y !== 0 || meshRef.current.rotation.z !== 0 || animationTrigger > 0) {
          meshRef.current.rotation.set(0, 0, 0);
          currentRotation.set(0,0,0); // Met aussi à jour l'état interne
      }
  }

  }, [animationState, animationTrigger, targetPosition, currentPosition, currentRotation]);


  useFrame((state, delta) => {
    if (!meshRef.current) return;

    const time = state.clock.elapsedTime;

     // Initialisation du startTime
     if ((animationState === 'exploding' || animationState === 'imploding') && startTime === null) {
         setStartTime(time);
     }
     const animTime = startTime !== null ? time - startTime : 0;


    switch (animationState) {
      case 'exploding': {
        const progress = Math.min(animTime / EXPLODE_DURATION, 1.0);
        const easedProgress = 1 - Math.pow(1 - progress, 3); // EaseOutCubic

        // Interpole de la position cible vers la position flottante
        currentPosition.lerpVectors(targetPosition, randomVec.clone().add(targetPosition), easedProgress);
         // Rotation aléatoire pendant l'explosion
         const targetRot = randomRotationAxis.clone().multiplyScalar(Math.PI * 2 * easedProgress * 0.5);
         currentRotation.set(targetRot.x, targetRot.y, targetRot.z);

        meshRef.current.position.copy(currentPosition);
        meshRef.current.rotation.copy(currentRotation);
        break;
      }
      case 'floating': {
        // Maintient la position éclatée + ajoute un mouvement sinusoïdal
        const floatOffset = Math.sin(time * FLOAT_SPEED + index * 0.5) * 0.1; // Léger flottement
        currentPosition.copy(randomVec.clone().add(targetPosition)).add(randomRotationAxis.clone().multiplyScalar(floatOffset));

         // Rotation continue lente
        currentRotation.x += randomRotationSpeed * delta * 0.3;
        currentRotation.y += randomRotationSpeed * delta * 0.4;
        currentRotation.z += randomRotationSpeed * delta * 0.5;


        meshRef.current.position.copy(currentPosition);
        meshRef.current.rotation.copy(currentRotation);
        break;
      }
      case 'imploding': {
         const progress = Math.min(animTime / IMPLODE_DURATION, 1.0);
         const easedProgress = progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2; // EaseInOutCubic


        // Interpole de la position actuelle vers la position cible (0,0,0 rotation)
        // Important: start from the position/rotation where floating left off
         const startPos = randomVec.clone().add(targetPosition); // Where floating was roughly
         const startRot = meshRef.current.rotation.clone(); // Get actual rotation from mesh

         currentPosition.lerpVectors(startPos, targetPosition, easedProgress);

         // Interpolate rotation back to zero
         const targetRot = new THREE.Euler(0,0,0);
         const qStart = new THREE.Quaternion().setFromEuler(startRot);
         const qEnd = new THREE.Quaternion().setFromEuler(targetRot);
         const qInterpolated = new THREE.Quaternion();
         qInterpolated.copy(qStart).slerp(qEnd, easedProgress);
         currentRotation.setFromQuaternion(qInterpolated);


         meshRef.current.position.copy(currentPosition);
         meshRef.current.rotation.copy(currentRotation); 
        break;
      }
      case 'idle':
         // Ensure it stays at target
         if (!meshRef.current.position.equals(targetPosition)) {
             meshRef.current.position.copy(targetPosition);
         }
         if (meshRef.current.rotation.x !== 0 || meshRef.current.rotation.y !== 0 || meshRef.current.rotation.z !== 0) {
             meshRef.current.rotation.set(0, 0, 0);
         }
        break;
    }
  });

  return (
    <Text3D
      ref={meshRef}
      font={font}
      position={initialPosition} // Définit la position initiale statique
      height={0.2}   // Profondeur de la lettre
      size={1}      // Taille de la lettre (sera ajustée par le parent)
      curveSegments={12}
      bevelEnabled
      bevelThickness={0.02}
      bevelSize={0.02}
      bevelOffset={0}
      bevelSegments={5}
    >
      {char}
       {/* Matériau vert brillant */}
      <meshStandardMaterial color="#FFFFFF" emissive="#00FF00" emissiveIntensity={1.5} roughness={0.4} metalness={0.6} />
       {/* Alternative: Matériau simple vert */}
       {/* <meshBasicMaterial color="#00ff00" /> */}
    </Text3D>
  );
};