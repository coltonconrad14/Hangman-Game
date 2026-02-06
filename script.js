// Hangman Game - AI vs Player
// AI picks the word, player guesses

class HangmanGame {
    constructor() {
        // Word bank for AI to choose from
        this.wordBank = [
            'JAVASCRIPT', 'PYTHON', 'PROGRAMMING', 'DEVELOPER', 'ALGORITHM',
            'COMPUTER', 'KEYBOARD', 'MONITOR', 'SOFTWARE', 'HARDWARE',
            'INTERNET', 'DATABASE', 'FUNCTION', 'VARIABLE', 'ARRAY',
            'OBJECT', 'STRING', 'BOOLEAN', 'NUMBER', 'INTERFACE',
            'FRAMEWORK', 'LIBRARY', 'COMPONENT', 'MODULE', 'PACKAGE',
            'REPOSITORY', 'COMMIT', 'BRANCH', 'MERGE', 'VERSION',
            'APPLICATION', 'WEBSITE', 'SERVER', 'CLIENT', 'NETWORK',
            'SECURITY', 'ENCRYPTION', 'AUTHENTICATION', 'AUTHORIZATION',
            'DEBUGGING', 'TESTING', 'DEPLOYMENT', 'PRODUCTION', 'DEVELOPMENT',
            'RESPONSIVE', 'FRONTEND', 'BACKEND', 'FULLSTACK', 'CLOUD',
            'CONTAINER', 'DOCKER', 'KUBERNETES', 'MICROSERVICE', 'API'
        ];

        this.currentWord = '';
        this.guessedLetters = new Set();
        this.wrongGuesses = 0;
        this.maxWrongGuesses = 6;
        this.score = 0;
        this.gameOver = false;

        // Body parts to display on wrong guesses
        this.bodyParts = ['head', 'body', 'left-arm', 'right-arm', 'left-leg', 'right-leg'];

        this.initializeGame();
        this.setupEventListeners();
    }

    initializeGame() {
        // AI picks a random word
        this.currentWord = this.wordBank[Math.floor(Math.random() * this.wordBank.length)];
        this.guessedLetters.clear();
        this.wrongGuesses = 0;
        this.gameOver = false;

        this.createKeyboard();
        this.updateDisplay();
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
        button.disabled = true;

        // Check if letter is in the word
        if (this.currentWord.includes(letter)) {
            button.classList.add('correct');
            this.checkWin();
        } else {
            button.classList.add('wrong');
            this.wrongGuesses++;
            this.showBodyPart();
            this.checkLoss();
        }

        this.updateDisplay();
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
            this.score += 10 + (this.maxWrongGuesses - this.wrongGuesses) * 2;
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
            this.score = Math.max(0, this.score - 5);
        }
    }

    showWinMessage() {
        const messageDiv = document.getElementById('game-message');
        messageDiv.className = 'game-message win';
        messageDiv.innerHTML = `
            <div>🎉 YOU WIN! 🎉</div>
            <div class="word-reveal">You correctly guessed: ${this.currentWord}</div>
            <div class="word-reveal">+${10 + (this.maxWrongGuesses - this.wrongGuesses) * 2} points!</div>
        `;
    }

    showLoseMessage() {
        const messageDiv = document.getElementById('game-message');
        messageDiv.className = 'game-message lose';
        messageDiv.innerHTML = `
            <div>😔 GAME OVER 😔</div>
            <div class="word-reveal">The word was: ${this.currentWord}</div>
            <div class="word-reveal">Better luck next time!</div>
        `;
    }

    clearMessage() {
        const messageDiv = document.getElementById('game-message');
        messageDiv.className = 'game-message';
        messageDiv.innerHTML = '';
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
