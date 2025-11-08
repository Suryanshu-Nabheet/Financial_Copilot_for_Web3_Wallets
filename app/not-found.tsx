import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen gradient-bg-main flex items-center justify-center px-4">
      <div className="max-w-md w-full gradient-bg-card-premium rounded-2xl p-8 text-center">
        <div className="text-6xl font-bold gradient-text-gradient mb-4">404</div>
        <h1 className="text-2xl font-bold text-white mb-4">Page Not Found</h1>
        <p className="text-gray-400 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/landing"
            className="btn-gradient px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
          <Link
            href="/dashboard"
            className="px-6 py-3 rounded-xl font-semibold border-2 border-white/20 hover:border-white/40 transition-all text-white flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

