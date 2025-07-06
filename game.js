// Commit Quest - RPG Narratif
// Système de jeu principal avec mécaniques Git adaptées

class CommitQuest {
    constructor() {
        this.gameState = {
            player: null,
            currentScene: null,
            inventory: [],
            objectives: [],
            commits: [],
            achievements: [],
            settings: {
                musicVolume: 50,
                sfxVolume: 70,
                textSpeed: 3,
                autoSave: true
            }
        };
        
        this.scenes = {};
        this.currentCombat = null;
        this.isTyping = false;
        
        this.init();
    }

    init() {
        // Désactive tous les écrans au démarrage
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Charger une sauvegarde existante si elle existe
        this.loadGame();
        
        // Affiche uniquement l'écran de chargement puis le menu principal
        this.showScreen('loading-screen');
        setTimeout(() => {
            this.hideScreen('loading-screen');
            this.showScreen('main-menu');
        }, 3000);
        
        // Initialiser les événements
        this.setupEventListeners();
        this.initializeScenes();
        this.showScreen('main-menu');
    }

    setupEventListeners() {
        // Menu principal
        document.getElementById('new-game-btn').addEventListener('click', () => {
            this.showScreen('character-creation');
        });

        document.getElementById('continue-btn').addEventListener('click', () => {
            if (this.gameState.player) {
                this.startGame();
            } else {
                this.showNotification('Aucune partie sauvegardée trouvée', 'warning');
            }
        });

        document.getElementById('settings-btn').addEventListener('click', () => {
            this.showScreen('settings-screen');
            this.loadSettings();
        });

        // Création de personnage
        document.querySelectorAll('.class-card').forEach(card => {
            card.addEventListener('click', () => {
                this.selectCharacterClass(card.dataset.class);
            });
        });

        document.getElementById('player-name').addEventListener('input', (e) => {
            this.validateCharacterCreation();
        });

        document.getElementById('start-game-btn').addEventListener('click', () => {
            this.createCharacter();
        });

        // Contrôles du jeu
        document.getElementById('inventory-btn').addEventListener('click', () => {
            this.showInventory();
        });

        document.getElementById('journal-btn').addEventListener('click', () => {
            this.showJournal();
        });

        document.getElementById('menu-btn').addEventListener('click', () => {
            this.showMainMenu();
        });

        // Fermeture des écrans
        document.getElementById('close-inventory-btn').addEventListener('click', () => {
            this.hideScreen('inventory-screen');
            this.showScreen('game-screen');
        });

        document.getElementById('close-journal-btn').addEventListener('click', () => {
            this.hideScreen('journal-screen');
            this.showScreen('game-screen');
        });

        // Paramètres
        document.getElementById('save-settings-btn').addEventListener('click', () => {
            this.saveSettings();
        });

        document.getElementById('reset-settings-btn').addEventListener('click', () => {
            this.resetSettings();
        });

        document.getElementById('back-to-menu-btn').addEventListener('click', () => {
            this.showScreen('main-menu');
        });

        // Journal tabs
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.switchJournalTab(btn.dataset.tab);
            });
        });

        // Modales
        document.getElementById('close-modal-btn').addEventListener('click', () => {
            this.hideModal();
        });

        document.getElementById('modal-overlay').addEventListener('click', (e) => {
            if (e.target.id === 'modal-overlay') {
                this.hideModal();
            }
        });
    }

    // Gestion des écrans
    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
    }

    hideScreen(screenId) {
        document.getElementById(screenId).classList.remove('active');
    }

    // Gestion des modales
    showModal(title, content) {
        document.getElementById('modal-title').textContent = title;
        document.getElementById('modal-content').innerHTML = content;
        document.getElementById('modal-overlay').classList.add('active');
    }

    hideModal() {
        document.getElementById('modal-overlay').classList.remove('active');
    }

    // Notifications
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.getElementById('notification-container').appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }

    // Création de personnage
    selectCharacterClass(className) {
        document.querySelectorAll('.class-card').forEach(card => {
            card.classList.remove('selected');
        });
        document.querySelector(`[data-class="${className}"]`).classList.add('selected');
        this.validateCharacterCreation();
    }

    validateCharacterCreation() {
        const selectedClass = document.querySelector('.class-card.selected');
        const playerName = document.getElementById('player-name').value.trim();
        const startBtn = document.getElementById('start-game-btn');
        
        startBtn.disabled = !selectedClass || playerName.length < 2;
    }

    createCharacter() {
        const selectedClass = document.querySelector('.class-card.selected');
        const playerName = document.getElementById('player-name').value.trim();
        
        const classData = {
            frontend: {
                name: 'Développeur Frontend',
                stats: { creativity: 90, logic: 70, resistance: 60 },
                abilities: ['CSS Mastery', 'Responsive Design', 'UI/UX Sense']
            },
            backend: {
                name: 'Développeur Backend',
                stats: { creativity: 50, logic: 95, resistance: 80 },
                abilities: ['Database Design', 'API Development', 'Server Management']
            },
            fullstack: {
                name: 'Développeur Full-Stack',
                stats: { creativity: 75, logic: 85, resistance: 75 },
                abilities: ['Full Stack Development', 'System Architecture', 'DevOps Knowledge']
            }
        };

        const selectedClassData = classData[selectedClass.dataset.class];
        
        // Réinitialiser complètement le jeu pour une nouvelle partie
        this.gameState = {
            player: {
                name: playerName,
                class: selectedClassData.name,
                level: 1,
                experience: 0,
                maxExperience: 100,
                health: 100,
                maxHealth: 100,
                stats: selectedClassData.stats,
                abilities: selectedClassData.abilities,
                inventory: [],
                equipment: {
                    weapon: null,
                    armor: null,
                    accessory: null
                }
            },
            currentScene: null, // Réinitialiser la scène actuelle
            inventory: [],
            objectives: [
                {
                    id: 'first-commit',
                    title: 'Premier Commit',
                    description: 'Faites votre premier commit pour commencer l\'aventure',
                    completed: false,
                    type: 'story'
                }
            ],
            commits: [],
            achievements: [],
            settings: {
                musicVolume: 50,
                sfxVolume: 70,
                textSpeed: 3,
                autoSave: true
            }
        };

        this.startGame();
    }

    startGame() {
        this.showScreen('game-screen');
        this.updateUI();
        
        // Si c'est une nouvelle partie ou si aucune scène n'est chargée, commencer par l'intro
        if (!this.gameState.currentScene) {
            this.loadScene('intro');
        } else {
            // Recharger la scène actuelle
            this.loadScene(this.gameState.currentScene);
        }
        
        this.saveGame();
    }

    // Système de scènes
    initializeScenes() {
        this.scenes = {
            intro: {
                text: "Bienvenue dans le monde du développement ! Vous êtes un développeur junior qui vient d'être embauché dans une startup innovante. Votre mission : contribuer au projet principal et pousser vos commits vers la branche principale.",
                choices: [
                    {
                        text: "Explorer l'open space",
                        action: () => this.loadScene('office-exploration')
                    },
                    {
                        text: "Aller directement à votre poste",
                        action: () => this.loadScene('workstation')
                    },
                    {
                        text: "Parler au lead développeur",
                        action: () => this.loadScene('meet-lead')
                    }
                ]
            },
            'office-exploration': {
                text: "L'open space est animé ! Vous voyez des développeurs concentrés sur leurs écrans, des tableaux Kanban remplis de tickets, et une machine à café qui semble être le point central de l'équipe.",
                choices: [
                    {
                        text: "Se présenter à l'équipe",
                        action: () => this.loadScene('team-introduction')
                    },
                    {
                        text: "Observer le tableau Kanban",
                        action: () => this.loadScene('kanban-board')
                    },
                    {
                        text: "Aller à la machine à café",
                        action: () => this.loadScene('coffee-machine')
                    }
                ]
            },
            'workstation': {
                text: "Votre poste de travail vous attend. Un écran double, un clavier mécanique, et un mug vide. Votre ordinateur affiche déjà le repository du projet principal.",
                choices: [
                    {
                        text: "Cloner le repository",
                        action: () => this.loadScene('clone-repo')
                    },
                    {
                        text: "Lire la documentation",
                        action: () => this.loadScene('read-docs')
                    },
                    {
                        text: "Vérifier les branches existantes",
                        action: () => this.loadScene('check-branches')
                    }
                ]
            },
            'meet-lead': {
                text: "Le lead développeur, Sarah, vous accueille chaleureusement. 'Bienvenue dans l'équipe ! Nous avons besoin d'aide pour résoudre quelques bugs critiques.'",
                choices: [
                    {
                        text: "Accepter la mission",
                        action: () => this.loadScene('accept-mission')
                    },
                    {
                        text: "Demander plus de détails",
                        action: () => this.loadScene('ask-details')
                    },
                    {
                        text: "Proposer de commencer par des tâches simples",
                        action: () => this.loadScene('simple-tasks')
                    }
                ]
            },
            'clone-repo': {
                text: "Vous clonez le repository avec succès. Le projet semble complexe mais bien structuré. Vous remarquez plusieurs branches : main, develop, feature/user-auth, et bugfix/critical-fix.",
                choices: [
                    {
                        text: "Créer une nouvelle branche pour votre travail",
                        action: () => this.loadScene('create-branch')
                    },
                    {
                        text: "Basculer sur la branche develop",
                        action: () => this.loadScene('switch-develop')
                    },
                    {
                        text: "Examiner les derniers commits",
                        action: () => this.loadScene('examine-commits')
                    }
                ]
            },
            'create-branch': {
                text: "Vous créez une nouvelle branche 'feature/new-developer-setup'. C'est votre espace de travail personnel où vous pouvez expérimenter sans affecter le code principal.",
                choices: [
                    {
                        text: "Faire votre premier commit",
                        action: () => this.makeFirstCommit()
                    },
                    {
                        text: "Explorer la structure du projet",
                        action: () => this.loadScene('explore-structure')
                    },
                    {
                        text: "Chercher des bugs à corriger",
                        action: () => this.loadScene('find-bugs')
                    }
                ]
            },
            'find-bugs': {
                text: "En explorant le code, vous trouvez un bug dans la fonction de validation des emails. Le code ne vérifie pas correctement les domaines d'email.",
                choices: [
                    {
                        text: "Corriger le bug immédiatement",
                        action: () => this.startCombat('email-validation-bug')
                    },
                    {
                        text: "Créer un ticket pour le bug",
                        action: () => this.loadScene('create-ticket')
                    },
                    {
                        text: "Demander conseil à un collègue",
                        action: () => this.loadScene('ask-colleague')
                    }
                ]
            }
        };
    }

    loadScene(sceneId) {
        const scene = this.scenes[sceneId];
        if (!scene) {
            console.error(`Scène ${sceneId} non trouvée`);
            return;
        }

        this.gameState.currentScene = sceneId;
        this.displayScene(scene);
        this.saveGame();
    }

    displayScene(scene) {
        const storyText = document.getElementById('story-text');
        const choicesContainer = document.getElementById('story-choices');
        
        // Animation de texte
        this.typeText(storyText, scene.text);
        
        // Affichage des choix
        choicesContainer.innerHTML = '';
        scene.choices.forEach((choice, index) => {
            const choiceBtn = document.createElement('button');
            choiceBtn.className = 'choice-btn';
            choiceBtn.textContent = choice.text;
            choiceBtn.addEventListener('click', () => {
                choice.action();
            });
            choicesContainer.appendChild(choiceBtn);
        });
    }

    typeText(element, text) {
        element.textContent = '';
        this.isTyping = true;
        let index = 0;
        
        const typeInterval = setInterval(() => {
            if (index < text.length) {
                element.textContent += text[index];
                index++;
            } else {
                clearInterval(typeInterval);
                this.isTyping = false;
            }
        }, 50);
    }

    // Système de combat
    startCombat(enemyType) {
        const enemies = {
            'email-validation-bug': {
                name: 'Bug de Validation Email',
                health: 50,
                maxHealth: 50,
                attacks: [
                    { name: 'Regex Corrompu', damage: 15, description: 'Le regex ne fonctionne plus correctement' },
                    { name: 'Exception Non Gérée', damage: 20, description: 'Une exception crash l\'application' }
                ],
                rewards: { experience: 25, items: ['patch-email-validation'] }
            },
            'database-connection-bug': {
                name: 'Bug de Connexion Base de Données',
                health: 80,
                maxHealth: 80,
                attacks: [
                    { name: 'Timeout de Connexion', damage: 25, description: 'La connexion expire' },
                    { name: 'Pool de Connexions Épuisé', damage: 30, description: 'Plus de connexions disponibles' }
                ],
                rewards: { experience: 40, items: ['connection-pool-fix'] }
            }
        };

        const enemy = enemies[enemyType];
        if (!enemy) return;

        this.currentCombat = {
            enemy: { ...enemy },
            turn: 'player',
            log: []
        };

        this.showScreen('combat-screen');
        this.updateCombatUI();
    }

    updateCombatUI() {
        if (!this.currentCombat) return;

        const { enemy } = this.currentCombat;
        const { player } = this.gameState;

        // Mise à jour des noms
        document.getElementById('combat-player-name').textContent = player.name;
        document.getElementById('combat-enemy-name').textContent = enemy.name;

        // Mise à jour des barres de vie
        const playerHpPercent = (player.health / player.maxHealth) * 100;
        const enemyHpPercent = (enemy.health / enemy.maxHealth) * 100;

        document.getElementById('combat-player-hp').style.width = `${playerHpPercent}%`;
        document.getElementById('combat-enemy-hp').style.width = `${enemyHpPercent}%`;

        // Mise à jour du log de combat
        this.updateCombatLog();

        // Mise à jour des actions
        this.updateCombatActions();
    }

    updateCombatLog() {
        const logContainer = document.getElementById('combat-log');
        logContainer.innerHTML = '';

        this.currentCombat.log.forEach(message => {
            const logEntry = document.createElement('div');
            logEntry.className = `combat-message ${message.side}`;
            logEntry.textContent = message.text;
            logContainer.appendChild(logEntry);
        });

        logContainer.scrollTop = logContainer.scrollHeight;
    }

    updateCombatActions() {
        const actionsContainer = document.getElementById('combat-actions');
        actionsContainer.innerHTML = '';

        if (this.currentCombat.turn === 'player') {
            const actions = [
                { name: 'Attaque de Code', damage: 20, cost: 0 },
                { name: 'Debug Avancé', damage: 35, cost: 15 },
                { name: 'Refactoring', damage: 25, cost: 10 },
                { name: 'Test Unitaires', damage: 30, cost: 20 }
            ];

            actions.forEach(action => {
                const actionBtn = document.createElement('button');
                actionBtn.className = 'action-btn';
                actionBtn.textContent = `${action.name} (${action.damage} dmg)`;
                actionBtn.addEventListener('click', () => {
                    this.playerAttack(action);
                });
                actionsContainer.appendChild(actionBtn);
            });
        }
    }

    playerAttack(action) {
        const { enemy } = this.currentCombat;
        const { player } = this.gameState;

        // Calcul des dégâts
        const damage = action.damage + Math.floor(player.stats.logic / 10);
        enemy.health = Math.max(0, enemy.health - damage);

        // Message de combat
        this.currentCombat.log.push({
            side: 'player',
            text: `Vous utilisez ${action.name} et infligez ${damage} points de dégâts !`
        });

        // Vérifier si l'ennemi est vaincu
        if (enemy.health <= 0) {
            this.endCombat(true);
            return;
        }

        // Tour de l'ennemi
        this.currentCombat.turn = 'enemy';
        this.updateCombatUI();
        
        setTimeout(() => {
            this.enemyAttack();
        }, 1000);
    }

    enemyAttack() {
        const { enemy } = this.currentCombat;
        const { player } = this.gameState;

        // Choisir une attaque aléatoire
        const attack = enemy.attacks[Math.floor(Math.random() * enemy.attacks.length)];
        const damage = attack.damage;

        player.health = Math.max(0, player.health - damage);

        // Message de combat
        this.currentCombat.log.push({
            side: 'enemy',
            text: `${enemy.name} utilise ${attack.name} et vous inflige ${damage} points de dégâts !`
        });

        // Vérifier si le joueur est vaincu
        if (player.health <= 0) {
            this.endCombat(false);
            return;
        }

        // Retour au tour du joueur
        this.currentCombat.turn = 'player';
        this.updateCombatUI();
    }

    endCombat(victory) {
        if (victory) {
            const { enemy } = this.currentCombat;
            const { player } = this.gameState;

            // Récompenses
            player.experience += enemy.rewards.experience;
            enemy.rewards.items.forEach(itemId => {
                this.addItemToInventory(itemId);
            });

            // Message de victoire
            this.currentCombat.log.push({
                side: 'player',
                text: `Victoire ! Vous avez vaincu ${enemy.name} et gagné ${enemy.rewards.experience} points d'expérience !`
            });

            // Vérifier le niveau
            this.checkLevelUp();

            // Commit automatique
            this.makeCommit(`Fix: Correction du bug ${enemy.name}`, 'combat');

            setTimeout(() => {
                this.showScreen('game-screen');
                this.loadScene('post-combat');
            }, 2000);
        } else {
            // Défaite
            this.currentCombat.log.push({
                side: 'enemy',
                text: 'Vous avez été vaincu ! Votre code a besoin d\'être revu...'
            });

            setTimeout(() => {
                this.showScreen('game-screen');
                this.loadScene('defeat');
            }, 2000);
        }

        this.currentCombat = null;
    }

    // Système d'inventaire
    addItemToInventory(itemId) {
        const items = {
            'patch-email-validation': {
                name: 'Patch de Validation Email',
                description: 'Corrige les problèmes de validation des adresses email',
                type: 'patch',
                effect: { logic: 5 }
            },
            'connection-pool-fix': {
                name: 'Fix Pool de Connexions',
                description: 'Optimise la gestion des connexions à la base de données',
                type: 'fix',
                effect: { resistance: 10 }
            }
        };

        const item = items[itemId];
        if (item) {
            this.gameState.inventory.push({
                id: itemId,
                ...item
            });
            this.showNotification(`Objet obtenu : ${item.name}`, 'success');
        }
    }

    showInventory() {
        this.showScreen('inventory-screen');
        this.updateInventoryUI();
    }

    updateInventoryUI() {
        const grid = document.getElementById('inventory-grid');
        const info = document.getElementById('inventory-info');
        
        grid.innerHTML = '';
        
        // Créer les slots d'inventaire
        for (let i = 0; i < 20; i++) {
            const slot = document.createElement('div');
            slot.className = 'inventory-slot';
            
            if (i < this.gameState.inventory.length) {
                const item = this.gameState.inventory[i];
                slot.classList.add('filled');
                slot.innerHTML = `<i class="fas fa-code"></i>`;
                
                slot.addEventListener('click', () => {
                    this.showItemInfo(item, info);
                });
            }
            
            grid.appendChild(slot);
        }
    }

    showItemInfo(item, infoContainer) {
        infoContainer.innerHTML = `
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <p><strong>Type:</strong> ${item.type}</p>
            ${item.effect ? `<p><strong>Effet:</strong> +${Object.values(item.effect)[0]} ${Object.keys(item.effect)[0]}</p>` : ''}
            <button class="menu-btn primary" onclick="game.useItem('${item.id}')">Utiliser</button>
        `;
    }

    useItem(itemId) {
        const itemIndex = this.gameState.inventory.findIndex(item => item.id === itemId);
        if (itemIndex === -1) return;

        const item = this.gameState.inventory[itemIndex];
        const { player } = this.gameState;

        // Appliquer les effets
        if (item.effect) {
            Object.entries(item.effect).forEach(([stat, value]) => {
                player.stats[stat] += value;
            });
        }

        // Retirer l'objet de l'inventaire
        this.gameState.inventory.splice(itemIndex, 1);

        this.showNotification(`Objet utilisé : ${item.name}`, 'success');
        this.updateInventoryUI();
        this.updateUI();
        this.saveGame();
    }

    // Système de commits
    makeCommit(message, type = 'story') {
        const commit = {
            id: this.generateCommitHash(),
            message: message,
            type: type,
            timestamp: new Date().toISOString(),
            branch: this.gameState.currentBranch || 'feature/new-developer-setup'
        };

        this.gameState.commits.push(commit);
        this.updateCommitHistory();
        this.saveGame();

        // Vérifier les objectifs
        this.checkObjectives();
    }

    generateCommitHash() {
        return Math.random().toString(36).substring(2, 8).toUpperCase();
    }

    updateCommitHistory() {
        const commitList = document.getElementById('commit-list');
        const commitsTimeline = document.getElementById('commits-timeline');
        
        // Mise à jour de la liste dans le footer
        commitList.innerHTML = '';
        this.gameState.commits.slice(-3).forEach(commit => {
            const commitItem = document.createElement('div');
            commitItem.className = 'commit-item';
            commitItem.innerHTML = `
                <div class="commit-hash">#${commit.id}</div>
                <div class="commit-message">${commit.message}</div>
            `;
            commitList.appendChild(commitItem);
        });

        // Mise à jour de la timeline dans le journal
        if (commitsTimeline) {
            commitsTimeline.innerHTML = '';
            this.gameState.commits.forEach(commit => {
                const commitItem = document.createElement('div');
                commitItem.className = 'commit-item';
                commitItem.innerHTML = `
                    <div class="commit-hash">#${commit.id}</div>
                    <div class="commit-message">${commit.message}</div>
                    <div class="commit-meta">${new Date(commit.timestamp).toLocaleString()}</div>
                `;
                commitsTimeline.appendChild(commitItem);
            });
        }

        // Mise à jour du compteur
        document.getElementById('commit-count').textContent = this.gameState.commits.length;
    }

    makeFirstCommit() {
        this.makeCommit('feat: Initial setup and first commit', 'story');
        this.completeObjective('first-commit');
        this.loadScene('first-commit-success');
    }

    // Système d'objectifs
    checkObjectives() {
        this.gameState.objectives.forEach(objective => {
            if (!objective.completed) {
                switch (objective.id) {
                    case 'first-commit':
                        if (this.gameState.commits.length > 0) {
                            this.completeObjective('first-commit');
                        }
                        break;
                    case 'reach-level-2':
                        if (this.gameState.player.level >= 2) {
                            this.completeObjective('reach-level-2');
                        }
                        break;
                }
            }
        });
    }

    completeObjective(objectiveId) {
        const objective = this.gameState.objectives.find(obj => obj.id === objectiveId);
        if (objective && !objective.completed) {
            objective.completed = true;
            this.showNotification(`Objectif accompli : ${objective.title}`, 'success');
            this.updateObjectivesUI();
        }
    }

    updateObjectivesUI() {
        const objectivesList = document.getElementById('objectives-list');
        if (!objectivesList) return;

        objectivesList.innerHTML = '';
        this.gameState.objectives.forEach(objective => {
            const objectiveItem = document.createElement('div');
            objectiveItem.className = `objective-item ${objective.completed ? 'completed' : ''}`;
            objectiveItem.innerHTML = `
                <h4>${objective.title}</h4>
                <p>${objective.description}</p>
                ${objective.completed ? '<span class="completed-badge">✓ Terminé</span>' : ''}
            `;
            objectivesList.appendChild(objectiveItem);
        });
    }

    // Système de niveau
    checkLevelUp() {
        const { player } = this.gameState;
        
        while (player.experience >= player.maxExperience) {
            player.experience -= player.maxExperience;
            player.level++;
            player.maxExperience = Math.floor(player.maxExperience * 1.5);
            player.maxHealth += 20;
            player.health = player.maxHealth;
            
            // Amélioration des stats
            Object.keys(player.stats).forEach(stat => {
                player.stats[stat] += 5;
            });

            this.showNotification(`Niveau ${player.level} atteint !`, 'success');
            this.updateUI();
        }
    }

    // Journal
    showJournal() {
        this.showScreen('journal-screen');
        this.updateObjectivesUI();
        this.updateCommitHistory();
    }

    switchJournalTab(tabName) {
        // Mettre à jour les boutons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Mettre à jour les panels
        document.querySelectorAll('.journal-panel').forEach(panel => {
            panel.classList.remove('active');
        });
        document.getElementById(`${tabName}-panel`).classList.add('active');
    }

    // Paramètres
    loadSettings() {
        const settings = this.gameState.settings;
        document.getElementById('music-volume').value = settings.musicVolume;
        document.getElementById('sfx-volume').value = settings.sfxVolume;
        document.getElementById('text-speed').value = settings.textSpeed;
        document.getElementById('auto-save').checked = settings.autoSave;
    }

    saveSettings() {
        this.gameState.settings = {
            musicVolume: parseInt(document.getElementById('music-volume').value),
            sfxVolume: parseInt(document.getElementById('sfx-volume').value),
            textSpeed: parseInt(document.getElementById('text-speed').value),
            autoSave: document.getElementById('auto-save').checked
        };
        
        this.saveGame();
        this.showNotification('Paramètres sauvegardés', 'success');
    }

    resetSettings() {
        this.gameState.settings = {
            musicVolume: 50,
            sfxVolume: 70,
            textSpeed: 3,
            autoSave: true
        };
        
        this.loadSettings();
        this.saveGame();
        this.showNotification('Paramètres réinitialisés', 'info');
    }

    // Mise à jour de l'interface
    updateUI() {
        if (!this.gameState.player) return;

        const { player } = this.gameState;
        
        // Informations du joueur
        document.getElementById('player-name-display').textContent = player.name;
        document.getElementById('player-class-display').textContent = player.class;
        document.getElementById('player-hp').textContent = `${player.health}/${player.maxHealth}`;
        document.getElementById('player-level').textContent = player.level;
        document.getElementById('commit-count').textContent = this.gameState.commits.length;
    }

    // Sauvegarde et chargement
    saveGame() {
        if (this.gameState.settings.autoSave) {
            localStorage.setItem('commitQuestSave', JSON.stringify(this.gameState));
        }
    }

    loadGame() {
        const savedGame = localStorage.getItem('commitQuestSave');
        if (savedGame) {
            try {
                this.gameState = JSON.parse(savedGame);
            } catch (error) {
                console.error('Erreur lors du chargement de la sauvegarde:', error);
            }
        }
    }

    // Navigation
    showMainMenu() {
        this.showScreen('main-menu');
    }
}

// Initialisation du jeu
let game;
document.addEventListener('DOMContentLoaded', () => {
    game = new CommitQuest();
    localStorage.clear();
});

// Fonctions globales pour les événements
function useItem(itemId) {
    game.useItem(itemId);
}

 