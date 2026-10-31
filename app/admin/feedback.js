"use client";

import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

// One place for everything the admin tells or asks the user:
// - toasts (react-hot-toast) for results like "Draft saved" or errors,
// - an in-app dialog instead of the browser's confirm() and prompt() boxes.
// <AdminFeedback /> is rendered once in app/admin/layout.js.

export { toast };

// Shows a server action's answer: { ok: "…" } as a success toast, { error: "…" } as an error toast.
export function showResult(result) {
  if (result?.ok) toast.success(result.ok);
  else if (result?.error) toast.error(result.error);
}

// For server pages: shows a toast once when the page opens (e.g. "Password updated").
export function ToastOnLoad({ text, type = "success" }) {
  useEffect(() => {
    toast[type](text, { id: text }); // the id stops a double toast in development
  }, [text, type]);
  return null;
}

// For forms using useActionState: shows the form's { ok } / { error } answer each time it changes.
export function useResultToast(state) {
  useEffect(() => showResult(state), [state]);
}

let openDialog = null; // set by <AdminFeedback /> while it is on the page

// Resolves true (OK) or false (Cancel).
export function askConfirm(message, { danger = false } = {}) {
  return new Promise((resolve) => (openDialog ? openDialog({ kind: "confirm", message, danger, resolve }) : resolve(false)));
}

// Resolves the typed text, or null if cancelled.
export function askText(message, defaultValue = "") {
  return new Promise((resolve) => (openDialog ? openDialog({ kind: "text", message, defaultValue, resolve }) : resolve(null)));
}

export default function AdminFeedback() {
  const [request, setRequest] = useState(null);
  const [value, setValue] = useState("");
  const dialog = useRef(null);

  useEffect(() => {
    openDialog = (next) => {
      setValue(next.defaultValue ?? "");
      setRequest(next);
    };
    return () => {
      openDialog = null;
    };
  }, []);

  useEffect(() => {
    if (request && !dialog.current?.open) dialog.current?.showModal();
  }, [request]);

  const finish = (answer) => {
    request.resolve(answer);
    setRequest(null);
  };
  const cancel = () => finish(request.kind === "confirm" ? false : null);

  return (
    <>
      <Toaster position="top-right" toastOptions={{ duration: 4000, error: { duration: 8000 }, style: { maxWidth: 460 } }} />
      {request && (
        <dialog
          aria-labelledby="ask-message"
          className="a-dialog a-ask"
          onCancel={(e) => {
            e.preventDefault(); // Esc key
            cancel();
          }}
          ref={dialog}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              finish(request.kind === "confirm" ? true : value);
            }}
          >
            <p id="ask-message">{request.message}</p>
            {request.kind === "text" && (
              <input aria-labelledby="ask-message" autoFocus onChange={(e) => setValue(e.target.value)} type="text" value={value} />
            )}
            <div className="actions-row a-ask-buttons">
              <button className="btn secondary" onClick={cancel} type="button">Cancel</button>
              <button autoFocus={request.kind === "confirm"} className={request.danger ? "btn danger" : "btn"} type="submit">OK</button>
            </div>
          </form>
        </dialog>
      )}
    </>
  );
}
