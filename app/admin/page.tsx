import { Container, Section, Eyebrow } from "@/components/ui/container";
import { Card } from "@/components/ui/card";

/**
 * Admin dashboard — protected by basic auth via middleware.ts.
 * This is a static shell. Wire it to your analytics provider:
 *   - Plausible API for top queries / CTR
 *   - Resend API for newsletter list size
 *   - GitHub API for pending blog draft PRs
 */
export default function AdminDashboard() {
  return (
    <Section className="pt-16 md:pt-24">
      <Container>
        <Eyebrow>Admin</Eyebrow>
        <h1 className="font-serif text-display-lg mt-4 mb-12">Performance dashboard</h1>

        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <div className="text-sm uppercase tracking-widest text-ink-500 mb-2">Blog views (7d)</div>
            <div className="font-serif text-4xl">—</div>
            <div className="text-sm text-ink-500 mt-2">Wire to Plausible</div>
          </Card>
          <Card>
            <div className="text-sm uppercase tracking-widest text-ink-500 mb-2">App Store CTR</div>
            <div className="font-serif text-4xl">—</div>
            <div className="text-sm text-ink-500 mt-2">Track [data-analytics="app-store-cta"]</div>
          </Card>
          <Card>
            <div className="text-sm uppercase tracking-widest text-ink-500 mb-2">Newsletter signups</div>
            <div className="font-serif text-4xl">—</div>
            <div className="text-sm text-ink-500 mt-2">Wire to Resend audience</div>
          </Card>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <Card>
            <div className="text-sm uppercase tracking-widest text-ink-500 mb-3">Top blog posts (30d)</div>
            <div className="text-ink-500 text-sm">Wire to Plausible top-pages API.</div>
          </Card>
          <Card>
            <div className="text-sm uppercase tracking-widest text-ink-500 mb-3">Top search queries</div>
            <div className="text-ink-500 text-sm">Wire to Search Console API.</div>
          </Card>
        </div>

        <div className="mt-12">
          <Card>
            <div className="text-sm uppercase tracking-widest text-ink-500 mb-3">Pending blog drafts</div>
            <div className="text-ink-500 text-sm">
              Wire to <code className="px-1 bg-cream-200 rounded">GET /repos/:owner/:repo/pulls?state=open&labels=blog-draft</code>
            </div>
          </Card>
        </div>
      </Container>
    </Section>
  );
}
