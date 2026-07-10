import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { Section, SectionHeading } from "@/components/Section";
import { Stagger, StaggerItem } from "@/components/motion";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const t = getDictionary(isLocale(params.locale) ? params.locale : "en");
  return { title: t.nav.blog, description: t.blog.intro };
}

export default function BlogPage({ params }: { params: { locale: string } }) {
  const locale = (isLocale(params.locale) ? params.locale : "en") as Locale;
  const t = getDictionary(locale);

  const fmt = new Intl.DateTimeFormat(locale === "vi" ? "vi-VN" : "en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <Section className="!pb-8">
        <SectionHeading eyebrow={t.blog.eyebrow} title={t.blog.title} body={t.blog.intro} center />
      </Section>
      <Section className="!pt-8">
        <Stagger className="mx-auto grid max-w-4xl gap-6">
          {t.blog.posts.map((post) => (
            <StaggerItem key={post.slug}>
              <Link
                href={`/${locale}/blog/${post.slug}`}
                className="focus-ring group block rounded-xl2 border border-forest/10 bg-white/70 p-7 shadow-soft transition-all hover:shadow-lift sm:p-9"
              >
                <p className="text-xs uppercase tracking-widest text-sagedeep">
                  {fmt.format(new Date(post.date))} · {post.readTime} {t.blog.readTime}
                </p>
                <h2 className="h-display mt-2 text-2xl transition-colors group-hover:text-golddeep">{post.title}</h2>
                <p className="mt-3 leading-relaxed text-charcoal/75">{post.excerpt}</p>
                <p className="mt-4 text-sm font-semibold text-forest">{t.cta.readArticle} →</p>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>
    </>
  );
}
