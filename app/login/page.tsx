"use client";
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Database, Lock, User, ArrowRight, Shield, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [registerLoading, setRegisterLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError(null);
    setLoading(true);
    try {
      // Use next-auth signIn for credentials (no register flag for login)
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      if (result && !result.error) {
        // Check if userType is set (simulate new user detection)
        const userType = window.localStorage.getItem('userType');
        if (!userType) {
          router.push('/post-login-question');
        } else {
          router.push('/dashboard');
        }
      } else {
        setError(result?.error || 'Login failed');
      }
    } catch (e) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  // Place this at the end of the component function
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-xl shadow-lg border-b border-slate-200/50 sticky top-0 z-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => router.push("/")}>
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-lg">
                <Database className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Bondary
              </h1>
            </div>
            <div className="flex items-center space-x-6">
              <button
                onClick={() => router.push("/features")}
                className="text-slate-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 font-medium transition-all duration-300 px-4 py-2 rounded-lg"
              >
                Features
              </button>
              <button
                onClick={() => router.push("/build")}
                className="text-slate-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 font-medium transition-all duration-300 px-4 py-2 rounded-lg"
              >
                Build
              </button>
              <button
                onClick={() => router.push("/about")}
                className="text-slate-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 font-medium transition-all duration-300 px-4 py-2 rounded-lg"
              >
                About Us
              </button>
              <button
                onClick={() => router.push("/login")}
                className="text-slate-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 font-medium transition-all duration-300 px-4 py-2 rounded-lg"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </nav>
      {/* Gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 -z-10" />
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Database className="w-12 h-12 text-white drop-shadow-lg" />
              <h1 className="text-4xl font-bold text-white drop-shadow-lg tracking-tight">Bondary</h1>
            </div>
            <p className="text-white/80 text-lg">Enterprise CRM Platform</p>
          </div>
          {/* Login Card */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
            {/* Card Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-6">
              <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                <Shield className="w-6 h-6" />
                <span>Secure Sign In</span>
              </h2>
              <p className="text-blue-100 text-sm mt-1">Access your account</p>
            </div>
            {/* Form */}
            <div className="p-8">
              <div className="space-y-6">
                {/* Show registration form */}
                {showRegister ? (
                  <>
                    <div>
                      <label htmlFor="register-name" className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                      <input
                        id="register-name"
                        type="text"
                        value={registerName}
                        onChange={(e) => setRegisterName(e.target.value)}
                        className="block w-full pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white text-gray-900"
                        placeholder="Your full name"
                        autoComplete="name"
                      />
                    </div>
                    <div>
                      <label htmlFor="register-email" className="block text-sm font-semibold text-gray-700 mb-2">Gmail</label>
                      <input
                        id="register-email"
                        type="email"
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                        className="block w-full pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white text-gray-900"
                        placeholder="Enter your Gmail address"
                        autoComplete="email"
                      />
                    </div>
                    <div>
                      <label htmlFor="register-password" className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                      <input
                        id="register-password"
                        type="password"
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                        className="block w-full pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white text-gray-900"
                        placeholder="Create a password"
                        autoComplete="new-password"
                      />
                    </div>
                    <button
                      type="button"
                      disabled={registerLoading}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-blue-900 transition-all duration-200 shadow-lg flex items-center justify-center space-x-2 group disabled:opacity-60 mt-4"
                      onClick={async () => {
                        setRegisterError(null);
                        setRegisterLoading(true);
                        try {
                          // Use next-auth signIn with custom header to register
                          const result = await signIn('credentials', {
                            redirect: false,
                            email: registerEmail,
                            password: registerPassword,
                            name: registerName,
                            register: 'true'
                          });
                          if (result && !result.error) {
                            // Redirect new user to post-login question page
                            router.push('/post-login-question');
                          } else {
                            setRegisterError(result?.error || 'Registration failed');
                          }
                        } catch (e) {
                          setRegisterError('Registration error');
                        } finally {
                          setRegisterLoading(false);
                        }
                      }}
                    >
                      {registerLoading ? 'Registering...' : 'Register'}
                    </button>
                    {registerError && <div className="text-red-600 text-sm pt-2">{registerError}</div>}
                    <div className="text-center text-sm text-gray-600 pt-4">
                      Already have an account?{' '}
                      <button type="button" className="text-blue-600 hover:text-blue-800 font-semibold" onClick={() => setShowRegister(false)}>
                        Sign In
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Email Field */}
                    <label htmlFor="login-email" className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                    <input
                      id="login-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white text-gray-900 mb-4"
                      placeholder="Enter your email address"
                      autoComplete="email"
                    />
                    {/* Password Field */}
                    <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyPress={e => { if (e.key === 'Enter') handleSubmit(); }}
                        className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white text-gray-900"
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                        )}
                      </button>
                    </div>
                    {/* Remember Me & Forgot Password */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          id="remember-me"
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                        />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 cursor-pointer">Remember me</label>
                      </div>
                      <button type="button" className="text-sm text-blue-600 hover:text-blue-800 font-medium">Forgot password?</button>
                    </div>
                    {/* Submit Button */}
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={registerLoading}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-blue-900 transition-all duration-200 shadow-lg flex items-center justify-center space-x-2 group disabled:opacity-60"
                    >
                      <span>{registerLoading ? 'Signing In...' : 'Sign In'}</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                    {registerError && <div className="text-red-600 text-sm pt-2">{registerError}</div>}
                    <div className="text-center text-sm text-gray-600 pt-4">
                      Don't have an account?{' '}
                      <button type="button" className="text-blue-600 hover:text-blue-800 font-semibold" onClick={() => setShowRegister(true)}>
                        Register
                      </button>
                    </div>
                  </>
                )}
              </div>
              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or</span>
                </div>
              </div>
              {/* Additional Options */}
              <div className="space-y-3">
                <button
                  type="button"
                  className="w-full bg-white border-2 border-gray-300 text-gray-700 font-medium py-3 px-6 rounded-lg hover:bg-gray-50 transition-all duration-200 flex items-center justify-center space-x-2"
                  onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span>Sign in with Google</span>
                </button>
                <div className="text-center text-sm text-gray-600">
                  Don't have an account? <button type="button" className="text-blue-600 hover:text-blue-800 font-semibold">Request Access</button>
                </div>
                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-900 text-sm">
                  <div className="font-semibold mb-1">Features:</div>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Sign in with Gmail or password</li>
                    <li>Enterprise-grade security</li>
                    <li>Session-based authentication</li>
                    <li>Modern, animated UI</li>
                    <li>Request access for new users</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* Footer */}
          <div className="text-center mt-8 space-y-2">
            <p className="text-white/60 text-sm">Protected by enterprise-grade security</p>
            <p className="text-white/40 text-xs">© 2024 Bondary CRM. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}