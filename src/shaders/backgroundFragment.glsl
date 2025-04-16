precision highp float;

uniform float uTime;
uniform vec2 uMouse; // Coords UV (0-1)
uniform vec2 uResolution;
varying vec2 vUv;

// --- Fonctions de Bruit (pnoise, mod289, permute, etc. restent identiques) ---
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
vec3 fade(vec3 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }

float pnoise(vec3 P) {
  // ... (code pnoise inchangé) ...
  vec3 Pi0 = floor(P);
  vec3 Pi1 = Pi0 + vec3(1.0);
  Pi0 = mod289(Pi0);
  Pi1 = mod289(Pi1);
  vec3 Pf0 = fract(P);
  vec3 Pf1 = Pf0 - vec3(1.0);
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.yy, Pi1.yy);
  vec4 iz0 = Pi0.zzzz;
  vec4 iz1 = Pi1.zzzz;
  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0);
  vec4 ixy1 = permute(ixy + iz1);
  vec4 gx0 = ixy0 * (1.0 / 7.0);
  vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
  gx0 = fract(gx0);
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
  vec4 sz0 = step(gz0, vec4(0.0));
  gx0 -= sz0 * (step(0.0, gx0) - 0.5);
  gy0 -= sz0 * (step(0.0, gy0) - 0.5);
  vec4 gx1 = ixy1 * (1.0 / 7.0);
  vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
  gx1 = fract(gx1);
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
  vec4 sz1 = step(gz1, vec4(0.0));
  gx1 -= sz1 * (step(0.0, gx1) - 0.5);
  gy1 -= sz1 * (step(0.0, gy1) - 0.5);
  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);
  vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
  g000 *= norm0.x;
  g010 *= norm0.y;
  g100 *= norm0.z;
  g110 *= norm0.w;
  vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
  g001 *= norm1.x;
  g011 *= norm1.y;
  g101 *= norm1.z;
  g111 *= norm1.w;
  float n000 = dot(g000, Pf0);
  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
  float n111 = dot(g111, Pf1);
  vec3 fade_xyz = fade(Pf0);
  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
  return 2.2 * n_xyz;
}


// --- Fonction FBM (Fractal Brownian Motion) ---
// Combine plusieurs couches (octaves) de bruit pour plus de détails
float fbm (vec3 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 2.0; // Fréquence de base du bruit
    int octaves = 5; // Nombre de couches de bruit

    for (int i = 0; i < octaves; i++) {
        value += amplitude * pnoise(p * frequency);
        frequency *= 2.0; // Double la fréquence à chaque octave
        amplitude *= 0.5; // Réduit l'amplitude
    }
    return value;
}


void main() {
    vec2 uv = vUv;
    vec2 mouse = uMouse;

    // --- Calcul de la distorsion UV ---
    // On utilise le FBM pour créer un champ de distorsion qui évolue dans le temps
    float distortionStrength = 0.15; // Force de la distorsion
    vec2 distortion = vec2(
        fbm(vec3(uv * 2.0, uTime * 0.1)), // Bruit pour l'offset X
        fbm(vec3(uv * 2.0 + vec2(10.0), uTime * 0.1)) // Bruit pour l'offset Y (légèrement décalé)
    ) * distortionStrength;

    // Applique la distorsion aux coordonnées UV
    vec2 distortedUv = uv + distortion;

    // --- Calcul de la valeur principale (basée sur le FBM) ---
    // Utilise les UV distortées pour lire la valeur de bruit principale
    // Ajoute une composante temporelle pour une animation globale lente
    float mainNoiseValue = fbm(vec3(distortedUv * 3.0, uTime * 0.05)); // Fréquence plus basse pour l'effet global

    // --- Couleurs ---
    vec3 baseColor = vec3(0.01, 0.005, 0.02); // Encore plus sombre
    vec3 inkColor1 = vec3(0.906, 0.537, 0.365); // Ton orange #e7895d
    vec3 inkColor2 = vec3(0.4, 0.2, 0.6);      // Un peu de violet pour contraster

    // --- Création de l'effet "encre" ---
    // Utilise smoothstep pour créer des zones d'encre définies
    // On peut utiliser différents seuils pour les deux couleurs
    float inkThreshold1 = 0.3;
    float inkSmoothness = 0.1;
    float inkAmount1 = smoothstep(inkThreshold1 - inkSmoothness, inkThreshold1 + inkSmoothness, mainNoiseValue);

    float inkThreshold2 = -0.1; // Un seuil différent pour la deuxième couleur
    float inkAmount2 = smoothstep(inkThreshold2 - inkSmoothness, inkThreshold2 + inkSmoothness, mainNoiseValue);

    // Mélange les couleurs : commence par la base, ajoute la couleur 2, puis la couleur 1
    vec3 color = baseColor;
    color = mix(color, inkColor2, inkAmount2 * 0.4); // Violet subtil
    color = mix(color, inkColor1, inkAmount1 * 0.7); // Orange plus présent

    // --- Interaction Souris (Effet de "Poussée" + Lueur) ---
    float mouseDist = distance(uv, mouse);
    float pushRadius = 0.15; // Rayon de l'effet de poussée
    float pushStrength = 0.1;  // Force de la poussée

    // Calcul un vecteur allant de la souris vers le pixel courant
    vec2 pushDirection = normalize(uv - mouse);

    // Applique la poussée aux UV si on est dans le rayon d'effet
    // smoothstep(pushRadius, 0.0, mouseDist) est 1 au centre, 0 au rayon
    vec2 mousePushedUvOffset = pushDirection * pushStrength * smoothstep(pushRadius, 0.0, mouseDist);
    vec2 finalUv = uv + mousePushedUvOffset; // Utilise ces UV pour recalculer une partie de l'effet ? Pour l'instant, on l'utilise pour la lueur.

    // Lueur autour de la souris (peut être combinée avec la poussée)
    float glowIntensity = smoothstep(0.15, 0.0, mouseDist); // Zone de lueur un peu plus large
    color += vec3(0.9, 0.7, 0.5) * glowIntensity * 0.5; // Lueur chaude

    // --- Vignette (Assombrir les bords) ---
    float vignetteAmount = 0.8;
    float vignette = smoothstep(1.0, 0.4, length(uv * 2.0 - 1.0));
    color *= mix(1.0, vignette, vignetteAmount); // Applique la vignette

    gl_FragColor = vec4(color, 1.0);
}