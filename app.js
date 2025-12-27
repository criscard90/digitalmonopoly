// Digital Monopoly PWA
class Player {
    constructor(id, name, color) {
        this.id = id;
        this.name = name;
        this.color = color;
        this.position = 0;
        this.money = 1500;
        this.properties = [];
        this.inJail = false;
        this.jailTurns = 0;
        this.getOutOfJailCards = 0;
    }

    move(steps) {
        this.position = (this.position + steps) % 40;
    }

    pay(amount) {
        this.money -= amount;
    }

    receive(amount) {
        this.money += amount;
    }
}

class Property {
    constructor(id, name, type, price, rent, color) {
        this.id = id;
        this.name = name;
        this.type = type; // 'property', 'railroad', 'utility', 'special'
        this.price = price;
        this.rent = rent;
        this.color = color;
        this.owner = null;
        this.mortgaged = false;
        this.houses = 0;
        this.hotel = false;
    }
}

class Game {
    constructor() {
        this.players = [];
        this.currentPlayerIndex = 0;
        this.board = this.initializeBoard();
        this.gameStarted = false;
        this.dice1 = 0;
        this.dice2 = 0;
        this.doubleCount = 0;
    }

    initializeBoard() {
        // Simplified board initialization
        const board = [];
        const properties = [
            { name: 'Via Roma', price: 60, rent: 2, color: '#8B4513' },
            { name: 'Cassa Comune', type: 'special' },
            { name: 'Corso Buenos Aires', price: 60, rent: 4, color: '#8B4513' },
            { name: 'Tassa di Lusso', type: 'special' },
            { name: 'Stazione Centrale', price: 200, rent: 25, color: '#000000' },
            { name: 'Via Accademia', price: 100, rent: 6, color: '#87CEEB' },
            { name: 'Imprevisto', type: 'special' },
            { name: 'Corso Vittorio Emanuele', price: 100, rent: 6, color: '#87CEEB' },
            { name: 'Piazza Duomo', price: 120, rent: 8, color: '#87CEEB' },
            { name: 'Prigione', type: 'special' },
            { name: 'Via Toledo', price: 140, rent: 10, color: '#FF69B4' },
            { name: 'Società Elettrica', price: 150, rent: 4, color: '#FFFFFF' },
            { name: 'Corso Magellano', price: 140, rent: 10, color: '#FF69B4' },
            { name: 'Corso Garibaldi', price: 160, rent: 12, color: '#FF69B4' },
            { name: 'Stazione di Porta Nuova', price: 200, rent: 25, color: '#000000' },
            { name: 'Piazza della Repubblica', price: 180, rent: 14, color: '#FFA500' },
            { name: 'Cassa Comune', type: 'special' },
            { name: 'Via Marco Polo', price: 180, rent: 14, color: '#FFA500' },
            { name: 'Corso Colombo', price: 200, rent: 16, color: '#FFA500' },
            { name: 'Parcheggio Gratuito', type: 'special' },
            { name: 'Via Verdi', price: 220, rent: 18, color: '#FF0000' },
            { name: 'Imprevisto', type: 'special' },
            { name: 'Corso Raffaello', price: 220, rent: 18, color: '#FF0000' },
            { name: 'Piazza Navona', price: 240, rent: 20, color: '#FF0000' },
            { name: 'Stazione Marittima', price: 200, rent: 25, color: '#000000' },
            { name: 'Via Monte Bianco', price: 260, rent: 22, color: '#FFFF00' },
            { name: 'Via Monte Rosa', price: 260, rent: 22, color: '#FFFF00' },
            { name: 'Società Acqua Potabile', price: 150, rent: 4, color: '#FFFFFF' },
            { name: 'Viale dei Giardini', price: 280, rent: 24, color: '#FFFF00' },
            { name: 'Vai in Prigione', type: 'special' },
            { name: 'Corso Ateneo', price: 300, rent: 26, color: '#008000' },
            { name: 'Piazza Cavour', price: 300, rent: 26, color: '#008000' },
            { name: 'Cassa Comune', type: 'special' },
            { name: 'Corso Impero', price: 320, rent: 28, color: '#008000' },
            { name: 'Stazione di Porta Garibaldi', price: 200, rent: 25, color: '#000000' },
            { name: 'Imprevisto', type: 'special' },
            { name: 'Viale Costantino', price: 350, rent: 35, color: '#00008B' },
            { name: 'Tassa Patrimoniale', type: 'special' },
            { name: 'Viale Traiano', price: 400, rent: 50, color: '#00008B' }
        ];

        properties.forEach((prop, index) => {
            board.push(new Property(index, prop.name, prop.type || 'property', prop.price || 0, prop.rent || 0, prop.color || '#FFFFFF'));
        });

        return board;
    }

    addPlayer(name, color) {
        const id = this.players.length;
        const player = new Player(id, name, color);
        this.players.push(player);
        return player;
    }

    rollDice() {
        this.dice1 = Math.floor(Math.random() * 6) + 1;
        this.dice2 = Math.floor(Math.random() * 6) + 1;
        return this.dice1 + this.dice2;
    }

    nextTurn() {
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
    }

    getCurrentPlayer() {
        return this.players[this.currentPlayerIndex];
    }

    startGame() {
        this.gameStarted = true;
        this.updateUI();
    }
}

// Firebase configuration (to be set by user)
const firebaseConfig = {
  apiKey: "AIzaSyAhq57MmxIaB0avY-Gz_JnGaMh-qPfpzI0",
  authDomain: "digitalmonopoly.firebaseapp.com",
  databaseURL: "https://digitalmonopoly-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "digitalmonopoly",
  storageBucket: "digitalmonopoly.firebasestorage.app",
  messagingSenderId: "662797052356",
  appId: "1:662797052356:web:60de3c69e8cb8afbb55c91",
  measurementId: "G-QZY16HG0ZP"
};

// Initialize Firebase (commented out until config is provided)
// const app = firebase.initializeApp(firebaseConfig);
// const database = firebase.database();

// Game room management
let gameRoomRef = null;
let gameRoomId = null;
let currentPlayerId = null;
let isHost = false;

// Multiplayer functions
function initializeFirebase() {
    if (firebaseConfig.apiKey !== "your-api-key") {
        const app = window.firebase.initializeApp(firebaseConfig);
        const database = window.firebase.getDatabase(app);
        return database;
    }
    return null;
}

function joinGameRoom(roomId, playerName) {
    const database = initializeFirebase();
    if (!database) {
        alert('Firebase non configurato. Aggiungi la tua configurazione Firebase.');
        return;
    }

    if (!roomId) {
        // Create new room
        roomId = generateRoomId();
        isHost = true;
    }

    gameRoomId = roomId;
    gameRoomRef = database.ref('games/' + roomId);

    // Listen for game state changes
    gameRoomRef.on('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
            loadGameState(data);
        } else if (isHost) {
            // Initialize new game
            saveGameState();
        }
    });

    // Add player to room
    currentPlayerId = Date.now().toString();
    const playerRef = gameRoomRef.child('players').child(currentPlayerId);
    playerRef.set({
        id: currentPlayerId,
        name: playerName,
        color: getRandomColor(),
        position: 0,
        money: 1500
    });

    // Update UI
    document.getElementById('game-setup').style.display = 'none';
    document.getElementById('game-info').style.display = 'block';
    document.getElementById('room-info').textContent = `Stanza: ${roomId}`;
}

function generateRoomId() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}

function getRandomColor() {
    const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function saveGameState() {
    if (!gameRoomRef) return;

    const gameState = {
        currentPlayerIndex: game.currentPlayerIndex,
        dice1: game.dice1,
        dice2: game.dice2,
        players: game.players.map(player => ({
            id: player.id,
            name: player.name,
            color: player.color,
            position: player.position,
            money: player.money,
            inJail: player.inJail,
            jailTurns: player.jailTurns,
            getOutOfJailCards: player.getOutOfJailCards
        })),
        board: game.board.map(square => ({
            id: square.id,
            owner: square.owner ? square.owner.id : null,
            houses: square.houses,
            hotel: square.hotel,
            mortgaged: square.mortgaged
        }))
    };

    gameRoomRef.update(gameState);
}

function loadGameState(data) {
    game.currentPlayerIndex = data.currentPlayerIndex || 0;
    game.dice1 = data.dice1 || 0;
    game.dice2 = data.dice2 || 0;

    // Load players
    if (data.players) {
        game.players = Object.values(data.players).map(p => new Player(p.id, p.name, p.color));
        Object.values(data.players).forEach(p => {
            const player = game.players.find(pl => pl.id === p.id);
            if (player) {
                player.position = p.position;
                player.money = p.money;
                player.inJail = p.inJail;
                player.jailTurns = p.jailTurns;
                player.getOutOfJailCards = p.getOutOfJailCards;
            }
        });
    }

    // Load board ownership
    if (data.board) {
        data.board.forEach(squareData => {
            const square = game.board[squareData.id];
            if (squareData.owner) {
                square.owner = game.players.find(p => p.id === squareData.owner);
                if (square.owner) {
                    square.owner.properties.push(square);
                }
            }
            square.houses = squareData.houses || 0;
            square.hotel = squareData.hotel || false;
            square.mortgaged = squareData.mortgaged || false;
        });
    }

    updateUI();
    updateBoard();
}

// DOM elements
const rollDiceBtn = document.getElementById('roll-dice');
const buyPropertyBtn = document.getElementById('buy-property');
const payRentBtn = document.getElementById('pay-rent');
const endTurnBtn = document.getElementById('end-turn');
const currentPlayerSpan = document.getElementById('current-player');
const diceResultSpan = document.getElementById('dice-result');
const playersInfoDiv = document.getElementById('players-info');
const cardsDiv = document.getElementById('cards');
const boardCanvas = document.getElementById('board');

// Game instance
const game = new Game();

// Add join game event listener
const joinGameBtn = document.getElementById('join-game');
const playerNameInput = document.getElementById('player-name');
const roomIdInput = document.getElementById('room-id');

joinGameBtn.addEventListener('click', () => {
    const playerName = playerNameInput.value || 'Giocatore';
    const roomId = roomIdInput.value.trim();
    joinGameRoom(roomId, playerName);
});

// Event listeners
rollDiceBtn.addEventListener('click', () => {
    const total = game.rollDice();
    diceResultSpan.textContent = `Dadi: ${game.dice1} + ${game.dice2} = ${total}`;
    const currentPlayer = game.getCurrentPlayer();
    currentPlayer.move(total);
    // Check landing square
    const square = game.board[currentPlayer.position];
    if (square.type === 'property' && square.owner === null) {
        buyPropertyBtn.disabled = false;
    } else if (square.owner && square.owner !== currentPlayer) {
        payRentBtn.disabled = false;
    }
    updateBoard();
    updatePlayersInfo();
    saveGameState();
});

buyPropertyBtn.addEventListener('click', () => {
    const currentPlayer = game.getCurrentPlayer();
    const square = game.board[currentPlayer.position];
    if (currentPlayer.money >= square.price) {
        currentPlayer.pay(square.price);
        square.owner = currentPlayer;
        currentPlayer.properties.push(square);
        buyPropertyBtn.disabled = true;
        updatePlayersInfo();
        saveGameState();
    }
});

payRentBtn.addEventListener('click', () => {
    const currentPlayer = game.getCurrentPlayer();
    const square = game.board[currentPlayer.position];
    const rent = square.rent;
    if (currentPlayer.money >= rent) {
        currentPlayer.pay(rent);
        square.owner.receive(rent);
        payRentBtn.disabled = true;
        updatePlayersInfo();
        saveGameState();
    }
});

endTurnBtn.addEventListener('click', () => {
    game.nextTurn();
    updateUI();
    buyPropertyBtn.disabled = true;
    payRentBtn.disabled = true;
    saveGameState();
});

// UI update functions
function updateUI() {
    if (game.players.length === 0) {
        currentPlayerSpan.textContent = `Giocatore corrente: Nessuno`;
        playersInfoDiv.innerHTML = '';
        return;
    }

    const currentPlayer = game.getCurrentPlayer();
    if (currentPlayer) {
        currentPlayerSpan.textContent = `Giocatore corrente: ${currentPlayer.name}`;
    } else {
        currentPlayerSpan.textContent = `Giocatore corrente: Nessuno`;
    }
    updatePlayersInfo();
}

function updatePlayersInfo() {
    playersInfoDiv.innerHTML = '';
    game.players.forEach(player => {
        const playerDiv = document.createElement('div');
        playerDiv.className = `player ${player === game.getCurrentPlayer() ? 'active' : ''}`;
        playerDiv.innerHTML = `
            <span>${player.name}</span>
            <span>€${player.money}</span>
        `;
        playersInfoDiv.appendChild(playerDiv);
    });
}

function updateBoard() {
    const ctx = boardCanvas.getContext('2d');
    const size = 600;
    const squareSize = size / 11; // 11 to leave space in center
    const margin = squareSize;

    ctx.clearRect(0, 0, size, size);

    // Draw board background
    ctx.fillStyle = '#27ae60';
    ctx.fillRect(0, 0, size, size);

    // Draw squares
    for (let i = 0; i < 40; i++) {
        let x, y;
        if (i < 10) {
            // Bottom row (0-9)
            x = (9 - i) * squareSize + margin;
            y = size - squareSize - margin;
        } else if (i < 20) {
            // Left column (10-19)
            x = margin;
            y = size - squareSize - margin - (i - 9) * squareSize;
        } else if (i < 30) {
            // Top row (20-29)
            x = margin + (i - 19) * squareSize;
            y = margin;
        } else {
            // Right column (30-39)
            x = size - squareSize - margin;
            y = margin + (i - 29) * squareSize;
        }

        const square = game.board[i];

        if (!square) continue; // Skip if square doesn't exist

        // Draw square background
        ctx.fillStyle = square.color || '#FFFFFF';
        ctx.fillRect(x, y, squareSize, squareSize);
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, squareSize, squareSize);

        // Draw property name
        ctx.fillStyle = '#000000';
        ctx.font = '10px Arial';
        ctx.textAlign = 'center';
        const words = square.name.split(' ');
        words.forEach((word, index) => {
            ctx.fillText(words[index].substring(0, 8), x + squareSize / 2, y + 15 + index * 12);
        });

        // Draw owner indicator
        if (square.owner) {
            ctx.fillStyle = square.owner.color;
            ctx.fillRect(x + 2, y + 2, squareSize - 4, 5);
        }
    }

    // Draw center area
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(margin + squareSize, margin + squareSize, size - 2 * margin - 2 * squareSize, size - 2 * margin - 2 * squareSize);
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.strokeRect(margin + squareSize, margin + squareSize, size - 2 * margin - 2 * squareSize, size - 2 * margin - 2 * squareSize);

    ctx.fillStyle = '#000000';
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('MONOPOLY', size / 2, size / 2 - 20);
    ctx.font = '14px Arial';
    ctx.fillText('DIGITAL', size / 2, size / 2 + 10);

    // Draw players on their positions
    if (game.players.length > 0) {
        game.players.forEach((player, index) => {
            let x, y;
            const i = player.position;
            if (i < 10) {
                x = (9 - i) * squareSize + margin + squareSize / 2;
                y = size - squareSize - margin + squareSize / 2;
            } else if (i < 20) {
                x = margin + squareSize / 2;
                y = size - squareSize - margin - (i - 9) * squareSize + squareSize / 2;
            } else if (i < 30) {
                x = margin + (i - 19) * squareSize + squareSize / 2;
                y = margin + squareSize / 2;
            } else {
                x = size - squareSize - margin + squareSize / 2;
                y = margin + (i - 29) * squareSize + squareSize / 2;
            }

            ctx.fillStyle = player.color;
            ctx.beginPath();
            ctx.arc(x + (index - 1) * 8, y + (index - 1) * 8, 8, 0, 2 * Math.PI);
            ctx.fill();
            ctx.strokeStyle = '#FFFFFF';
            ctx.lineWidth = 2;
            ctx.stroke();
        });
    }
}

// Initialize
updateUI();
updateBoard();

// Service Worker registration for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW registered'))
            .catch(error => console.log('SW registration failed'));
    });
}
