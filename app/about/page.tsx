"use client";
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Database, Users, Target, Award, Mail, Briefcase, TrendingUp, Shield } from 'lucide-react';

export default function AboutPage() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    // Professional gradient background - sophisticated blues and grays
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
    }
    
    const bgTexture = new THREE.CanvasTexture(gradientCanvas);
    scene.background = bgTexture;

    // Subtle particle system - elegant and minimal
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

    // Professional geometric grid
    const gridHelper = new THREE.GridHelper(50, 50, 0x3b82f6, 0x1e3a8a);
    gridHelper.position.y = -15;
    gridHelper.material.transparent = true;
    gridHelper.material.opacity = 0.2;
    scene.add(gridHelper);

    // Clean geometric shapes - minimal and professional
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

    // Professional lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    camera.position.z = 30;

    let animationId: number;
    let time = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      time += 0.005;

      // Subtle animations
      particlesMesh.rotation.y += 0.0005;
      
      sphere.rotation.x += 0.005;
      sphere.rotation.y += 0.005;
      
      torus.rotation.x += 0.003;
      torus.rotation.y += 0.007;

      // Minimal camera movement
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
      {/* <Nav /> Removed: Nav component does not exist or is not imported */}
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 w-full h-full"
        style={{ width: '100%', height: '100%' }}
      />
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-20">
        {/* Professional Header */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Database className="w-14 h-14 text-white drop-shadow-lg" />
            <h1 className="text-5xl font-bold text-white drop-shadow-lg tracking-tight">Bondary</h1>
          </div>
          <p className="text-xl text-white/90 drop-shadow max-w-3xl mx-auto font-light">
            Enterprise-Grade Customer Relationship Management Solutions
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-5xl w-full space-y-6">
          {/* About Section */}
          <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-10 border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">About Bondary CRM</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Bondary CRM is a leading provider of customer relationship management solutions designed for modern enterprises. Since our founding, we have been committed to delivering innovative technology that empowers organizations to build stronger customer relationships, streamline operations, and drive sustainable growth.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Our platform combines advanced automation, powerful analytics, and intuitive design to help businesses of all sizes manage their customer interactions with unprecedented efficiency and insight.
            </p>
          </div>

          {/* Mission & Vision Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-8 border border-gray-200">
              <div className="flex items-start space-x-4">
                <Target className="w-10 h-10 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Our Mission</h3>
                  <p className="text-gray-700 leading-relaxed">
                    To empower organizations with intelligent CRM solutions that transform how they connect with customers, optimize workflows, and achieve measurable business outcomes.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-8 border border-gray-200">
              <div className="flex items-start space-x-4">
                <TrendingUp className="w-10 h-10 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Our Vision</h3>
                  <p className="text-gray-700 leading-relaxed">
                    To be the global standard for enterprise CRM, making sophisticated customer management technology accessible, secure, and intuitive for organizations worldwide.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Core Values */}
          <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-10 border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <Award className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Excellence</h3>
                <p className="text-gray-600">Maintaining the highest standards in product quality, security, and customer service</p>
              </div>
              <div className="text-center">
                <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Trust</h3>
                <p className="text-gray-600">Building lasting relationships through transparency, reliability, and data protection</p>
              </div>
              <div className="text-center">
                <Briefcase className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Innovation</h3>
                <p className="text-gray-600">Continuously advancing our technology to meet evolving business needs</p>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-10 border border-gray-200">
            <div className="flex items-start space-x-4">
              <Users className="w-10 h-10 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Team</h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  Bondary is powered by a diverse team of industry experts, including software engineers, data scientists, UX designers, and customer success professionals. Our team members bring decades of combined experience from leading technology companies and bring that expertise to every aspect of our platform.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  We are united by a shared commitment to innovation, customer success, and building products that make a meaningful impact on how businesses operate.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-xl p-10 text-center border border-blue-500">
            <Mail className="w-14 h-14 text-white mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-4">Contact Us</h2>
            <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
              Interested in learning more about our solutions or exploring partnership opportunities? Our team is ready to assist you.
            </p>
            <a 
              href="mailto:info@bondarycrm.com" 
              className="inline-block bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-50 transition-all duration-200 shadow-lg"
            >
              info@bondarycrm.com
            </a>
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-16 text-center">
          <p className="text-white/70 text-sm">© 2024 Bondary CRM. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}