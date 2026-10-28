"use client";

import { useState, useTransition } from "react";
import { ROLES } from "../../../lib/permissions";
import { setRole } from "./actions";

export default function RoleSelect({ userId, role }) {
  const [value, setValue] = useState(role);
  const [message, setMessage] = useState(null);
  const [pending, startTransition] = useTransition();
  const change = (next) => {
    const label = next ? ROLES[next] : "no access";
    if (!window.confirm(`Change this person’s access to: ${label}?`)) return;
    startTransition(async () => {
      const result = await setRole(userId, next || null);
      setMessage(result.ok ?? result.error);
      if (result.ok) setValue(next);
    });
  };
  return (
    <>
      <select aria-label="Access level" disabled={pending} onChange={(e) => change(e.target.value)} value={value}>
        <option value="">No access</option>
        {Object.entries(ROLES).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
      </select>
      {message && <span className="hint" role="status">{message}</span>}
    </>
  );
}
