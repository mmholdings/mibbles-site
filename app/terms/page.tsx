import type { Metadata } from "next";
import { Container, Section, Eyebrow } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms governing your use of Mibbles.",
};

export default function TermsPage() {
  return (
    <Section className="pt-16 md:pt-24">
      <Container size="sm">
        <Eyebrow>Last updated · January 2026</Eyebrow>
        <h1 className="font-serif text-display-xl mt-4 mb-6">Terms of Service</h1>

        <div className="prose prose-lg max-w-none">
          <p className="lead">
            These terms govern your use of the Mibbles iOS app and this
            website. By using Mibbles, you agree to them.
          </p>

          <h2>The app, in plain English</h2>
          <p>
            Mibbles is a wellness app. It is not a medical device, not a
            veterinary service, and not a substitute for professional veterinary
            care. Always consult a licensed vet for medical concerns about your cat.
          </p>

          <h2>Subscriptions</h2>
          <p>
            Mibbles offers a 7-day free trial, after which you&apos;ll be
            charged for your chosen plan (weekly or annual) unless you cancel.
            Cancel anytime from iPhone Settings → Apple ID → Subscriptions.
            All billing is handled by Apple — refunds go through{" "}
            <a href="https://reportaproblem.apple.com" target="_blank" rel="noopener">reportaproblem.apple.com</a>.
          </p>

          <h2>Acceptable use</h2>
          <p>
            Don&apos;t reverse engineer the app, scrape this website, or use
            Mibbles to harm a cat. Yes, we have to say it.
          </p>

          <h2>Liability</h2>
          <p>
            Mibbles is provided &quot;as is.&quot; We disclaim warranties to the
            maximum extent permitted by law. We are not liable for indirect
            damages.
          </p>

          <hr />
          <p className="text-sm text-ink-500">
            [Insert full legal terms here — generated via Termly or written by
            your attorney. The above is a friendly summary, not a substitute
            for legal terms.]
          </p>
        </div>
      </Container>
    </Section>
  );
}
