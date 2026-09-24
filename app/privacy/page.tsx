import type { Metadata } from "next";
import { Container, Section, Eyebrow } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Mibbles collects, uses, and protects information in the app and on this website.",
};

export default function PrivacyPage() {
  return (
    <Section className="pt-16 md:pt-24">
      <Container size="sm">
        <Eyebrow>Last updated · September 24, 2026</Eyebrow>
        <h1 className="font-serif text-display-xl mt-4 mb-6">Privacy Policy</h1>

        <div className="prose prose-lg max-w-none">
          <p className="lead">
            Mibbles is designed to keep most personal information on your device.
            This policy explains what the Mibbles iOS app and mibbles.app collect,
            why we use it, and the choices available to you.
          </p>

          <h2>Information used by the iOS app</h2>
          <ul>
            <li>
              <strong>Account and profile information.</strong> If you use Sign in
              with Apple, Apple may provide an account identifier and, depending on
              your choices, your name or relay email address. Your Mibbles profile,
              cat profiles, preferences, progress, and play history are stored on
              your device.
            </li>
            <li>
              <strong>Purchases and subscriptions.</strong> Apple processes payments.
              RevenueCat receives an anonymous app user identifier, purchase history,
              receipt information, entitlement status, and limited device information
              so that Mibbles can offer, validate, restore, and analyze subscriptions.
              Mibbles does not receive your full payment-card details.
            </li>
            <li>
              <strong>Camera, photos, and replays.</strong> Camera access is used only
              when you choose Cat Cam or recording features. Video, photos, and cat
              profile images remain on your device or in your photo library unless
              you choose to share or export them. Mibbles does not upload Cat Cam
              video to its servers.
            </li>
            <li>
              <strong>Diagnostics.</strong> Apple may provide aggregated crash and
              performance information through App Store Connect or TestFlight when
              you have allowed Apple to share it with developers.
            </li>
          </ul>

          <h2>Information collected on this website</h2>
          <ul>
            <li>
              <strong>Newsletter.</strong> If you subscribe, we collect
              your email address and the signup source. This information is stored
              with our database and email-service providers.
            </li>
            <li>
              <strong>Support and contact requests.</strong> We collect the name,
              email address, subject, and message you submit so we can respond.
            </li>
            <li>
              <strong>Website analytics and logs.</strong> We may receive limited
              device, browser, page-view, and server-log information through our
              hosting and analytics providers. Where used, analytics are configured
              to minimize identifying information.
            </li>
          </ul>

          <h2>How we use information</h2>
          <p>
            We use information to provide and secure Mibbles, remember your settings,
            process and restore subscriptions, answer support requests, operate the
            website and newsletter, diagnose problems, and understand how our
            products perform. We do not sell personal information or use it for
            third-party advertising.
          </p>

          <h2>Service providers</h2>
          <p>
            We share only the information necessary for vendors to perform services
            for us. These providers include Apple (distribution, Sign in with Apple,
            payments, and diagnostics), RevenueCat (subscription management),
            Supabase (website newsletter storage), Resend (email delivery), Railway
            (website hosting), and Plausible or Google Analytics when enabled for
            website analytics. Their handling of information is governed by their
            own terms and privacy policies.
          </p>

          <h2>Retention and deletion</h2>
          <p>
            You can delete your Mibbles account and on-device app data from
            Settings → Account → Delete Account. Deleting the app does not cancel an
            Apple subscription; subscriptions can be managed in your Apple ID
            settings. To request deletion of newsletter, support, or other website
            information, email <a href="mailto:privacy@mibbles.app">privacy@mibbles.app</a>.
            We retain information only as long as reasonably necessary for the uses
            described here and for legal, security, or accounting obligations.
          </p>

          <h2>Your choices and rights</h2>
          <p>
            You may decline optional permissions such as camera or photo-library
            access, unsubscribe from marketing emails, and request access,
            correction, or deletion of personal information we control. Depending
            on where you live, additional rights may apply. We will not discriminate
            against you for exercising a privacy right.
          </p>

          <h2>Additional notices</h2>
          <p>
            California residents can review our <a href="/ccpa">CCPA Notice</a> and
            everyone can use <a href="/privacy-choices">Your Privacy Choices</a> to
            understand or exercise available privacy rights. Our separate{" "}
            <a href="/consumer-health-data">Consumer Health Data Privacy Notice</a>{" "}
            explains how laws covering human consumer health information relate to Mibbles.
          </p>

          <h2>Children</h2>
          <p>
            Mibbles is intended for adult cat owners and is not directed to children
            under 13. We do not knowingly collect personal information from children.
          </p>

          <h2>Security and international processing</h2>
          <p>
            We use reasonable administrative and technical safeguards, but no method
            of storage or transmission is completely secure. Our providers may
            process information in the United States and other countries where they
            operate.
          </p>

          <h2>Changes to this policy</h2>
          <p>
            We may update this policy as Mibbles changes. The date at the top shows
            when it was last revised. Material changes will be posted on this page.
          </p>

          <h2>Contact</h2>
          <p>
            Questions or privacy requests can be sent to{" "}
            <a href="mailto:privacy@mibbles.app">privacy@mibbles.app</a>.
          </p>
        </div>
      </Container>
    </Section>
  );
}
