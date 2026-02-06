// Hangman Game - AI vs Player
// AI picks the word, player guesses

class HangmanGame {
    constructor() {
        // Category packs for a bigger, more varied word bank
        this.categories = {
            'Tech Stack': [
                'JAVASCRIPT', 'PYTHON', 'ALGORITHM', 'DATABASE', 'FRAMEWORK',
                'COMPILER', 'VARIABLE', 'INTERFACE', 'MICROSERVICE', 'CONTAINER',
                'KUBERNETES', 'ENCRYPTION', 'DEBUGGING', 'DEPLOYMENT'
            ],
            'Space': [
                'GALAXY', 'NEBULA', 'ORBIT', 'ASTEROID', 'COMET',
                'TELESCOPE', 'ROVER', 'SATELLITE', 'ASTRONAUT', 'PLANET',
                'COSMOS', 'SUPERNOVA'
            ],
            'Music': [
                'MELODY', 'CHORUS', 'HARMONY', 'PLAYLIST', 'RHYTHM',
                'SYNTHESIZER', 'MICROPHONE', 'VINYL', 'HEADPHONES', 'ORCHESTRA',
                'GUITAR', 'BASS'
            ],
            'Food': [
                'TACOS', 'SUSHI', 'RISOTTO', 'PANCAKE', 'BURRITO',
                'CROISSANT', 'DUMPLING', 'LASAGNA', 'NOODLES', 'TEMPURA',
                'CUPCAKE', 'PIZZA'
            ],
            'Adventure': [
                'JUNGLE', 'CANYON', 'SUMMIT', 'GLACIER', 'TRAIL',
                'OASIS', 'VOLCANO', 'SAFARI', 'HORIZON', 'COMPASS',
                'RAPIDS', 'CAMPFIRE'
            ],
            'Sports': [
                'SOCCER', 'BASEBALL', 'MARATHON', 'SURFING', 'SNOWBOARD',
                'KARATE', 'CYCLING', 'CRICKET', 'VOLLEYBALL', 'SKATEBOARD',
                'RODEO', 'SWIMMING'
            ],
            'Pop Culture': [
                'SUPERHERO', 'BLOCKBUSTER', 'PODCAST', 'ANIMATION', 'STREAMING',
                'COSPLAY', 'MEME', 'TRAILER', 'SPINOFF', 'SOUNDTRACK',
                'SITCOM', 'CAMEO'
            ],
            'Nature': [
                'RAINBOW', 'MONSOON', 'HURRICANE', 'WILDFLOWER', 'SEQUOIA',
                'MEADOW', 'CRESCENT', 'LAGOON', 'WATERFALL', 'PINECONE',
                'FIREFLY', 'MOONLIGHT'
            ],
            'Brands': [
                'NINTENDO', 'LEGO', 'SPOTIFY', 'NIKE', 'ADIDAS',
                'SAMSUNG', 'TESLA', 'ORIGINALS', 'CANON', 'GOPRO',
                'AIRBNB', 'KODAK'
            ],
            'Games': [
                'DUNGEON', 'QUEST', 'BOSSFIGHT', 'LEADERBOARD', 'CHECKPOINT',
                'POWERUP', 'SPEEDRUN', 'ARCADE', 'SANDBOX', 'ARENA',
                'PUZZLE', 'COOP'
            ]
        };

        this.currentCategory = '';
        this.currentWord = '';
        this.guessedLetters = new Set();
        this.wrongGuesses = 0;
        this.maxWrongGuesses = 6;
        this.score = 0;
        this.streak = 0;
        this.treatCharge = 0;
        this.treatThreshold = 3;
        this.winBasePoints = 12;
        this.winUnusedBonus = 1;
        this.treatBonus = 2;
        this.wrongGuessPenalty = 1;
        this.losePenalty = 3;
        this.lastWinPoints = 0;
        this.gameOver = false;

        // Body parts to display on wrong guesses
        this.bodyParts = ['head', 'body', 'left-arm', 'right-arm', 'left-leg', 'right-leg'];

        this.initializeGame();
        this.setupEventListeners();
    }

    initializeGame() {
        // AI picks a random category and word
        const categoryNames = Object.keys(this.categories);
        this.currentCategory = categoryNames[Math.floor(Math.random() * categoryNames.length)];
        const words = this.categories[this.currentCategory];
        this.currentWord = words[Math.floor(Math.random() * words.length)];
        this.guessedLetters.clear();
        this.wrongGuesses = 0;
        this.streak = 0;
        this.treatCharge = 0;
        this.gameOver = false;

        this.createKeyboard();
        this.updateDisplay();
        this.updateCategory();
        this.updateBoosts();
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

        this.guessedLetters.add(letter);

        // Update keyboard button state
        const button = document.querySelector(`[data-letter="${letter}"]`);
        if (button) {
            button.disabled = true;
        }

        // Check if letter is in the word
        if (this.currentWord.includes(letter)) {
            if (button) {
                button.classList.add('correct');
            }
            this.streak += 1;
            this.treatCharge += 1;
            this.maybeTriggerTreat();
            this.checkWin();
        } else {
            if (button) {
                button.classList.add('wrong');
            }
            this.wrongGuesses++;
            this.streak = 0;
            this.treatCharge = 0;
            this.score = Math.max(0, this.score - this.wrongGuessPenalty);
            this.showBodyPart();
            this.checkLoss();
        }

        this.updateDisplay();
        this.updateBoosts();
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
            span.textContent = letter;
            usedLetters.appendChild(span);
        });

        // Update score
        document.getElementById('score').textContent = this.score;
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
    }

    maybeTriggerTreat() {
        if (this.treatCharge >= this.treatThreshold && !this.gameOver) {
            this.treatCharge = 0;
            this.revealBonusLetter();
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

        this.score += this.treatBonus;
        this.showBoostMessage(`Jerry Treat! Revealed ${bonusLetter} (+${this.treatBonus})`);
        this.checkWin();
    }

    showBodyPart() {
        if (this.wrongGuesses > 0 && this.wrongGuesses <= this.bodyParts.length) {
            const part = document.getElementById(this.bodyParts[this.wrongGuesses - 1]);
            if (part) {
                part.style.display = 'block';
            }
        }
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
            this.score += this.lastWinPoints;
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
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', () => {
    new HangmanGame();
});
