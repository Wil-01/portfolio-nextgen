import alfredImg    from '../Assets/Projects/Alfred.png';
import gomuscuImg   from '../Assets/Projects/gomuscu_image.png';
import gomuscuVideo from '../Assets/Projects/gomuscu_vid.mp4';
import gmvEngineImg from '../Assets/Projects/gmvengine.png';
import gmvEngineVideo from '../Assets/Projects/gmv_engine_vid.mp4';
import eventImg     from '../Assets/Projects/event.png';
import eventVideo   from '../Assets/Projects/event.webm';
import twitterImg   from '../Assets/Projects/twitter.png';
import twitterVideo from '../Assets/Projects/twe.webm';
import spotifyImg   from '../Assets/Projects/spotify.png';
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
    title:    'Alfred Meeting — Alternance',
    company:  'Alfred Meeting',
    stack:    ['Laravel', 'PHP', 'MySQL', 'Blade', 'JavaScript', 'Python'],
    description:
      "Alternance sur une plateforme B2B événementielle : évolution de fonctionnalités métier, pipeline de données, interfaces CRM et amélioration continue sur un codebase réel.",
    image:    alfredImg,
    gradient: 'linear-gradient(135deg, #6366f1 0%, #0ea5e9 100%)',
    axes:     ['cadrage', 'développement', 'qualité'],
    context:
      "Alfred Meeting est une plateforme événementielle B2B. En alternance, j'ai travaillé sur l'évolution de fonctionnalités existantes, l'enrichissement de données catalogue, l'espace partenaire et diverses interfaces d'administration.",
    whatIDid: [
      "Évolution de la gestion des promotions et commissions : logique d'affichage, historique, droits d'accès selon le profil partenaire",
      "Développement et amélioration de scrapers pour enrichir le catalogue de lieux (parsing, normalisation, déduplication, mapping métier)",
      "Amélioration d'interfaces CRM et espace partenaire : UX, cohérence, corrections et refactorisations",
      "Travail sur la logique métier back-end et la maintenabilité du code existant",
      "Prise en compte des retours d'équipe et amélioration continue de la qualité",
    ],
    learned:
      "L'alternance m'a confronté aux vraies contraintes d'un codebase en production : lire un existant complexe, anticiper les impacts d'une modification, raisonner en termes d'usage réel et de qualité avant d'implémenter.",
  },

  /* ── 2-3 · PERSONNEL ────────────────────────────────────────────── */
  {
    id:       2,
    category: 'personnel',
    title:    'Gomuscu — Application fitness',
    stack:    ['React', 'TypeScript', 'Laravel', 'PostgreSQL', 'Figma'],
    description:
      "Conception d'une application orientée fitness/coaching pensée comme un produit numérique — vision produit, UX, architecture et stack.",
    image:    gomuscuImg,
    video:    gomuscuVideo,
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
  {
    id:       3,
    category: 'personnel',
    title:    'GMV Engine — SaaS TikTok Shop',
    stack:    ['NestJS', 'Next.js 14', 'PostgreSQL', 'Prisma', 'BullMQ', 'Redis', 'OpenRouter', 'Stripe', 'Apify', 'HeyGen'],
    description:
      "SaaS multi-tenant pour créateurs TikTok Shop FR : pipeline complet de découverte de produits viraux, analyse IA, génération de campagnes et vidéos UGC prêtes à poster.",
    image:    gmvEngineImg,
    video:    gmvEngineVideo,
    gradient: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
    axes:     ['cadrage', 'développement'],
    context:
      "Projet personnel — automatiser le workflow complet d'un créateur TikTok Shop : scraper les produits viraux, analyser avec un LLM, générer les scripts de campagne et produire des vidéos UGC via avatar IA.",
    whatIDid: [
      "Architecture NestJS + Prisma avec multi-tenant : organisations, memberships et quotas IA par plan",
      "Pipeline de jobs asynchrones BullMQ/Redis : scraping Apify → analyse OpenRouter → génération vidéo HeyGen",
      "Frontend Next.js 14 App Router : dashboard de suivi, gestion des campagnes et bibliothèque produits",
      "Intégration Stripe complète : checkout, portail client et système de top-up de crédits",
      "Authentification JWT/Passport et gestion des permissions par rôle au sein des organisations",
    ],
    learned:
      "Construire un SaaS de bout en bout m'a confronté à des problématiques réelles : orchestration de jobs IA asynchrones, gestion des quotas et facturation, multi-tenancy et fiabilité d'un pipeline de données complet.",
  },

  /* ── 4 · PROFESSIONNEL ──────────────────────────────────────────── */
  {
    id:        4,
    category:  'professionnel',
    title:     'EVENT — Application événementiel',
    company:   'Hélice',
    stack:     ['Python', 'PostgreSQL', 'Tailwind CSS', 'Django'],
    description:
      "Application événementielle full stack avec gestion des inscriptions, paiement en ligne et interface d'administration, développée pour Hélice.",
    image:     eventImg,
    video:     eventVideo,
    githubLink:'https://github.com/Wil-01',
    gradient:  'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
    axes:      ['cadrage', 'développement'],
    context:
      "Projet professionnel réalisé chez Hélice — concevoir et développer une application de gestion d'événements full stack avec des fonctionnalités complètes : inscription, paiement, admin.",
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
  /* ── 5-6 · ACADÉMIQUE ───────────────────────────────────────────── */
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
