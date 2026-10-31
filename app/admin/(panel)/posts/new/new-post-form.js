"use client";

import { useActionState } from "react";
import { useResultToast } from "../../../feedback";
import { createPost } from "../actions";

// Runs in the browser only to show errors and the "Creating…" state; saving happens in createPost() on the server.
export default function NewPostForm({ categories }) {
  const [state, formAction, pending] = useActionState(createPost, {});
  useResultToast(state);
  return (
    <form action={formAction}>
      <label className="field">
        <span>Title</span>
        <input defaultValue={state.title} maxLength={200} name="title" required type="text" />
      </label>
      <label className="field">
        <span>Category</span>
        <select defaultValue={state.category ?? ""} key={state.category} name="category" required>
          <option disabled value="">Choose a category</option>
          {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </label>
      <button className="btn" disabled={pending} type="submit">{pending ? "Creating…" : "Create post"}</button>
    </form>
  );
}
