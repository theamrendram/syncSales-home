import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="container py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-white">SyncSales</span>
          </div>

          <div className="text-center md:text-right">
            <p className="text-gray-400 text-sm mb-4">
              Transform your sales pipeline today
            </p>
            <Link
              href="/checkout/free-trial"
              className="inline-flex h-10 px-6 gradient-primary text-white rounded-lg font-medium items-center justify-center hover:scale-105 transition-transform duration-200">
              Start Free Trial
            </Link>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © 2024 SyncSales. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
