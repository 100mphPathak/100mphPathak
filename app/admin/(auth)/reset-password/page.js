import Link from "next/link";
import AuthForm from "../auth-form";
import { resetPassword } from "../actions";

export const metadata = { title: "Choose a new password" };

export default async function ResetPassword({ searchParams }) {
  const { token = "" } = await searchParams;
  return (
    <main className="a-auth">
      <div className="a-card">
        <h1>Choose a new password</h1>
        <AuthForm
          action={resetPassword}
          fields={[{ name: "password", label: "New password (at least 10 characters)", type: "password", autoComplete: "new-password", minLength: 10 }]}
          hidden={{ token }}
          submit="Save new password"
        />
        <p className="small" style={{ marginTop: 16 }}>
          <Link href="/admin/sign-in">Back to sign in</Link>
        </p>
      </div>
    </main>
  );
}
