import { LocalizedPage } from "@/components/i18n/localized-page";
import { localizedMetadata } from "@/lib/i18n/site";
export function generateMetadata({ params }: { params: { locale: string } }) { return localizedMetadata(params.locale, "pricing"); }
export default function Page({ params }: { params: { locale: string } }) { return <LocalizedPage locale={params.locale} page="pricing" />; }
