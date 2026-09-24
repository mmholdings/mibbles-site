import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Container, Section, Eyebrow } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Your Privacy Choices",
  description: "Understand and exercise the privacy choices available to Mibbles users.",
};

export default function PrivacyChoicesPage() {
  return (
    <Section className="pt-16 md:pt-24">
      <Container size="sm">
        <Eyebrow>Privacy controls</Eyebrow>
        <h1 className="mt-4 mb-6 font-serif text-display-xl">Your Privacy Choices</h1>

        <div className="mb-10 rounded-3xl bg-ink-900 p-7 text-cream md:p-9">
          <ShieldCheck className="h-7 w-7 text-terracotta-300" strokeWidth={1.5} />
          <h2 className="mt-4 font-serif text-3xl text-cream">Your information is not for sale.</h2>
          <p className="mt-3 leading-relaxed text-cream/70">
            Mibbles does not sell personal information or share it for cross-context
            behavioral advertising. Most cat profiles, play history, photos, and
            recordings stay on your device.
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <h2>Choices available to you</h2>
          <ul>
            <li><strong>Access or know:</strong> ask what personal information we control about you.</li>
            <li><strong>Correct:</strong> ask us to correct inaccurate information.</li>
            <li><strong>Delete:</strong> request deletion, subject to legal exceptions.</li>
            <li><strong>Marketing:</strong> unsubscribe using the link in any newsletter.</li>
            <li><strong>Device permissions:</strong> change camera, photo, and notification access in iOS Settings.</li>
            <li><strong>Account data:</strong> use Settings → Account → Delete Account in Mibbles.</li>
          </ul>

          <h2>Sale, sharing, and preference signals</h2>
          <p>
            Because Mibbles does not sell personal information or share it for
            cross-context behavioral advertising, there is no sale or sharing to opt
            out of at this time. We treat recognized browser privacy signals in
            accordance with applicable law. If our practices change, we will update
            this page and provide the required controls before beginning that activity.
          </p>

          <h2>Submit a privacy request</h2>
          <p>
            Email us from the address connected with your request and describe the
            right you want to exercise. We may need limited information to verify your
            identity. We will not discriminate against you for making a request.
          </p>
          <a
            href="mailto:privacy@mibbles.app?subject=Mibbles%20Privacy%20Request"
            className="not-prose mt-5 inline-flex h-12 items-center gap-2 rounded-full bg-ink-900 px-6 font-medium text-cream no-underline hover:bg-ink-700"
          >
            Submit a privacy request <ArrowRight className="h-4 w-4" />
          </a>

          <h2>Related notices</h2>
          <p>
            Read our <Link href="/privacy">Privacy Policy</Link>,{" "}
            <Link href="/ccpa">CCPA Notice</Link>, and{" "}
            <Link href="/consumer-health-data">Consumer Health Data Privacy Notice</Link>.
          </p>
        </div>
      </Container>
    </Section>
  );
}
