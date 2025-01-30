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
      <div className="w-full lg:w-[55%] flex items-center justify-center p-4 lg:p-8">
        <div className="w-full max-w-md space-y-4">
          {/* Enhanced Animated Branding Section */}
          <div className="absolute top-4 left-4">
            <div className="text-2xl font-bold flex items-center group">
              <svg 
                viewBox="0 0 24 24" 
                className="w-8 h-8 mr-2 transform group-hover:scale-110 transition-all duration-300 ease-in-out" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                {/* Animated Notepad Frame */}
                <path 
                  d="M4 4v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4" 
                  className="transition-all duration-500 group-hover:stroke-indigo-600"
                  style={{ animation: 'borderDraw 1.5s ease-out forwards' }}
                />
                <path 
                  d="M4 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2" 
                  className="transition-all duration-500 group-hover:stroke-indigo-600"
                  style={{ animation: 'borderDraw 1.5s ease-out forwards' }}
                />
                
                {/* Enhanced Animated Lines */}
                <line 
                  x1="8" 
                  y1="8" 
                  x2="16" 
                  y2="8"
                  className="origin-left group-hover:stroke-indigo-500"
                  style={{ 
                    animation: 'drawLineAndFloat 3s ease-in-out infinite',
                    animationDelay: '0s'
                  }}
                />
                <line 
                  x1="8" 
                  y1="12" 
                  x2="16" 
                  y2="12"
                  className="origin-left group-hover:stroke-indigo-500"
                  style={{ 
                    animation: 'drawLineAndFloat 3s ease-in-out infinite',
                    animationDelay: '0.2s'
                  }}
                />
                <line 
                  x1="8" 
                  y1="16" 
                  x2="12" 
                  y2="16"
                  className="origin-left group-hover:stroke-indigo-500"
                  style={{ 
                    animation: 'drawLineAndFloat 3s ease-in-out infinite',
                    animationDelay: '0.4s'
                  }}
                />

                {/* Enhanced Camera Lens */}
                <circle 
                  cx="17" 
                  cy="4" 
                  r="1" 
                  fill="currentColor"
                  className="group-hover:fill-indigo-600"
                  style={{ animation: 'enhancedPulse 2s infinite' }}
                />

                {/* Enhanced Quick-access Tabs */}
                <path 
                  d="M8 2v2" 
                  className="group-hover:stroke-indigo-400"
                  style={{ animation: 'tabBounce 1s ease-out forwards' }}
                />
                <path 
                  d="M12 2v2" 
                  className="group-hover:stroke-indigo-400"
                  style={{ animation: 'tabBounce 1s ease-out forwards', animationDelay: '0.1s' }}
                />
                <path 
                  d="M16 2v2" 
                  className="group-hover:stroke-indigo-400"
                  style={{ animation: 'tabBounce 1s ease-out forwards', animationDelay: '0.2s' }}
                />
              </svg>
              <span 
                className="transition-all duration-300 group-hover:text-indigo-600"
                style={{ animation: 'fadeInScale 0.5s ease-out' }}
              >
                SnapNotes
              </span>
            </div>
          </div>

          <style>
            {`
              @keyframes borderDraw {
                0% {
                  stroke-dasharray: 100;
                  stroke-dashoffset: 100;
                }
                100% {
                  stroke-dasharray: 100;
                  stroke-dashoffset: 0;
                }
              }

              @keyframes drawLineAndFloat {
                0% {
                  stroke-dasharray: 20;
                  stroke-dashoffset: 20;
                  transform: translateX(0);
                }
                20% {
                  stroke-dasharray: 20;
                  stroke-dashoffset: 0;
                  transform: translateX(0);
                }
                50% {
                  transform: translateX(2px);
                }
                80% {
                  transform: translateX(-1px);
                }
                100% {
                  transform: translateX(0);
                }
              }

              @keyframes enhancedPulse {
                0% {
                  transform: scale(1);
                  opacity: 1;
                  filter: drop-shadow(0 0 0 rgba(79, 70, 229, 0));
                }
                50% {
                  transform: scale(1.5);
                  opacity: 0.7;
                  filter: drop-shadow(0 0 2px rgba(79, 70, 229, 0.5));
                }
                100% {
                  transform: scale(1);
                  opacity: 1;
                  filter: drop-shadow(0 0 0 rgba(79, 70, 229, 0));
                }
              }

              @keyframes tabBounce {
                0% {
                  transform: translateY(-8px);
                  opacity: 0;
                }
                50% {
                  transform: translateY(4px);
                }
                75% {
                  transform: translateY(-2px);
                }
                100% {
                  transform: translateY(0);
                  opacity: 1;
                }
              }

              @keyframes fadeInScale {
                0% {
                  opacity: 0;
                  transform: scale(0.95);
                }
                100% {
                  opacity: 1;
                  transform: scale(1);
                }
              }

              .group:hover svg path,
              .group:hover svg line {
                filter: drop-shadow(0 0 2px rgba(79, 70, 229, 0.3));
              }
            `}
          </style>

          <div className="space-y-0 mt-12">
            <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
            <p className="text-gray-600">
              New here?{' '}
              <Link to="/signup" className="text-indigo-600 hover:text-indigo-500 font-medium">
                Create an account
              </Link>
            </p>
          </div>

          {/* Rest of the form remains the same */}
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
        <div className="absolute bottom-[50px] left-0 right-0 h-48 flex flex-col items-start text-white p-4 space-y-2">
          {/* Top-left corner */}
          <h1 className="text-[2rem] font-['Ms_Madi']">
            Your Digital Notebook
          </h1>
          
          {/* Centered text */}
          <div className="flex-grow flex items-center justify-center w-full">
            <p className="text-[2rem] text-center font-['Ms_Madi']">Capture your thoughts and ideas.</p>
          </div>

          {/* Bottom-right corner */}
          <div className="text-right w-full">
            <p className="text-[2rem] font-['Ms_Madi']">Start your journey today!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;