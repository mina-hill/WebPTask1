import { useEffect, useRef } from "react";
import { buildSegments } from "../game/probabilities";
import { getStyle } from "../game/gameLogic";

function PowerBar({ state, onSliderUpdate }) {
  const sliderRef = useRef(0);
  const animRef = useRef(null);
  const SLIDER_SPEED = 0.006;

  const style = getStyle(state.battingStyle);
  const segments = style ? buildSegments(style) : [];

  // Animate slider when phase is "ready" or "batting"
  useEffect(() => {
    if (state.phase === "ready" || state.phase === "batting") {
      const animate = () => {
        sliderRef.current = sliderRef.current + SLIDER_SPEED;
        if (sliderRef.current >= 1) sliderRef.current = 0;
        onSliderUpdate(sliderRef.current);
        animRef.current = requestAnimationFrame(animate);
      };
      animRef.current = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(animRef.current);
    }

    return () => cancelAnimationFrame(animRef.current);
  }, [state.phase]);

  if (!style) {
    return (
      <div className="powerbar-container">
        <p className="powerbar-hint">Select a batting style to see the Power Bar</p>
      </div>
    );
  }

  return (
    <div className="powerbar-container">
      <p className="powerbar-title">⚡ Power Bar — {style.label}</p>

      {/* Segment bar */}
      <div className="powerbar">
        {segments.map((seg) => (
          <div
            key={seg.outcome}
            className="powerbar-segment"
            style={{ width: `${seg.probability * 100}%`, backgroundColor: seg.color }}
          >
            <span className="segment-label">
              {seg.outcome === "wicket" ? "W" : seg.outcome}
            </span>
          </div>
        ))}

        {/* Slider marker */}
        <div
          className="slider-marker"
          style={{ left: `${state.sliderPosition * 100}%` }}
        />
      </div>

      {/* Probability labels below */}
      <div className="powerbar-labels">
        {segments.map((seg) => (
          <div
            key={seg.outcome}
            className="prob-label"
            style={{ width: `${seg.probability * 100}%` }}
          >
            {Math.round(seg.probability * 100)}%
          </div>
        ))}
      </div>
    </div>
  );
}

export default PowerBar;
