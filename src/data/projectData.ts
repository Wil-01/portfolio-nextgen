import promotionImg from '../Assets/Projects/promotion.png';
import scrappingImg  from '../Assets/Projects/scrapping.png';
import gomuscuImg    from '../Assets/Projects/gomuscu.png';
import eventImg    from '../Assets/Projects/event.png';
import eventVideo  from '../Assets/Projects/event.webm';
import twitterImg  from '../Assets/Projects/twitter.png';
import twitterVideo from '../Assets/Projects/twe.webm';
import spotifyImg  from '../Assets/Projects/spotify.png';
import spotifyVideo from '../Assets/Projects/spotify.webm';


export type ProjectCategory = 'professionnel' | 'personnel' | 'académique';
export type ProjectAxe      = 'cadrage' | 'développement' | 'qualité';

export interface Project {
  id:          number;
  category:    ProjectCategory;
  title:       string;
  company?:    string;
  stack:       string[];
  description: string;
  image?:      string;
  video?:      string;
  githubLink?: string;
  demoLink?:   string;
  axes:        ProjectAxe[];
  gradient:    string;          // used as placeholder bg when no image 
  context:     string;
  whatIDid:    string[];
  learned:     string;
}

export const projectsData: Project[] = [
  /* ── 1 · PROFESSIONNEL ──────────────────────────────────────────── */
  {
    id:       1,
    category: 'professionnel',
    title:    'Gestion des promotions & commissions',
    company:  'Alfred Meeting',
    stack:    ['Laravel', 'PHP', 'MySQL', 'Blade', 'JavaScript'],
    description:
      "Évolution d'une fonctionnalité métier liée aux promotions et commissions dans l'espace partenaire — affichage, historique, droits et UX.",
    image:    promotionImg,
    gradient: 'linear-gradient(135deg, #6366f1 0%, #4338ca 100%)',
    axes:     ['cadrage', 'développement', 'qualité'],
    context:
      "Alternance chez Alfred Meeting — plateforme B2B événementielle. L'espace partenaire gérait des règles de commissions et promotions manquant de clarté côté utilisateur, avec des incohérences d'affichage selon les profils.",
    whatIDid: [
      "Analyse des règles métier existantes et des retours utilisateurs",
      "Adaptation des vues Blade et de la logique d'affichage selon les rôles",
      "Amélioration de l'historique des promotions et de la cohérence d'interface",
      "Gestion des droits d'accès et restrictions selon le profil partenaire",
      "Prise en compte des feedbacks UX de l'équipe et tests de validation",
    ],
    learned:
      "Travailler sur un existant avec des contraintes métier fortes m'a appris à bien lire le code legacy, anticiper les impacts d'une modification et raisonner en termes d'usage réel avant d'implémenter.",
  },
  {
    id:       2,
    category: 'professionnel',
    title:    'Scraping & enrichissement catalogue',
    company:  'Alfred Meeting',
    stack:    ['PHP', 'Laravel', 'MySQL', 'Python', 'BeautifulSoup'],
    description:
      "Développement et amélioration de flux de scraping pour enrichir le catalogue de lieux partenaires avec des données hétérogènes.",
    image:    scrappingImg,
    gradient: 'linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)',
    axes:     ['cadrage', 'développement', 'qualité'],
    context:
      "Le catalogue de lieux d'Alfred Meeting nécessitait un enrichissement depuis plusieurs sources web. Les données récupérées étaient hétérogènes et devaient être normalisées avant intégration en base.",
    whatIDid: [
      "Conception du flux : indexation, scraping, parsing, structuration",
      "Développement des scrapers adaptés aux différentes sources cibles",
      "Normalisation, déduplication et mapping des champs métier",
      "Gestion des statuts de suivi et robustesse face aux erreurs de structure",
      "Documentation du processus et amélioration continue de la qualité des données",
    ],
    learned:
      "Ce projet m'a montré la complexité d'un vrai pipeline de données : la qualité en entrée est aussi importante que le code, et la robustesse face aux erreurs de structure est indispensable en production.",
  },

  /* ── 3 · PERSONNEL ───────────────────────────────────────────────── */
  {
    id:       3,
    category: 'personnel',
    title:    'Gomuscu — Application fitness',
    stack:    ['React', 'TypeScript', 'Laravel', 'PostgreSQL', 'Figma'],
    description:
      "Conception d'une application orientée fitness/coaching pensée comme un produit numérique — vision produit, UX, architecture et stack.",
    image:    gomuscuImg,
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
    axes:     ['cadrage', 'développement'],
    context:
      "Projet personnel pour explorer la conception produit complète : partir d'un besoin utilisateur, définir les fonctionnalités, choisir une stack cohérente, concevoir l'architecture et prototyper.",
    whatIDid: [
      "Définition du besoin et rédaction des user stories",
      "Maquettage Figma — parcours utilisateur et interfaces clés",
      "Choix de la stack et conception de l'architecture applicative",
      "Modélisation de la base de données relationnelle",
      "Développement du prototype fonctionnel",
    ],
    learned:
      "Penser un produit avant de coder change la qualité des décisions techniques. Confronter besoin, contraintes et architecture dès le départ évite beaucoup de refactoring.",
  },

  /* ── 4-6 · ACADÉMIQUE ────────────────────────────────────────────── */
  {
    id:        4,
    category:  'académique',
    title:     'EVENT — Application événementiel',
    stack:     ['Python', 'PostgreSQL', 'Tailwind CSS', 'Django'],
    description:
      "Application événementielle full stack avec gestion des inscriptions, paiement en ligne et interface d'administration.",
    image:     eventImg,
    video:     eventVideo,
    githubLink:'https://github.com/Wil-01',
    gradient:  'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
    axes:      ['cadrage', 'développement'],
    context:
      "Projet académique Web@cadémie — concevoir et développer une application de gestion d'événements full stack avec des fonctionnalités complètes : inscription, paiement, admin.",
    whatIDid: [
      "Conception de l'architecture applicative et de la base de données",
      "Développement back-end avec Django et PostgreSQL",
      "Intégration du système de paiement en ligne",
      "Interface d'administration pour la gestion des événements",
      "Déploiement et mise en ligne",
    ],
    learned:
      "Ce projet m'a permis de maîtriser le cycle complet de développement, de la conception à la mise en production, en gérant à la fois la logique métier et l'expérience utilisateur.",
  },
  {
    id:        5,
    category:  'académique',
    title:     'Twitter — Plateforme de tweet',
    stack:     ['PHP', 'MySQL', 'Tailwind CSS', 'JavaScript'],
    description:
      "Réplique de Twitter avec tweets, retweets, likes, follows, messagerie et authentification complète.",
    image:     twitterImg,
    video:     twitterVideo,
    githubLink:'https://github.com/Wil-01/tweeter',
    gradient:  'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
    axes:      ['développement'],
    context:
      "Projet académique Web@cadémie — implémenter une plateforme sociale complète avec gestion des utilisateurs, contenu, interactions sociales et authentification.",
    whatIDid: [
      "Système d'authentification (inscription, connexion, sessions sécurisées)",
      "CRUD complet : tweets, retweets, likes avec mises à jour dynamiques",
      "Système de follows et fil d'actualité personnalisé",
      "Interface responsive et accessible avec Tailwind CSS",
      "Base de données MySQL avec relations many-to-many complexes",
    ],
    learned:
      "Ce projet m'a solidifié sur les fondamentaux PHP/MySQL, la gestion des sessions et la logique relationnelle entre entités dans une BDD normalisée.",
  },
  {
    id:        6,
    category:  'académique',
    title:     'Spotify Clone — Interface musicale',
    stack:     ['React', 'JavaScript', 'Tailwind CSS', 'API Spotify'],
    description:
      "Réplique de Spotify : lecteur audio, playlists, bibliothèque, recherche, likes et follows.",
    image:     spotifyImg,
    video:     spotifyVideo,
    githubLink:'https://github.com/Wil-01/spotify',
    gradient:  'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
    axes:      ['développement'],
    context:
      "Projet académique orienté front-end — reproduire l'interface et les interactions de Spotify en React, en se concentrant sur la qualité d'intégration et l'expérience utilisateur.",
    whatIDid: [
      "Architecture des composants React et gestion d'état global",
      "Intégration de l'API Spotify pour les données musicales",
      "Lecteur audio avec contrôles (play, pause, volume, barre de progression)",
      "Interfaces : playlists, bibliothèque, recherche, profil",
      "Animations d'interface et design pixel-perfect",
    ],
    learned:
      "Reproduire une application connue m'a forcé à analyser finement les patterns UX existants et à les implémenter proprement en React, tout en gérant des interactions complexes et un état global.",
  },
];
