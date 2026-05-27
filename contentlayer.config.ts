import { defineDocumentType, makeSource } from "contentlayer2/source-files";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";
import readingTime from "reading-time";

const FAQItem = {
  question: { type: "string", required: true },
  answer: { type: "string", required: true },
};

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: "blog/**/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: false },
    metaTitle: { type: "string", required: false },
    metaDescription: { type: "string", required: false },
    primaryKeyword: { type: "string", required: true },
    secondaryKeywords: { type: "list", of: { type: "string" }, required: false },
    category: {
      type: "enum",
      options: ["Behavior", "Enrichment", "Health", "How-To", "Trends", "Nutrition", "Training", "Mental Health", "Breeds"],
      required: true,
    },
    tags: { type: "list", of: { type: "string" }, required: false },
    publishDate: { type: "date", required: true },
    updatedDate: { type: "date", required: false },
    author: { type: "string", required: false, default: "Mibbles Team" },
    heroImage: { type: "string", required: false },
    heroImageAlt: { type: "string", required: false },
    ogImage: { type: "string", required: false },
    featured: { type: "boolean", required: false, default: false },
    draft: { type: "boolean", required: false, default: false },
    faq: { type: "list", of: { type: "json" }, required: false },
    schema: { type: "list", of: { type: "string" }, required: false, default: ["Article"] },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (post) => post._raw.flattenedPath.replace(/^blog\//, ""),
    },
    url: {
      type: "string",
      resolve: (post) => `/blog/${post._raw.flattenedPath.replace(/^blog\//, "")}`,
    },
    readingTime: {
      type: "json",
      resolve: (post) => readingTime(post.body.raw),
    },
    headings: {
      type: "json",
      resolve: (post) => {
        const regex = /^(##|###)\s+(.+)$/gm;
        const headings: { level: number; text: string; slug: string }[] = [];
        let match;
        while ((match = regex.exec(post.body.raw)) !== null) {
          const level = match[1].length;
          const text = match[2].trim();
          const slug = text
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-");
          headings.push({ level, text, slug });
        }
        return headings;
      },
    },
  },
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        { behavior: "wrap", properties: { className: ["heading-anchor"] } },
      ],
    ],
  },
});
