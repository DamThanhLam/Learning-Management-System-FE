import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value; // Lấy JWT từ cookies
  const currentPath = req.nextUrl.pathname;
  const refeshToken = req.cookies.get("refresh_token")?.value;
  const pathParts = currentPath.split("/").filter(part => part !== "");

  try {
    // Gửi request đến Backend để kiểm tra tính hợp lệ của JWT
    const backendUrl = "http://localhost:8080/api/v1/user/verify-token";
    if(!token && !refeshToken){
      if(currentPath==="/login")  return NextResponse.next()
      return NextResponse.redirect(new URL('/login', req.url))
    }
    const response = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.status)

    if (!response.ok) {
      console.log("refeshToken: "+refeshToken)
      if (!refeshToken && currentPath != "/login") return NextResponse.redirect(new URL('/login', req.url))
      else if (!refeshToken && currentPath == "/login") {
        return NextResponse.next()
      }
      const refreshResponse = await fetch("http://localhost:8080/api/v1/user/refresh", {
        method: "GET",
        credentials: 'include',
        headers: {
          Cookie: `refresh_token=${refeshToken}`,
        }
      });

      if (!refreshResponse.ok) {
        return NextResponse.redirect(new URL('/login', req.url));  // Refresh token không thành công
      }

      const data = await refreshResponse.json();

      if (data.access_token) {
        const response = NextResponse.next();
        response.cookies.set('access_token', data.access_token);  // Cập nhật access_token mới
        return NextResponse.redirect(new URL('/', req.url));;
      } else {
        return NextResponse.redirect(new URL('/login', req.url));
      }
    }
    const responseData = (await response.json()).data;


    console.log("pathParts" + pathParts)
    console.log("responseData" + JSON.stringify(responseData))
    // Nếu đang truy cập `/login` hoặc `/register`, chuyển hướng về trang dashboard
    if (currentPath === "/login" || currentPath === "/register") {
      return NextResponse.redirect(new URL("/", req.url));
    }
    if (pathParts[0] === 'teacher' && !responseData.groups.includes("TEACHER")) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    if (pathParts[0] === 'admin' && !responseData.groups.includes("ADMIN")) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    if (pathParts[0] === 'student' && !responseData.groups.includes("STUDENT")) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next(); // Token hợp lệ, cho phép request tiếp tục
  } catch (error) {
    console.error("Lỗi khi xác thực JWT:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

// Áp dụng middleware cho các route cụ thể
export const config = {
  matcher: ["/admin/:path*", "/teacher/:path*", "/student/:path*", "/login", "/register"],
};
