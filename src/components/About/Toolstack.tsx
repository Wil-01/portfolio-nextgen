import React from 'react';

import {
  SiPostman,
  SiSlack,
  SiVercel,
  SiGitlab, // Ajouté depuis ton CV
  SiJira,   // Ajouté depuis ton CV
  SiLinux // Si tu utilises Linux comme OS principal
  // SiMacos n'est pas dans si, utilise FaApple si besoin
} from 'react-icons/si';
import { FaGithub } from 'react-icons/fa'; // Pour GitHub
import { DiVisualstudio } from "react-icons/di";


const toolItems = [
  { icon: <SiLinux />, name: "Linux"}, { icon: <DiVisualstudio />, name: 'VS Code' },
  { icon: <FaGithub />, name: 'GitHub' }, { icon: <SiGitlab />, name: 'GitLab' },
  { icon: <SiPostman />, name: 'Postman' }, { icon: <SiSlack />, name: 'Slack' },
  { icon: <SiJira />, name: 'Jira' }, { icon: <SiVercel />, name: 'Vercel' },
];

// Importe le composant ScrollingRow (ou copie-le ici si tu préfères les garder séparés)
// Assumant qu'il est exporté depuis Techstack ou mis dans un fichier partagé
// Pour cet exemple, on copie la définition ici, mais idéalement, il serait dans un fichier séparé.

interface ScrollingRowProps {
    items: { icon: React.ReactNode; name: string }[];
    duration?: string;
    reverse?: boolean;
}

const ScrollingRow: React.FC<ScrollingRowProps> = ({ items, duration = '40s', reverse = false }) => {
    const extendedItems = [...items, ...items];
    return (
        <div className="scroll-container w-full overflow-hidden py-4">
            <div
                className={`flex items-center gap-x-8 md:gap-x-12 lg:gap-x-16 animate-scroll-x ${reverse ? 'flex-row-reverse' : ''}`}
                style={{ animationDuration: duration, animationDirection: reverse ? 'reverse' : 'normal' }}
            >
                {extendedItems.map((item, index) => (
                    <div
                        key={`${item.name}-${index}`}
                        className="flex flex-col items-center justify-center flex-shrink-0 w-16 h-16 md:w-20 md:h-20
                                   bg-light/10 dark:bg-dark-light/30 rounded-md p-2 border border-transparent hover:border-primary/50 transition-colors"
                        title={item.name}
                    >
                        <span className="text-3xl md:text-4xl text-dark/80 dark:text-primary mb-2">
                            {item.icon}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

// ---- Fin de la copie de ScrollingRow ----


const Toolstack: React.FC = () => {
  return (
    <div>
      {/* Affiche une seule ligne */}
      <ScrollingRow items={toolItems} duration="50s" />
    </div>
  );
};

export default Toolstack;