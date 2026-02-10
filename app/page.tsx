"use client";

import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to join waitlist");
        return;
      }

      setSubmitted(true);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/logo-icon.svg" alt="Gifted" width={40} height={40} />
            <span className="text-xl font-bold">
              <span className="text-[#FF6B6B]">G</span>ifted
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a href="/blog" className="text-neutral-600 hover:text-[#FF6B6B] transition font-medium">
              Blog
            </a>
            <a href="#waitlist" className="btn-primary text-sm">
              Join Waitlist
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-[#FFF5F5] text-[#FA5252] px-4 py-2 rounded-full text-sm font-medium mb-6">
                <span className="animate-pulse-soft">🎁</span>
                Coming Soon to iOS & Android
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Find the <span className="gradient-text">Perfect Gift</span> with a Swipe
              </h1>
              
              <p className="text-lg text-neutral-600 mb-8 max-w-lg mx-auto lg:mx-0">
                Discover amazing gift ideas curated just for you. Swipe right to save, 
                create wishlists, and never give a boring present again.
              </p>

              {/* Email signup */}
              <div id="waitlist" className="max-w-md mx-auto lg:mx-0">
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={loading}
                      className="flex-1 px-5 py-4 rounded-full border border-neutral-200 focus:outline-none focus:border-[#FF6B6B] focus:ring-2 focus:ring-[#FF6B6B]/20 transition disabled:opacity-50"
                    />
                    <button 
                      type="submit" 
                      className="btn-primary whitespace-nowrap disabled:opacity-50"
                      disabled={loading}
                    >
                      {loading ? "Joining..." : "Join Waitlist"}
                    </button>
                  </form>
                ) : (
                  <div className="bg-green-50 text-green-700 px-6 py-4 rounded-2xl">
                    <p className="font-medium">🎉 You&apos;re on the list!</p>
                    <p className="text-sm mt-1">We&apos;ll notify you when Gifted launches.</p>
                  </div>
                )}
                {error && (
                  <p className="text-sm text-red-500 mt-3">{error}</p>
                )}
                <p className="text-sm text-neutral-500 mt-3">
                  Be the first to know when we launch. No spam, ever.
                </p>
              </div>
            </div>

            {/* Right: Phone Mockup */}
            <div className="flex justify-center lg:justify-end">
              <div className="phone-mockup w-[280px] animate-float">
                <div className="phone-screen aspect-[9/19] flex flex-col">
                  {/* Status bar */}
                  <div className="h-12 bg-white flex items-center justify-center">
                    <span className="text-xs text-neutral-400">9:41</span>
                  </div>
                  
                  {/* App header */}
                  <div className="px-4 py-3 flex items-center justify-between border-b border-neutral-100">
                    <span className="text-lg">☰</span>
                    <span className="font-bold text-[#FF6B6B]">Gifted</span>
                    <span className="text-lg">📋</span>
                  </div>
                  
                  {/* Product card */}
                  <div className="flex-1 p-4 bg-neutral-50">
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full flex flex-col">
                      <div className="flex-1 bg-gradient-to-br from-[#FFF5F5] to-[#FFE3E3] flex items-center justify-center">
                        <span className="text-6xl">🎁</span>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-sm">Premium Gift Set</h3>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-neutral-500">★ 4.8 (2,341)</span>
                          <span className="font-bold text-[#FF6B6B]">£49.99</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action buttons */}
                  <div className="p-4 bg-white flex justify-center gap-4">
                    <div className="w-12 h-12 rounded-full border-2 border-red-400 flex items-center justify-center">
                      <span>✕</span>
                    </div>
                    <div className="w-12 h-12 rounded-full border-2 border-yellow-400 flex items-center justify-center">
                      <span>↓</span>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white">
                      <span>♥</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-neutral-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Gift-giving, <span className="gradient-text">reimagined</span>
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              No more endless scrolling or gift anxiety. Gifted makes finding the 
              perfect present fun, fast, and foolproof.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="feature-card text-center">
              <div className="w-16 h-16 bg-[#FFF5F5] rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">👆</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Swipe to Discover</h3>
              <p className="text-neutral-600">
                Like Tinder, but for gifts. Swipe right on ideas you love, 
                left on ones you don&apos;t. It&apos;s that simple.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="feature-card text-center">
              <div className="w-16 h-16 bg-[#FFF5F5] rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">📋</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Smart Wishlists</h3>
              <p className="text-neutral-600">
                Organize by person, occasion, or budget. Set date reminders 
                and never forget an important gift again.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="feature-card text-center">
              <div className="w-16 h-16 bg-[#FFF5F5] rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Share & Collaborate</h3>
              <p className="text-neutral-600">
                Share wishlists with family and friends. Coordinate group gifts 
                without spoiling the surprise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How it works
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "1", icon: "👉", title: "Swipe Right", desc: "Save gifts you love to your wishlist" },
              { step: "2", icon: "👈", title: "Swipe Left", desc: "Skip items that aren't quite right" },
              { step: "3", icon: "👇", title: "Swipe Down", desc: "Save for later in your Maybe basket" },
              { step: "4", icon: "👆", title: "Swipe Up", desc: "See full details, images & reviews" },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-[#FF6B6B] text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                  {item.step}
                </div>
                <span className="text-4xl block mb-3">{item.icon}</span>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-neutral-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products From */}
      <section className="py-16 px-6 bg-neutral-50">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-neutral-500 mb-8">Products curated from top UK retailers</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60">
            <span className="text-xl font-semibold text-neutral-400">John Lewis</span>
            <span className="text-xl font-semibold text-neutral-400">Etsy</span>
            <span className="text-xl font-semibold text-neutral-400">ASOS</span>
            <span className="text-xl font-semibold text-neutral-400">Boots</span>
            <span className="text-xl font-semibold text-neutral-400">Argos</span>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-br from-[#FF6B6B] to-[#FA5252] rounded-3xl p-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to find the perfect gift?
            </h2>
            <p className="text-white/80 mb-8 max-w-lg mx-auto">
              Join thousands of others who are tired of gift-giving stress. 
              Be the first to experience Gifted.
            </p>
            <a href="#waitlist" className="inline-block bg-white text-[#FF6B6B] px-8 py-4 rounded-full font-semibold hover:shadow-lg transition">
              Join the Waitlist
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-neutral-100">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <Image src="/logo-icon.svg" alt="Gifted" width={32} height={32} />
              <span className="font-bold">
                <span className="text-[#FF6B6B]">G</span>ifted
              </span>
            </div>
            
            <div className="flex gap-8 text-sm text-neutral-600">
              <a href="/blog" className="hover:text-[#FF6B6B] transition">Blog</a>
              <a href="#" className="hover:text-[#FF6B6B] transition">Privacy</a>
              <a href="#" className="hover:text-[#FF6B6B] transition">Terms</a>
              <a href="mailto:hello@gifted.app" className="hover:text-[#FF6B6B] transition">Contact</a>
            </div>
            
            <p className="text-sm text-neutral-500">
              © 2026 Gifted. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
