# 🏏 Cricket Batting Game

A 2D single-player cricket batting game built with React and Vite.

## How to Run

```bash
npm install
npm run dev
```

Then open http://localhost:5173 in your browser.

## How to Play

1. Select a batting style: **Aggressive** or **Defensive**
2. Click **Play Shot!** — the ball will bowl toward the batsman
3. Click **Play Shot!** again while the slider is moving to hit the ball
4. The slider position when you click determines your outcome
5. Try to avoid the Wicket (red) zone!

## Probability Distributions

### Aggressive (High Risk / High Reward)
| Outcome | Probability |
|---------|------------|
| Wicket  | 35%        |
| 0 Runs  | 10%        |
| 1 Run   | 10%        |
| 2 Runs  | 5%         |
| 3 Runs  | 5%         |
| 4 Runs  | 15%        |
| 6 Runs  | 20%        |

### Defensive (Low Risk / Low Reward)
| Outcome | Probability |
|---------|------------|
| Wicket  | 15%        |
| 0 Runs  | 20%        |
| 1 Run   | 25%        |
| 2 Runs  | 20%        |
| 3 Runs  | 10%        |
| 4 Runs  | 7%         |
| 6 Runs  | 3%         |

## Project Structure

```
src/
├── game/
│   ├── probabilities.js   # Probability data and power bar logic
│   └── gameLogic.js       # Game state and shot resolution
├── components/
│   ├── Scoreboard.jsx     # Runs, wickets, overs display
│   ├── Pitch.jsx          # Cricket field + animations
│   ├── PowerBar.jsx       # Colored segments + moving slider
│   ├── Controls.jsx       # Batting style + action buttons
│   └── Commentary.jsx     # Dynamic commentary messages
├── App.jsx                # Main component
└── App.css                # All styles
```
