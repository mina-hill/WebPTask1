import { useState, useRef } from "react";
import Scoreboard from "./components/Scoreboard";
import Controls from "./components/Controls";
import Pitch from "./components/Pitch";
import PowerBar from "./components/PowerBar";
import Commentary from "./components/Commentary";
import {
  createInitialState,
  resolveShot,
  restartGame,
} from "./game/gameLogic";
import "./App.css";

function App() {
  const [state, setState] = useState(createInitialState());
  const sliderRef = useRef(0);

  // Called by PowerBar every animation frame to track slider position
  function handleSliderUpdate(pos) {
    sliderRef.current = pos;
    setState((prev) => ({ ...prev, sliderPosition: pos }));
  }

  // User selects batting style
  function handleSelectStyle(styleKey) {
    setState((prev) => ({
      ...prev,
      battingStyle: styleKey,
      phase: "ready",
      lastOutcome: null,
      lastCommentary: "",
    }));
  }

  // User clicks Play Shot
  function handlePlayShot() {
    const { phase } = state;

    // First click: start bowling animation
    if (phase === "ready") {
      setState((prev) => ({ ...prev, phase: "bowling" }));

      // After bowling animation (1 second), switch to batting phase
      setTimeout(() => {
        setState((prev) => ({ ...prev, phase: "batting" }));
      }, 1000);

      return;
    }

    // Second click (during batting): resolve the shot using slider position
    if (phase === "batting") {
      const newState = resolveShot(state, sliderRef.current);
      setState(newState);
    }
  }

  // After seeing the result, move to next ball
  function handleNextBall() {
    setState((prev) => ({
      ...prev,
      phase: "ready",
      lastOutcome: null,
      lastCommentary: "",
    }));
  }

  // Restart the whole game
  function handleRestart() {
    sliderRef.current = 0;
    setState(restartGame());
  }

  return (
    <div className="app">
      <h1 className="game-title">🏏 Cricket Batting Game</h1>

      <Scoreboard state={state} />

      <Pitch state={state} />

      <Commentary state={state} />

      <PowerBar
        state={state}
        onSliderUpdate={handleSliderUpdate}
      />

      <Controls
        state={state}
        onSelectStyle={handleSelectStyle}
        onPlayShot={handlePlayShot}
        onNextBall={handleNextBall}
        onRestart={handleRestart}
      />

      {/* Instruction text */}
      {state.phase === "idle" && (
        <p className="instruction">👆 Select a batting style to start playing!</p>
      )}
      {state.phase === "ready" && (
        <p className="instruction">🎯 Click <strong>Play Shot!</strong> to bowl, then click again to hit!</p>
      )}
      {state.phase === "bowling" && (
        <p className="instruction">🏃 Ball is coming... get ready!</p>
      )}
      {state.phase === "batting" && (
        <p className="instruction">🏏 Click <strong>Play Shot!</strong> NOW to hit!</p>
      )}
    </div>
  );
}

export default App;
