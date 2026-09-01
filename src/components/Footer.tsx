import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted">
      <div className="container py-12">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-foreground">SyncSales</span>
          </div>

          <div className="text-center md:text-right">
            <p className="mb-4 text-sm text-muted-foreground">
              Transform your sales pipeline today
            </p>
            <Link
              href="/contact?source=free-trial"
              className="gradient-primary inline-flex h-10 items-center justify-center rounded-md px-6 font-medium text-white transition-transform duration-200 hover:scale-105"
            >
              Start Free Trial
            </Link>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} SyncSales. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
