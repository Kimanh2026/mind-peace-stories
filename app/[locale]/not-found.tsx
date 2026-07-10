import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-content flex min-h-[50vh] flex-col items-center justify-center py-24 text-center">
      <p className="eyebrow justify-center">404</p>
      <h1 className="h-display mt-3 text-3xl">This page has wandered off</h1>
      <p className="mt-3 text-charcoal/70">Trang này không tồn tại. The page you're looking for doesn't exist.</p>
      <Link href="/en" className="btn-primary mt-8">Back to home / Về trang chủ</Link>
    </div>
  );
}
