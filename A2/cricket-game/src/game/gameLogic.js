import { AGGRESSIVE, DEFENSIVE, getOutcome } from "./probabilities.js";

// Game constants
export const TOTAL_BALLS = 12;    // 2 overs
export const TOTAL_WICKETS = 2;
export const BALLS_PER_OVER = 6;

// Commentary lines for each outcome (at least 3 per outcome)
export const COMMENTARY = {
  wicket: [
    "💥 Bowled him! The stumps are shattered!",
    "🎯 Caught behind! What a delivery!",
    "❌ OUT! The fielder takes a stunning catch!",
    "😱 Gone! That was an unplayable delivery!",
  ],
  0: [
    "🛡️ Defended solidly. Dot ball.",
    "😤 No run. The bowler wins this one.",
    "🔒 Tight line, kept out. Dot ball.",
  ],
  1: [
    "👟 Pushed into the gap for a single.",
    "🏃 Quick single — good running!",
    "✅ Placed away for 1 run.",
  ],
  2: [
    "🏃 They run two! Good placement.",
    "👏 Nicely timed — two runs!",
    "⚡ Swift running, 2 runs added.",
  ],
  3: [
    "🔥 Three! Fine shot through the covers.",
    "👌 Excellent placement — 3 runs!",
    "🌟 Hustled 3 with brilliant running.",
  ],
  4: [
    "🚀 FOUR! Cracked through the boundary!",
    "💪 FOUR! That raced to the rope!",
    "🎉 Beautiful drive — FOUR runs!",
  ],
  6: [
    "🌟 SIX! That's gone into the stands!",
    "🚁 MAXIMUM! Absolutely launched!",
    "💥 SIX! The crowd goes wild!",
  ],
};

// Returns a fresh initial game state
export function createInitialState() {
  return {
    runs: 0,
    wickets: 0,
    ballsPlayed: 0,
    battingStyle: null,   // "aggressive" or "defensive"
    lastOutcome: null,
    lastCommentary: "",
    gameOver: false,
    phase: "idle",        // idle | ready | bowling | batting | result | gameover
  };
}

// Returns the style object based on key
export function getStyle(styleKey) {
  if (styleKey === "aggressive") return AGGRESSIVE;
  if (styleKey === "defensive") return DEFENSIVE;
  return null;
}

// Returns balls remaining
export function getBallsRemaining(state) {
  return TOTAL_BALLS - state.ballsPlayed;
}

// Returns overs display string like "1.3"
export function getOversDisplay(state) {
  const over = Math.floor(state.ballsPlayed / BALLS_PER_OVER);
  const ball = state.ballsPlayed % BALLS_PER_OVER;
  return `${over}.${ball}`;
}

// Checks if the game is over
export function checkGameOver(state) {
  return state.wickets >= TOTAL_WICKETS || state.ballsPlayed >= TOTAL_BALLS;
}

// Main function: resolve shot using slider position
// Returns updated state
export function resolveShot(state, sliderPosition) {
  const style = getStyle(state.battingStyle);
  const outcome = getOutcome(sliderPosition, style);

  // Pick a random commentary line for this outcome
  const lines = COMMENTARY[outcome];
  const commentary = lines[Math.floor(Math.random() * lines.length)];

  const isWicket = outcome === "wicket";
  const runsScored = isWicket ? 0 : Number(outcome);

  const newState = {
    ...state,
    runs: state.runs + runsScored,
    wickets: state.wickets + (isWicket ? 1 : 0),
    ballsPlayed: state.ballsPlayed + 1,
    lastOutcome: outcome,
    lastCommentary: commentary,
  };

  newState.gameOver = checkGameOver(newState);
  newState.phase = newState.gameOver ? "gameover" : "result";

  return newState;
}

// Restart: return fresh state
export function restartGame() {
  return createInitialState();
}
