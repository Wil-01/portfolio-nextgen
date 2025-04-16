import React from 'react';
// Importe les icônes nécessaires depuis react-icons
import {
  DiJavascript1,
  DiReact,
  DiNodejs,
  DiMongodb,
  DiPython,
  DiGit,
  DiJava,
  DiPhp, // Ajouté depuis tes projets
} from 'react-icons/di';
import {
  SiNextdotjs,
  SiPostgresql,
  SiTypescript, // Ajouté car on utilise TS
  SiDjango,     // Ajouté depuis ton CV/Expérience
  SiDocker,     // Ajouté depuis ton CV/Expérience
  SiTailwindcss // Ajouté car on utilise Tailwind
} from 'react-icons/si';
// FaC n'est pas dans react-icons, tu peux utiliser une autre icône ou trouver un SVG
// import { FaC } from 'react-icons/fa6';


const techItems = [
  { icon: <DiPython />, name: 'Python' }, { icon: <SiDjango />, name: 'Django' },
  { icon: <DiJavascript1 />, name: 'JavaScript' }, { icon: <SiTypescript />, name: 'TypeScript' },
  { icon: <DiReact />, name: 'React' }, { icon: <SiNextdotjs />, name: 'Next.js' },
  { icon: <DiNodejs />, name: 'Node.js' }, { icon: <DiPhp />, name: 'PHP' },
  { icon: <DiJava />, name: 'Java' }, { icon: <SiPostgresql />, name: 'PostgreSQL' },
  { icon: <DiMongodb />, name: 'MongoDB' }, { icon: <SiTailwindcss />, name: 'Tailwind CSS' },
  { icon: <DiGit />, name: 'Git' }, { icon: <SiDocker />, name: 'Docker' },
];

// Sépare les items en deux listes (ou utilise la même, comme tu préfères)
const row1Items = techItems.slice(0, Math.ceil(techItems.length / 2));
const row2Items = techItems.slice(Math.ceil(techItems.length / 2));


// Composant réutilisable pour une ligne de défilement
interface ScrollingRowProps {
    items: { icon: React.ReactNode; name: string }[];
    duration?: string; // Permet de varier la vitesse si on veut
    reverse?: boolean; // Pour faire défiler dans l'autre sens
}

const ScrollingRow: React.FC<ScrollingRowProps> = ({ items, duration = '40s', reverse = false }) => {
    // Duplique la liste pour le défilement infini
    const extendedItems = [...items, ...items];

    return (
         // Conteneur qui masque l'overflow et active la pause au survol
        <div className="scroll-container w-full overflow-hidden py-4">
             {/* Conteneur interne avec flex, animation et direction */}
            <div
                className={`flex items-center gap-x-8 md:gap-x-12 lg:gap-x-16 animate-scroll-x ${reverse ? 'flex-row-reverse' : ''}`}
                style={{ animationDuration: duration, animationDirection: reverse ? 'reverse' : 'normal' }}
            >
                {extendedItems.map((item, index) => (
                    <div
                        key={`${item.name}-${index}`} // Clé unique pour chaque élément dupliqué
                        className="flex flex-col items-center justify-center flex-shrink-0 w-16 h-16 md:w-20 md:h-20
                                   bg-light/10 dark:bg-dark-light/30 rounded-md p-2 border border-transparent hover:border-primary/50 transition-colors"
                        title={item.name} // Tooltip avec le nom
                    >
                        <span className="text-3xl md:text-4xl text-primary mb-2">
                            {item.icon}
                        </span>
                         {/* Optionnel: afficher le nom en petit sous l'icône
                         <span className="mt-1 text-[10px] text-center text-dark/60 dark:text-light/60">{item.name}</span>
                         */}
                    </div>
                ))}
            </div>
        </div>
    );
};


const Techstack: React.FC = () => {
  return (
    // Affiche deux lignes de défilement
    <div className="space-y-4">
      <ScrollingRow items={row1Items} duration="35s" /> {/* Première ligne, un peu plus rapide */}
      <ScrollingRow items={row2Items} duration="45s" reverse={true} /> {/* Deuxième ligne, sens inverse */}
    </div>
  );
};

export default Techstack;