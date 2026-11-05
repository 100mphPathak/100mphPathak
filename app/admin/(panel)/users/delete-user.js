"use client";

import { useTransition } from "react";
import { callServer } from "../call-server";
import { askConfirm, showResult } from "../../feedback";
import { deleteUser } from "./actions";

export default function DeleteUser({ userId, email }) {
  const [pending, startTransition] = useTransition();
  const remove = async () => {
    if (!(await askConfirm(`Delete ${email}? They won’t be able to sign in again. This can’t be undone.`, { danger: true }))) return;
    startTransition(async () => showResult(await callServer(() => deleteUser(userId))));
  };
  return <button className="btn danger" disabled={pending} onClick={remove} type="button">{pending ? "Deleting…" : "Delete"}</button>;
}
