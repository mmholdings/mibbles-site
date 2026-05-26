import type { Metadata } from "next";
import { Container, Section, Eyebrow } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Mibbles handles your data — short version: we collect as little as possible.",
};

export default function PrivacyPage() {
  return (
    <Section className="pt-16 md:pt-24">
      <Container size="sm">
        <Eyebrow>Last updated · January 2026</Eyebrow>
        <h1 className="font-serif text-display-xl mt-4 mb-6">Privacy Policy</h1>

        <div className="prose prose-lg max-w-none">
          <p className="lead">
            We built Mibbles to collect as little data as possible. This page
            explains exactly what we do and don&apos;t collect — written in
            plain English. The legal version is at the bottom for completeness.
          </p>

          <h2>What we collect</h2>
          <ul>
            <li><strong>Account email</strong> — only if you create one for newsletter signup or support. Stored with our email provider.</li>
            <li><strong>Anonymous app usage</strong> — which screens you visit and which buttons you tap, so we can improve the app. No personally identifying information.</li>
            <li><strong>Crash reports</strong> — when the app crashes, we receive a stack trace via Apple&apos;s built-in TestFlight / App Store Connect tooling.</li>
          </ul>

          <h2>What we don&apos;t collect</h2>
          <ul>
            <li><strong>Cat Cam video.</strong> Ever. It stays on your device.</li>
            <li><strong>Your name, address, phone number, or contacts.</strong></li>
            <li><strong>Location data.</strong> Mibbles never asks for it.</li>
            <li><strong>Cat profile photos.</strong> They live on your device.</li>
          </ul>

          <h2>Third-party services</h2>
          <p>We use these vendors and only share the minimum data needed for them to function:</p>
          <ul>
            <li><strong>RevenueCat</strong> — manages subscriptions.</li>
            <li><strong>Plausible / Google Analytics</strong> — anonymous web analytics for this site.</li>
            <li><strong>Resend</strong> — sending newsletter and support emails.</li>
          </ul>

          <h2>Your rights</h2>
          <p>
            You can delete your account from Settings → Account → Delete
            account at any time. We&apos;ll remove your data within 30 days.
            EU and California residents have additional rights under GDPR
            and CCPA — email <a href="mailto:privacy@mibbles.app">privacy@mibbles.app</a>.
          </p>

          <h2>Contact</h2>
          <p>
            Privacy questions: <a href="mailto:privacy@mibbles.app">privacy@mibbles.app</a>.
          </p>

          <hr />
          <p className="text-sm text-ink-500">
            [Insert full legal privacy policy text here — generated via a service
            like Termly or written by your attorney.]
          </p>
        </div>
      </Container>
    </Section>
  );
}
