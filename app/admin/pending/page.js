import { redirect } from "next/navigation";
import { currentUser } from "../../lib/session";
import { signOut } from "../(auth)/actions";

export const metadata = { title: "Waiting for approval" };

export default async function Pending() {
  const user = await currentUser();
  if (!user) redirect("/admin/sign-in");
  if (user.role) redirect("/admin");
  return (
    <main className="a-auth">
      <div className="a-card">
        <h1>Waiting for approval</h1>
        <p>
          You’re signed in as <strong>{user.email}</strong>, but a super administrator still needs to give your
          account access to the website editor.
        </p>
        <p className="muted small">Once you’ve been approved, refresh this page.</p>
        <form action={signOut}>
          <button className="btn secondary" type="submit">Sign out</button>
        </form>
      </div>
    </main>
  );
}
