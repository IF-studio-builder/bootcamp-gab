# PRD - Système de Filtres pour la Page Événements

## 📋 Informations du Document

| Champ       | Valeur                                    |
| ----------- | ----------------------------------------- |
| **Projet**  | GAB Platform                              |
| **Feature** | Système de Filtres pour la Page Événements |
| **Version** | 1.0                                       |
| **Date**    | 16 janvier 2026                           |
| **Statut**  | Draft                                     |
| **Auteur**  | Claude Code                               |

---

## 🎯 Contexte & Objectifs

### Contexte

La plateforme GAB organise des événements variés (meetups, webinars, workshops) dans plusieurs villes (Lille, Paris, Lyon) ainsi qu'en ligne (Remote). Actuellement, la page `/events` affiche tous les événements sans possibilité de filtrage, ce qui rend difficile pour les visiteurs de trouver rapidement les événements qui les intéressent selon leur localisation, leurs préférences de format ou leur disponibilité.

### Objectifs Business

1. **Améliorer l'engagement** : Faciliter la découverte d'événements pertinents pour augmenter les inscriptions
2. **Valoriser les replays** : Permettre aux nouveaux membres de découvrir le contenu passé via les replays
3. **Supporter l'expansion géographique** : Mettre en avant les événements par ville pour encourager la participation locale
4. **Améliorer le partage** : Permettre le partage d'URLs filtrées pour promouvoir des événements spécifiques
5. **Optimiser l'expérience utilisateur** : Réduire le temps de recherche d'événements pertinents

### Objectifs Utilisateurs

- **En tant que visiteur parisien** : Je veux filtrer par ville (Paris) pour trouver des événements près de chez moi
- **En tant que membre remote** : Je veux filtrer par "webinar" pour trouver les événements en ligne
- **En tant que nouveau membre** : Je veux accéder aux replays pour découvrir ce que propose la plateforme
- **En tant que membre actif** : Je veux combiner plusieurs filtres pour affiner ma recherche

---

## 👤 User Stories

### US1 : Filtrage par Ville (Visiteur Parisien)

**En tant que** visiteur parisien  
**Je veux** filtrer les événements par ville (Paris)  
**Afin de** trouver rapidement les événements près de chez moi sans avoir à parcourir toute la liste

**Critères d'acceptation :**
- Je peux sélectionner "Paris" dans le filtre ville
- La liste affiche uniquement les événements à Paris
- Je peux sélectionner plusieurs villes simultanément (multi-sélection)
- L'URL est mise à jour avec mes filtres pour permettre le partage

### US2 : Filtrage par Type (Membre Remote)

**En tant que** membre remote  
**Je veux** filtrer par type "webinar"  
**Afin de** trouver les événements en ligne auxquels je peux participer depuis chez moi

**Critères d'acceptation :**
- Je peux sélectionner "Webinar" dans le filtre type
- La liste affiche uniquement les webinars
- Je peux combiner ce filtre avec d'autres (ex: période "À venir")
- Les compteurs d'événements sont mis à jour dynamiquement

### US3 : Accès aux Replays (Nouveau Membre)

**En tant que** nouveau membre  
**Je veux** accéder aux replays disponibles  
**Afin de** découvrir le contenu et la qualité des événements GAB avant de m'engager

**Critères d'acceptation :**
- Je peux sélectionner "Replays disponibles" dans le filtre période
- La liste affiche uniquement les événements passés avec replay disponible
- Je peux combiner avec d'autres filtres (ex: type "Workshop")
- Les replays sont facilement accessibles depuis les cartes d'événements

---

## 🛠️ Spécifications Fonctionnelles

### Filtre par Ville (Multi-sélection)

**Comportement :**
- Sélection multiple via checkboxes
- Options disponibles : Lille, Paris, Lyon, Remote
- Option "Toutes les villes" qui décoche toutes les autres sélections
- Compteur dynamique affiché entre parenthèses pour chaque ville (ex: "Paris (8)")
- Les villes sans événements sont grisées et non sélectionnables

**Logique de filtrage :**
- Si aucune ville sélectionnée ou "Toutes" : afficher tous les événements
- Si une ou plusieurs villes sélectionnées : afficher les événements correspondants (OR logique)
- Le filtre s'applique en temps réel sans rechargement de page

**Persistance URL :**
- Format : `?cities=lille,paris,remote`
- Valeurs séparées par des virgules
- Valeurs en minuscules

### Filtre par Type (Single-sélection)

**Comportement :**
- Sélection unique via radio buttons
- Options disponibles : Tous, Meetup, Webinar, Workshop
- Option "Tous" sélectionnée par défaut
- Compteur dynamique affiché entre parenthèses pour chaque type
- Style visuel distinct pour l'option active (bold + couleur primary)

**Logique de filtrage :**
- Si "Tous" sélectionné : ne pas filtrer par type
- Sinon : afficher uniquement les événements du type sélectionné
- Le filtre s'applique en temps réel

**Persistance URL :**
- Format : `?type=meetup`
- Valeur unique en minuscules
- Si "Tous" : paramètre absent de l'URL

### Filtre par Période (Single-sélection)

**Comportement :**
- Sélection unique via radio buttons
- Options disponibles :
  - "Tous les événements" (par défaut)
  - "À venir" : événements futurs uniquement
  - "Replays disponibles" : événements passés avec `replay_url` non null
- Compteur dynamique affiché entre parenthèses
- Style visuel distinct pour l'option active

**Logique de filtrage :**
- "Tous" : afficher tous les événements (futurs et passés)
- "À venir" : `new Date(event.event_date) >= new Date()`
- "Replays disponibles" : `new Date(event.event_date) < new Date() AND event.replay_url !== null`
- Le filtre s'applique en temps réel

**Persistance URL :**
- Format : `?period=upcoming` ou `?period=replays`
- Valeurs : `all`, `upcoming`, `replays`
- Si "Tous" : paramètre absent de l'URL

### Combinaison des Filtres (Logique AND)

**Logique de combinaison :**
- Les filtres s'appliquent avec un **AND logique** entre les différents types de filtres
- **Entre les villes** : logique OR (si plusieurs villes sélectionnées, afficher les événements de toutes ces villes)
- **Entre les filtres** : logique AND (tous les critères doivent être respectés)

**Exemples de logique :**
- `cities=paris,lille` → Afficher les événements à Paris **OU** à Lille
- `cities=paris&type=meetup` → Afficher les événements à Paris **ET** de type meetup
- `cities=paris,lille&type=meetup&period=upcoming` → Afficher les événements (à Paris **OU** à Lille) **ET** de type meetup **ET** à venir

**Algorithme de filtrage :**
```typescript
// Pseudo-code
filteredEvents = allEvents.filter(event => {
  // Filtre ville (OR logique si plusieurs villes)
  const cityMatch = selectedCities.length === 0 || 
                    selectedCities.includes(event.city);
  
  // Filtre type (AND logique)
  const typeMatch = selectedType === 'all' || 
                    event.event_type === selectedType;
  
  // Filtre période (AND logique)
  const periodMatch = selectedPeriod === 'all' ||
                     (selectedPeriod === 'upcoming' && event.event_date >= now) ||
                     (selectedPeriod === 'replays' && event.event_date < now && event.replay_url);
  
  return cityMatch && typeMatch && periodMatch;
});
```

**Exemple de requête combinée :**
```
/events?cities=paris,lille&type=meetup&period=upcoming
```
Cette URL affiche : les événements à Paris **OU** Lille, **ET** de type meetup, **ET** à venir.

### Réinitialisation des Filtres

**Comportement :**
- Bouton "Réinitialiser les filtres" visible en bas du panneau de filtres
- Un clic remet tous les filtres à leur état par défaut :
  - Ville : "Toutes les villes"
  - Type : "Tous"
  - Période : "Tous les événements"
- L'URL est mise à jour pour refléter l'état par défaut
- Le bouton est désactivé si aucun filtre n'est appliqué

### Persistance dans l'URL

**Format d'URL standard :**
```
/events?cities=paris,lille&type=meetup&period=upcoming
```

**Structure des paramètres :**
- `cities` : Liste de villes séparées par des virgules (multi-sélection)
  - Valeurs possibles : `lille`, `paris`, `lyon`, `remote`
  - Format : `cities=paris,lille` (plusieurs villes)
  - Si toutes les villes ou aucune : paramètre absent
- `type` : Type d'événement unique (single-sélection)
  - Valeurs possibles : `meetup`, `webinar`, `workshop`, `conference`
  - Format : `type=meetup`
  - Si "Tous" : paramètre absent
- `period` : Période unique (single-sélection)
  - Valeurs possibles : `upcoming`, `replays`
  - Format : `period=upcoming` ou `period=replays`
  - Si "Tous" : paramètre absent

**Comportement :**
- Les filtres sont synchronisés avec l'URL en temps réel (via `useSearchParams` et `useRouter` de Next.js)
- Au chargement de la page, les filtres sont appliqués depuis l'URL
- Le partage de l'URL préserve les filtres
- Le bouton Back/Forward du navigateur fonctionne correctement
- Utilisation de `router.push()` avec `shallow: true` pour éviter le rechargement complet

**Exemples d'URLs valides :**
- `/events` : Aucun filtre (état par défaut)
- `/events?cities=paris` : Filtre ville uniquement (Paris)
- `/events?cities=paris,lille` : Filtre multi-villes (Paris OU Lille)
- `/events?type=meetup` : Filtre type uniquement (Meetup)
- `/events?period=upcoming` : Filtre période uniquement (À venir)
- `/events?type=meetup&period=upcoming` : Filtre type ET période
- `/events?cities=lille,paris,remote&type=workshop` : Multi-villes ET type
- `/events?cities=paris&type=meetup&period=upcoming` : Tous les filtres combinés

**Validation des paramètres :**
- Les valeurs invalides sont ignorées silencieusement
- Les paramètres inconnus sont ignorés
- Les valeurs sont normalisées (minuscules, trim)
- Les doublons dans `cities` sont supprimés automatiquement

### Compteurs Dynamiques par Filtre

**Principe :**
- Chaque option de filtre affiche le nombre d'événements correspondants
- Les compteurs sont **recalculés dynamiquement** à chaque changement de filtre
- Les compteurs prennent en compte **tous les autres filtres actifs** (logique AND)

**Format d'affichage :**
- Format : "Option (X)" où X est le nombre d'événements
- Exemples :
  - "Paris (8)" : 8 événements à Paris
  - "Meetup (12)" : 12 événements de type meetup
  - "À venir (5)" : 5 événements à venir

**Logique de calcul :**
1. Pour chaque option de filtre, compter les événements qui :
   - Correspondent à cette option
   - **ET** respectent tous les autres filtres actifs
2. Exemple : Si "À venir" est sélectionné et "Paris" est sélectionné :
   - "Paris (5)" = 5 événements à Paris **ET** à venir
   - "Lyon (0)" = 0 événement à Lyon **ET** à venir (grisé)
   - "Meetup (3)" = 3 meetups à Paris **ET** à venir

**Comportement visuel :**
- Compteur > 0 : Option normale, sélectionnable
- Compteur = 0 : Option grisée, non sélectionnable (disabled)
- Compteur mis à jour en temps réel sans rechargement

**Exemple concret :**
```
État initial : Tous les filtres à "Tous"
- Paris (15)
- Lille (12)
- Lyon (3)
- Remote (8)

Après sélection "À venir" :
- Paris (8)  ← Seulement les événements à venir à Paris
- Lille (5)  ← Seulement les événements à venir à Lille
- Lyon (0)  ← Grisé, aucun événement à venir à Lyon
- Remote (6) ← Seulement les événements à venir en remote

Après sélection "À venir" + "Paris" + "Meetup" :
- Paris (3)  ← 3 meetups à venir à Paris
- Lille (0)  ← Grisé (filtre "Paris" actif)
- Meetup (3) ← 3 meetups à venir à Paris
- Webinar (0) ← Grisé (pas de webinars meetups à Paris à venir)
```

**Implémentation technique :**
- Utiliser `useMemo` pour optimiser les calculs
- Recalculer uniquement quand les filtres changent
- Mettre en cache les résultats pour éviter les recalculs inutiles

### Tri des Événements

**Règle de tri :**
- Les événements sont **toujours triés par date** après application des filtres
- Le tri dépend de la période de l'événement (futur vs passé)

**Tri des événements futurs :**
- **Ordre** : Date croissante (du plus proche au plus lointain)
- **Logique** : `event.event_date` croissant
- **Exemple** : 
  - 15 février 2026 (en premier)
  - 22 mars 2026
  - 10 avril 2026 (en dernier)

**Tri des événements passés :**
- **Ordre** : Date décroissante (du plus récent au plus ancien)
- **Logique** : `event.event_date` décroissant
- **Exemple** :
  - 10 janvier 2026 (en premier, le plus récent)
  - 15 décembre 2025
  - 1 novembre 2025 (en dernier, le plus ancien)

**Tri mixte (filtre "Tous") :**
- Les événements futurs sont affichés en premier (triés par date croissante)
- Les événements passés suivent (triés par date décroissante)
- Séparation visuelle entre "Prochains événements" et "Replays disponibles"

**Algorithme de tri :**
```typescript
// Pseudo-code
const now = new Date();

const sortedEvents = filteredEvents.sort((a, b) => {
  const dateA = new Date(a.event_date);
  const dateB = new Date(b.event_date);
  const isFutureA = dateA >= now;
  const isFutureB = dateB >= now;
  
  // Si les deux sont futurs : tri croissant
  if (isFutureA && isFutureB) {
    return dateA.getTime() - dateB.getTime();
  }
  
  // Si les deux sont passés : tri décroissant
  if (!isFutureA && !isFutureB) {
    return dateB.getTime() - dateA.getTime();
  }
  
  // Futurs avant passés
  return isFutureA ? -1 : 1;
});
```

**Affichage :**
- Si filtre "À venir" : Liste unique triée par date croissante
- Si filtre "Replays disponibles" : Liste unique triée par date décroissante
- Si filtre "Tous" : Deux sections séparées avec leurs propres tris

---

## 🔧 Contraintes Techniques

### Stack Technique

- **Framework** : Next.js 15 (App Router)
- **Langage** : TypeScript
- **Styling** : Tailwind CSS + shadcn/ui
- **Base de données** : Supabase (ou JSON pour Phase 1)
- **Routing** : Next.js App Router avec Server Components

### Contraintes de Performance

1. **Filtrage côté client** (Phase 1 avec JSON) :
   - Tous les événements sont chargés initialement
   - Le filtrage se fait côté client avec JavaScript
   - Limite : < 100 événements pour maintenir de bonnes performances

2. **Filtrage côté serveur** (Phase 2 avec Supabase) :
   - Requêtes optimisées avec index sur `city`, `event_type`, `event_date`
   - Cache Next.js avec revalidation (1h)
   - Pagination si > 50 événements

### Contraintes d'Accessibilité

- **WCAG AA** : Tous les filtres doivent être accessibles au clavier
- **Screen readers** : Labels ARIA appropriés pour les checkboxes et radio buttons
- **Focus visible** : États de focus clairs pour la navigation au clavier
- **Contraste** : Ratio de contraste minimum 4.5:1 pour le texte

### Contraintes de Responsive

- **Mobile (< 768px)** : Filtres en modal/drawer (Sheet shadcn/ui)
- **Tablet (768px - 1024px)** : Sidebar rétractable
- **Desktop (> 1024px)** : Sidebar fixe à gauche

### Contraintes de Compatibilité

- **Navigateurs** : Chrome, Firefox, Safari, Edge (dernières 2 versions)
- **JavaScript** : Requis (pas de fallback sans JS)
- **Next.js** : Version 15+ (App Router)

### Contraintes de Données

**Structure attendue des événements :**
```typescript
{
  id: string;
  event_type: "meetup" | "webinar" | "workshop" | "conference";
  location: string; // Ex: "Lille, Hauts-de-France"
  city?: string; // Nouveau champ à ajouter : "Lille" | "Paris" | "Lyon" | "Remote"
  event_date: string; // ISO 8601
  replay_url: string | null;
  is_past: boolean;
  published: boolean;
}
```

**Note** : Le champ `city` doit être ajouté si absent. Il peut être dérivé de `location` ou ajouté manuellement.

### Contraintes d'URL

- **Longueur maximale** : Respecter les limites du navigateur (~2000 caractères)
- **Encodage** : Utiliser `encodeURIComponent` pour les valeurs
- **Validation** : Valider les paramètres URL au chargement de la page

---

## ✅ Critères d'Acceptation

### AC1 : Affichage du Panneau de Filtres

- [ ] Le panneau de filtres est visible sur la page `/events`
- [ ] Les trois filtres sont présents (Ville, Type, Période)
- [ ] Le panneau est responsive (sidebar desktop, drawer mobile)
- [ ] Le panneau est accessible au clavier (navigation Tab)

### AC2 : Filtre par Ville (Multi-sélection)

- [ ] Toutes les villes disponibles sont listées (Lille, Paris, Lyon, Remote)
- [ ] L'option "Toutes les villes" est présente et sélectionnée par défaut
- [ ] La sélection multiple fonctionne (checkboxes)
- [ ] "Toutes les villes" décoche automatiquement les autres options
- [ ] Les compteurs sont affichés et mis à jour dynamiquement
- [ ] Les villes sans événements sont grisées et non sélectionnables
- [ ] La liste d'événements se met à jour en temps réel lors de la sélection

### AC3 : Filtre par Type (Single-sélection)

- [ ] Tous les types sont listés (Tous, Meetup, Webinar, Workshop)
- [ ] L'option "Tous" est sélectionnée par défaut
- [ ] La sélection unique fonctionne (radio buttons)
- [ ] L'option active a un style visuel distinct
- [ ] Les compteurs sont affichés et mis à jour dynamiquement
- [ ] La liste d'événements se met à jour en temps réel

### AC4 : Filtre par Période (Single-sélection)

- [ ] Les trois options sont présentes (Tous, À venir, Replays disponibles)
- [ ] L'option "Tous" est sélectionnée par défaut
- [ ] La sélection unique fonctionne (radio buttons)
- [ ] "À venir" filtre correctement les événements futurs
- [ ] "Replays disponibles" filtre correctement les événements passés avec replay
- [ ] Les compteurs sont affichés et mis à jour dynamiquement
- [ ] La liste d'événements se met à jour en temps réel

### AC5 : Combinaison de Filtres

- [ ] Les filtres fonctionnent ensemble avec une logique AND
- [ ] Les compteurs dans chaque filtre sont recalculés selon les autres filtres actifs
- [ ] Si aucun résultat : afficher un état vide avec message et bouton "Réinitialiser"
- [ ] Le compteur total d'événements filtrés est affiché

### AC6 : Réinitialisation des Filtres

- [ ] Le bouton "Réinitialiser les filtres" est présent
- [ ] Un clic remet tous les filtres à leur état par défaut
- [ ] L'URL est mise à jour pour refléter l'état par défaut
- [ ] Le bouton est désactivé si aucun filtre n'est appliqué

### AC7 : Persistance dans l'URL

- [ ] Les filtres actifs sont reflétés dans l'URL (query params)
- [ ] Le format d'URL est correct : `/events?cities=paris,lille&type=meetup&period=upcoming`
- [ ] Au chargement de la page, les filtres sont appliqués depuis l'URL
- [ ] Le partage de l'URL préserve les filtres
- [ ] Le bouton Back/Forward du navigateur fonctionne correctement
- [ ] Les paramètres invalides sont ignorés sans erreur

### AC8 : Performance

- [ ] Le filtrage est instantané (< 100ms) pour < 100 événements
- [ ] Pas de rechargement de page lors du changement de filtre
- [ ] Les animations sont fluides (60fps)
- [ ] Pas de lag visible lors de la mise à jour des compteurs

### AC9 : Accessibilité

- [ ] Tous les filtres sont accessibles au clavier (Tab, Espace, Entrée)
- [ ] Les labels ARIA sont présents et corrects
- [ ] Les états de focus sont visibles
- [ ] Le contraste des couleurs respecte WCAG AA (4.5:1)
- [ ] Les screen readers annoncent correctement les changements

### AC10 : Responsive

- [ ] Sur mobile : les filtres sont dans un drawer/modal
- [ ] Sur mobile : un bouton "Filtrer" permet d'ouvrir le drawer
- [ ] Sur tablet : sidebar rétractable fonctionne
- [ ] Sur desktop : sidebar fixe à gauche
- [ ] La liste d'événements s'adapte à la largeur disponible

### AC11 : États Vides

- [ ] Si aucun événement après filtrage : afficher un message clair
- [ ] Le message propose une action (réinitialiser les filtres)
- [ ] L'icône et le texte sont cohérents avec le contexte
- [ ] Le composant `EmptyState` est utilisé pour l'affichage
- [ ] Le bouton "Réinitialiser les filtres" fonctionne correctement

### AC12 : Gestion des Erreurs

- [ ] Les paramètres URL invalides sont ignorés sans erreur
- [ ] Si erreur de chargement des événements : afficher un message d'erreur
- [ ] Les erreurs sont loggées pour le debugging
- [ ] Le composant `ErrorState` est utilisé pour l'affichage
- [ ] Un bouton "Réessayer" est proposé en cas d'erreur réseau
- [ ] Les erreurs Supabase sont gérées gracieusement

### AC13 : Tri des Événements

- [ ] Les événements futurs sont triés par date croissante
- [ ] Les événements passés sont triés par date décroissante
- [ ] Le tri s'applique après le filtrage
- [ ] Si filtre "Tous" : les futurs sont affichés avant les passés
- [ ] Le tri est performant même avec beaucoup d'événements

---

## ✅ Checklist de Validation

### Filtres

- [ ] Multi-sélection ville fonctionne (checkboxes)
- [ ] Single-sélection type fonctionne (radio)
- [ ] Compteurs mis à jour en temps réel
- [ ] Bouton "Réinitialiser" remet les filtres à zéro

### URL

- [ ] Filtres reflétés dans l'URL (query params)
- [ ] Partage d'URL préserve les filtres
- [ ] Back/Forward navigateur fonctionne

### UI

- [ ] État vide si aucun résultat
- [ ] Responsive : filtres en drawer sur mobile

---

## 📊 Métriques de Succès

### Métriques d'Engagement

- **Taux d'utilisation des filtres** : > 40% des visiteurs utilisent au moins un filtre
- **Taux de combinaison de filtres** : > 20% des utilisateurs combinent 2+ filtres
- **Taux de partage d'URL filtrée** : Mesurer les vues via URLs avec query params
- **Temps moyen sur la page** : > 2 minutes (augmentation de 30% vs avant)

### Métriques Techniques

- **Temps de filtrage** : < 100ms (côté client)
- **Taux d'erreur** : < 0.5%
- **Score Lighthouse Performance** : > 90
- **Score Lighthouse Accessibility** : > 95

### Métriques de Qualité

- **Taux de satisfaction** : > 80% (via feedback utilisateurs)
- **Taux d'abandon** : < 10% (visiteurs qui quittent sans action)
- **Taux de conversion** : > 15% (clic sur "S'inscrire" après filtrage)

---

## 🚨 Risques & Mitigations

### Risque 1 : Performance avec Beaucoup d'Événements

**Impact** : Moyen  
**Probabilité** : Moyenne (si > 100 événements)

**Mitigation :**
- Implémenter la pagination dès le début
- Filtrer côté serveur en Phase 2 (Supabase)
- Utiliser `useMemo` pour optimiser les calculs de filtrage
- Limiter le nombre d'événements affichés initialement

### Risque 2 : Complexité UX avec Multi-sélection

**Impact** : Moyen  
**Probabilité** : Moyenne

**Mitigation :**
- Afficher clairement les villes sélectionnées
- Ajouter un badge "X villes sélectionnées"
- Permettre la désélection facile
- Tester avec de vrais utilisateurs

### Risque 3 : URLs Trop Longues

**Impact** : Faible  
**Probabilité** : Faible

**Mitigation :**
- Limiter le nombre de villes sélectionnables (max 4)
- Utiliser des codes courts si nécessaire (ex: "p" pour Paris)
- Valider la longueur avant mise à jour de l'URL

### Risque 4 : Incohérence des Données (Champ `city`)

**Impact** : Élevé  
**Probabilité** : Moyenne

**Mitigation :**
- Ajouter le champ `city` dans la structure de données
- Créer un script de migration pour dériver `city` depuis `location`
- Valider la présence de `city` avant affichage
- Afficher "Autre" si `city` est absent

---

## 🔮 Évolutions Futures

### V2 : Filtres Avancés

- Recherche textuelle par mot-clé (titre, description)
- Filtre par date spécifique (date picker)
- Filtre par capacité (places disponibles)
- Tri des résultats (date, popularité)

### V3 : Sauvegarde des Préférences

- Sauvegarder les filtres préférés dans localStorage
- Bouton "Appliquer mes filtres préférés"
- Synchronisation avec compte utilisateur (si authentification)

### V4 : Filtres Intelligents

- Suggestions de filtres basées sur la localisation (géolocalisation)
- Recommandations personnalisées
- Filtres "Pour vous" basés sur l'historique

---

## 📚 Composants & Fichiers

### Fichiers à Créer

| Fichier                              | Description                                    |
| ------------------------------------ | ---------------------------------------------- |
| `components/events/event-filters.tsx` | Panneau de filtres (ville, type, période)     |
| `components/events/empty-state.tsx`  | Composant d'état vide (aucun résultat)         |
| `components/events/error-state.tsx`  | Composant d'état d'erreur (chargement échoué)  |
| `hooks/use-event-filters.ts`         | Hook custom pour gérer l'état des filtres     |
| `lib/utils/filter-events.ts`          | Fonctions utilitaires de filtrage             |
| `lib/utils/sort-events.ts`           | Fonctions utilitaires de tri des événements   |
| `lib/utils/url-params.ts`            | Utilitaires pour gérer les query params       |

### Fichiers à Modifier

| Fichier                          | Modifications                                    |
| -------------------------------- | ------------------------------------------------ |
| `app/(public)/events/page.tsx`   | Intégrer les filtres et la logique de filtrage  |
| `data/events.json`               | Ajouter le champ `city` à chaque événement       |
| `lib/supabase/types.ts`          | Ajouter `city` dans le type `Event` (si Supabase) |

### Composants shadcn/ui à Utiliser

- `Checkbox` : Pour les filtres multi-sélection (ville)
- `RadioGroup` : Pour les filtres single-sélection (type, période)
- `Sheet` : Pour le drawer mobile des filtres
- `Button` : Pour le bouton "Réinitialiser" et les actions
- `Badge` : Pour afficher les compteurs (optionnel)
- `Alert` : Pour les messages d'erreur (dans ErrorState)
- `AlertCircle` : Icône pour les erreurs (lucide-react)

### Implémentations Recommandées

#### Composant EmptyState

**Fichier :** `components/events/empty-state.tsx`

**Spécifications :**
- Affiche un message clair quand aucun événement ne correspond aux filtres
- Icône de recherche (Search de lucide-react)
- Message : "Aucun événement ne correspond à vos critères"
- Bouton "Réinitialiser les filtres" qui remet tous les filtres à zéro
- Style cohérent avec les autres états vides du site

**Exemple d'implémentation :**
```tsx
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onResetFilters: () => void;
}

export function EmptyState({ onResetFilters }: EmptyStateProps) {
  return (
    <div className="rounded-lg border border-border/50 p-12 text-center">
      <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
      <h3 className="font-heading text-lg font-semibold mb-2">
        Aucun événement ne correspond à vos critères
      </h3>
      <p className="text-muted-foreground mb-6">
        Essayez de modifier vos filtres pour voir plus de résultats.
      </p>
      <Button onClick={onResetFilters} variant="outline">
        Réinitialiser les filtres
      </Button>
    </div>
  );
}
```

#### Composant ErrorState

**Fichier :** `components/events/error-state.tsx`

**Spécifications :**
- Affiche un message d'erreur quand le chargement des événements échoue
- Icône d'alerte (AlertCircle de lucide-react)
- Message : "Une erreur est survenue lors du chargement des événements"
- Bouton "Réessayer" qui relance le chargement
- Optionnel : Lien vers le support si l'erreur persiste

**Exemple d'implémentation :**
```tsx
import { AlertCircle, RefreshCw } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  onRetry: () => void;
  error?: Error | null;
}

export function ErrorState({ onRetry, error }: ErrorStateProps) {
  return (
    <Alert variant="destructive" className="mt-8">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Erreur de chargement</AlertTitle>
      <AlertDescription className="mt-2">
        <p className="mb-4">
          Impossible de charger les événements pour le moment.
          {error && (
            <span className="block text-sm mt-1 text-muted-foreground">
              {error.message}
            </span>
          )}
        </p>
        <Button onClick={onRetry} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Réessayer
        </Button>
      </AlertDescription>
    </Alert>
  );
}
```

#### Fonction de Tri

**Fichier :** `lib/utils/sort-events.ts`

**Spécifications :**
- Fonction `sortEvents(events: Event[])` qui trie les événements
- Respecte les règles : futurs croissant, passés décroissant
- Gère les cas mixtes (futurs + passés)
- Performance optimisée avec comparaison de timestamps

**Exemple d'implémentation :**
```typescript
import type { Event } from "@/lib/supabase/types";

export function sortEvents(events: Event[]): Event[] {
  const now = new Date();
  
  return [...events].sort((a, b) => {
    const dateA = new Date(a.event_date);
    const dateB = new Date(b.event_date);
    const isFutureA = dateA >= now;
    const isFutureB = dateB >= now;
    
    // Si les deux sont futurs : tri croissant
    if (isFutureA && isFutureB) {
      return dateA.getTime() - dateB.getTime();
    }
    
    // Si les deux sont passés : tri décroissant
    if (!isFutureA && !isFutureB) {
      return dateB.getTime() - dateA.getTime();
    }
    
    // Futurs avant passés
    return isFutureA ? -1 : 1;
  });
}
```

---

## ✅ Checklist de Lancement

### Avant le Développement

- [ ] Valider le format des données (ajout du champ `city`)
- [ ] Définir les couleurs et styles des filtres actifs
- [ ] Préparer les données de test avec tous les cas (multi-villes, types, périodes)

### Avant le Déploiement en Staging

- [ ] Tester tous les filtres individuellement
- [ ] Tester toutes les combinaisons de filtres
- [ ] Tester la persistance URL (partage, back/forward)
- [ ] Valider le responsive (mobile, tablet, desktop)
- [ ] Tester l'accessibilité (clavier, screen reader)

### Avant le Déploiement en Production

- [ ] Tests end-to-end complets
- [ ] Audit performance (Lighthouse)
- [ ] Audit accessibilité (WCAG AA)
- [ ] Tests cross-browser (Chrome, Firefox, Safari, Edge)
- [ ] Validation SEO (meta tags, structured data)
- [ ] Documentation utilisateur rédigée

---

## 📞 Questions Ouvertes

### À Clarifier avec l'Équipe

1. **Champ `city`** : Comment dériver `city` depuis `location` ? Mapping manuel ou automatique ?
2. **Villes supplémentaires** : Faut-il prévoir d'autres villes que Lille, Paris, Lyon, Remote ?
3. **Design des filtres** : Sidebar fixe ou rétractable sur desktop ?
4. **Compteurs** : Afficher les compteurs même à 0 (grisé) ou masquer l'option ?
5. **Performance** : À partir de combien d'événements passer au filtrage côté serveur ?

### Décisions en Attente

- [ ] Priorité de l'ajout du champ `city` dans la base de données
- [ ] Format exact des URLs (codes courts vs noms complets)
- [ ] Comportement du filtre "Toutes les villes" (décoche-t-il les autres ?)

---

## 🎉 Conclusion

Ce PRD définit un **système de filtres complet et performant** pour la page événements, permettant aux utilisateurs de trouver rapidement les événements pertinents selon leurs critères.

**Points clés :**
- 🏙️ Filtre multi-sélection par ville
- 📋 Filtre single-sélection par type
- 📅 Filtre single-sélection par période
- 🔗 Persistance des filtres dans l'URL
- ⚡ Performance optimisée
- ♿ Accessibilité garantie

**Prochaines étapes :**
1. Validation de ce PRD avec l'équipe
2. Clarification des questions ouvertes
3. Estimation des efforts (story points)
4. Début de l'implémentation

---

**Version** : 1.0  
**Dernière mise à jour** : 16 janvier 2026  
**Statut** : Ready for Review 🚀
