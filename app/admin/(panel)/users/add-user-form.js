"use client";

import { useActionState } from "react";
import { ROLES } from "../../../lib/permissions";
import { useResultToast } from "../../feedback";
import { createUser } from "./actions";

// "Add admin": the login is created on the server (createUser); this only shows errors and the "Creating…" state.
export default function AddUserForm() {
  const [state, formAction, pending] = useActionState(createUser, {});
  useResultToast(state);
  return (
    // key: after a success the form remounts empty; after an error it keeps what was typed (except the password).
    <form action={formAction} className="a-card" key={state.done ?? "form"}>
      <h2>Add an admin</h2>
      <label className="field">
        <span>Name</span>
        <input autoComplete="off" defaultValue={state.name} maxLength={80} name="name" required />
      </label>
      <label className="field">
        <span>Email</span>
        <input autoComplete="off" defaultValue={state.email} name="email" required type="email" />
      </label>
      <label className="field">
        <span>Password (at least 8 characters)</span>
        <input autoComplete="new-password" minLength={8} name="password" required type="password" />
      </label>
      <label className="field">
        <span>Access</span>
        <select defaultValue={state.role ?? ""} name="role" required>
          <option disabled value="">Choose an access level</option>
          {Object.entries(ROLES).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
        </select>
      </label>
      <button className="btn" disabled={pending} type="submit">{pending ? "Creating…" : "Create admin"}</button>
    </form>
  );
}
