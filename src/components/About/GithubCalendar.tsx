import React from 'react';
import GitHubCalendar from 'react-github-calendar';
import { useTheme } from '../Theme/ThemeContext'; // Pour adapter les couleurs

interface GithubCalendarProps {
  username: string;
}

const CustomGithubCalendar: React.FC<GithubCalendarProps> = ({ username }) => {
  const { theme } = useTheme(); // Récupère le thème actuel

  // Indigo palette instead of GitHub green
  const explicitTheme = {
    light: ['#e0e7ff', '#a5b4fc', '#818cf8', '#6366f1', '#4338ca'],
    dark:  ['#1e1b4b', '#312e81', '#4338ca', '#6366f1', '#818cf8'],
  };


  return (
    <div className="flex justify-center px-2">
       {/* Le composant GitHubCalendar nécessite un parent avec une largeur définie */}
       {/* max-w-3xl w-full donne une largeur max et le rend full width jusqu'à ce max */}
       <div className="max-w-4xl w-full overflow-x-auto">
         <GitHubCalendar
           username={username}
           blockSize={14}         // Taille des blocs
           blockMargin={4}          // Marge entre les blocs
           fontSize={14}          // Taille de la police pour les mois/jours
           theme={explicitTheme}  // Applique le thème de couleurs personnalisé
           colorScheme={theme}    // Informe le calendrier du thème parent (light/dark)
         />
       </div>
    </div>
  );
};

export default CustomGithubCalendar;