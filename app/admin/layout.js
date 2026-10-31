import "./admin.css";
import AdminFeedback from "./feedback";

// Everything under /admin depends on the signed-in user.
export const dynamic = "force-dynamic";

export const metadata = {
  title: { default: "Admin | Pathak100MPH", template: "%s | Pathak100MPH admin" },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }) {
  return (
    <>
      {children}
      <AdminFeedback />
    </>
  );
}
