import { useEffect, useRef, useState } from "react";

function Pitch({ state }) {
  const [ballPos, setBallPos] = useState({ x: 80, y: 30 }); // % positions
  const [showBat, setShowBat] = useState(false);
  const animRef = useRef(null);

  // Ball bowling animation: move ball from bowler end to batsman
  useEffect(() => {
    if (state.phase === "bowling") {
      let progress = 0;
      setBallPos({ x: 80, y: 30 });
      setShowBat(false);

      const animate = () => {
        progress += 2;
        // Ball moves from right (bowler) to left (batsman)
        const x = 80 - progress * 0.55;
        const y = 30 + Math.sin((progress / 100) * Math.PI) * 10;
        setBallPos({ x, y });

        if (progress < 100) {
          animRef.current = requestAnimationFrame(animate);
        }
      };
      animRef.current = requestAnimationFrame(animate);
    }

    if (state.phase === "batting") {
      setShowBat(true);
    }

    if (state.phase === "result" || state.phase === "idle" || state.phase === "ready") {
      setShowBat(false);
      setBallPos({ x: 80, y: 30 });
    }

    return () => cancelAnimationFrame(animRef.current);
  }, [state.phase]);

  // Pick background color hint based on outcome
  const getOutcomeClass = () => {
    if (state.phase !== "result") return "";
    if (state.lastOutcome === "wicket") return "wicket-flash";
    if (state.lastOutcome === 4 || state.lastOutcome === 6) return "boundary-flash";
    return "";
  };

  return (
    <div className={`pitch-container ${getOutcomeClass()}`}>
      {/* Cricket field SVG */}
      <svg className="pitch-svg" viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg">
        {/* Outfield */}
        <ellipse cx="250" cy="150" rx="240" ry="140" fill="#4a7c3f" />
        {/* Infield */}
        <ellipse cx="250" cy="150" rx="160" ry="90" fill="#5a9e50" />
        {/* Pitch strip */}
        <rect x="120" y="125" width="260" height="50" rx="4" fill="#c8a96e" />
        {/* Crease lines */}
        <line x1="155" y1="125" x2="155" y2="175" stroke="white" strokeWidth="2" />
        <line x1="345" y1="125" x2="345" y2="175" stroke="white" strokeWidth="2" />

        {/* Stumps (batsman side, left) */}
        <rect x="140" y="130" width="3" height="40" fill="#f5f5f5" />
        <rect x="147" y="130" width="3" height="40" fill="#f5f5f5" />
        <rect x="154" y="130" width="3" height="40" fill="#f5f5f5" />

        {/* Stumps (bowler side, right) */}
        <rect x="343" y="130" width="3" height="40" fill="#f5f5f5" />
        <rect x="350" y="130" width="3" height="40" fill="#f5f5f5" />
        <rect x="357" y="130" width="3" height="40" fill="#f5f5f5" />

        {/* Batsman (simple figure) */}
        {/* Body */}
        <rect x="110" y="145" width="18" height="28" rx="3" fill="#1a5276" />
        {/* Head */}
        <circle cx="119" cy="140" r="8" fill="#f4d03f" />
        {/* Helmet */}
        <path d="M111 138 Q119 130 127 138" fill="#1a5276" />
        {/* Bat — animate swing when batting */}
        <rect
          x="125"
          y="155"
          width="5"
          height="25"
          rx="2"
          fill="#b8860b"
          transform={showBat ? "rotate(-40 125 155)" : "rotate(0 125 155)"}
          style={{ transition: "transform 0.2s ease" }}
        />
        {/* Legs */}
        <rect x="112" y="173" width="6" height="14" rx="2" fill="#f0f0f0" />
        <rect x="120" y="173" width="6" height="14" rx="2" fill="#f0f0f0" />

        {/* Bowler (simple figure, far right) */}
        <circle cx="370" cy="142" r="7" fill="#f4d03f" />
        <rect x="363" y="149" width="14" height="22" rx="3" fill="#922b21" />
        <rect x="365" y="171" width="5" height="12" rx="2" fill="#f0f0f0" />
        <rect x="371" y="171" width="5" height="12" rx="2" fill="#f0f0f0" />

        {/* Cricket Ball — animated */}
        {state.phase !== "idle" && (
          <circle
            cx={`${ballPos.x * 5}`}
            cy={`${ballPos.y * 3}`}
            r="8"
            fill="#cc2200"
            stroke="#8b0000"
            strokeWidth="1"
          />
        )}

        {/* Crowd dots (decorative) */}
        {[...Array(30)].map((_, i) => (
          <circle
            key={i}
            cx={30 + (i % 10) * 44}
            cy={i < 10 ? 12 : i < 20 ? 285 : 10}
            r="4"
            fill={["#e74c3c","#3498db","#2ecc71","#f39c12"][i % 4]}
            opacity="0.7"
          />
        ))}
      </svg>

      {/* Outcome overlay */}
      {state.phase === "result" && state.lastOutcome !== null && (
        <div className="outcome-overlay">
          {state.lastOutcome === "wicket"
            ? "OUT! ❌"
            : state.lastOutcome === 6
            ? "SIX! 🚀"
            : state.lastOutcome === 4
            ? "FOUR! 🏏"
            : state.lastOutcome === 0
            ? "DOT BALL"
            : `${state.lastOutcome} RUN${state.lastOutcome > 1 ? "S" : ""}`}
        </div>
      )}

      {/* Game over overlay */}
      {state.phase === "gameover" && (
        <div className="gameover-overlay">
          <h2>INNINGS OVER</h2>
          <p>Score: {state.runs}/{state.wickets}</p>
          <p>Balls: {state.ballsPlayed}</p>
        </div>
      )}
    </div>
  );
}

export default Pitch;
