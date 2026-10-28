import Link from "next/link";
import AuthForm from "../auth-form";
import { requestReset } from "../actions";

export const metadata = { title: "Reset password" };

export default function ForgotPassword() {
  return (
    <main className="a-auth">
      <div className="a-card">
        <h1>Reset your password</h1>
        <p className="muted">We’ll email you a link to choose a new password.</p>
        <AuthForm
          action={requestReset}
          fields={[{ name: "email", label: "Email", type: "email", autoComplete: "username" }]}
          submit="Send reset link"
        />
        <p className="small" style={{ marginTop: 16 }}>
          <Link href="/admin/sign-in">Back to sign in</Link>
        </p>
      </div>
    </main>
  );
}
