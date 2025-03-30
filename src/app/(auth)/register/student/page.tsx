"use client";

import { useState } from "react";
import NodeRSA from "node-rsa";

const publicKeyPEM = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqlKHHeFCGP6ycc+NvNnU
JrGAqpUBv6GTDH8W8RAeAZdKJIQD9TOkWt/152w2q/KG5LK4HezTeEjDkVZ8+RUW
PHIAhNrngQQ1oKHm78wYMPvb5f1Q9fBNvLEM8DZD2YMpNaTU90ISRwPuxxHBAzux
5iBDfgKi8y8RH0lH+dYyqHNeQbK1H7BgKOzX+odQrmeDKJ1sR0y6h6rzlR2qtYDw
Bep0HyuTbvQZUAmxszxr45rdob1FkWql5TUsaY6ao8ogejb38DKCc25Ffscabp/r
0EmyrUNU5+nCCMgoiD0BkYrhs6Gmnnpz8QuyxDxihXL0LIiJN3F497M/GGI+3doj
CwIDAQAB
-----END PUBLIC KEY-----`; // Thay bằng public key của bạn

const StudentRegistration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [registered, setRegistered] = useState(false);

  const encryptPassword = (plainTextPassword: string) => {
    const key = new NodeRSA(publicKeyPEM, "pkcs8-public");
    key.setOptions({ encryptionScheme: "pkcs1" }); // Hoặc "oaep"
    return key.encrypt(plainTextPassword, "base64");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mã hóa mật khẩu
    const encryptedPassword = encryptPassword(password);

    const response = await fetch("http://localhost:8080/api/v1/user/student/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, username, password: encryptedPassword }),
    });

    if (response.ok) {
      setRegistered(true);
    } else {
      alert("Đăng ký thất bại!");
    }
  };

  if (registered) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
          <p className="text-green-500 text-xl">Đăng ký thành công!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Đăng ký sinh viên</h2>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700">
            Tên người dùng <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
            placeholder="Nhập tên người dùng"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
            placeholder="Nhập email của bạn"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700">
            Mật khẩu <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
            placeholder="Nhập mật khẩu"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="confirm-password" className="block text-gray-700">
            Xác nhận mật khẩu <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            id="confirm-password"
            value={password}
            onChange={(e) => { }}
            className="border border-gray-300 p-2 rounded w-full"
            placeholder="Nhập mật khẩu"
          />
        </div>
        <button
          type="submit"
          className={`bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 ${!email || !password || !username ? "opacity-50 cursor-not-allowed" : ""
            }`}
          disabled={!email || !password || !username}
        >
          Đăng ký
        </button>
      </form>
    </div>
  );
};

export default StudentRegistration;
