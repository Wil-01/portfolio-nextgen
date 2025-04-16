import React from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css'; // Import le CSS de la bibliothèque
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap } from 'lucide-react'; // Utilise lucide-react pour les icônes

// Interface pour les données d'expérience/formation
interface TimelineItem {
  type: 'experience' | 'education';
  title: string;
  subtitle: string; // Nom de l'entreprise ou de l'école
  icon: React.ReactNode;
  iconBg: string; // Tailwind color class e.g., 'bg-primary', 'bg-blue-500'
  date: string;
  points: string[];
}

// Tes données d'expérience et de formation
const timelineData: TimelineItem[] = [
  {
    type: 'experience',
    title: "Developpeur Python",
    subtitle: "Hélice - Cotonou",
    icon: <Briefcase />,
    iconBg: "bg-pink-600", // Exemple de couleur
    date: "Août 2023 - Aujourd'hui",
    points: [
      "Développement d'applications web, logiciels, et backend avec Python, Django et PostgreSQL.",
      "Automatisation de tâches de scraping de données via BeautifulSoup et Scrapy pour l’analyse de marché.",
      "Implémentation de pipelines CI/CD avec Docker et GitLab pour une intégration continue.",
      "Surveillance de la sécurité et optimisation des performances des applications déployées.",
    ]
  },
   {
    type: 'experience',
    title: "Developpeur Python",
    subtitle: "CED Consult - Calavi",
    icon: <Briefcase />,
    iconBg: "bg-yellow-500", // Exemple de couleur
    date: "Avril 2024 - September 2024",
    points: [
        "Automatisation de processus internes via des scripts Python utilisant Pandas et NumPy.",
        "Optimisation du code existant pour réduire les temps d’exécution de 30%.",
        "Documentation technique détaillée sur Notion pour assurer la pérennité des projets.",
        "Résolution de bugs techniques avec PyCharm et Git en support aux équipes clients.",
    ]
  },
   {
    type: 'experience',
    title: "Developpeur Full-stack",
    subtitle: "EBP - Cotonou",
    icon: <Briefcase />,
    iconBg: "bg-green-500", // Exemple de couleur
    date: "Mai 2023 - Août 2023",
    points: [
        "Développement front-end en JavaScript et back-end en Django pour le site web.",
        "Optimisation des performances du site et réduction des temps de chargement pour une meilleure UX.",
        "Implémentation de pipelines CI/CD avec Docker et GitLab pour une intégration continue.",
    ]
  },
  // Ajoute tes formations ici
  {
    type: 'education',
    title: "Développeur d'Application (Licence 2 TCOM)",
    subtitle: "EPITECH Paris - Web Académie",
    icon: <GraduationCap />,
    iconBg: "bg-blue-600",
    date: "2024 - En cours",
    points: [
        "Formation intensive au développement web Full Stack.",
        "Projets pratiques utilisant diverses technologies front-end et back-end.",
        "Apprentissage des méthodologies agiles et de la collaboration en équipe."
    ]
  },
  {
    type: 'education',
    title: "Spécialisation IBM Software Developer Full Stack",
    subtitle: "Coursera",
    icon: <GraduationCap />,
    iconBg: "bg-indigo-500",
    date: "2024",
    points: ["Approfondissement des compétences full-stack avec les outils et technologies IBM."]
  },
  {
      type: 'education',
      title: "Spécialisation Python",
      subtitle: "Université du Michigan (Coursera)",
      icon: <GraduationCap />,
      iconBg: "bg-purple-500",
      date: "2023",
      points: ["Maîtrise avancée du langage Python et de ses applications."]
  },
  {
      type: 'education',
      title: "Certification Python",
      subtitle: "OpenClassrooms",
      icon: <GraduationCap />,
      iconBg: "bg-red-500",
      date: "2022",
      points: ["Validation des compétences fondamentales en programmation Python."]
  },
   {
      type: 'education',
      title: "Autodidacte",
      subtitle: "OpenClassrooms, Coursera",
      icon: <GraduationCap />,
      iconBg: "bg-gray-500",
      date: "2021 - 2024",
      points: ["Apprentissage continu en développement web, algorithmes, mobile et IA."]
  },
];

// Animation pour chaque élément de la timeline
const elementVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const Experience: React.FC = () => {
  return (
    <div className="mt-12">
      {/* La classe de la timeline parente pour styler la ligne principale */}
      <VerticalTimeline lineColor="var(--primary-color)">
        {timelineData.map((item, index) => (
          <motion.div // Enveloppe chaque élément pour l'animer au scroll
             key={index}
             variants={elementVariants}
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true, amount: 0.2 }} // Déclenche quand 20% est visible
           >
             <VerticalTimelineElement
              contentStyle={{
                // Utilise les variables CSS du thème pour le fond et le texte
                background: 'var(--card-bg)', // Fond basé sur le thème
                color: 'var(--text-color)',    // Texte basé sur le thème
                boxShadow: '0 3px 10px rgba(0, 0, 0, 0.15)', // Ombre subtile
                borderRadius: '0.5rem'
              }}
              contentArrowStyle={{
                // Flèche pointant vers la ligne, couleur primaire
                borderRight: '7px solid var(--primary-color)'
              }}
              date={item.date}
              dateClassName="text-dark/60 dark:text-light/60 opacity-80 mx-2" // Style Tailwind pour la date
              iconStyle={{
                // Utilise la couleur Tailwind définie dans iconBg
                background: 'var(--primary-color)', // Fond de l'icône (couleur primaire)
                color: '#fff', // Couleur de l'icône elle-même
                boxShadow: `0 0 0 4px var(--bg-color), inset 0 2px 0 rgba(0,0,0,.08), 0 3px 0 4px rgba(0,0,0,.05)` // Effet de bordure
              }}
              icon={item.icon} // Icône Lucide
             >
              {/* Contenu de l'élément */}
              <h3 className="text-xl font-semibold text-primary vertical-timeline-element-title">
                 {item.title}
              </h3>
              <h4 className="text-md font-medium text-dark/80 dark:text-light/80 vertical-timeline-element-subtitle mb-3">
                 {item.subtitle}
              </h4>
              <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed">
                 {item.points.map((point, idx) => (
                   <li key={idx}>{point}</li>
                 ))}
              </ul>
            </VerticalTimelineElement>
          </motion.div>
        ))}
      </VerticalTimeline>
    </div>
  );
};

export default Experience;