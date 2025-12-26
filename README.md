# Digital Monopoly PWA

Una Progressive Web App per giocare a Monopoly digitale in multiplayer utilizzando Firebase.

## Caratteristiche

- 🎲 Gioco di Monopoly digitale con regole semplificate
- 🎨 Design moderno e accattivante
- 📱 PWA installabile su dispositivi mobili
- 👥 Multiplayer fino a 8 giocatori
- 🔥 Sincronizzazione in tempo reale con Firebase
- 💾 Funzionamento offline grazie al Service Worker

## Come giocare

1. Inserisci il tuo nome
2. Lascia vuoto l'ID stanza per crearne una nuova o inserisci un ID esistente per unirti
3. Premi "Unisciti alla Partita"
4. Condividi l'ID stanza con gli amici
5. Gioca lanciando i dadi, comprando proprietà e pagando affitti!

## Installazione e Configurazione

### 1. Clona il repository

```bash
git clone https://github.com/tuo-username/digitalmonopoly.git
cd digitalmonopoly
```

### 2. Configura Firebase

1. Vai su [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuovo progetto
3. Abilita Realtime Database
4. Vai su "Project settings" > "General" > "Your apps" > "Web app"
5. Copia la configurazione Firebase
6. Modifica `app.js` e sostituisci il `firebaseConfig` con i tuoi valori:

```javascript
const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-project.firebaseapp.com",
    databaseURL: "https://your-project-default-rtdb.firebaseio.com",
    projectId: "your-project",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "your-app-id"
};
```

7. Rimuovi il commento dalle righe di inizializzazione Firebase in `app.js`

### 3. Crea le icone PWA

Crea due icone PNG:
- `icon-192.png` (192x192px)
- `icon-512.png` (512x512px)

Puoi usare un generatore online come [PWA Asset Generator](https://maskable.app/editor).

### 4. Deploy su GitHub Pages

1. Carica i file su un repository GitHub
2. Vai su "Settings" > "Pages"
3. Seleziona "Deploy from a branch" e scegli il branch principale
4. Il sito sarà disponibile su `https://tuo-username.github.io/digitalmonopoly/`

## Regole del Gioco

### Regole semplificate implementate:

- Tabellone con 40 caselle (proprietà, stazioni, società, carte speciali)
- 2-8 giocatori
- Ogni giocatore inizia con €1500
- Lancio dei dadi per muoversi
- Acquisto di proprietà quando si atterra su caselle libere
- Pagamento di affitti ai proprietari
- Turni sequenziali

### Regole non ancora implementate (da aggiungere):

- Carte Imprevisto e Cassa Comune
- Prigione
- Costruzione di case e alberghi
- Ipoteche
- Fallimento e fine partita

## Struttura del Progetto

```
digitalmonopoly/
├── index.html          # Struttura HTML principale
├── styles.css          # Stili CSS moderni
├── app.js              # Logica di gioco JavaScript
├── manifest.json       # Manifest PWA
├── sw.js              # Service Worker per offline
├── icon-192.png       # Icona PWA 192x192
├── icon-512.png       # Icona PWA 512x512
└── README.md          # Questo file
```

## Tecnologie Utilizzate

- **HTML5**: Struttura della pagina
- **CSS3**: Design moderno con Grid e Flexbox
- **JavaScript ES6+**: Logica di gioco con classi
- **Canvas API**: Rendering del tabellone
- **Firebase Realtime Database**: Sincronizzazione multiplayer
- **Service Worker**: Funzionamento offline
- **PWA**: Installabilità e funzionalità native

## Contributi

Sentiti libero di contribuire migliorando le regole del gioco, aggiungendo animazioni, o implementando funzionalità mancanti!

## Licenza

Questo progetto è distribuito sotto licenza MIT.
