"use client";

import encryptPassword from "@/utils/rsa";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAuth, isSignInWithEmailLink, onAuthStateChanged, sendEmailVerification, sendSignInLinkToEmail, signInWithEmailLink } from "firebase/auth";
import { actionCodeSettings, app } from "@/config/firebase";
import { useRouter } from "next/navigation";
import { BASE_URL_AUTH_SERVICE } from "@/utils/BaseURL";
import { checkLogin } from "@/utils/API";

const auth = getAuth(app);
const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const router = useRouter()
  const [groups, setGroups] = useState<string[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    checkLogin().then(data => {
      window.location.href = "/"
    })
  }, [])
  const handleSubmit = async (e: React.FormEvent) => {

    fetch(BASE_URL_AUTH_SERVICE + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password: encryptPassword(password) }),
    }).then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.code === 200) {
          window.localStorage.setItem("access_token", data.access_token)
          window.localStorage.setItem("refresh_token", data.refresh_token)
          window.localStorage.setItem("email", email)
          window.location.href = "/"
        }
        else alert("Error: " + data.message)
      }).catch(e => {
        alert("Error: " + e)
      })
    e.preventDefault();


  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">Đăng Nhập</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Trường Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nhập email của bạn"
            />
          </div>

          {/* Trường Mật Khẩu */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Mật Khẩu
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nhập mật khẩu của bạn"
            />
          </div>
          <a href="/forgot-password" style={{ display: 'block', textAlign: 'right', color: "blue", textDecorationLine: 'underline' }}>forgot password</a>

          {/* Nút Đăng Nhập */}
          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
          >
            Đăng Nhập
          </button>
          <a href="/register" style={{ display: 'block', textAlign: 'center', color: "blue", textDecorationLine: 'underline' }}>Don't have an account?</a>
        </form>
      </div>
    </div>
  );
};

export default Login;