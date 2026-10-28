"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { restoreRevision } from "../actions";

export default function RestoreButton({ slug, revisionId, number }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const restore = () => {
    if (!window.confirm(`Restore version ${number} as a new draft? Nothing goes live until you publish it.`)) return;
    startTransition(async () => {
      const result = await restoreRevision(slug, revisionId);
      window.alert(result.ok ?? result.error);
      if (result.ok) router.push(`/admin/pages/${slug}`);
    });
  };
  return (
    <button className="btn secondary small" disabled={pending} onClick={restore} type="button">
      Restore
    </button>
  );
}
