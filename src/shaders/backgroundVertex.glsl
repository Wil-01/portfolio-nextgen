// Indique que la précision par défaut pour les floats est 'highp' (souvent nécessaire)
precision highp float;

varying vec2 vUv;

void main() {
  vUv = uv;
  // gl_Position est une variable spéciale pour la position finale du vertex
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}