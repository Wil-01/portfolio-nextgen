# Portfolio — Williams KOUTON GODONOU

Portfolio one page de validation du titre Web@cadémie, avec un espace d'administration.
En ligne : https://williams-dev.vercel.app

**Stack :** React 19, TypeScript, Vite, Tailwind CSS, Supabase (PostgreSQL, Auth, Storage), EmailJS, Vercel.

## Démarrer

```bash
npm install
cp .env.example .env   # renseigner les clés EmailJS et Supabase
npm run dev
```

Sans Supabase, le site public s'affiche avec son contenu statique de secours.

## Commandes

| Commande | Rôle |
| --- | --- |
| `npm run dev` | Serveur de développement |
| `npm run build` | Vérification TypeScript et build de production |
| `npm test` | Tests unitaires et d'intégration (Vitest) |
| `npm run test:coverage` | Tests avec couverture |
| `npm run lint` | ESLint |
| `npm run monitor` | Contrôle de disponibilité de la production (`-- --log` pour journaliser) |

## Base de données

Exécuter `supabase-schema.sql` dans l'éditeur SQL de Supabase, créer le compte administrateur,
puis désactiver les inscriptions publiques : les règles RLS autorisent l'écriture à tout utilisateur authentifié.

## Tests

Deux tests `it.fails` documentent des anomalies connues (A-01, A-02).
Ils passeront au rouge dès la correction : il suffira alors de retirer `.fails`.
