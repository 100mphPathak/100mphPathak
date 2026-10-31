"use client";
import { useActionState } from "react";
import { useResultToast } from "../feedback";


export default function AuthForm({ action, fields, submit, hidden = {} }) {

  const [state, formAction, pending] = useActionState(action, {});
  useResultToast(state);

  return (

    <form action={formAction} noValidate={false}>
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
