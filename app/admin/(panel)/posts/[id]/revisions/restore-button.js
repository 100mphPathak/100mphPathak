"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { callServer } from "../../../call-server";
import { restorePostRevision } from "../../actions";

export default function RestoreButton({ postId, revisionId, number }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const restore = () => {
    if (!window.confirm(`Restore version ${number} as a new draft? Nothing goes live until you publish it.`)) return;
    startTransition(async () => {
      const result = await callServer(() => restorePostRevision(postId, revisionId));
      window.alert(result.ok ?? result.error);
      if (result.ok) router.push(`/admin/posts/${postId}`);
    });
  };
  return <button className="btn secondary small" disabled={pending} onClick={restore} type="button">{pending ? "Restoring…" : "Restore"}</button>;
}
