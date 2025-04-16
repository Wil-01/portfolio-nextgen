// src/data/ProjectsData.ts

// Importe tes images et vidéos (assure-toi qu'elles sont dans src/Assets/Projects/)
// Crée le dossier si nécessaire
import twitterImg from '../Assets/Projects/twitter.png';
import twitterVideo from '../Assets/Projects/twe.webm'; // Utilise webm ou mp4 optimisé
import meeticImg from '../Assets/Projects/meeta.png';
import meeticVideo from '../Assets/Projects/meet.webm';
import eventImg from '../Assets/Projects/event.png';
import eventVideo from '../Assets/Projects/event.webm';
import robbieImg from '../Assets/Projects/rob.png';
import robbieVideo from '../Assets/Projects/robi.webm';
import puissance4Img from '../Assets/Projects/spotify.png';
import puissance4Video from '../Assets/Projects/spotify.webm'; // Exemple avec mp4
import cinemaImg from '../Assets/Projects/cinea.png';
import cinemaVideo from '../Assets/Projects/cine_compressed.webm';
// Ajoute d'autres imports si tu as plus de projets


export interface Project {
  id: number;
  title: string;
  subtitle: string; // Stack technique par exemple
  description: string;
  image: string; // Chemin vers l'image statique
  video?: string; // Chemin optionnel vers la vidéo preview
  githubLink?: string; // Lien GitHub optionnel
  demoLink?: string; // Lien démo optionnel
}

export const projectsData: Project[] = [
  {
    id: 1,
    title: "EVENT - APPLICATION EVENEMENTIEL",
    subtitle: "PYTHON • POSTGRESQL • TAILWIND-CSS",
    description: "Application d'évènementiel intuitive et dynamique avec fonctionnalités de paiement en ligne et bien plus.",
    image: eventImg,
    video: eventVideo,
    githubLink: "https://github.com/private_project", 
    demoLink: "#" 
  },
  {
    id: 2,
    title: "Spotify Clone",
    subtitle: "React • Tailwind • JAVASCRIPT",
    description: "Réplique de Spotify avec fonctionnalités clée playlist, library, search, like et follows.",
    image: puissance4Img,
    video: puissance4Video,
    githubLink: "https://github.com/Wil-01/spotify",
    demoLink: "#"
  },
  {
    id: 3,
    title: "Twitter - PLATEFORME DE TWEET",
    subtitle: "PHP • MYSQL • TAILWIND-CSS",
    description: "Réplique de Twitter avec fonctionnalités de tweet, retweet, like, et suivi d'utilisateurs.",
    image: twitterImg,
    video: twitterVideo,
    githubLink: "https://github.com/Wil-01/tweeter",
  },
  {
      id: 4,
      title: "My Cinema",
      subtitle: "PHP • CSS • API",
      description: "Site de référencement de films de streaming, inspiré de Netflix.",
      image: cinemaImg,
      video: cinemaVideo,
      githubLink: "https://github.com/Wil-01/cinema",
      demoLink: "#"
    },
    {
      id: 5,
      title: "PORTFOLIO ROBBIE LENS",
      subtitle: "HTML • CSS",
      description: "Portfolio vitrine pour une photographe, mettant en avant ses clichés avec un design épuré.",
      image: robbieImg,
      video: robbieVideo,
      githubLink: "https://github.com/Wil-01/Labo",
      demoLink: "#" 
    },
  {
    id: 6,
    title: "MEETIC - SITE DE RENCONTRE",
    subtitle: "PHP • MYSQL • CSS",
    description: "Clone du site de rencontre Meetic, permettant la recherche de profils et la messagerie.",
    image: meeticImg,
    video: meeticVideo,
    githubLink: "https://github.com/Wil-01/meetic",
    demoLink: "#"
  },
  // Ajoute d'autres projets ici
];