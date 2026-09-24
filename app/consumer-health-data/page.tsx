import type { Metadata } from "next";
import { Container, Section, Eyebrow } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Consumer Health Data Privacy Notice",
  description: "How Mibbles handles information that may be covered by consumer health privacy laws.",
};

export default function ConsumerHealthDataPage() {
  return (
    <Section className="pt-16 md:pt-24">
      <Container size="sm">
        <Eyebrow>Effective · September 24, 2026</Eyebrow>
        <h1 className="mt-4 mb-6 font-serif text-display-xl">Consumer Health Data Privacy Notice</h1>

        <div className="prose prose-lg max-w-none">
          <p className="lead">
            Mibbles is a cat entertainment and enrichment service—not a human health
            service. This notice explains our practices under laws that regulate
            consumer health data, including Washington&apos;s My Health My Data Act.
          </p>

          <h2>Consumer health data we collect</h2>
          <p>
            Mibbles does not intentionally collect information that identifies or is
            reasonably linkable to a consumer&apos;s past, present, or future physical or
            mental health. Cat profiles, feline engagement scores, play history, and
            animal-wellness information describe a pet, not the health of a human consumer.
          </p>
          <p>
            Please do not include human medical information in support messages or
            other free-form submissions. If you voluntarily provide such information,
            we may receive the content you submit and use it only to respond, protect
            the service, comply with law, or honor your request.
          </p>

          <h2>Sources and purposes</h2>
          <p>
            Any consumer health data we receive would come directly from information
            you voluntarily submit. We do not infer human health status from app play
            activity, use consumer health data for advertising, or combine it with
            information from data brokers.
          </p>

          <h2>Sharing</h2>
          <p>
            We do not sell consumer health data. Information included in a support or
            privacy request may be processed by service providers that help us host the
            website, store requests, or deliver email, such as Railway, Supabase, or
            Resend. We may also disclose information when required by law, to protect
            rights and safety, or in a business transaction subject to appropriate
            safeguards. Mibbles has no affiliates with separate access to consumer
            health data.
          </p>

          <h2>Your rights</h2>
          <p>
            Depending on your location, you may have the right to confirm whether we
            collect, share, or sell consumer health data; access that data; withdraw
            consent; or request deletion. You may also appeal a refusal to act on a
            request by replying to our decision and stating that you wish to appeal.
          </p>
          <p>
            Submit a request or appeal by emailing{" "}
            <a href="mailto:privacy@mibbles.app?subject=Consumer%20Health%20Data%20Request">
              privacy@mibbles.app
            </a>. We may ask for information reasonably necessary to verify your request.
          </p>

          <h2>Changes and contact</h2>
          <p>
            We will post material changes to this notice before they take effect.
            Questions can be sent to{" "}
            <a href="mailto:privacy@mibbles.app">privacy@mibbles.app</a>.
          </p>
        </div>
      </Container>
    </Section>
  );
}
