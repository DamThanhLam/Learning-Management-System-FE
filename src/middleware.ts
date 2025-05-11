import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value; // Lấy JWT từ cookies
  const currentPath = req.nextUrl.pathname;
  const refeshToken = req.cookies.get("refresh_token")?.value;
  const pathParts = currentPath.split("/").filter(part => part !== "");
  const publicPaths = ["/login","/login/notification-send-link", "/register","/register/student","/register/teacher"];
  if (!refeshToken && !token && publicPaths.includes(currentPath)) {
    return NextResponse.next()
  }


  try {
    // Gửi request đến Backend để kiểm tra tính hợp lệ của JWT
    const backendUrl = "http://localhost:8080/api/v1/user/verify-token";
    const response = token && await fetch(backendUrl, {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        Cookie: `access_token=${token}`,

      },
    });
    if (!token || !response || !response.ok) {

      if (!refeshToken && publicPaths.includes(currentPath)) {
        const response = NextResponse.redirect(new URL('/login', req.url));
        response.cookies.set("refresh_token", "", {
          path: "/",
          expires: new Date(Date.now() + 60 * 60 * 1000),
        })
        response.cookies.set("access_token", "", {
          path: "/",
          expires: new Date(Date.now() + 60 * 60 * 1000),
        })
        return response;
      }

      const refreshResponse = await fetch("http://localhost:8080/api/v1/user/refresh", {
        method: "GET",
        credentials: 'include',
        headers: {
          Cookie: `refresh_token=${refeshToken}`,
        }
      });
      console.log(refreshResponse.status)

      if (!refreshResponse.ok) {
        const response = NextResponse.redirect(new URL('/login', req.url));
        response.cookies.set("refresh_token", "", {
          path: "/",
          expires: new Date(Date.now() + 60 * 60 * 1000),
        })
        response.cookies.set("access_token", "", {
          path: "/",
          expires: new Date(Date.now() + 60 * 60 * 1000),
        })
        return response;  // Refresh token không thành công
      }

      const data = await refreshResponse.json();

      if (data.access_token) {
        const response = NextResponse.redirect(new URL('/', req.url));
        response.cookies.set('access_token', data.access_token,
          {
            path: "/",
            httpOnly: true,
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          }
        );  // Cập nhật access_token mới
        return response;
      } else {
        return NextResponse.redirect(new URL('/login', req.url));
      }
    }
    const responseData = (await response.json()).data;


    // Nếu đang truy cập `/login` hoặc `/register`, chuyển hướng về trang dashboard
    if (publicPaths.includes(currentPath)) {
      const response = NextResponse.redirect(new URL("/", req.url));

      response.cookies.set("groups", JSON.stringify(responseData.groups), {
        path: "/",
        httpOnly: false, // để JS có thể đọc
        sameSite: "lax",
      });

      return response;
    }
    // if (pathParts[0] === 'teacher' && !responseData.groups.includes("TEACHER")) {
    //   return NextResponse.redirect(new URL("/", req.url));
    // }
    // if (pathParts[0] === 'admin' && !responseData.groups.includes("ADMIN")) {
    //   return NextResponse.redirect(new URL("/", req.url));
    // }
    // if (pathParts[0] === 'student' && !responseData.groups.includes("STUDENT")) {
    //   return NextResponse.redirect(new URL("/", req.url));
    // }
    const responseRedirect = NextResponse.next();

    responseRedirect.cookies.set("groups", JSON.stringify(responseData.groups), {
      path: "/",
      httpOnly: false, // để JS có thể đọc
      sameSite: "lax",
    });
    return responseRedirect; // Token hợp lệ, cho phép request tiếp tục
  } catch (error) {
    console.error("Lỗi khi xác thực JWT:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

// Áp dụng middleware cho các route cụ thể
// export const config = {
//   matcher: ["/admin/:path*", "/teacher/:path*", "/student/:path*", "/login", "/register", "/:path*"],
// };
export const config = {
  matcher: [
    /*
     * Bỏ qua các file tĩnh và API docs.
     * Middleware chỉ áp dụng cho route người dùng truy cập.
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:css|js|png|jpg|jpeg|svg|woff2|ttf|eot|json)).*)","/register/:path*"
  ],
};


  