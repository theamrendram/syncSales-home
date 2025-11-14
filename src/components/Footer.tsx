import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="container py-12">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-white">SyncSales</span>
          </div>

          <div className="text-center md:text-right">
            <p className="mb-4 text-sm text-gray-400">
              Transform your sales pipeline today
            </p>
            {/* OLD START FREE TRIAL BUTTON - COMMENTED OUT
            <Link
              href="/checkout"
              className="inline-flex h-10 px-6 gradient-primary text-white rounded-lg font-medium items-center justify-center hover:scale-105 transition-transform duration-200">
              Start Free Trial
            </Link>
            */}
            {/* NEW START FREE TRIAL BUTTON - REDIRECTS TO CONTACT PAGE */}
            <Link
              href="/contact?source=free-trial"
              className="gradient-primary inline-flex h-10 items-center justify-center rounded-lg px-6 font-medium text-white transition-transform duration-200 hover:scale-105"
            >
              Start Free Trial
            </Link>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-8 text-center">
          <p className="text-sm text-gray-500">
            © 2024 SyncSales. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
