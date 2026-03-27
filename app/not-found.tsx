import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container-page py-16">
        <h1 className="text-2xl font-semibold text-slate-900">Page not found</h1>
        <p className="mt-2 text-slate-600">That URL does not exist.</p>
        <Link href="/" className="mt-6 inline-block text-blue-600 hover:underline">
          Back to home
        </Link>
      </div>
    </main>
  );
}
