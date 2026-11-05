import LegalPage from "../../components/LegalPage";
import { pageMetadata } from "../../lib/content";

export const generateMetadata = () => pageMetadata("return-policy");

export default function Page() {
  return <LegalPage slug="return-policy" />;
}
