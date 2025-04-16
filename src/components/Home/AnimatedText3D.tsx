import React, { useMemo, useState, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Letter3D } from './Letter3D'; // Letter3D reste presque inchangé

export type AnimationPhase = 'idle' | 'exploding' | 'floating' | 'imploding';

interface AnimatedText3DProps {
  text: string;
  position?: [number, number, number];
  scale?: number;
  font?: string;
  currentPhase: AnimationPhase; // Reçoit la phase actuelle
  animationTrigger: number; // Pour reset les valeurs aléatoires
}

export const AnimatedText3D: React.FC<AnimatedText3DProps> = ({
  text,
  position = [0, 0, 0],
  scale = 1,
  font = '/fonts/helvetiker_regular.typeface.json',
  currentPhase, // Utilise la phase passée en prop
  animationTrigger
}) => {
  const { viewport } = useThree();
  const characters = text.split('');

  // Calcul des positions (inchangé)
  const letterPositions = useMemo(() => {
      const positions: THREE.Vector3[] = [];
      let totalWidth = 0;
      const spacing = 0.8 * scale;
      characters.forEach(() => { totalWidth += spacing; });
      totalWidth -= spacing;
      let currentX = -totalWidth / 2;
      characters.forEach(() => {
          positions.push(new THREE.Vector3(currentX, 0, 0));
          currentX += spacing;
      });
      return positions;
  }, [characters, scale]);


  // Pas besoin de gérer le cycle ici, on reçoit la phase
  // Le useEffect pour démarrer le cycle est supprimé

  // Retourne directement le groupe Three.js
  return (
    <group position={position} scale={scale * viewport.width / 15}>
      {characters.map((char, index) => (
        <Letter3D
          key={`${char}-${index}-${animationTrigger}`} // Ajoute trigger à la clé pour forcer MAJ
          char={char === ' ' ? '' : char}
          font={font}
          initialPosition={letterPositions[index]}
          targetPosition={letterPositions[index]}
           // Passe la phase reçue, sauf pour les espaces
          animationState={char === ' ' ? 'idle' : currentPhase}
          animationTrigger={animationTrigger}
          index={index}
        />
      ))}
    </group>
  );
};