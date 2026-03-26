function Controls({ state, onSelectStyle, onPlayShot, onNextBall, onRestart }) {
  const { phase, battingStyle } = state;

  return (
    <div className="controls">
      {/* Batting style buttons */}
      <div className="style-buttons">
        <button
          className={`style-btn aggressive ${battingStyle === "aggressive" ? "active" : ""}`}
          onClick={() => onSelectStyle("aggressive")}
          disabled={phase === "bowling" || phase === "batting" || phase === "gameover"}
        >
          ⚔️ Aggressive
        </button>
        <button
          className={`style-btn defensive ${battingStyle === "defensive" ? "active" : ""}`}
          onClick={() => onSelectStyle("defensive")}
          disabled={phase === "bowling" || phase === "batting" || phase === "gameover"}
        >
          🛡️ Defensive
        </button>
      </div>

      {/* Play shot button — shown when ready or batting */}
      {(phase === "ready" || phase === "batting") && (
        <button className="play-btn" onClick={onPlayShot}>
          🏏 Play Shot!
        </button>
      )}

      {/* Next ball button — shown after result */}
      {phase === "result" && (
        <button className="next-btn" onClick={onNextBall}>
          ➡️ Next Ball
        </button>
      )}

      {/* Restart button — always visible */}
      <button className="restart-btn" onClick={onRestart}>
        🔄 Restart
      </button>
    </div>
  );
}

export default Controls;
