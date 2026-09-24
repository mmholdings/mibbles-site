import type { Metadata } from "next";
import { Container, Section, Eyebrow } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "CCPA Notice",
  description: "California privacy disclosures and rights for Mibbles users and website visitors.",
};

export default function CCPAPage() {
  return (
    <Section className="pt-16 md:pt-24">
      <Container size="sm">
        <Eyebrow>Last updated · September 24, 2026</Eyebrow>
        <h1 className="mt-4 mb-6 font-serif text-display-xl">CCPA Notice</h1>

        <div className="prose prose-lg max-w-none">
          <p className="lead">
            This notice supplements the Mibbles Privacy Policy and describes our
            practices and California residents&apos; rights under the California
            Consumer Privacy Act, as amended by the California Privacy Rights Act.
          </p>

          <h2>Personal information we collect</h2>
          <p>
            Depending on how you use Mibbles, we may collect the following categories
            of personal information. Not every category is collected from every person.
          </p>
          <ul>
            <li><strong>Identifiers:</strong> name, email address, Sign in with Apple identifier, and account or support-request identifiers.</li>
            <li><strong>Commercial information:</strong> subscription, purchase, receipt, and entitlement information provided by Apple or RevenueCat.</li>
            <li><strong>Internet or electronic activity:</strong> app interactions, website activity, diagnostic events, and device or browser information.</li>
            <li><strong>Audio, visual, or similar information:</strong> content you choose to include in a support request. Cat Cam recordings and profile images otherwise remain on your device or in your photo library unless you choose to share them.</li>
            <li><strong>Inferences:</strong> preferences or engagement insights generated from app activity, primarily stored on your device.</li>
          </ul>

          <h2>Sources and business purposes</h2>
          <p>
            We receive information directly from you, from your use of the app or
            website, and from providers such as Apple and RevenueCat. We use it to
            provide and secure Mibbles, manage subscriptions, remember settings,
            respond to requests, send communications you request, diagnose problems,
            analyze performance, and meet legal obligations.
          </p>

          <h2>Disclosure of personal information</h2>
          <p>
            We disclose information only as reasonably necessary to service providers
            that support distribution, subscriptions, hosting, database storage,
            email delivery, analytics, and diagnostics. These providers include Apple,
            RevenueCat, Supabase, Resend, Railway, and analytics providers when enabled.
            We may also disclose information to comply with law, protect rights and
            safety, or complete a corporate transaction subject to appropriate safeguards.
          </p>

          <h2>No sale or cross-context behavioral advertising</h2>
          <p>
            Mibbles does not sell personal information or share it for cross-context
            behavioral advertising. We have not done so during the preceding 12 months.
            We do not knowingly sell or share the personal information of consumers
            under 16.
          </p>

          <h2>Retention</h2>
          <p>
            We keep each category only as long as reasonably necessary for the purpose
            for which it was collected, including to provide the service, maintain
            security and records, resolve disputes, and satisfy legal or accounting
            obligations. Retention varies based on the type of information and your
            relationship with Mibbles.
          </p>

          <h2>Your California privacy rights</h2>
          <p>Subject to applicable exceptions, California residents may request to:</p>
          <ul>
            <li>know the categories and specific pieces of personal information we hold;</li>
            <li>delete personal information;</li>
            <li>correct inaccurate personal information;</li>
            <li>opt out of sale or sharing, if those practices begin; and</li>
            <li>limit certain uses of sensitive personal information, when applicable.</li>
          </ul>
          <p>
            We will not discriminate against you for exercising a privacy right. See{" "}
            <a href="/privacy-choices">Your Privacy Choices</a> or email{" "}
            <a href="mailto:privacy@mibbles.app">privacy@mibbles.app</a> to submit a request.
          </p>

          <h2>Verification and authorized agents</h2>
          <p>
            We may ask for information needed to reasonably verify your identity and
            match your request to our records. An authorized agent may submit a request
            on your behalf; we may request proof of authorization and may ask you to
            confirm the request directly.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about this notice can be sent to{" "}
            <a href="mailto:privacy@mibbles.app">privacy@mibbles.app</a>.
          </p>
        </div>
      </Container>
    </Section>
  );
}
