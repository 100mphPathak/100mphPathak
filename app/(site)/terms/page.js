import LegalPage from "../../components/LegalPage";
import { pageMetadata } from "../../lib/content";

export const generateMetadata = () => pageMetadata("terms");

export default function Page() {
  return <LegalPage slug="terms" />;
}
