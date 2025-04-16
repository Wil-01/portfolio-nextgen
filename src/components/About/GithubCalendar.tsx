import React from 'react';
import GitHubCalendar from 'react-github-calendar';
import { useTheme } from '../Theme/ThemeContext'; // Pour adapter les couleurs

interface GithubCalendarProps {
  username: string;
}

const CustomGithubCalendar: React.FC<GithubCalendarProps> = ({ username }) => {
  const { theme } = useTheme(); // Récupère le thème actuel

  // Définir explicitement les couleurs pour les thèmes clair et sombre
   const explicitTheme = {
     light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'], // Couleurs GitHub light
     dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'] // Couleurs GitHub dark
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