"use client";
import { useRouter } from 'next/navigation';
import { Database, Users, Target, Award, Mail, Briefcase, TrendingUp, Shield } from 'lucide-react';

export default function AboutPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-xl shadow-lg border-b border-slate-200/50 sticky top-0 z-50">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            About Us
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
            Building the Future of{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Customer Relationships
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Enterprise-Grade Customer Relationship Management Solutions
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* About Section */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-10 border border-slate-200/50">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">About Bondary CRM</h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-4">
              Bondary CRM is a leading provider of customer relationship management solutions designed for modern enterprises. Since our founding, we have been committed to delivering innovative technology that empowers organizations to build stronger customer relationships, streamline operations, and drive sustainable growth.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed">
              Our platform combines advanced automation, powerful analytics, and intuitive design to help businesses of all sizes manage their customer interactions with unprecedented efficiency and insight.
            </p>
          </div>

          {/* Mission & Vision Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-slate-200/50 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-xl">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">Our Mission</h3>
                  <p className="text-slate-700 leading-relaxed">
                    To empower organizations with intelligent CRM solutions that transform how they connect with customers, optimize workflows, and achieve measurable business outcomes.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-slate-200/50 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-3 rounded-xl">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">Our Vision</h3>
                  <p className="text-slate-700 leading-relaxed">
                    To be the global standard for enterprise CRM, making sophisticated customer management technology accessible, secure, and intuitive for organizations worldwide.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Core Values */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-10 border border-slate-200/50">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 rounded-xl hover:bg-slate-50 transition-all duration-300">
                <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 mb-4 shadow-lg">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Excellence</h3>
                <p className="text-slate-600">Maintaining the highest standards in product quality, security, and customer service</p>
              </div>
              <div className="text-center p-6 rounded-xl hover:bg-slate-50 transition-all duration-300">
                <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 mb-4 shadow-lg">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Trust</h3>
                <p className="text-slate-600">Building lasting relationships through transparency, reliability, and data protection</p>
              </div>
              <div className="text-center p-6 rounded-xl hover:bg-slate-50 transition-all duration-300">
                <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 mb-4 shadow-lg">
                  <Briefcase className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Innovation</h3>
                <p className="text-slate-600">Continuously advancing our technology to meet evolving business needs</p>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-10 border border-slate-200/50">
            <div className="flex items-start space-x-4">
              <div className="bg-gradient-to-br from-indigo-500 to-violet-600 p-3 rounded-xl">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Team</h2>
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  Bondary is powered by a diverse team of industry experts, including software engineers, data scientists, UX designers, and customer success professionals. Our team members bring decades of combined experience from leading technology companies and bring that expertise to every aspect of our platform.
                </p>
                <p className="text-lg text-slate-700 leading-relaxed">
                  We are united by a shared commitment to innovation, customer success, and building products that make a meaningful impact on how businesses operate.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl p-12 text-center">
            <div className="inline-flex p-4 rounded-2xl bg-white/20 mb-6">
              <Mail className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Contact Us</h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Interested in learning more about our solutions or exploring partnership opportunities? Our team is ready to assist you.
            </p>
            <a 
              href="mailto:info@bondarycrm.com" 
              className="inline-block bg-white text-blue-600 font-semibold py-3 px-8 rounded-xl hover:bg-blue-50 transition-all duration-200 shadow-lg"
            >
              info@bondarycrm.com
            </a>
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-16 text-center">
          <p className="text-slate-500 text-sm">© 2026 Bondary CRM. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}