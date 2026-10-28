import Link from "next/link";
import AuthForm from "../auth-form";
import { signIn } from "../actions";

export const metadata = { title: "Sign in" };

export default async function SignIn({ searchParams }) {
  const { reset } = await searchParams;
  return (
    <main className="a-auth">
      <div className="a-card">
        <h1>Pathak100MPH admin</h1>
        <p className="muted">Sign in to manage the website.</p>
        {reset && <p className="notice ok">Password updated. Sign in with your new password.</p>}
        <AuthForm
          action={signIn}
          fields={[
            { name: "email", label: "Email", type: "email", autoComplete: "username" },
            { name: "password", label: "Password", type: "password", autoComplete: "current-password" },
          ]}
          submit="Sign in"
        />
        <p className="small" style={{ marginTop: 16 }}>
          <Link href="/admin/forgot-password">Forgot your password?</Link>
          {" · "}
          <Link href="/admin/sign-up">Request an account</Link>
        </p>
      </div>
    </main>
  );
}
