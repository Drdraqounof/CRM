"use client";
import { useState, useEffect, useRef } from 'react';
import { Database, Users, Calendar, BarChart3 } from 'lucide-react';


export default function BondaryCRM() {
  const [currentPage, setCurrentPage] = useState('home');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (currentPage !== 'home' || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const gl = canvas.getContext('webgl');
    if (!gl) return;
    // Simple WebGL clear color and animation
    let animationId: number;
    const render = () => {
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0.12, 0.23, 0.54, 1.0); // blue-ish
      gl.clear(gl.COLOR_BUFFER_BIT);
      animationId = requestAnimationFrame(render);
    };
    render();
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [currentPage]);

  const handleLogin = () => {
    if (username && password) {
      setCurrentPage('dashboard');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  // Home Page
  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <nav className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Database className="w-8 h-8 text-white" />
              <h1 className="text-2xl font-bold text-white">Bondary</h1>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="#"
                onClick={e => { e.preventDefault(); setCurrentPage('about'); }}
                className="text-white hover:text-blue-100 font-medium transition-colors"
              >
                About Us
              </a>
              <button
                onClick={() => window.location.href = '/login'}
                className="flex items-center space-x-2 bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200 shadow-md"
              >
                <span>Login</span>
                <Database className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* WebGL Hero Section */}
      <div className="relative w-full overflow-hidden" style={{ height: '500px' }}>
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full"
          style={{ width: '100%', height: '100%' }}
        />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h2 className="text-5xl font-extrabold text-white drop-shadow-lg mb-4">Welcome to Bondary CRM</h2>
          <p className="text-2xl text-white/90 max-w-2xl mx-auto mb-6 drop-shadow">
            The next-generation customer relationship management platform for modern teams.
          </p>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-2">
            Empower your business with seamless contact management, advanced analytics, and automated workflows.<br/>
            Built for speed, security, and scalability.
          </p>
          <button
            onClick={() => {
              window.scrollTo({ top: 600, behavior: 'smooth' });
            }}
            className="mt-8 px-8 py-3 bg-white/90 text-blue-600 font-bold rounded-full shadow-lg hover:bg-white transition-all text-lg"
          >
            Learn More ↓
          </button>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24" id="learn-more">
        <div className="bg-white rounded-2xl shadow-xl p-12 max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">
            Why Choose Bondary CRM?
          </h3>
          <ul className="text-lg text-gray-700 leading-relaxed mb-8 list-disc pl-6">
            <li>Intuitive, modern interface for rapid onboarding</li>
            <li>Real-time collaboration and secure cloud access</li>
            <li>Customizable dashboards and reporting</li>
            <li>Automated reminders, tasks, and follow-ups</li>
            <li>Integrates with your favorite tools and platforms</li>
            <li>World-class support and onboarding</li>
          </ul>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-blue-500">
              <Users className="w-12 h-12 text-blue-500 mb-2" />
              <p className="font-semibold text-gray-900">Total Contacts</p>
              <p className="text-3xl font-bold text-gray-900">1,234</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-blue-600">
              <BarChart3 className="w-12 h-12 text-blue-600 mb-2" />
              <p className="font-semibold text-gray-900">Active Deals</p>
              <p className="text-3xl font-bold text-gray-900">87</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-blue-700">
              <Calendar className="w-12 h-12 text-blue-700 mb-2" />
              <p className="font-semibold text-gray-900">Tasks Today</p>
              <p className="text-3xl font-bold text-gray-900">24</p>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <button
              onClick={() => window.location.href = '/login'}
              className="bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold py-3 px-8 rounded-lg hover:from-blue-700 hover:to-blue-900 transition-all duration-200 shadow-lg"
            >
              Get Started Today
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const LoginPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Database className="w-10 h-10 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Bondary</h1>
          </div>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl shadow-2xl p-8">
          <div className="bg-white rounded-xl p-8">
            <div className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="Enter your username"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="Enter your password"
                />
              </div>

              <button
                onClick={handleLogin}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-blue-900 transition-all duration-200 shadow-lg"
              >
                Sign In
              </button>
            </div>

            <div className="mt-6 text-center">
              <a
                href="#"
                onClick={e => { e.preventDefault(); setCurrentPage('home'); }}
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
              >
                Back to home
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // About Page
  const AboutPage = () => {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <div className="relative z-10 min-h-screen flex flex-col">
          {/* Navigation */}
          <nav className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center space-x-2">
                  <Database className="w-8 h-8 text-white" />
                  <h1 className="text-2xl font-bold text-white">Bondary</h1>
                </div>
                <div className="flex items-center space-x-4">
                  <a
                    href="#"
                    onClick={e => { e.preventDefault(); setCurrentPage('home'); }}
                    className="text-white hover:text-blue-100 font-medium transition-colors"
                  >
                    Home
                  </a>
                  <a
                    href="#"
                    onClick={e => { e.preventDefault(); setCurrentPage('login'); }}
                    className="flex items-center space-x-2 bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200 shadow-md"
                  >
                    <span>Login</span>
                    <Database className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </nav>

          <div className="flex-1 flex items-center justify-center px-4 py-20">
            <div className="max-w-4xl w-full">
              <div className="text-center mb-12">
                <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">About Bondary</h1>
                <p className="text-xl text-white/90 drop-shadow">Enterprise CRM Solutions</p>
              </div>

              <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-10 mb-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Who We Are</h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  Bondary CRM is a leading provider of customer relationship management solutions designed for modern enterprises. We empower organizations to build stronger customer relationships, streamline operations, and drive sustainable growth through innovative technology.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Our platform combines advanced automation, powerful analytics, and intuitive design to help businesses manage customer interactions with unprecedented efficiency.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                  <p className="text-gray-700 leading-relaxed">
                    To empower organizations with intelligent CRM solutions that transform how they connect with customers and achieve measurable business outcomes.
                  </p>
                </div>

                <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                  <p className="text-gray-700 leading-relaxed">
                    To be the global standard for enterprise CRM, making sophisticated customer management technology accessible and secure for organizations worldwide.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Dashboard wrapper
  const DashboardPage = () => {
    const Dashboard = require('./dashboard/page').default;
    return <Dashboard />;
  };

  // Render only the HomePage, navigation handled by window.location.href
  return <HomePage />;
}