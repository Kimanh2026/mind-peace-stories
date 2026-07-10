import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, locales, type Locale } from "@/lib/i18n";
import { Section, CTAPair } from "@/components/Section";
import { FadeIn } from "@/components/motion";
import { SevenDotArc } from "@/components/Brand";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getDictionary(locale).blog.posts.map((post) => ({ locale, slug: post.slug }))
  );
}

export function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Metadata {
  const t = getDictionary(isLocale(params.locale) ? params.locale : "en");
  const post = t.blog.posts.find((p) => p.slug === params.slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default function BlogPostPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const locale = (isLocale(params.locale) ? params.locale : "en") as Locale;
  const t = getDictionary(locale);
  const post = t.blog.posts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const fmt = new Intl.DateTimeFormat(locale === "vi" ? "vi-VN" : "en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <Section className="!pb-8">
        <FadeIn className="mx-auto max-w-2xl">
          <Link href={`/${locale}/blog`} className="focus-ring rounded text-sm font-semibold text-sagedeep hover:text-forest">
            ← {t.nav.blog}
          </Link>
          <p className="mt-6 text-xs uppercase tracking-widest text-sagedeep">
            {fmt.format(new Date(post.date))} · {post.readTime} {t.blog.readTime}
          </p>
          <h1 className="h-display mt-3 text-3xl leading-snug sm:text-4xl">{post.title}</h1>
          <SevenDotArc className="mt-6 h-6 w-24" />
        </FadeIn>
      </Section>
      <Section className="!pt-4">
        <FadeIn className="prose-calm mx-auto max-w-2xl text-base sm:text-lg">
          {post.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </FadeIn>
        <FadeIn className="mx-auto mt-14 max-w-2xl rounded-xl2 bg-pine p-8 text-center sm:p-10">
          <h2 className="h-display !text-paper text-2xl">{t.home.finalCta.title}</h2>
          <p className="mt-3 text-paper/75">{t.home.finalCta.body}</p>
          <div className="mt-7 flex justify-center">
            <CTAPair locale={locale} t={t} invert center />
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
