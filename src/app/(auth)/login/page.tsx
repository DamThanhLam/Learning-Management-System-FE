"use client";

import { BASE_URL_USER_SERVICE } from "@/utils/BaseURL";
import encryptPassword from "@/utils/rsa";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAuth, isSignInWithEmailLink, onAuthStateChanged, sendEmailVerification, sendSignInLinkToEmail, signInWithEmailLink } from "firebase/auth";
import { actionCodeSettings, app } from "@/config/firebase";
import { useRouter } from "next/navigation";

const auth = getAuth(app);
const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const router = useRouter()
  const handleSubmit = async (e: React.FormEvent) => {
    const auth = getAuth();
    // onAuthStateChanged(auth, (user) => {
    //   if (user) {
    //     sendEmailVerification(auth.currentUser)
    //       .then(() => {
    //         // Email verification sent!
    //         // ...
    //       });
    //   } else {
    //     // User is signed out
    //     // ...
    //   }
    // });
    // if (auth.currentUser) {
    //   sendSignInLinkToEmail(auth, email, actionCodeSettings)
    //     .then(() => {
    //       // The link was successfully sent. Inform the user.
    //       // Save the email locally so you don't need to ask the user for it again
    //       // if they open the link on the same device.
    //       window.localStorage.setItem('emailForSignIn', email);
    //       window.localStorage.setItem('passwordForSignIn', encryptPassword(password));
    //       router.push("/login/notification-send-link")
    //       // ...
    //     })
    //     .catch((error) => {
    //       const errorCode = error.code;
    //       const errorMessage = error.message;
    //       console.log(errorMessage)
    //       // ...
    //     });
    // }else{

    // }
    fetch(BASE_URL_USER_SERVICE + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password: encryptPassword(password)}),
      credentials: "include",
    }).then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.code === 200) {
          window.location.href = "/"
        }
        else alert("Error: " + data.message)
      }).catch(e => {
        alert("Error: " + e)
      })
    e.preventDefault();


  };

  // Step 2: Tự động đăng nhập nếu link hợp lệ
  useEffect(() => {

    if (isSignInWithEmailLink(auth, window.location.href)) {
      let storedEmail = window.localStorage.getItem('emailForSignIn');
      if (!storedEmail) {
        storedEmail = window.prompt('Vui lòng nhập lại email của bạn để xác nhận đăng nhập:');
      }

      if (storedEmail) {
        signInWithEmailLink(auth, storedEmail, window.location.href)
          .then((result) => {
            console.log(result)
            fetch(BASE_URL_USER_SERVICE + "/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email: window.localStorage.getItem('emailForSignIn'), password: window.localStorage.getItem('passwordForSignIn') }),
              credentials: "include",
            }).then(res => res.json())
              .then(data => {
                console.log(data)
                if (data.code === 200) {
                  window.location.href = "/"
                }
                else alert("Error: " + data.message)
              }).catch(e => {
                alert("Error: " + e)
              })

            window.localStorage.removeItem('emailForSignIn');
            window.localStorage.removeItem('passwordForSignIn');
            console.log('Đăng nhập thành công!');

            // redirect to dashboard or set user context here
          })
          .catch((error) => {
            console.log('Đăng nhập thất bại: ' + error.message);
          });
      }
    }
  }, []);

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
          <a href="/register" style={{ display: 'block', textAlign: 'right', color: "blue", textDecorationLine: 'underline' }}>Don't have an account?</a>

          {/* Nút Đăng Nhập */}
          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
          >
            Đăng Nhập
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;