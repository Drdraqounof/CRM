"use client";
import { useState, useEffect, useRef } from 'react';
import { Database, Users, Calendar, BarChart3 } from 'lucide-react';
import * as THREE from 'three';

export default function BondaryCRM() {
  const [currentPage, setCurrentPage] = useState('home');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (currentPage !== 'home' || !canvasRef.current) return;

    const canvas = canvasRef.current;
    // Defensive: fallback to window if clientWidth/Height are not available
    const width = canvas.clientWidth || window.innerWidth;
    const height = canvas.clientHeight || window.innerHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);

    // Create gradient background
    const gradientCanvas = document.createElement('canvas');
    gradientCanvas.width = 1024;
    gradientCanvas.height = 1024;
    const ctx = gradientCanvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createLinearGradient(0, 0, 1024, 1024);
      gradient.addColorStop(0, '#1e3a8a');
      gradient.addColorStop(0.5, '#3b82f6');
      gradient.addColorStop(1, '#1f2937');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 1024, 1024);
      const bgTexture = new THREE.CanvasTexture(gradientCanvas);
      scene.background = bgTexture;
    }

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    const posArray = new Float32Array(particlesCount * 3);
    for(let i = 0; i < particlesCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 100;
      posArray[i + 1] = (Math.random() - 0.5) * 100;
      posArray[i + 2] = (Math.random() - 0.5) * 100;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0xffffff,
      transparent: true,
      opacity: 0.4
    });
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    const gridHelper = new THREE.GridHelper(50, 50, 0x3b82f6, 0x1e3a8a);
    gridHelper.position.y = -15;
    if (Array.isArray((gridHelper.material))) {
      (gridHelper.material as THREE.Material[]).forEach(mat => { mat.transparent = true; mat.opacity = 0.2; });
    } else {
      (gridHelper.material as THREE.Material).transparent = true;
      (gridHelper.material as THREE.Material).opacity = 0.2;
    }
    scene.add(gridHelper);

    const sphereGeometry = new THREE.SphereGeometry(3, 32, 32);
    const sphereMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.15
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(-12, 5, -25);
    scene.add(sphere);

    const torusGeometry = new THREE.TorusGeometry(4, 0.8, 16, 100);
    const torusMaterial = new THREE.MeshPhongMaterial({
      color: 0x3b82f6,
      wireframe: true,
      transparent: true,
      opacity: 0.2
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.set(12, -3, -30);
    scene.add(torus);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    camera.position.z = 30;

    let animationId: number;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      particlesMesh.rotation.y += 0.0005;
      sphere.rotation.x += 0.005;
      sphere.rotation.y += 0.005;
      torus.rotation.x += 0.003;
      torus.rotation.y += 0.007;
      camera.position.x += (mouseX * 2 - camera.position.x) * 0.02;
      camera.position.y += (mouseY * 2 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      sphereGeometry.dispose();
      sphereMaterial.dispose();
      torusGeometry.dispose();
      torusMaterial.dispose();
      gridHelper.geometry.dispose();
      if (Array.isArray(gridHelper.material)) {
        gridHelper.material.forEach(mat => mat.dispose());
      } else {
        gridHelper.material.dispose();
      }
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
            <a
              href="#"
              onClick={e => { e.preventDefault(); setCurrentPage('login'); }}
              className="bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold py-3 px-8 rounded-lg hover:from-blue-700 hover:to-blue-900 transition-all duration-200 shadow-lg"
            >
              Get Started Today
            </a>
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
    const aboutCanvasRef = useRef(null);

    useEffect(() => {
      if (!aboutCanvasRef.current) return;

      const canvas = aboutCanvasRef.current;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0);

      const gradientCanvas = document.createElement('canvas');
      gradientCanvas.width = 1024;
      gradientCanvas.height = 1024;
      const ctx = gradientCanvas.getContext('2d');
      if (ctx) {
        const gradient = ctx.createLinearGradient(0, 0, 1024, 1024);
        gradient.addColorStop(0, '#1e3a8a');
        gradient.addColorStop(0.5, '#3b82f6');
        gradient.addColorStop(1, '#1f2937');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 1024, 1024);
        const bgTexture = new THREE.CanvasTexture(gradientCanvas);
        scene.background = bgTexture;
      }

      const particlesGeometry = new THREE.BufferGeometry();
      const particlesCount = 1500;
      const posArray = new Float32Array(particlesCount * 3);

      for(let i = 0; i < particlesCount * 3; i += 3) {
        posArray[i] = (Math.random() - 0.5) * 100;
        posArray[i + 1] = (Math.random() - 0.5) * 100;
        posArray[i + 2] = (Math.random() - 0.5) * 100;
      }

      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.05,
        color: 0xffffff,
        transparent: true,
        opacity: 0.4
      });

      const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particlesMesh);

      const gridHelper = new THREE.GridHelper(50, 50, 0x3b82f6, 0x1e3a8a);
      gridHelper.position.y = -15;
      gridHelper.material.transparent = true;
      gridHelper.material.opacity = 0.2;
      scene.add(gridHelper);

      const sphereGeometry = new THREE.SphereGeometry(3, 32, 32);
      const sphereMaterial = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.15
      });
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      sphere.position.set(-12, 5, -25);
      scene.add(sphere);

      const torusGeometry = new THREE.TorusGeometry(4, 0.8, 16, 100);
      const torusMaterial = new THREE.MeshPhongMaterial({
        color: 0x3b82f6,
        wireframe: true,
        transparent: true,
        opacity: 0.2
      });
      const torus = new THREE.Mesh(torusGeometry, torusMaterial);
      torus.position.set(12, -3, -30);
      scene.add(torus);

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(10, 10, 10);
      scene.add(directionalLight);

      camera.position.z = 30;

      let animationId: number;
      let mouseX = 0;
      let mouseY = 0;

      const handleMouseMove = (e: MouseEvent) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      };

      window.addEventListener('mousemove', handleMouseMove);

      const animate = () => {
        animationId = requestAnimationFrame(animate);

        particlesMesh.rotation.y += 0.0005;

        sphere.rotation.x += 0.005;
        sphere.rotation.y += 0.005;

        torus.rotation.x += 0.003;
        torus.rotation.y += 0.007;

        camera.position.x += (mouseX * 2 - camera.position.x) * 0.02;
        camera.position.y += (mouseY * 2 - camera.position.y) * 0.02;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
      };

      animate();

      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousemove', handleMouseMove);
        cancelAnimationFrame(animationId);
        renderer.dispose();
        particlesGeometry.dispose();
        particlesMaterial.dispose();
        sphereGeometry.dispose();
        sphereMaterial.dispose();
        torusGeometry.dispose();
        torusMaterial.dispose();
        gridHelper.geometry.dispose();
        gridHelper.material.dispose();
      };
    }, []);

    return (
      <div className="min-h-screen relative overflow-hidden">
        <canvas 
          ref={aboutCanvasRef} 
          className="fixed inset-0 w-full h-full"
          style={{ width: '100%', height: '100%' }}
        />
        
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

  // Render current page
  return (
    <>
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'login' && <LoginPage />}
      {currentPage === 'about' && <AboutPage />}
      {currentPage === 'dashboard' && <DashboardPage />}
    </>
  );
}