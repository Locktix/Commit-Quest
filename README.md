# Commit Quest - RPG Narratif

Un RPG narratif unique qui transforme les concepts Git en aventure interactive ! Incarnez un développeur junior qui doit "commiter" ses actions pour progresser dans l'histoire et pousser sa progression vers la branche principale.

## 🎮 Concept

**Commit Quest** est un jeu narratif qui adapte les mécaniques Git au storytelling :
- Chaque action importante génère un "commit" avec un message descriptif
- Les choix narratifs créent des "branches" alternatives
- Le "push" représente la validation des objectifs
- Les "pull requests" sont des défis spéciaux
- Les "merge conflicts" sont des situations de choix difficiles

## ✨ Fonctionnalités

### 🎯 Système Narratif
- Histoire interactive avec choix multiples impactant l'intrigue
- Scènes dynamiques avec animations de texte
- Système de branches narratives
- Objectifs progressifs et succès débloquables

### ⚔️ Système de Combat
- Combats au tour par tour contre des "bugs"
- Actions basées sur les compétences de développement
- Système de dégâts et de récompenses
- Différents types d'ennemis avec comportements uniques

### 🎒 Système d'Inventaire
- Objets collectables avec effets sur le gameplay
- Patches, fixes et outils de développement
- Gestion d'équipement
- Utilisation d'objets pour améliorer les stats

### 📊 Système de Progression
- Niveaux et expérience
- Compétences améliorables (Créativité, Logique, Résistance)
- Classes de personnage (Frontend, Backend, Full-Stack)
- Déblocage de contenu progressif

### 💾 Sauvegarde
- Sauvegarde automatique via localStorage
- Système de paramètres personnalisables
- Historique des commits
- Journal de progression

## 🚀 Installation et Déploiement

### Prérequis
- Navigateur web moderne (Chrome, Firefox, Safari, Edge)
- Serveur web local ou hébergement statique

### Installation Locale

1. **Cloner le repository**
   ```bash
   git clone https://github.com/votre-username/commit-quest.git
   cd commit-quest
   ```

2. **Ouvrir le jeu**
   - Double-cliquez sur `index.html`
   - Ou utilisez un serveur local :
   ```bash
   # Avec Python
   python -m http.server 8000
   
   # Avec Node.js
   npx serve .
   
   # Avec PHP
   php -S localhost:8000
   ```

3. **Accéder au jeu**
   - Ouvrez votre navigateur
   - Allez à `http://localhost:8000`

### Déploiement sur GitHub Pages

1. **Créer un repository GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Commit Quest RPG"
   git branch -M main
   git remote add origin https://github.com/votre-username/commit-quest.git
   git push -u origin main
   ```

2. **Activer GitHub Pages**
   - Allez dans les paramètres du repository
   - Section "Pages"
   - Source : "Deploy from a branch"
   - Branch : "main"
   - Folder : "/ (root)"

3. **Accéder au jeu**
   - Votre jeu sera disponible à : `https://votre-username.github.io/commit-quest`

## 🎮 Guide de Jeu

### Premiers Pas
1. **Création de personnage** : Choisissez votre classe de développeur
2. **Exploration** : Découvrez l'univers du développement
3. **Premier commit** : Faites votre premier commit pour commencer l'aventure
4. **Combat** : Affrontez les bugs et résolvez les problèmes

### Classes de Personnage

#### 🎨 Développeur Frontend
- **Spécialité** : Interface utilisateur et design
- **Stats** : Créativité élevée, Logique moyenne, Résistance faible
- **Avantages** : Excellente créativité, sens du design
- **Défis** : Moins de résistance aux bugs complexes

#### ⚙️ Développeur Backend
- **Spécialité** : Logique serveur et base de données
- **Stats** : Logique très élevée, Résistance élevée, Créativité faible
- **Avantages** : Excellente logique, forte résistance
- **Défis** : Moins de créativité pour les solutions innovantes

#### 🔄 Développeur Full-Stack
- **Spécialité** : Polyvalence et équilibre
- **Stats** : Équilibrées dans tous les domaines
- **Avantages** : Polyvalent, adaptable
- **Défis** : Pas de spécialisation forte

### Mécaniques de Combat

#### Actions Disponibles
- **Attaque de Code** : Attaque de base (20 dmg)
- **Debug Avancé** : Attaque puissante (35 dmg, coût 15)
- **Refactoring** : Attaque équilibrée (25 dmg, coût 10)
- **Test Unitaires** : Attaque fiable (30 dmg, coût 20)

#### Types d'Ennemis
- **Bugs de Validation** : Ennemis faibles mais nombreux
- **Bugs de Connexion** : Ennemis résistants
- **Bugs de Performance** : Ennemis rapides
- **Bugs Critiques** : Boss puissants

### Système de Commits

#### Types de Commits
- **feat** : Nouvelles fonctionnalités
- **fix** : Corrections de bugs
- **docs** : Documentation
- **style** : Formatage du code
- **refactor** : Refactoring
- **test** : Tests
- **chore** : Tâches de maintenance

#### Messages de Commit
- Soyez descriptif et précis
- Utilisez le présent de l'indicatif
- Limitez la première ligne à 50 caractères
- Ajoutez des détails si nécessaire

## 🛠️ Personnalisation

### Ajouter de Nouvelles Scènes

1. **Modifiez `game.js`**
   ```javascript
   this.scenes = {
       // ... scènes existantes
       'nouvelle-scene': {
           text: "Description de la nouvelle scène...",
           choices: [
               {
                   text: "Choix 1",
                   action: () => this.loadScene('autre-scene')
               },
               {
                   text: "Choix 2",
                   action: () => this.startCombat('nouvel-ennemi')
               }
           ]
       }
   };
   ```

2. **Ajoutez des références dans les autres scènes**
   ```javascript
   {
       text: "Choix qui mène à la nouvelle scène",
       action: () => this.loadScene('nouvelle-scene')
   }
   ```

### Ajouter de Nouveaux Ennemis

1. **Définissez l'ennemi dans `startCombat()`**
   ```javascript
   const enemies = {
       // ... ennemis existants
       'nouvel-ennemi': {
           name: 'Nom de l\'Ennemi',
           health: 100,
           maxHealth: 100,
           attacks: [
               {
                   name: 'Attaque 1',
                   damage: 25,
                   description: 'Description de l\'attaque'
               }
           ],
           rewards: {
               experience: 50,
               items: ['nouvel-objet']
           }
       }
   };
   ```

### Ajouter de Nouveaux Objets

1. **Définissez l'objet dans `addItemToInventory()`**
   ```javascript
   const items = {
       // ... objets existants
       'nouvel-objet': {
           name: 'Nom de l\'Objet',
           description: 'Description de l\'objet',
           type: 'type',
           effect: { stat: value }
       }
   };
   ```

### Personnaliser le Style

1. **Modifiez les variables CSS dans `styles.css`**
   ```css
   :root {
       --primary-color: #votre-couleur;
       --accent-color: #votre-couleur-accent;
       /* ... autres variables */
   }
   ```

2. **Ajoutez de nouvelles animations**
   ```css
   @keyframes votreAnimation {
       /* Définition de l'animation */
   }
   ```

## 📁 Structure du Projet

```
commit-quest/
├── index.html          # Structure principale du jeu
├── styles.css          # Styles et animations
├── game.js             # Logique du jeu
├── README.md           # Documentation
└── assets/             # Ressources (optionnel)
    ├── images/
    ├── sounds/
    └── icons/
```

## 🔧 Configuration Avancée

### Paramètres de Performance
- Ajustez la vitesse de texte dans les paramètres
- Désactivez les animations si nécessaire
- Optimisez pour les appareils mobiles

### Sauvegarde Personnalisée
- Modifiez le système de sauvegarde dans `saveGame()`
- Ajoutez des slots de sauvegarde multiples
- Implémentez un système de cloud save

### Extensions Possibles
- Système de multi-joueurs
- Mode histoire coopératif
- Système de mods
- Intégration avec de vrais repositories Git

## 🐛 Dépannage

### Problèmes Courants

#### Le jeu ne se charge pas
- Vérifiez que tous les fichiers sont présents
- Ouvrez la console du navigateur pour les erreurs
- Assurez-vous d'utiliser un serveur web local

#### Les sauvegardes ne fonctionnent pas
- Vérifiez que localStorage est activé
- Effacez le cache du navigateur
- Vérifiez les permissions du navigateur

#### Problèmes d'affichage
- Vérifiez la compatibilité du navigateur
- Désactivez les extensions qui pourraient interférer
- Testez en mode navigation privée

### Support
- Créez une issue sur GitHub pour les bugs
- Consultez la documentation pour les questions
- Rejoignez la communauté pour l'entraide

## 📄 Licence

Ce projet est sous licence MIT. Vous êtes libre de l'utiliser, le modifier et le distribuer selon les termes de la licence.

## 🤝 Contribution

Les contributions sont les bienvenues ! Voici comment contribuer :

1. Fork le projet
2. Créez une branche pour votre fonctionnalité
3. Committez vos changements
4. Poussez vers la branche
5. Ouvrez une Pull Request

### Guidelines de Contribution
- Suivez les conventions de code existantes
- Ajoutez des tests pour les nouvelles fonctionnalités
- Documentez les changements
- Respectez le style narratif du jeu

## 🎉 Remerciements

- Inspiré par les concepts Git et le développement logiciel
- Créé avec HTML5, CSS3 et JavaScript vanilla
- Icônes fournies par Font Awesome
- Polices par Google Fonts

---

**Bonne aventure dans le monde du développement !** 🚀

*N'oubliez pas : chaque commit avance l'histoire, et chaque push vous rapproche de la branche principale !* 