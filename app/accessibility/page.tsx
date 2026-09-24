import type { Metadata } from "next";
import { Container, Section, Eyebrow } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description: "Mibbles' commitment to an accessible website and app experience.",
};

export default function AccessibilityPage() {
  return (
    <Section className="pt-16 md:pt-24">
      <Container size="sm">
        <Eyebrow>Last updated · September 24, 2026</Eyebrow>
        <h1 className="mt-4 mb-6 font-serif text-display-xl">Accessibility Statement</h1>

        <div className="prose prose-lg max-w-none">
          <p className="lead">
            Mibbles wants its website and app to be usable by as many people as
            possible, including people with disabilities. Accessibility is an
            ongoing part of how we design, write, and improve the experience.
          </p>

          <h2>Our approach</h2>
          <p>
            We use the Web Content Accessibility Guidelines (WCAG) 2.2 Level AA as
            a reference for our ongoing accessibility work. This statement describes
            our goal and process; it is not a certification that every page or feature
            currently conforms to every success criterion.
          </p>

          <h2>Measures we take</h2>
          <ul>
            <li>use semantic page structure, headings, labels, and meaningful link text;</li>
            <li>provide text alternatives for meaningful website images;</li>
            <li>support keyboard navigation and visible focus indicators;</li>
            <li>design responsive layouts that can be enlarged and used across screen sizes;</li>
            <li>review color contrast, form instructions, and error messaging; and</li>
            <li>consider accessibility when adding new content and features.</li>
          </ul>

          <h2>Feedback and assistance</h2>
          <p>
            If you encounter a barrier or need information in another format, email{" "}
            <a href="mailto:support@mibbles.app?subject=Accessibility%20Feedback">
              support@mibbles.app
            </a>. Please include the page or feature, what happened, and the assistive
            technology or browser you were using if you are comfortable sharing it.
            We will review the issue and work toward a reasonable solution.
          </p>

          <h2>Third-party services</h2>
          <p>
            Some links or services are provided by third parties, including Apple.
            We cannot control the accessibility of third-party experiences, but we
            welcome feedback that helps us choose and work with accessible providers.
          </p>

          <h2>Ongoing improvement</h2>
          <p>
            We periodically review the website as content and technology change. This
            statement will be updated when our accessibility practices materially change.
          </p>
        </div>
      </Container>
    </Section>
  );
}
