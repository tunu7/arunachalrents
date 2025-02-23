import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authAdmin } from "../lib/firebaseAdmin"; // ✅ Adjusted Import Path

async function verifyToken(token: string | undefined) {
  if (!token) {
    console.warn("❌ No token provided.");
    return null;
  }

  try {
    const decodedToken = await authAdmin.verifyIdToken(token);

    // Fetch custom claims (if set in Firebase)
    const userRecord = await authAdmin.getUser(decodedToken.uid);
    const userRole = userRecord.customClaims?.role || "tenant"; // Default to "tenant" if no role set

    console.log("✅ Token Verified:", decodedToken);
    return { ...decodedToken, role: userRole };
  } catch (error) {
    console.error("❌ Token verification failed:", error);
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  console.log(`🔎 Middleware Running - Path: ${pathname}`);

  // 1️⃣ Ensure token is present
  const token = req.cookies.get("token")?.value;

  if (!token) {
    console.warn(`🔑 No token found - Redirecting to /login`);
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 2️⃣ Verify token and extract claims
  const verifiedUser = await verifyToken(token);
  if (!verifiedUser) {
    console.warn(`🔒 Invalid token - Redirecting to /login`);
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const userRole = verifiedUser.role;
  console.log(`👤 User Role: ${userRole}`);

  // 3️⃣ Redirect based on role
  if (pathname.startsWith("/dashboard/admin") && userRole !== "admin") {
    console.warn(`🚫 Unauthorized - Admin only`);
    return NextResponse.redirect(new URL("/403", req.url));
  }

  if (pathname.startsWith("/dashboard/vendor") && userRole !== "vendor") {
    console.warn(`🚫 Unauthorized - Vendor only`);
    return NextResponse.redirect(new URL("/403", req.url));
  }

  if (pathname.startsWith("/dashboard/tenant") && userRole !== "tenant") {
    console.warn(`🚫 Unauthorized - Tenant only`);
    return NextResponse.redirect(new URL("/403", req.url));
  }

  return NextResponse.next();
}

// 4️⃣ Ensure Middleware applies to correct paths
export const config = {
  matcher: [
    "/dashboard/admin/:path*",
    "/dashboard/vendor/:path*",
    "/dashboard/tenant/:path*",
  ],
};
