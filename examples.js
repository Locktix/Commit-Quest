// Commit Quest - Exemples d'Extensions
// Ce fichier montre comment étendre le jeu avec de nouvelles fonctionnalités

// ============================================================================
// EXEMPLE 1: Ajouter de Nouvelles Scènes Narratives
// ============================================================================

const nouvellesScenes = {
    // Scène de code review
    'code-review': {
        text: "Sarah, votre lead développeur, vous demande de faire une code review. Vous examinez le code de votre collègue et trouvez plusieurs problèmes potentiels.",
        choices: [
            {
                text: "Signaler tous les problèmes trouvés",
                action: () => {
                    game.makeCommit('docs: Code review - Signaler tous les problèmes', 'review');
                    game.loadScene('code-review-detailed');
                }
            },
            {
                text: "Faire des suggestions constructives",
                action: () => {
                    game.makeCommit('docs: Code review - Suggestions constructives', 'review');
                    game.addExperience(15);
                    game.loadScene('code-review-constructive');
                }
            },
            {
                text: "Demander des clarifications",
                action: () => {
                    game.makeCommit('docs: Code review - Demander des clarifications', 'review');
                    game.loadScene('code-review-questions');
                }
            }
        ]
    },

    // Scène de déploiement
    'deployment': {
        text: "Il est temps de déployer votre fonctionnalité en production. Le processus de CI/CD est en cours, mais vous devez surveiller le déploiement.",
        choices: [
            {
                text: "Surveiller les logs en temps réel",
                action: () => {
                    game.startCombat('deployment-issues');
                }
            },
            {
                text: "Exécuter les tests de régression",
                action: () => {
                    game.makeCommit('test: Tests de régression avant déploiement', 'deployment');
                    game.loadScene('regression-tests');
                }
            },
            {
                text: "Préparer le rollback",
                action: () => {
                    game.makeCommit('chore: Préparation du plan de rollback', 'deployment');
                    game.loadScene('rollback-preparation');
                }
            }
        ]
    },

    // Scène de pair programming
    'pair-programming': {
        text: "Votre collègue Alex vous propose une session de pair programming pour résoudre un problème complexe. C'est l'occasion d'apprendre de nouvelles techniques.",
        choices: [
            {
                text: "Accepter et prendre le rôle de driver",
                action: () => {
                    game.addExperience(20);
                    game.loadScene('pair-programming-driver');
                }
            },
            {
                text: "Accepter et prendre le rôle de navigator",
                action: () => {
                    game.addExperience(25);
                    game.loadScene('pair-programming-navigator');
                }
            },
            {
                text: "Proposer une approche différente",
                action: () => {
                    game.makeCommit('feat: Nouvelle approche pour le pair programming', 'collaboration');
                    game.loadScene('pair-programming-alternative');
                }
            }
        ]
    }
};

// ============================================================================
// EXEMPLE 2: Ajouter de Nouveaux Types d'Ennemis
// ============================================================================

const nouveauxEnnemis = {
    // Bug de sécurité
    'security-bug': {
        name: 'Vulnérabilité de Sécurité',
        health: 120,
        maxHealth: 120,
        attacks: [
            {
                name: 'Injection SQL',
                damage: 30,
                description: 'Tentative d\'injection SQL malveillante'
            },
            {
                name: 'XSS Attack',
                damage: 25,
                description: 'Attaque Cross-Site Scripting'
            },
            {
                name: 'CSRF Token Missing',
                damage: 35,
                description: 'Token CSRF manquant'
            }
        ],
        rewards: {
            experience: 60,
            items: ['security-patch', 'authentication-fix']
        },
        special: 'Vulnérable aux attaques de validation'
    },

    // Bug de performance
    'performance-bug': {
        name: 'Problème de Performance',
        health: 80,
        maxHealth: 80,
        attacks: [
            {
                name: 'Memory Leak',
                damage: 20,
                description: 'Fuite de mémoire progressive'
            },
            {
                name: 'N+1 Query',
                damage: 25,
                description: 'Requête N+1 inefficace'
            },
            {
                name: 'Blocking Operation',
                damage: 30,
                description: 'Opération bloquante'
            }
        ],
        rewards: {
            experience: 45,
            items: ['performance-optimization', 'cache-implementation']
        },
        special: 'Résistant aux attaques de base'
    },

    // Bug de compatibilité
    'compatibility-bug': {
        name: 'Problème de Compatibilité',
        health: 100,
        maxHealth: 100,
        attacks: [
            {
                name: 'Browser Incompatibility',
                damage: 20,
                description: 'Incompatibilité navigateur'
            },
            {
                name: 'API Version Mismatch',
                damage: 30,
                description: 'Incompatibilité de version API'
            },
            {
                name: 'Dependency Conflict',
                damage: 25,
                description: 'Conflit de dépendances'
            }
        ],
        rewards: {
            experience: 50,
            items: ['polyfill-implementation', 'version-adapter']
        },
        special: 'Change de résistance selon l\'environnement'
    }
};

// ============================================================================
// EXEMPLE 3: Ajouter de Nouveaux Objets d'Inventaire
// ============================================================================

const nouveauxObjets = {
    // Outils de développement
    'debugger-tool': {
        name: 'Outil de Debug Avancé',
        description: 'Outil de débogage professionnel avec breakpoints intelligents',
        type: 'tool',
        effect: { logic: 15, creativity: 5 },
        rarity: 'rare',
        stackable: false
    },

    'code-linter': {
        name: 'Linter de Code',
        description: 'Analyse statique du code pour détecter les problèmes',
        type: 'tool',
        effect: { logic: 10, resistance: 10 },
        rarity: 'common',
        stackable: false
    },

    'test-framework': {
        name: 'Framework de Tests',
        description: 'Framework complet pour les tests unitaires et d\'intégration',
        type: 'framework',
        effect: { logic: 20 },
        rarity: 'epic',
        stackable: false
    },

    // Consommables
    'coffee-boost': {
        name: 'Café Énergisant',
        description: 'Café qui booste temporairement vos compétences',
        type: 'consumable',
        effect: { creativity: 10, logic: 10, resistance: 5 },
        duration: 300, // 5 minutes
        rarity: 'common',
        stackable: true
    },

    'energy-drink': {
        name: 'Boisson Énergisante',
        description: 'Boisson qui restaure la santé et booste la résistance',
        type: 'consumable',
        effect: { health: 50, resistance: 15 },
        duration: 180, // 3 minutes
        rarity: 'uncommon',
        stackable: true
    },

    // Équipement
    'mechanical-keyboard': {
        name: 'Clavier Mécanique',
        description: 'Clavier mécanique qui améliore la vitesse de codage',
        type: 'equipment',
        slot: 'accessory',
        effect: { creativity: 10, logic: 5 },
        rarity: 'rare',
        stackable: false
    },

    'ergonomic-mouse': {
        name: 'Souris Ergonomique',
        description: 'Souris ergonomique qui réduit la fatigue',
        type: 'equipment',
        slot: 'accessory',
        effect: { resistance: 15 },
        rarity: 'uncommon',
        stackable: false
    }
};

// ============================================================================
// EXEMPLE 4: Système de Quêtes Avancé
// ============================================================================

class QuestSystem {
    constructor() {
        this.quests = {
            'daily-quests': [
                {
                    id: 'daily-commit',
                    title: 'Commit Quotidien',
                    description: 'Faites au moins 3 commits aujourd\'hui',
                    type: 'daily',
                    requirements: { commits: 3 },
                    rewards: { experience: 25, items: ['coffee-boost'] },
                    progress: 0,
                    completed: false
                },
                {
                    id: 'daily-bug-fix',
                    title: 'Chasseur de Bugs',
                    description: 'Corrigez 2 bugs aujourd\'hui',
                    type: 'daily',
                    requirements: { bugsFixed: 2 },
                    rewards: { experience: 30, items: ['debugger-tool'] },
                    progress: 0,
                    completed: false
                }
            ],
            'weekly-quests': [
                {
                    id: 'weekly-feature',
                    title: 'Développeur de Fonctionnalités',
                    description: 'Implémentez une nouvelle fonctionnalité complète',
                    type: 'weekly',
                    requirements: { featuresCompleted: 1 },
                    rewards: { experience: 100, items: ['test-framework'] },
                    progress: 0,
                    completed: false
                }
            ],
            'achievement-quests': [
                {
                    id: 'git-master',
                    title: 'Maître Git',
                    description: 'Effectuez 100 commits',
                    type: 'achievement',
                    requirements: { totalCommits: 100 },
                    rewards: { experience: 200, items: ['git-master-badge'] },
                    progress: 0,
                    completed: false
                }
            ]
        };
    }

    updateQuestProgress(questType, progress) {
        const quest = this.quests[questType];
        if (quest && !quest.completed) {
            quest.progress += progress;
            
            if (quest.progress >= quest.requirements[Object.keys(quest.requirements)[0]]) {
                this.completeQuest(quest);
            }
        }
    }

    completeQuest(quest) {
        quest.completed = true;
        game.addExperience(quest.rewards.experience);
        quest.rewards.items.forEach(itemId => {
            game.addItemToInventory(itemId);
        });
        game.showNotification(`Quête accomplie : ${quest.title}`, 'success');
    }
}

// ============================================================================
// EXEMPLE 5: Système de Compétences Avancé
// ============================================================================

class SkillSystem {
    constructor() {
        this.skills = {
            'frontend': {
                name: 'Développement Frontend',
                level: 1,
                experience: 0,
                maxExperience: 100,
                abilities: [
                    {
                        name: 'CSS Mastery',
                        description: 'Maîtrise avancée du CSS',
                        unlocked: true,
                        effect: { creativity: 10 }
                    },
                    {
                        name: 'JavaScript ES6+',
                        description: 'Connaissance des fonctionnalités ES6+',
                        unlocked: false,
                        effect: { logic: 15 }
                    },
                    {
                        name: 'React Framework',
                        description: 'Maîtrise du framework React',
                        unlocked: false,
                        effect: { creativity: 20, logic: 10 }
                    }
                ]
            },
            'backend': {
                name: 'Développement Backend',
                level: 1,
                experience: 0,
                maxExperience: 100,
                abilities: [
                    {
                        name: 'Database Design',
                        description: 'Conception de bases de données',
                        unlocked: true,
                        effect: { logic: 15 }
                    },
                    {
                        name: 'API Development',
                        description: 'Développement d\'APIs RESTful',
                        unlocked: false,
                        effect: { logic: 20 }
                    },
                    {
                        name: 'Microservices',
                        description: 'Architecture microservices',
                        unlocked: false,
                        effect: { logic: 25, resistance: 10 }
                    }
                ]
            },
            'devops': {
                name: 'DevOps',
                level: 1,
                experience: 0,
                maxExperience: 100,
                abilities: [
                    {
                        name: 'CI/CD Pipeline',
                        description: 'Pipeline d\'intégration continue',
                        unlocked: false,
                        effect: { resistance: 15 }
                    },
                    {
                        name: 'Container Orchestration',
                        description: 'Orchestration de conteneurs',
                        unlocked: false,
                        effect: { logic: 15, resistance: 15 }
                    }
                ]
            }
        };
    }

    addSkillExperience(skillName, experience) {
        const skill = this.skills[skillName];
        if (skill) {
            skill.experience += experience;
            
            while (skill.experience >= skill.maxExperience) {
                skill.experience -= skill.maxExperience;
                skill.level++;
                skill.maxExperience = Math.floor(skill.maxExperience * 1.5);
                
                // Débloquer de nouvelles capacités
                this.checkSkillUnlocks(skillName);
                
                game.showNotification(`Compétence ${skill.name} niveau ${skill.level} !`, 'success');
            }
        }
    }

    checkSkillUnlocks(skillName) {
        const skill = this.skills[skillName];
        skill.abilities.forEach(ability => {
            if (!ability.unlocked && skill.level >= this.getAbilityUnlockLevel(ability.name)) {
                ability.unlocked = true;
                game.showNotification(`Nouvelle capacité débloquée : ${ability.name}`, 'info');
            }
        });
    }

    getAbilityUnlockLevel(abilityName) {
        const unlockLevels = {
            'JavaScript ES6+': 3,
            'React Framework': 5,
            'API Development': 3,
            'Microservices': 6,
            'CI/CD Pipeline': 4,
            'Container Orchestration': 7
        };
        return unlockLevels[abilityName] || 1;
    }
}

// ============================================================================
// EXEMPLE 6: Système de Branches Git Avancé
// ============================================================================

class BranchSystem {
    constructor() {
        this.branches = {
            'main': {
                name: 'main',
                description: 'Branche principale du projet',
                protected: true,
                requiresReview: true,
                commits: []
            },
            'develop': {
                name: 'develop',
                description: 'Branche de développement',
                protected: false,
                requiresReview: false,
                commits: []
            },
            'feature/user-auth': {
                name: 'feature/user-auth',
                description: 'Fonctionnalité d\'authentification utilisateur',
                protected: false,
                requiresReview: true,
                commits: [],
                parent: 'develop'
            },
            'bugfix/critical-fix': {
                name: 'bugfix/critical-fix',
                description: 'Correction de bug critique',
                protected: false,
                requiresReview: true,
                commits: [],
                parent: 'main'
            }
        };
        
        this.currentBranch = 'develop';
    }

    createBranch(branchName, description, parentBranch = 'develop') {
        const newBranch = {
            name: branchName,
            description: description,
            protected: false,
            requiresReview: true,
            commits: [],
            parent: parentBranch
        };
        
        this.branches[branchName] = newBranch;
        game.showNotification(`Nouvelle branche créée : ${branchName}`, 'success');
    }

    switchBranch(branchName) {
        if (this.branches[branchName]) {
            this.currentBranch = branchName;
            game.gameState.currentBranch = branchName;
            game.showNotification(`Basculement vers la branche : ${branchName}`, 'info');
        }
    }

    mergeBranch(sourceBranch, targetBranch) {
        const source = this.branches[sourceBranch];
        const target = this.branches[targetBranch];
        
        if (source && target && !target.protected) {
            // Simuler un merge
            const mergeCommit = {
                id: game.generateCommitHash(),
                message: `Merge branch '${sourceBranch}' into ${targetBranch}`,
                type: 'merge',
                timestamp: new Date().toISOString(),
                branch: targetBranch
            };
            
            target.commits.push(mergeCommit);
            game.gameState.commits.push(mergeCommit);
            
            game.showNotification(`Branche ${sourceBranch} fusionnée dans ${targetBranch}`, 'success');
            return true;
        } else if (target.protected) {
            game.showNotification('Impossible de fusionner dans une branche protégée', 'warning');
            return false;
        }
    }

    createPullRequest(sourceBranch, targetBranch, title, description) {
        const pr = {
            id: Math.random().toString(36).substring(2, 8).toUpperCase(),
            title: title,
            description: description,
            sourceBranch: sourceBranch,
            targetBranch: targetBranch,
            status: 'open',
            reviews: [],
            createdAt: new Date().toISOString()
        };
        
        game.showNotification(`Pull Request créée : ${title}`, 'success');
        return pr;
    }
}

// ============================================================================
// EXEMPLE 7: Intégration des Nouvelles Fonctionnalités
// ============================================================================

// Fonction pour intégrer toutes les nouvelles fonctionnalités
function integrateExtensions() {
    // Ajouter les nouvelles scènes
    Object.assign(game.scenes, nouvellesScenes);
    
    // Ajouter les nouveaux ennemis
    Object.assign(game.enemies, nouveauxEnnemis);
    
    // Ajouter les nouveaux objets
    Object.assign(game.items, nouveauxObjets);
    
    // Initialiser les nouveaux systèmes
    game.questSystem = new QuestSystem();
    game.skillSystem = new SkillSystem();
    game.branchSystem = new BranchSystem();
    
    // Ajouter de nouvelles méthodes au jeu
    game.addExperience = function(amount) {
        this.gameState.player.experience += amount;
        this.checkLevelUp();
    };
    
    game.addSkillExperience = function(skillName, amount) {
        this.skillSystem.addSkillExperience(skillName, amount);
    };
    
    game.createBranch = function(branchName, description, parentBranch) {
        this.branchSystem.createBranch(branchName, description, parentBranch);
    };
    
    game.switchBranch = function(branchName) {
        this.branchSystem.switchBranch(branchName);
    };
    
    console.log('Extensions intégrées avec succès !');
}

// Exemple d'utilisation
// integrateExtensions();

// ============================================================================
// EXEMPLE 8: Système de Notifications Avancé
// ============================================================================

class NotificationSystem {
    constructor() {
        this.notifications = [];
        this.maxNotifications = 5;
    }

    showNotification(message, type = 'info', duration = 5000, actions = []) {
        const notification = {
            id: Date.now(),
            message: message,
            type: type,
            duration: duration,
            actions: actions,
            timestamp: new Date()
        };
        
        this.notifications.push(notification);
        this.displayNotification(notification);
        
        setTimeout(() => {
            this.removeNotification(notification.id);
        }, duration);
    }

    displayNotification(notification) {
        const container = document.getElementById('notification-container');
        const notificationElement = document.createElement('div');
        notificationElement.className = `notification ${notification.type}`;
        notificationElement.id = `notification-${notification.id}`;
        
        let content = `<div class="notification-content">${notification.message}</div>`;
        
        if (notification.actions.length > 0) {
            content += '<div class="notification-actions">';
            notification.actions.forEach(action => {
                content += `<button class="notification-btn" onclick="${action.handler}">${action.text}</button>`;
            });
            content += '</div>';
        }
        
        notificationElement.innerHTML = content;
        container.appendChild(notificationElement);
        
        // Animation d'entrée
        setTimeout(() => {
            notificationElement.classList.add('show');
        }, 100);
    }

    removeNotification(id) {
        const notification = document.getElementById(`notification-${id}`);
        if (notification) {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
        
        this.notifications = this.notifications.filter(n => n.id !== id);
    }

    showAchievement(title, description) {
        this.showNotification(
            `🏆 Succès débloqué : ${title}`,
            'achievement',
            8000,
            [
                {
                    text: 'Voir',
                    handler: 'game.showAchievements()'
                }
            ]
        );
    }
}

// ============================================================================
// EXEMPLE 9: Système de Sauvegarde Avancé
// ============================================================================

class AdvancedSaveSystem {
    constructor() {
        this.saveSlots = 3;
        this.autoSaveInterval = 30000; // 30 secondes
        this.initAutoSave();
    }

    saveGame(slot = 'auto') {
        const saveData = {
            gameState: game.gameState,
            timestamp: new Date().toISOString(),
            version: '1.0.0',
            playTime: this.calculatePlayTime()
        };
        
        try {
            localStorage.setItem(`commitQuest_save_${slot}`, JSON.stringify(saveData));
            game.showNotification(`Partie sauvegardée (Slot ${slot})`, 'success');
            return true;
        } catch (error) {
            console.error('Erreur de sauvegarde:', error);
            game.showNotification('Erreur lors de la sauvegarde', 'error');
            return false;
        }
    }

    loadGame(slot = 'auto') {
        try {
            const saveData = localStorage.getItem(`commitQuest_save_${slot}`);
            if (saveData) {
                const data = JSON.parse(saveData);
                game.gameState = data.gameState;
                game.showNotification(`Partie chargée (Slot ${slot})`, 'success');
                return true;
            } else {
                game.showNotification('Aucune sauvegarde trouvée', 'warning');
                return false;
            }
        } catch (error) {
            console.error('Erreur de chargement:', error);
            game.showNotification('Erreur lors du chargement', 'error');
            return false;
        }
    }

    deleteSave(slot) {
        try {
            localStorage.removeItem(`commitQuest_save_${slot}`);
            game.showNotification(`Sauvegarde supprimée (Slot ${slot})`, 'info');
            return true;
        } catch (error) {
            console.error('Erreur de suppression:', error);
            return false;
        }
    }

    getSaveInfo(slot) {
        try {
            const saveData = localStorage.getItem(`commitQuest_save_${slot}`);
            if (saveData) {
                const data = JSON.parse(saveData);
                return {
                    timestamp: data.timestamp,
                    playerName: data.gameState.player?.name,
                    level: data.gameState.player?.level,
                    playTime: data.playTime
                };
            }
        } catch (error) {
            console.error('Erreur lors de la lecture des infos de sauvegarde:', error);
        }
        return null;
    }

    initAutoSave() {
        setInterval(() => {
            if (game.gameState.settings.autoSave && game.gameState.player) {
                this.saveGame('auto');
            }
        }, this.autoSaveInterval);
    }

    calculatePlayTime() {
        // Calculer le temps de jeu total
        return Date.now() - (game.gameState.startTime || Date.now());
    }

    exportSave() {
        const saveData = {
            gameState: game.gameState,
            timestamp: new Date().toISOString(),
            version: '1.0.0'
        };
        
        const dataStr = JSON.stringify(saveData);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `commit-quest-save-${Date.now()}.json`;
        link.click();
        
        game.showNotification('Sauvegarde exportée', 'success');
    }

    importSave(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const saveData = JSON.parse(e.target.result);
                game.gameState = saveData.gameState;
                game.showNotification('Sauvegarde importée avec succès', 'success');
                game.updateUI();
            } catch (error) {
                console.error('Erreur lors de l\'import:', error);
                game.showNotification('Erreur lors de l\'import de la sauvegarde', 'error');
            }
        };
        reader.readAsText(file);
    }
}

// ============================================================================
// EXEMPLE 10: Système de Statistiques et Analytics
// ============================================================================

class StatisticsSystem {
    constructor() {
        this.stats = {
            totalPlayTime: 0,
            totalCommits: 0,
            totalBugsFixed: 0,
            totalExperience: 0,
            favoriteClass: null,
            mostUsedAbility: null,
            achievements: [],
            sessionHistory: []
        };
        
        this.startSession();
    }

    startSession() {
        this.sessionStart = Date.now();
    }

    endSession() {
        const sessionDuration = Date.now() - this.sessionStart;
        this.stats.totalPlayTime += sessionDuration;
        
        this.stats.sessionHistory.push({
            start: new Date(this.sessionStart).toISOString(),
            duration: sessionDuration,
            commits: game.gameState.commits.length,
            level: game.gameState.player?.level || 1
        });
    }

    recordCommit(commit) {
        this.stats.totalCommits++;
        
        // Analyser le type de commit le plus utilisé
        const commitTypes = this.stats.commitsByType || {};
        commitTypes[commit.type] = (commitTypes[commit.type] || 0) + 1;
        this.stats.commitsByType = commitTypes;
    }

    recordBugFix() {
        this.stats.totalBugsFixed++;
    }

    recordExperience(amount) {
        this.stats.totalExperience += amount;
    }

    recordAchievement(achievement) {
        this.stats.achievements.push({
            id: achievement.id,
            title: achievement.title,
            unlockedAt: new Date().toISOString()
        });
    }

    getStatistics() {
        return {
            ...this.stats,
            averageSessionTime: this.calculateAverageSessionTime(),
            commitsPerSession: this.calculateCommitsPerSession(),
            levelProgress: this.calculateLevelProgress(),
            favoriteCommitType: this.getFavoriteCommitType()
        };
    }

    calculateAverageSessionTime() {
        if (this.stats.sessionHistory.length === 0) return 0;
        
        const totalTime = this.stats.sessionHistory.reduce((sum, session) => {
            return sum + session.duration;
        }, 0);
        
        return Math.round(totalTime / this.stats.sessionHistory.length / 1000 / 60); // en minutes
    }

    calculateCommitsPerSession() {
        if (this.stats.sessionHistory.length === 0) return 0;
        
        const totalCommits = this.stats.sessionHistory.reduce((sum, session) => {
            return sum + session.commits;
        }, 0);
        
        return Math.round(totalCommits / this.stats.sessionHistory.length);
    }

    calculateLevelProgress() {
        if (!game.gameState.player) return 0;
        
        const player = game.gameState.player;
        const progressInCurrentLevel = player.experience / player.maxExperience;
        return Math.round((player.level - 1 + progressInCurrentLevel) * 100) / 100;
    }

    getFavoriteCommitType() {
        if (!this.stats.commitsByType) return 'Aucun';
        
        const types = Object.entries(this.stats.commitsByType);
        if (types.length === 0) return 'Aucun';
        
        return types.reduce((a, b) => a[1] > b[1] ? a : b)[0];
    }

    exportStatistics() {
        const statsData = this.getStatistics();
        const dataStr = JSON.stringify(statsData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `commit-quest-stats-${Date.now()}.json`;
        link.click();
    }
}

// ============================================================================
// UTILISATION DES EXEMPLES
// ============================================================================

// Pour utiliser ces exemples, décommentez les lignes suivantes :

/*
// 1. Intégrer toutes les extensions
integrateExtensions();

// 2. Initialiser les systèmes avancés
game.notificationSystem = new NotificationSystem();
game.saveSystem = new AdvancedSaveSystem();
game.statisticsSystem = new StatisticsSystem();

// 3. Exemple d'utilisation des nouvelles fonctionnalités
game.notificationSystem.showAchievement('Premier Commit', 'Vous avez fait votre premier commit !');

game.skillSystem.addSkillExperience('frontend', 25);

game.branchSystem.createBranch('feature/new-ui', 'Nouvelle interface utilisateur');

game.questSystem.updateQuestProgress('daily-commit', 1);

// 4. Exporter les statistiques
game.statisticsSystem.exportStatistics();
*/

console.log('Exemples d\'extensions chargés. Décommentez les lignes d\'utilisation pour les activer.'); 