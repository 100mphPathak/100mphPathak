import Link from "next/link";
import AuthForm from "../auth-form";
import { signUp } from "../actions";

export const metadata = { title: "Request an account" };

export default function SignUp() {
  return (
    <main className="a-auth">
      <div className="a-card">
        <h1>Request an account</h1>
        <p className="muted">A super administrator must approve your account before you can edit the website.</p>
        <AuthForm
          action={signUp}
          fields={[
            { name: "name", label: "Your name", autoComplete: "name" },
            { name: "email", label: "Email", type: "email", autoComplete: "username" },
            { name: "password", label: "Password (at least 10 characters)", type: "password", autoComplete: "new-password", minLength: 10 },
          ]}
          submit="Create account"
        />
        <p className="small" style={{ marginTop: 16 }}>
          <Link href="/admin/sign-in">Back to sign in</Link>
        </p>
      </div>
    </main>
  );
}
