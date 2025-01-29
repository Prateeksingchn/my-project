import React, { useState } from "react";
import { auth } from "../firebase/config";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error) {
      setError("Invalid email or password. Please try again.");
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/dashboard");
    } catch (error) {
      setError("Google sign-in failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex bg-[#f8fafc] p-2">
      {/* Left side - Login Form */}
      <div className="w-full lg:w-[55%] flex items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
            <p className="text-gray-600">
              New here?{" "}
              <Link
                to="/signup"
                className="text-indigo-600 hover:text-indigo-500 font-medium"
              >
                Create an account
              </Link>
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 text-sm text-gray-600"
                >
                  Remember me
                </label>
              </div>
              <button
                type="button"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 font-medium"
            >
              Sign in
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#f8fafc] text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="flex items-center justify-center px-4 py-3 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors duration-200"
              >
                <img
                  className="h-5 w-5 mr-2"
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google logo"
                />
                <span className="text-gray-700 font-medium">Google</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Right side - Background Image with Text */}
      <div className="hidden lg:block lg:w-[45%] relative m-3">
        <img
          src="https://images.unsplash.com/photo-1633153010796-6cf54b5daebb"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover rounded-tl-[50px] rounded-br-[50px]"
        />
        {/* <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/90 to-violet-600/90"></div> */}
        <div className="relative h-full flex flex-col justify-start items-center text-white p-4 space-y-8">
          <div className="space-y-1 text-center max-w-lg">
            <h1 className="text-[2.5rem] font-bold font-['Ms_Madi']">
              Your Digital Notebook
            </h1>
          </div>
          {/* <div className="font-['Ms_Madi']">
            <h2 className="text-2xl font-medium">Where Ideas Take Flight</h2>
            <p className="text-lg text-white/90 w-72">
              Organize your thoughts, capture inspiration, and let your
              creativity soar in one beautiful space.
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
