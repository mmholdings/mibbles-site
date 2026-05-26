import Link from "next/link";
import { Container, Section } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Section className="py-32">
      <Container size="md" className="text-center">
        <p className="text-sm uppercase tracking-widest text-terracotta-600">404</p>
        <h1 className="font-serif text-display-xl mt-4 mb-6">
          That page wandered off.
        </h1>
        <p className="text-ink-600 max-w-prose mx-auto mb-8">
          Like a cat at 3am, it&apos;s probably under the bed. Try the homepage or the blog.
        </p>
        <div className="flex justify-center gap-3">
          <Button href="/" variant="primary">Go home</Button>
          <Button href="/blog" variant="outline">Read the blog</Button>
        </div>
      </Container>
    </Section>
  );
}
