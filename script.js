// Hangman Game - AI vs Player
// AI picks the word, player guesses

class HangmanGame {
    constructor() {
        // Category packs for a bigger, more varied word bank
        this.categories = {
            'Tech Stack': [
                'JAVASCRIPT', 'PYTHON', 'ALGORITHM', 'DATABASE', 'FRAMEWORK',
                'COMPILER', 'VARIABLE', 'INTERFACE', 'MICROSERVICE', 'CONTAINER',
                'KUBERNETES', 'ENCRYPTION', 'DEBUGGING', 'DEPLOYMENT',
                'AUTOMATION', 'CLOUDNATIVE', 'REFACTOR', 'PROTOCOL',
                'BACKEND', 'FRONTEND', 'WEBSOCKET', 'SANDBOX',
                'SERVERSIDE', 'OBSERVABILITY', 'SCALABILITY', 'INTEGRATION',
                'SYNCHRONIZE', 'AUTHENTICATION', 'CONFIGURATION'
            ],
            'Space': [
                'GALAXY', 'NEBULA', 'ORBIT', 'ASTEROID', 'COMET',
                'TELESCOPE', 'ROVER', 'SATELLITE', 'ASTRONAUT', 'PLANET',
                'COSMOS', 'SUPERNOVA', 'STARLIGHT', 'ECLIPSE',
                'METEORITE', 'LUNAR', 'GRAVITY', 'APOLLO',
                'EXOPLANET', 'CONSTELLATION', 'SINGULARITY', 'ORRERY'
            ],
            'Music': [
                'MELODY', 'CHORUS', 'HARMONY', 'PLAYLIST', 'RHYTHM',
                'SYNTHESIZER', 'MICROPHONE', 'VINYL', 'HEADPHONES', 'ORCHESTRA',
                'GUITAR', 'BASS', 'SONGWRITER', 'CONCERT',
                'AMPLIFIER', 'DRUMMER', 'KEYBOARD',
                'ARPEGGIO', 'MAESTRO', 'HARMONICA', 'SOUNDCHECK'
            ],
            'Food': [
                'TACOS', 'SUSHI', 'RISOTTO', 'PANCAKE', 'BURRITO',
                'CROISSANT', 'DUMPLING', 'LASAGNA', 'NOODLES', 'TEMPURA',
                'CUPCAKE', 'PIZZA', 'AVOCADO', 'TAHINI',
                'BLUEBERRY', 'SANDWICH', 'BAGUETTE',
                'GELATO', 'ESPRESSO', 'CASSEROLE', 'GNOCCHI'
            ],
            'Adventure': [
                'JUNGLE', 'CANYON', 'SUMMIT', 'GLACIER', 'TRAIL',
                'OASIS', 'VOLCANO', 'SAFARI', 'HORIZON', 'COMPASS',
                'RAPIDS', 'CAMPFIRE', 'BACKPACK', 'RIVERBANK',
                'OUTPOST', 'WILDERNESS',
                'RIDGELINE', 'LANDMARK', 'TRAILHEAD', 'NAVIGATION'
            ],
            'Sports': [
                'SOCCER', 'BASEBALL', 'MARATHON', 'SURFING', 'SNOWBOARD',
                'KARATE', 'CYCLING', 'CRICKET', 'VOLLEYBALL', 'SKATEBOARD',
                'RODEO', 'SWIMMING', 'TRIATHLON', 'CLIMBING',
                'LACROSSE', 'BADMINTON',
                'RUGBY', 'HURDLING', 'GYMNAST', 'PICKLEBALL'
            ],
            'Pop Culture': [
                'SUPERHERO', 'BLOCKBUSTER', 'PODCAST', 'ANIMATION', 'STREAMING',
                'COSPLAY', 'MEME', 'TRAILER', 'SPINOFF', 'SOUNDTRACK',
                'SITCOM', 'CAMEO', 'FANDOM', 'REBOOT',
                'MERCH', 'CINEMATIC',
                'FRANCHISE', 'CLIFFHANGER', 'SHOWRUNNER', 'CROSSOVER'
            ],
            'Nature': [
                'RAINBOW', 'MONSOON', 'HURRICANE', 'WILDFLOWER', 'SEQUOIA',
                'MEADOW', 'CRESCENT', 'LAGOON', 'WATERFALL', 'PINECONE',
                'FIREFLY', 'MOONLIGHT', 'SUNRISE', 'AURORA',
                'EVERGREEN', 'MOUNTAIN',
                'HEADLAND', 'ESTUARY', 'DRIFTWOOD', 'WATERSHED'
            ],
            'Brands': [
                'NINTENDO', 'LEGO', 'SPOTIFY', 'NIKE', 'ADIDAS',
                'SAMSUNG', 'TESLA', 'ORIGINALS', 'CANON', 'GOPRO',
                'AIRBNB', 'KODAK', 'HASBRO',
                'NETFLIX', 'OPENAI',
                'MICROSOFT', 'INTEL', 'PLAYSTATION', 'STARBUCKS'
            ],
            'Games': [
                'DUNGEON', 'QUEST', 'BOSSFIGHT', 'LEADERBOARD', 'CHECKPOINT',
                'POWERUP', 'SPEEDRUN', 'ARCADE', 'SANDBOX', 'ARENA',
                'PUZZLE', 'COOP', 'TURNBASED', 'SINGLEPLAYER',
                'MULTIPLAYER', 'LEVELUP',
                'RESPAWN', 'CUTSCENE', 'ACHIEVEMENT', 'BATTLEPASS'
            ],
            'Cities': [
                'BOSTON', 'MIAMI', 'DALLAS', 'AUSTIN', 'CHICAGO',
                'SEATTLE', 'DENVER', 'PHOENIX', 'ATLANTA', 'MADRID',
                'LONDON', 'PARIS', 'DUBLIN', 'OSLO',
                'TOKYO', 'BERLIN', 'SYDNEY', 'TORONTO'
            ],
            'Science': [
                'ELEMENT', 'MOLECULE', 'REACTION', 'QUANTUM', 'NEUTRON',
                'PROTON', 'ELECTRON', 'LABORATORY', 'MICROSCOPE', 'SOLVENT',
                'SPECTRUM', 'BIOLOGY',
                'ISOTOPE', 'CATALYST', 'GRADIENT', 'ENTROPY'
            ],
            'Wildlife': [
                'JAGUAR', 'DOLPHIN', 'PANTHER', 'PENGUIN', 'KOALA',
                'CHEETAH', 'RABBIT', 'GIRAFFE', 'FLAMINGO', 'LEOPARD',
                'WALRUS', 'BUFFALO',
                'MEERKAT', 'ARMADILLO', 'HEDGEHOG', 'WOODPECKER'
            ],
            'Fantasy': [
                'DRAGON', 'WIZARD', 'SPELLBOOK', 'KINGDOM', 'CASTLE',
                'ENCHANTED', 'PHOENIX', 'UNICORN', 'SORCERER', 'TREASURE',
                'MYTHICAL', 'QUESTING',
                'SPELLBOUND', 'RUNESTONE', 'DRUIDIC', 'BLOODLINE'
            ],
            'Ocean': [
                'TIDAL', 'SEAFLOOR', 'CORAL', 'ABYSSAL', 'SEAGULL',
                'CURRENT', 'WHIRLPOOL', 'SHIPWRECK', 'SEASHELL', 'DOLDRUMS',
                'BRINY', 'NAVIGATE', 'ANCHORAGE', 'LANTERNFISH'
            ],
            'History': [
                'EMPIRE', 'REVOLUTION', 'LEGION', 'DYNASTY', 'MONARCH',
                'ARTIFACT', 'RENAISSANCE', 'MANUSCRIPT', 'MUSEUM', 'CHRONICLE',
                'SETTLEMENT', 'CITADEL', 'CARAVAN', 'ARCHIVE'
            ],
            'Architecture': [
                'BLUEPRINT', 'FOUNDATION', 'CATHEDRAL', 'ARCHWAY', 'SKYLINE',
                'PAVILION', 'STRUCTURE', 'PLAZA', 'FACADE', 'BALCONY',
                'COLUMN', 'VILLA', 'MONUMENT', 'AMPHITHEATER'
            ]
        };

        this.currentCategory = '';
        this.currentWord = '';
        this.guessedLetters = new Set();
        this.wrongGuesses = 0;
        this.maxWrongGuesses = 6;
        this.score = 0;
        this.streak = 0;
        this.bestStreak = 0;
        this.roundsPlayed = 0;
        this.roundsWon = 0;
        this.difficulty = 'normal';
        this.difficultySettings = {
            easy: { minLength: 4, maxWrong: 6, scoreMultiplier: 1 },
            normal: { minLength: 5, maxWrong: 6, scoreMultiplier: 1.1 },
            hard: { minLength: 7, maxWrong: 6, scoreMultiplier: 1.25 }
        };
        this.treatCharge = 0;
        this.treatThreshold = 3;
        this.winBasePoints = 12;
        this.winUnusedBonus = 1;
        this.treatBonus = 2;
        this.wrongGuessPenalty = 1;
        this.losePenalty = 3;
        this.lastWinPoints = 0;
        this.gameOver = false;
        this.powerUpReady = false;
        this.powerGreyLetters = new Set();
        this.riskyRevealOdds = 0.5;
        this.greyOutCount = 5;

        // Body parts to display on wrong guesses
        this.bodyParts = ['head', 'body', 'left-arm', 'right-arm', 'left-leg', 'right-leg'];

        this.initializeGame();
        this.setupEventListeners();
    }

    initializeGame() {
        this.roundsPlayed += 1;
        this.applyDifficulty();

        // AI picks a random category and word
        const categoryNames = Object.keys(this.categories);
        this.currentCategory = categoryNames[Math.floor(Math.random() * categoryNames.length)];
        const words = this.getFilteredWords(this.currentCategory);
        this.currentWord = words[Math.floor(Math.random() * words.length)];
        this.guessedLetters.clear();
        this.powerGreyLetters.clear();
        this.wrongGuesses = 0;
        this.streak = 0;
        this.treatCharge = 0;
        this.powerUpReady = false;
        this.gameOver = false;

        this.createKeyboard();
        this.updateDisplay();
        this.updateCategory();
        this.updateBoosts();
        this.updateSessionStats();
        this.hideBodyParts();
        this.clearMessage();
    }

    createKeyboard() {
        const keyboard = document.getElementById('keyboard');
        keyboard.innerHTML = '';

        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        letters.forEach(letter => {
            const button = document.createElement('button');
            button.textContent = letter;
            button.className = 'key';
            button.dataset.letter = letter;
            button.addEventListener('click', () => this.handleGuess(letter));
            keyboard.appendChild(button);
        });
    }

    setupEventListeners() {
        // New game button
        document.getElementById('new-game-btn').addEventListener('click', () => {
            this.initializeGame();
        });

        const difficultySelect = document.getElementById('difficulty-select');
        if (difficultySelect) {
            difficultySelect.addEventListener('change', (event) => {
                this.difficulty = event.target.value;
                this.initializeGame();
            });
        }

        const powerGreyBtn = document.getElementById('power-grey-btn');
        if (powerGreyBtn) {
            powerGreyBtn.addEventListener('click', () => this.useGreyOutPowerUp());
        }

        const powerRiskBtn = document.getElementById('power-risk-btn');
        if (powerRiskBtn) {
            powerRiskBtn.addEventListener('click', () => this.useRiskyRevealPowerUp());
        }

        // Keyboard input
        document.addEventListener('keydown', (e) => {
            if (this.gameOver) return;
            
            const letter = e.key.toUpperCase();
            if (/^[A-Z]$/.test(letter) && !this.guessedLetters.has(letter)) {
                this.handleGuess(letter);
            }
        });
    }

    handleGuess(letter) {
        if (this.gameOver || this.guessedLetters.has(letter)) {
            return;
        }

        if (this.currentWord.includes(letter)) {
            this.applyCorrectLetter(letter, { awardStreak: true, awardTreat: true });
            this.checkWin();
        } else {
            this.applyWrongLetter(letter, { applyPenalty: true, resetStreak: true, triggerTaunt: true });
        }

        this.updateDisplay();
        this.updateBoosts();
        this.updateSessionStats();
    }

    applyCorrectLetter(letter, options = {}) {
        const { awardStreak = false, awardTreat = false } = options;

        this.guessedLetters.add(letter);
        this.powerGreyLetters.delete(letter);

        const button = document.querySelector(`[data-letter="${letter}"]`);
        if (button) {
            button.disabled = true;
            button.classList.remove('wrong', 'power-grey');
            button.classList.add('correct');
        }

        if (awardStreak) {
            this.streak += 1;
            this.bestStreak = Math.max(this.bestStreak, this.streak);
        }

        if (awardTreat && !this.powerUpReady) {
            this.treatCharge += 1;
            this.maybeTriggerTreat();
        }
    }

    applyWrongLetter(letter, options = {}) {
        const { applyPenalty = false, resetStreak = false, triggerTaunt = false } = options;

        this.guessedLetters.add(letter);
        this.powerGreyLetters.delete(letter);

        const button = document.querySelector(`[data-letter="${letter}"]`);
        if (button) {
            button.disabled = true;
            button.classList.remove('correct', 'power-grey');
            button.classList.add('wrong');
        }

        if (applyPenalty) {
            this.wrongGuesses += 1;
            if (resetStreak) {
                this.streak = 0;
            }
            this.treatCharge = 0;
            this.powerUpReady = false;
            this.score = Math.max(0, this.score - this.wrongGuessPenalty);
            this.showBodyPart();
            if (triggerTaunt) {
                this.maybeTriggerTaunt();
            }
            this.checkLoss();
        }
    }

    updateDisplay() {
        // Update word display
        const wordDisplay = document.getElementById('word-display');
        const displayWord = this.currentWord
            .split('')
            .map(letter => this.guessedLetters.has(letter) ? letter : '_')
            .join(' ');
        wordDisplay.textContent = displayWord;

        // Update wrong guesses count
        document.getElementById('wrong-count').textContent = `${this.wrongGuesses} / ${this.maxWrongGuesses}`;

        // Update streak
        document.getElementById('streak-count').textContent = this.streak;

        // Update used letters
        const usedLetters = document.getElementById('used-letters');
        usedLetters.innerHTML = '';
        Array.from(this.guessedLetters).sort().forEach(letter => {
            const span = document.createElement('span');
            span.className = 'used-letter';
            if (this.powerGreyLetters.has(letter)) {
                span.classList.add('power-grey');
            }
            span.textContent = letter;
            usedLetters.appendChild(span);
        });

        // Update score
        document.getElementById('score').textContent = this.score;
    }

    updateSessionStats() {
        const roundsPlayed = document.getElementById('rounds-played');
        const roundsWon = document.getElementById('rounds-won');
        const bestStreak = document.getElementById('best-streak');

        if (roundsPlayed) {
            roundsPlayed.textContent = this.roundsPlayed;
        }
        if (roundsWon) {
            roundsWon.textContent = this.roundsWon;
        }
        if (bestStreak) {
            bestStreak.textContent = this.bestStreak;
        }
    }

    applyDifficulty() {
        const settings = this.difficultySettings[this.difficulty] || this.difficultySettings.normal;
        this.maxWrongGuesses = settings.maxWrong;
    }

    getFilteredWords(categoryName) {
        const settings = this.difficultySettings[this.difficulty] || this.difficultySettings.normal;
        const words = this.categories[categoryName] || [];
        const filtered = words.filter(word => word.length >= settings.minLength);
        return filtered.length ? filtered : words;
    }

    updateCategory() {
        const categoryLabel = document.getElementById('category-name');
        if (categoryLabel) {
            categoryLabel.textContent = this.currentCategory;
        }
    }

    updateBoosts() {
        const pips = document.querySelectorAll('#treat-meter .pip');
        pips.forEach((pip, index) => {
            pip.classList.toggle('active', index < this.treatCharge);
        });

        const meter = document.getElementById('treat-meter');
        if (meter) {
            meter.classList.toggle('ready', this.powerUpReady);
        }

        this.updatePowerUpButtons();
    }

    updatePowerUpButtons() {
        const greyBtn = document.getElementById('power-grey-btn');
        const riskBtn = document.getElementById('power-risk-btn');
        const enabled = this.powerUpReady && !this.gameOver;

        if (greyBtn) {
            greyBtn.disabled = !enabled;
        }

        if (riskBtn) {
            riskBtn.disabled = !enabled;
        }
    }

    maybeTriggerTreat() {
        if (this.treatCharge >= this.treatThreshold && !this.gameOver) {
            this.powerUpReady = true;
            this.treatCharge = this.treatThreshold;
            this.showBoostMessage('Power-up ready! Choose a treat.');
            this.updateBoosts();
        }
    }

    revealBonusLetter() {
        const remainingLetters = this.currentWord
            .split('')
            .filter(letter => /[A-Z]/.test(letter) && !this.guessedLetters.has(letter));

        if (!remainingLetters.length) {
            return;
        }

        const bonusLetter = remainingLetters[Math.floor(Math.random() * remainingLetters.length)];
        this.guessedLetters.add(bonusLetter);
        const button = document.querySelector(`[data-letter="${bonusLetter}"]`);
        if (button) {
            button.disabled = true;
            button.classList.add('correct');
        }

        const bonusPoints = this.applyScoreMultiplier(this.treatBonus);
        this.score += bonusPoints;
        this.showBoostMessage(`Jerry Treat! Revealed ${bonusLetter} (+${bonusPoints})`);
        this.checkWin();
    }

    useGreyOutPowerUp() {
        if (!this.powerUpReady || this.gameOver) {
            return;
        }

        const wrongLetters = this.getRemainingWrongLetters();
        if (!wrongLetters.length) {
            this.showBoostMessage('No wrong letters left to grey out.');
            return;
        }

        const count = Math.min(this.greyOutCount, wrongLetters.length);
        const selected = this.pickRandomLetters(wrongLetters, count);

        selected.forEach(letter => {
            this.guessedLetters.add(letter);
            this.powerGreyLetters.add(letter);
            const button = document.querySelector(`[data-letter="${letter}"]`);
            if (button) {
                button.disabled = true;
                button.classList.remove('correct', 'wrong');
                button.classList.add('power-grey');
            }
        });

        this.consumePowerUp();
        this.showBoostMessage(`Greyed out ${selected.length} wrong letters.`);
        this.updateDisplay();
        this.updateBoosts();
        this.updateSessionStats();
    }

    useRiskyRevealPowerUp() {
        if (!this.powerUpReady || this.gameOver) {
            return;
        }

        const remainingCorrect = this.getRemainingCorrectLetters();
        const remainingWrong = this.getRemainingWrongLetters();

        if (!remainingCorrect.length && !remainingWrong.length) {
            this.showBoostMessage('No letters left to reveal.');
            return;
        }

        let chooseCorrect = false;
        if (remainingCorrect.length && remainingWrong.length) {
            chooseCorrect = Math.random() < this.riskyRevealOdds;
        } else {
            chooseCorrect = remainingCorrect.length > 0;
        }

        if (chooseCorrect) {
            const letter = this.pickRandomLetters(remainingCorrect, 1)[0];
            this.applyCorrectLetter(letter, { awardStreak: false, awardTreat: false });
            this.showBoostMessage(`Heads! ${letter} is in the word.`);
            this.triggerCoinFlip('heads');
            this.checkWin();
        } else {
            const letter = this.pickRandomLetters(remainingWrong, 1)[0];
            this.applyWrongLetter(letter, { applyPenalty: false, resetStreak: false, triggerTaunt: false });
            this.showBoostMessage(`Tails. ${letter} is not in the word.`);
            this.triggerCoinFlip('tails');
        }

        this.consumePowerUp();
        this.updateDisplay();
        this.updateBoosts();
        this.updateSessionStats();
    }

    consumePowerUp() {
        this.powerUpReady = false;
        this.treatCharge = 0;
    }

    getRemainingCorrectLetters() {
        const uniqueLetters = Array.from(new Set(this.currentWord.split('')));
        return uniqueLetters.filter(letter => /[A-Z]/.test(letter) && !this.guessedLetters.has(letter));
    }

    getRemainingWrongLetters() {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        return alphabet.filter(letter => !this.currentWord.includes(letter) && !this.guessedLetters.has(letter));
    }

    pickRandomLetters(letters, count) {
        const pool = [...letters];
        const picks = [];

        for (let i = 0; i < count && pool.length; i += 1) {
            const index = Math.floor(Math.random() * pool.length);
            picks.push(pool.splice(index, 1)[0]);
        }

        return picks;
    }

    triggerCoinFlip(result) {
        const coin = document.getElementById('coin-flip');
        if (!coin) {
            return;
        }

        coin.classList.remove('flip', 'heads', 'tails', 'heads-success', 'tails-fail');
        void coin.offsetWidth;
        coin.classList.add('flip', result);

        if (result === 'heads') {
            coin.classList.add('heads-success');
        } else {
            coin.classList.add('tails-fail');
        }
    }

    showBodyPart() {
        if (this.wrongGuesses > 0 && this.wrongGuesses <= this.bodyParts.length) {
            const part = document.getElementById(this.bodyParts[this.wrongGuesses - 1]);
            if (part) {
                part.style.display = 'block';
            }
        }
    }

    maybeTriggerTaunt() {
        const hangman = document.getElementById('hangman-svg');
        if (!hangman) {
            return;
        }

        const tauntChance = 0.18;
        if (Math.random() > tauntChance) {
            return;
        }

        hangman.classList.remove('taunt');
        void hangman.offsetWidth;
        hangman.classList.add('taunt');

        window.clearTimeout(this.tauntTimeoutId);
        this.tauntTimeoutId = window.setTimeout(() => {
            hangman.classList.remove('taunt');
        }, 900);
    }

    hideBodyParts() {
        this.bodyParts.forEach(partId => {
            const part = document.getElementById(partId);
            if (part) {
                part.style.display = 'none';
            }
        });
    }

    checkWin() {
        const allLettersGuessed = this.currentWord
            .split('')
            .every(letter => this.guessedLetters.has(letter));

        if (allLettersGuessed) {
            this.gameOver = true;
            this.lastWinPoints = this.winBasePoints + (this.maxWrongGuesses - this.wrongGuesses) * this.winUnusedBonus;
            const adjustedWinPoints = this.applyScoreMultiplier(this.lastWinPoints);
            this.score += adjustedWinPoints;
            this.lastWinPoints = adjustedWinPoints;
            this.roundsWon += 1;
            this.showWinMessage();
            this.disableAllKeys();
        }
    }

    checkLoss() {
        if (this.wrongGuesses >= this.maxWrongGuesses) {
            this.gameOver = true;
            this.showLoseMessage();
            this.disableAllKeys();
            // Penalty for losing
            this.score = Math.max(0, this.score - this.losePenalty);
        }
    }

    showWinMessage() {
        const messageDiv = document.getElementById('game-message');
        messageDiv.className = 'game-message win';
        messageDiv.innerHTML = `
            <div>🎉 YOU WIN! 🎉</div>
            <div class="word-reveal">You correctly guessed: ${this.currentWord}</div>
            <div class="word-reveal">+${this.lastWinPoints} points!</div>
        `;
        this.showBoostMessage('Streak secured. Start a new round for more treats!');
    }

    showLoseMessage() {
        const messageDiv = document.getElementById('game-message');
        messageDiv.className = 'game-message lose';
        messageDiv.innerHTML = `
            <div>😔 GAME OVER 😔</div>
            <div class="word-reveal">The word was: ${this.currentWord}</div>
            <div class="word-reveal">Better luck next time!</div>
        `;
        this.showBoostMessage('Treat Meter cooled down. Jump back in!');
    }

    clearMessage() {
        const messageDiv = document.getElementById('game-message');
        messageDiv.className = 'game-message';
        messageDiv.innerHTML = '';
        this.showBoostMessage('');
    }

    showBoostMessage(message) {
        const boostDiv = document.getElementById('boost-message');
        if (boostDiv) {
            boostDiv.textContent = message;
        }
    }

    disableAllKeys() {
        const keys = document.querySelectorAll('.key');
        keys.forEach(key => key.disabled = true);
    }

    applyScoreMultiplier(points) {
        const settings = this.difficultySettings[this.difficulty] || this.difficultySettings.normal;
        return Math.max(1, Math.round(points * settings.scoreMultiplier));
    }
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', () => {
    new HangmanGame();
});
