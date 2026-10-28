import { can } from "../../../lib/permissions";
import { requirePage } from "../../../lib/session";
import Library from "./library";

export const metadata = { title: "Media" };

export default async function MediaPage() {
  const user = await requirePage("media.view");
  return (
    <>
      <div className="a-top"><h1>Media library</h1></div>
      <Library canDelete={can(user.role, "media.delete")} />
    </>
  );
}
