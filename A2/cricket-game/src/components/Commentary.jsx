function Commentary({ state }) {
  if (!state.lastCommentary) return null;

  return (
    <div className="commentary">
      <p>{state.lastCommentary}</p>
    </div>
  );
}

export default Commentary;
