import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';

// On créera ce composant juste après
import BackgroundPlane from './BackgroundPlane';

const BackgroundScene: React.FC = () => {
  return (
    // Style pour que le canvas prenne tout l'écran et soit en arrière-plan
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }} // Positionne la caméra
        gl={{ antialias: false }} // On désactive l'AA pour les shaders pour commencer (perf)
        // eventSource={document.getElementById('root')!} // Optionnel: définit la source des événements si besoin
        // eventPrefix="client" // Optionnel
      >
        {/* Suspense est utile si on charge des assets (textures, modèles) plus tard */}
        <Suspense fallback={null}>
          {/* Notre plan qui recevra le shader */}
          <BackgroundPlane />
          {/* Preload permet de précompiler les shaders/textures si besoin */}
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default BackgroundScene;