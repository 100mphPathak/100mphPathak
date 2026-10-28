"use client";

import { useActionState } from "react";

// fields: [{ name, label, type, autoComplete }]
export default function AuthForm({ action, fields, submit, hidden = {} }) {
  const [state, formAction, pending] = useActionState(action, {});
  return (
    <form action={formAction} noValidate={false}>
      {state.error && <p className="notice err" role="alert">{state.error}</p>}
      {state.ok && <p className="notice ok" role="status">{state.ok}</p>}
      {Object.entries(hidden).map(([name, value]) => (
        <input key={name} name={name} type="hidden" value={value} />
      ))}
      {fields.map((field) => (
        <label className="field" key={field.name}>
          <span>{field.label}</span>
          <input
            autoComplete={field.autoComplete}
            defaultValue={field.type === "password" ? undefined : state[field.name]}
            minLength={field.type === "password" ? field.minLength : undefined}
            name={field.name}
            required
            type={field.type ?? "text"}
          />
        </label>
      ))}
      <button className="btn" disabled={pending} type="submit">
        {pending ? "Please wait…" : submit}
      </button>
    </form>
  );
}
