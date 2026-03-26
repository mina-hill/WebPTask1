// Probability distributions for each batting style
// All probabilities in each style must sum to 1.00

export const AGGRESSIVE = {
  label: "Aggressive",
  probabilities: {
    wicket: 0.35,
    0: 0.10,
    1: 0.10,
    2: 0.05,
    3: 0.05,
    4: 0.15,
    6: 0.20,
  },
};

export const DEFENSIVE = {
  label: "Defensive",
  probabilities: {
    wicket: 0.15,
    0: 0.20,
    1: 0.25,
    2: 0.20,
    3: 0.10,
    4: 0.07,
    6: 0.03,
  },
};

// Colors for each outcome segment in the power bar
export const OUTCOME_COLORS = {
  wicket: "#e53e3e",
  0: "#718096",
  1: "#48bb78",
  2: "#ecc94b",
  3: "#ed8936",
  4: "#4299e1",
  6: "#805ad5",
};

// Order of segments in the power bar (left to right)
export const OUTCOME_ORDER = ["wicket", 0, 1, 2, 3, 4, 6];

// Build segments array with start and end positions for the power bar
export function buildSegments(style) {
  let cursor = 0;
  return OUTCOME_ORDER.map((outcome) => {
    const prob = style.probabilities[outcome];
    const segment = {
      outcome,
      start: cursor,
      end: cursor + prob,
      color: OUTCOME_COLORS[outcome],
      probability: prob,
    };
    cursor += prob;
    return segment;
  });
}

// Given slider position (0 to 1), return the outcome
export function getOutcome(sliderPosition, style) {
  const segments = buildSegments(style);
  for (const seg of segments) {
    if (sliderPosition >= seg.start && sliderPosition < seg.end) {
      return seg.outcome;
    }
  }
  return segments[segments.length - 1].outcome;
}
