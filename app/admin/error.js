"use client";

// Shown instead of a blank "Application error" screen if anything in the admin fails unexpectedly.
export default function AdminError({ error, reset }) {
  return (
    <main className="a-main" id="main">
      <div className="a-card" role="alert">
        <h1>Something went wrong</h1>
        <p>
          This screen hit an unexpected problem. If you were editing, unsaved changes on this screen may be lost.
          Usually reloading the page fixes it.
        </p>
        <div className="actions-row">
          <button className="btn" onClick={() => window.location.reload()} type="button">Reload the page</button>
          <button className="btn secondary" onClick={() => reset()} type="button">Try again</button>
          <a className="btn secondary" href="/admin">Go to the dashboard</a>
        </div>
        {error?.digest && <p className="small muted" style={{ marginTop: 14 }}>Error code for support: {error.digest}</p>}
      </div>
    </main>
  );
}
