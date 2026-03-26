import { getBallsRemaining, getOversDisplay, TOTAL_BALLS, TOTAL_WICKETS } from "../game/gameLogic";

function Scoreboard({ state }) {
  const ballsLeft = getBallsRemaining(state);
  const overs = getOversDisplay(state);

  return (
    <div className="scoreboard">
      <div className="score-item">
        <span className="score-label">Runs</span>
        <span className="score-value">{state.runs}</span>
      </div>
      <div className="score-item">
        <span className="score-label">Wickets</span>
        <span className="score-value">{state.wickets}/{TOTAL_WICKETS}</span>
      </div>
      <div className="score-item">
        <span className="score-label">Overs</span>
        <span className="score-value">{overs}</span>
      </div>
      <div className="score-item">
        <span className="score-label">Balls Left</span>
        <span className="score-value">{ballsLeft}</span>
      </div>
    </div>
  );
}

export default Scoreboard;
