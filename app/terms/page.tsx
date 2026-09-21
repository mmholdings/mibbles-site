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
        <Eyebrow>Last updated · September 20, 2026</Eyebrow>
        <h1 className="font-serif text-display-xl mt-4 mb-6">Terms of Service</h1>

        <div className="prose prose-lg max-w-none">
          <p className="lead">
            These Terms of Service govern your use of the Mibbles iOS app and
            mibbles.app. By downloading, accessing, or using Mibbles, you agree
            to these terms and Apple&apos;s applicable App Store terms.
          </p>

          <h2>What Mibbles provides</h2>
          <p>
            Mibbles offers interactive cat entertainment, enrichment tools,
            activity summaries, camera and replay features, and related content.
            Features may change as we improve the service.
          </p>

          <h2>Not veterinary advice</h2>
          <p>
            Mibbles is an entertainment and enrichment app. It is not a medical
            device, veterinary service, diagnostic tool, or substitute for
            professional veterinary care. Contact a licensed veterinarian for
            concerns about your cat&apos;s health or behavior.
          </p>

          <h2>Accounts</h2>
          <p>
            You are responsible for activity on your account and for keeping your
            device secure. You must provide accurate information and may not
            impersonate another person or misuse Sign in with Apple. You can delete
            your Mibbles account from Settings → Account → Delete Account.
          </p>

          <h2>Subscriptions and free trials</h2>
          <p>
            Mibbles may offer monthly and yearly auto-renewing subscriptions,
            including an introductory 7-day free trial when shown in the purchase
            screen. The exact price and trial terms displayed by Apple at purchase
            are controlling. Payment is charged to your Apple ID when you confirm
            the purchase. Unless canceled at least 24 hours before the end of the
            current period, a subscription renews automatically and Apple charges
            the renewal price within 24 hours before renewal.
          </p>
          <p>
            Manage or cancel a subscription in iPhone or iPad Settings → Apple ID
            → Subscriptions. Deleting your Mibbles account or the app does not cancel
            a subscription. Apple handles billing and refund requests; visit{" "}
            <a href="https://reportaproblem.apple.com" target="_blank" rel="noopener noreferrer">
              reportaproblem.apple.com
            </a>.
          </p>

          <h2>Acceptable use</h2>
          <p>You agree not to:</p>
          <ul>
            <li>use Mibbles unlawfully or in a way that could harm a person or animal;</li>
            <li>interfere with the app, website, accounts, or security controls;</li>
            <li>reverse engineer, scrape, copy, or redistribute Mibbles except where the law expressly permits it;</li>
            <li>upload, transmit, or share content that infringes rights or contains harmful code; or</li>
            <li>use Mibbles for commercial resale without written permission.</li>
          </ul>

          <h2>Your content</h2>
          <p>
            You retain ownership of photos, videos, names, and other content you
            create. You are responsible for having the rights needed to record,
            save, or share that content. Mibbles does not claim ownership of content
            that remains on your device.
          </p>

          <h2>Our intellectual property</h2>
          <p>
            The Mibbles name, characters, artwork, app, website, software, and other
            materials are owned by Mibbles or its licensors and are protected by
            intellectual-property laws. These terms give you a personal, limited,
            non-exclusive, non-transferable, revocable license to use Mibbles for
            its intended purpose.
          </p>

          <h2>Availability and changes</h2>
          <p>
            We may add, change, suspend, or discontinue features. We do not promise
            uninterrupted or error-free operation, and some features require a
            compatible device, internet access, permissions, or third-party service.
          </p>

          <h2>Disclaimer and limitation of liability</h2>
          <p>
            To the fullest extent permitted by law, Mibbles is provided &quot;as is&quot;
            and &quot;as available&quot; without warranties of any kind. We are not liable
            for indirect, incidental, special, consequential, or punitive damages,
            or for loss of data, profits, goodwill, or use arising from Mibbles.
            Nothing in these terms excludes rights or liability that cannot legally
            be excluded.
          </p>

          <h2>Termination</h2>
          <p>
            You may stop using Mibbles at any time. We may suspend or terminate
            access when reasonably necessary to protect Mibbles, users, third
            parties, or comply with law. Sections that by their nature should
            survive termination will continue to apply.
          </p>

          <h2>Changes to these terms</h2>
          <p>
            We may update these terms as Mibbles changes. The date at the top shows
            when they were last revised. Continued use after updated terms become
            effective means you accept them.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about these terms can be sent to{" "}
            <a href="mailto:support@mibbles.app">support@mibbles.app</a>.
          </p>
        </div>
      </Container>
    </Section>
  );
}
