import LegalPage from "../../components/LegalPage";
import { pageMetadata } from "../../lib/content";

export const generateMetadata = () => pageMetadata("privacy");

export default function Page() {
  return <LegalPage slug="privacy" />;
}
