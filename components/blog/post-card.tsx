import Link from "next/link";
import { type Post } from "contentlayer/generated";
import { Badge } from "@/components/ui/card";
import { BlogCoverArt } from "@/components/blog/blog-cover-art";
import { formatDate } from "@/lib/utils";

interface Props {
  post: Post;
  featured?: boolean;
}

export function PostCard({ post, featured = false }: Props) {
  if (featured) {
    return (
      <Link href={post.url} className="group block">
        <article className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="aspect-[4/3] relative rounded-2xl overflow-hidden bg-cream-200">
            <BlogCoverArt slug={post.slug} title={post.title} className="h-full w-full transition-transform duration-700 group-hover:scale-105" />
          </div>
          <div>
            <Badge>{post.category}</Badge>
            <h2 className="font-serif text-display-lg mt-4 mb-4 group-hover:text-terracotta-700 transition-colors text-balance">
              {post.title}
            </h2>
            <p className="text-lg text-ink-600 leading-relaxed mb-4 max-w-prose">
              {post.description}
            </p>
            <div className="text-sm text-ink-500">
              {formatDate(post.publishDate)} ·{" "}
              {Math.ceil((post.readingTime as any).minutes)} min read
            </div>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={post.url} className="group block">
      <article>
        <div className="aspect-[4/3] relative rounded-2xl overflow-hidden bg-cream-200 mb-5">
          <BlogCoverArt slug={post.slug} title={post.title} className="h-full w-full transition-transform duration-500 group-hover:scale-105" />
        </div>
        <Badge>{post.category}</Badge>
        <h3 className="font-serif text-xl md:text-2xl mt-3 mb-2 group-hover:text-terracotta-700 transition-colors text-balance">
          {post.title}
        </h3>
        <p className="text-ink-600 leading-relaxed text-[15px] line-clamp-2">
          {post.description}
        </p>
        <div className="mt-3 text-sm text-ink-500">
          {formatDate(post.publishDate)} ·{" "}
          {Math.ceil((post.readingTime as any).minutes)} min read
        </div>
      </article>
    </Link>
  );
}
