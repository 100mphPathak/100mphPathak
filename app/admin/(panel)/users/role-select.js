"use client";

import { useState, useTransition } from "react";
import { ROLES } from "../../../lib/permissions";
import { callServer } from "../call-server";
import { askConfirm, showResult } from "../../feedback";
import { setRole } from "./actions";

export default function RoleSelect({ userId, role }) {
  const [value, setValue] = useState(role);
  const [pending, startTransition] = useTransition();
  const change = async (next) => {
    const label = next ? ROLES[next] : "no access";
    if (!(await askConfirm(`Change this person’s access to: ${label}?`))) return;
    startTransition(async () => {
      const result = await callServer(() => setRole(userId, next || null));
      showResult(result);
      if (result.ok) setValue(next);
    });
  };
  return (
    <>
      <select aria-label="Access level" disabled={pending} onChange={(e) => change(e.target.value)} value={value}>
        <option value="">No access</option>
        {Object.entries(ROLES).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
      </select>
    </>
  );
}
