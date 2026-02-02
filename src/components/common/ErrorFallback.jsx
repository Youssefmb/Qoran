export default function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div style={{ padding: 24, textAlign: "center" }}>
      <h2>⚠️ Something went wrong</h2>

      <p style={{ color: "red" }}>
        {error?.message || "Unexpected error"}
      </p>

      <button onClick={resetErrorBoundary}>
        Reload page
      </button>
    </div>
  );
}
