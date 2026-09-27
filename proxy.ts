import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Host-based routing: report.hyprrx.com serves app/report/* at the root.
// hyprrx.com is untouched (its own routes render as before).

const SHORT_LINKS: Record<string, string> = {
  "/ig": "utm_source=instagram&utm_medium=social&utm_campaign=report79&utm_content=bio",
  "/fb": "utm_source=facebook&utm_medium=social&utm_campaign=report79&utm_content=page",
  "/tt": "utm_source=tiktok&utm_medium=social&utm_campaign=report79&utm_content=bio",
  "/dm": "utm_source=instagram&utm_medium=dm&utm_campaign=report79&utm_content=dm",
  "/story": "utm_source=instagram&utm_medium=story&utm_campaign=report79&utm_content=story",
  "/email": "utm_source=loops&utm_medium=email&utm_campaign=report79",
};

export function proxy(req: NextRequest) {
  const host = (req.headers.get("x-forwarded-host") || req.headers.get("host") || "").toLowerCase();
  const url = req.nextUrl;
  const path = url.pathname;
  const isReportHost = host.startsWith("report.");

  // short links work on the report host at root, and anywhere under /report/
  const shortKey = isReportHost ? path : path.startsWith("/report/") ? path.slice("/report".length) : null;
  if (shortKey && SHORT_LINKS[shortKey]) {
    const dest = url.clone();
    dest.pathname = isReportHost ? "/" : "/report";
    dest.search = "?" + SHORT_LINKS[shortKey] + (url.search ? "&" + url.search.slice(1) : "");
    return NextResponse.redirect(dest, 302);
  }

  if (isReportHost) {
    if (path.startsWith("/api/") || path.startsWith("/_next/") || path.startsWith("/report/")) return NextResponse.next();
    // static assets for the funnel live in /public/report/*
    if (/\.(webp|png|jpg|jpeg|svg|mp4|pdf|ico|txt|xml)$/i.test(path)) {
      const dest = url.clone();
      dest.pathname = "/report" + path;
      return NextResponse.rewrite(dest);
    }
    const dest = url.clone();
    dest.pathname = "/report" + (path === "/" ? "" : path);
    return NextResponse.rewrite(dest);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.svg).*)"],
};
