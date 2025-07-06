// Commit Quest - Configuration
// Fichier de configuration pour personnaliser le jeu

const GameConfig = {
    // ============================================================================
    // CONFIGURATION GÉNÉRALE
    // ============================================================================
    
    // Informations du jeu
    gameInfo: {
        name: 'Commit Quest',
        version: '1.0.0',
        author: 'Votre Nom',
        description: 'RPG narratif basé sur les concepts Git'
    },

    // Paramètres de performance
    performance: {
        textSpeed: 50, // Vitesse de frappe du texte (ms)
        animationDuration: 300, // Durée des animations (ms)
        autoSaveInterval: 30000, // Intervalle de sauvegarde automatique (ms)
        maxNotifications: 5, // Nombre maximum de notifications simultanées
        enableParticles: true, // Activer les effets de particules
        enableSound: true, // Activer les sons
        enableMusic: true // Activer la musique
    },

    // ============================================================================
    // CONFIGURATION DES CLASSES DE PERSONNAGE
    // ============================================================================
    
    characterClasses: {
        frontend: {
            name: 'Développeur Frontend',
            description: 'Spécialiste de l\'interface utilisateur',
            icon: 'fas fa-palette',
            stats: {
                creativity: 90,
                logic: 70,
                resistance: 60
            },
            abilities: [
                'CSS Mastery',
                'Responsive Design',
                'UI/UX Sense'
            ],
            startingItems: ['css-framework', 'design-tool'],
            color: '#3182ce'
        },
        
        backend: {
            name: 'Développeur Backend',
            description: 'Maître de la logique serveur',
            icon: 'fas fa-server',
            stats: {
                creativity: 50,
                logic: 95,
                resistance: 80
            },
            abilities: [
                'Database Design',
                'API Development',
                'Server Management'
            ],
            startingItems: ['database-tool', 'api-framework'],
            color: '#38a169'
        },
        
        fullstack: {
            name: 'Développeur Full-Stack',
            description: 'Polyvalent et équilibré',
            icon: 'fas fa-layer-group',
            stats: {
                creativity: 75,
                logic: 85,
                resistance: 75
            },
            abilities: [
                'Full Stack Development',
                'System Architecture',
                'DevOps Knowledge'
            ],
            startingItems: ['fullstack-framework', 'deployment-tool'],
            color: '#d69e2e'
        }
    },

    // ============================================================================
    // CONFIGURATION DES ENNEMIS
    // ============================================================================
    
    enemies: {
        'email-validation-bug': {
            name: 'Bug de Validation Email',
            description: 'Le regex ne fonctionne plus correctement',
            icon: 'fas fa-bug',
            health: 50,
            maxHealth: 50,
            level: 1,
            experience: 25,
            attacks: [
                {
                    name: 'Regex Corrompu',
                    damage: 15,
                    description: 'Le regex ne fonctionne plus correctement',
                    cooldown: 0
                },
                {
                    name: 'Exception Non Gérée',
                    damage: 20,
                    description: 'Une exception crash l\'application',
                    cooldown: 2
                }
            ],
            rewards: {
                experience: 25,
                items: ['patch-email-validation'],
                gold: 10
            },
            weaknesses: ['validation', 'testing'],
            resistances: ['frontend'],
            color: '#e53e3e'
        },
        
        'database-connection-bug': {
            name: 'Bug de Connexion Base de Données',
            description: 'La connexion à la base de données échoue',
            icon: 'fas fa-database',
            health: 80,
            maxHealth: 80,
            level: 2,
            experience: 40,
            attacks: [
                {
                    name: 'Timeout de Connexion',
                    damage: 25,
                    description: 'La connexion expire',
                    cooldown: 0
                },
                {
                    name: 'Pool de Connexions Épuisé',
                    damage: 30,
                    description: 'Plus de connexions disponibles',
                    cooldown: 3
                }
            ],
            rewards: {
                experience: 40,
                items: ['connection-pool-fix'],
                gold: 20
            },
            weaknesses: ['backend', 'optimization'],
            resistances: ['frontend'],
            color: '#805ad5'
        },
        
        'security-vulnerability': {
            name: 'Vulnérabilité de Sécurité',
            description: 'Une faille de sécurité a été découverte',
            icon: 'fas fa-shield-alt',
            health: 120,
            maxHealth: 120,
            level: 3,
            experience: 60,
            attacks: [
                {
                    name: 'Injection SQL',
                    damage: 30,
                    description: 'Tentative d\'injection SQL malveillante',
                    cooldown: 1
                },
                {
                    name: 'XSS Attack',
                    damage: 25,
                    description: 'Attaque Cross-Site Scripting',
                    cooldown: 2
                }
            ],
            rewards: {
                experience: 60,
                items: ['security-patch', 'authentication-fix'],
                gold: 35
            },
            weaknesses: ['security', 'validation'],
            resistances: ['frontend'],
            color: '#dd6b20'
        }
    },

    // ============================================================================
    // CONFIGURATION DES OBJETS
    // ============================================================================
    
    items: {
        'patch-email-validation': {
            name: 'Patch de Validation Email',
            description: 'Corrige les problèmes de validation des adresses email',
            icon: 'fas fa-envelope',
            type: 'patch',
            rarity: 'common',
            effect: {
                logic: 5,
                resistance: 3
            },
            stackable: false,
            sellPrice: 15,
            buyPrice: 30
        },
        
        'connection-pool-fix': {
            name: 'Fix Pool de Connexions',
            description: 'Optimise la gestion des connexions à la base de données',
            icon: 'fas fa-network-wired',
            type: 'fix',
            rarity: 'uncommon',
            effect: {
                resistance: 10,
                logic: 3
            },
            stackable: false,
            sellPrice: 25,
            buyPrice: 50
        },
        
        'security-patch': {
            name: 'Patch de Sécurité',
            description: 'Corrige les vulnérabilités de sécurité',
            icon: 'fas fa-shield-alt',
            type: 'patch',
            rarity: 'rare',
            effect: {
                resistance: 15,
                logic: 8
            },
            stackable: false,
            sellPrice: 40,
            buyPrice: 80
        },
        
        'coffee-boost': {
            name: 'Café Énergisant',
            description: 'Café qui booste temporairement vos compétences',
            icon: 'fas fa-coffee',
            type: 'consumable',
            rarity: 'common',
            effect: {
                creativity: 10,
                logic: 10,
                resistance: 5
            },
            duration: 300, // 5 minutes
            stackable: true,
            sellPrice: 5,
            buyPrice: 10
        },
        
        'debugger-tool': {
            name: 'Outil de Debug Avancé',
            description: 'Outil de débogage professionnel avec breakpoints intelligents',
            icon: 'fas fa-bug',
            type: 'tool',
            rarity: 'rare',
            effect: {
                logic: 15,
                creativity: 5
            },
            stackable: false,
            sellPrice: 60,
            buyPrice: 120
        }
    },

    // ============================================================================
    // CONFIGURATION DES SCÈNES
    // ============================================================================
    
    scenes: {
        intro: {
            id: 'intro',
            title: 'Bienvenue dans Commit Quest',
            text: "Bienvenue dans le monde du développement ! Vous êtes un développeur junior qui vient d'être embauché dans une startup innovante. Votre mission : contribuer au projet principal et pousser vos commits vers la branche principale.",
            background: 'office-background',
            music: 'ambient-office',
            choices: [
                {
                    id: 'explore-office',
                    text: "Explorer l'open space",
                    action: 'loadScene',
                    target: 'office-exploration',
                    requirements: {},
                    effects: { experience: 5 }
                },
                {
                    id: 'go-workstation',
                    text: "Aller directement à votre poste",
                    action: 'loadScene',
                    target: 'workstation',
                    requirements: {},
                    effects: { experience: 3 }
                },
                {
                    id: 'meet-lead',
                    text: "Parler au lead développeur",
                    action: 'loadScene',
                    target: 'meet-lead',
                    requirements: {},
                    effects: { experience: 8 }
                }
            ]
        },
        
        'office-exploration': {
            id: 'office-exploration',
            title: 'Exploration de l\'Open Space',
            text: "L'open space est animé ! Vous voyez des développeurs concentrés sur leurs écrans, des tableaux Kanban remplis de tickets, et une machine à café qui semble être le point central de l'équipe.",
            background: 'open-space-background',
            music: 'ambient-office',
            choices: [
                {
                    id: 'introduce-team',
                    text: "Se présenter à l'équipe",
                    action: 'loadScene',
                    target: 'team-introduction',
                    requirements: {},
                    effects: { experience: 10, social: 5 }
                },
                {
                    id: 'check-kanban',
                    text: "Observer le tableau Kanban",
                    action: 'loadScene',
                    target: 'kanban-board',
                    requirements: {},
                    effects: { experience: 7, logic: 3 }
                },
                {
                    id: 'coffee-machine',
                    text: "Aller à la machine à café",
                    action: 'loadScene',
                    target: 'coffee-machine',
                    requirements: {},
                    effects: { experience: 5, social: 3 }
                }
            ]
        }
    },

    // ============================================================================
    // CONFIGURATION DES OBJECTIFS
    // ============================================================================
    
    objectives: {
        'first-commit': {
            id: 'first-commit',
            title: 'Premier Commit',
            description: 'Faites votre premier commit pour commencer l\'aventure',
            type: 'story',
            category: 'tutorial',
            requirements: {
                commits: 1
            },
            rewards: {
                experience: 25,
                items: ['coffee-boost'],
                gold: 10
            },
            completed: false,
            order: 1
        },
        
        'reach-level-2': {
            id: 'reach-level-2',
            title: 'Niveau 2',
            description: 'Atteignez le niveau 2',
            type: 'progression',
            category: 'leveling',
            requirements: {
                level: 2
            },
            rewards: {
                experience: 50,
                items: ['debugger-tool'],
                gold: 25
            },
            completed: false,
            order: 2
        },
        
        'fix-5-bugs': {
            id: 'fix-5-bugs',
            title: 'Chasseur de Bugs',
            description: 'Corrigez 5 bugs',
            type: 'achievement',
            category: 'combat',
            requirements: {
                bugsFixed: 5
            },
            rewards: {
                experience: 100,
                items: ['security-patch'],
                gold: 50
            },
            completed: false,
            order: 3
        }
    },

    // ============================================================================
    // CONFIGURATION DES SUCCÈS
    // ============================================================================
    
    achievements: {
        'first-commit': {
            id: 'first-commit',
            title: 'Premier Pas',
            description: 'Effectuez votre premier commit',
            icon: 'fas fa-code-branch',
            category: 'git',
            points: 10,
            secret: false
        },
        
        'git-master': {
            id: 'git-master',
            title: 'Maître Git',
            description: 'Effectuez 100 commits',
            icon: 'fas fa-crown',
            category: 'git',
            points: 50,
            secret: false
        },
        
        'bug-hunter': {
            id: 'bug-hunter',
            title: 'Chasseur de Bugs',
            description: 'Corrigez 50 bugs',
            icon: 'fas fa-bug',
            category: 'combat',
            points: 30,
            secret: false
        },
        
        'security-expert': {
            id: 'security-expert',
            title: 'Expert en Sécurité',
            description: 'Corrigez 10 vulnérabilités de sécurité',
            icon: 'fas fa-shield-alt',
            category: 'security',
            points: 40,
            secret: true
        }
    },

    // ============================================================================
    // CONFIGURATION DES SONS ET MUSIQUES
    // ============================================================================
    
    audio: {
        music: {
            'ambient-office': {
                name: 'Ambiance Bureau',
                file: 'assets/music/ambient-office.mp3',
                volume: 0.3,
                loop: true
            },
            'combat-theme': {
                name: 'Thème de Combat',
                file: 'assets/music/combat-theme.mp3',
                volume: 0.4,
                loop: true
            },
            'victory-theme': {
                name: 'Thème de Victoire',
                file: 'assets/music/victory-theme.mp3',
                volume: 0.5,
                loop: false
            }
        },
        
        sounds: {
            'commit-sound': {
                name: 'Son de Commit',
                file: 'assets/sounds/commit.mp3',
                volume: 0.6
            },
            'level-up': {
                name: 'Niveau Supérieur',
                file: 'assets/sounds/level-up.mp3',
                volume: 0.7
            },
            'item-pickup': {
                name: 'Objet Ramassé',
                file: 'assets/sounds/item-pickup.mp3',
                volume: 0.5
            },
            'button-click': {
                name: 'Clic de Bouton',
                file: 'assets/sounds/button-click.mp3',
                volume: 0.4
            }
        }
    },

    // ============================================================================
    // CONFIGURATION DES THÈMES VISUELS
    // ============================================================================
    
    themes: {
        default: {
            name: 'Thème Par Défaut',
            colors: {
                primary: '#2d3748',
                secondary: '#4a5568',
                accent: '#3182ce',
                success: '#38a169',
                warning: '#d69e2e',
                danger: '#e53e3e',
                background: '#1a202c',
                text: '#ffffff',
                textSecondary: '#a0aec0'
            },
            fonts: {
                primary: 'Orbitron',
                secondary: 'Roboto'
            }
        },
        
        dark: {
            name: 'Thème Sombre',
            colors: {
                primary: '#1a202c',
                secondary: '#2d3748',
                accent: '#4299e1',
                success: '#48bb78',
                warning: '#ed8936',
                danger: '#f56565',
                background: '#0f1419',
                text: '#e2e8f0',
                textSecondary: '#718096'
            },
            fonts: {
                primary: 'Orbitron',
                secondary: 'Roboto'
            }
        },
        
        light: {
            name: 'Thème Clair',
            colors: {
                primary: '#f7fafc',
                secondary: '#e2e8f0',
                accent: '#3182ce',
                success: '#38a169',
                warning: '#d69e2e',
                danger: '#e53e3e',
                background: '#ffffff',
                text: '#2d3748',
                textSecondary: '#4a5568'
            },
            fonts: {
                primary: 'Orbitron',
                secondary: 'Roboto'
            }
        }
    },

    // ============================================================================
    // CONFIGURATION DES LANGUES
    // ============================================================================
    
    languages: {
        fr: {
            name: 'Français',
            code: 'fr',
            flag: '🇫🇷',
            translations: {
                'new-game': 'Nouvelle Partie',
                'continue': 'Continuer',
                'settings': 'Paramètres',
                'inventory': 'Inventaire',
                'journal': 'Journal',
                'combat': 'Combat',
                'victory': 'Victoire',
                'defeat': 'Défaite',
                'level-up': 'Niveau Supérieur',
                'experience-gained': 'Expérience gagnée',
                'item-obtained': 'Objet obtenu',
                'commit-made': 'Commit effectué',
                'objective-completed': 'Objectif accompli',
                'achievement-unlocked': 'Succès débloqué'
            }
        },
        
        en: {
            name: 'English',
            code: 'en',
            flag: '🇺🇸',
            translations: {
                'new-game': 'New Game',
                'continue': 'Continue',
                'settings': 'Settings',
                'inventory': 'Inventory',
                'journal': 'Journal',
                'combat': 'Combat',
                'victory': 'Victory',
                'defeat': 'Defeat',
                'level-up': 'Level Up',
                'experience-gained': 'Experience gained',
                'item-obtained': 'Item obtained',
                'commit-made': 'Commit made',
                'objective-completed': 'Objective completed',
                'achievement-unlocked': 'Achievement unlocked'
            }
        }
    },

    // ============================================================================
    // CONFIGURATION DES DÉFIS SPÉCIAUX
    // ============================================================================
    
    challenges: {
        'speed-coding': {
            id: 'speed-coding',
            name: 'Code Rapide',
            description: 'Effectuez 10 commits en moins de 5 minutes',
            type: 'speed',
            requirements: {
                commits: 10,
                timeLimit: 300 // 5 minutes
            },
            rewards: {
                experience: 100,
                items: ['speed-boost'],
                gold: 50
            },
            difficulty: 'hard'
        },
        
        'bug-master': {
            id: 'bug-master',
            name: 'Maître des Bugs',
            description: 'Corrigez 20 bugs sans perdre de vie',
            type: 'survival',
            requirements: {
                bugsFixed: 20,
                noDamage: true
            },
            rewards: {
                experience: 150,
                items: ['bug-master-badge'],
                gold: 75
            },
            difficulty: 'expert'
        }
    },

    // ============================================================================
    // CONFIGURATION DES ÉVÉNEMENTS SPÉCIAUX
    // ============================================================================
    
    events: {
        'hackathon': {
            id: 'hackathon',
            name: 'Hackathon',
            description: 'Un hackathon est organisé ! Développez une fonctionnalité innovante.',
            duration: 3600, // 1 heure
            rewards: {
                experience: 200,
                items: ['hackathon-trophy'],
                gold: 100
            },
            requirements: {
                level: 3
            },
            frequency: 'weekly'
        },
        
        'code-review-session': {
            id: 'code-review-session',
            name: 'Session de Code Review',
            description: 'Participez à une session de code review avec l\'équipe.',
            duration: 1800, // 30 minutes
            rewards: {
                experience: 75,
                items: ['review-badge'],
                gold: 25
            },
            requirements: {
                level: 2
            },
            frequency: 'daily'
        }
    }
};

// Export de la configuration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GameConfig;
} else {
    window.GameConfig = GameConfig;
} 