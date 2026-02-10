"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [waitlistCount, setWaitlistCount] = useState(0);

  useEffect(() => {
    // Fetch waitlist count for social proof
    fetch("/api/waitlist/count")
      .then((res) => res.json())
      .then((data) => setWaitlistCount(data.count || 0))
      .catch(() => setWaitlistCount(0));
  }, []);

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
      setWaitlistCount((prev) => prev + 1);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/logo-icon.svg" alt="Gifted" width={36} height={36} />
            <span className="text-xl font-bold">
              <span className="text-[#FF6B6B]">G</span>ifted
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a href="/blog" className="text-sm font-medium text-neutral-600 hover:text-[#FF6B6B] transition">
              Blog
            </a>
            <a href="#signup" className="btn-primary text-sm py-2 px-5">
              Get Early Access
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section - CTA Above the Fold */}
      <section className="pt-24 pb-8 px-6 min-h-[90vh] flex items-center">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: Content + CTA */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              {/* Trust indicator */}
              <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Join hundreds of smart gift-givers
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.1] mb-5">
                Stop Guessing.<br />
                <span className="gradient-text">Find Perfect Gifts</span><br />
                in Seconds.
              </h1>
              
              <p className="text-lg text-neutral-600 mb-8 max-w-lg mx-auto lg:mx-0">
                Swipe through curated gift ideas. Save favourites to wishlists. 
                Never give a boring present again.
              </p>

              {/* Email signup - PRIMARY CTA */}
              <div id="signup" className="max-w-md mx-auto lg:mx-0">
                {!submitted ? (
                  <>
                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading}
                        className="flex-1 px-5 py-4 rounded-full border border-neutral-200 focus:outline-none focus:border-[#FF6B6B] focus:ring-2 focus:ring-[#FF6B6B]/20 transition disabled:opacity-50 text-base"
                      />
                      <button 
                        type="submit" 
                        className="btn-primary whitespace-nowrap disabled:opacity-50 py-4"
                        disabled={loading}
                      >
                        {loading ? "Joining..." : "Get Early Access"}
                      </button>
                    </form>
                    {error && (
                      <p className="text-sm text-red-500 mt-3">{error}</p>
                    )}
                    <p className="text-sm text-neutral-500 mt-4 flex items-center justify-center lg:justify-start gap-2">
                      <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Free forever. No spam. Unsubscribe anytime.
                    </p>
                  </>
                ) : (
                  <div className="bg-gradient-to-br from-[#FFF5F5] to-[#FFE8E8] border border-[#FFD4D4] px-6 py-6 rounded-2xl text-center">
                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                      <span className="text-2xl">🎉</span>
                    </div>
                    <h3 className="text-xl font-bold text-[#FF6B6B] mb-2">You&apos;re in!</h3>
                    <p className="text-neutral-700">
                      We&apos;ll email you when Gifted launches. You&apos;re #{waitlistCount} on the list!
                    </p>
                  </div>
                )}
              </div>

              {/* Benefit pills */}
              <div className="flex flex-wrap gap-3 mt-8 justify-center lg:justify-start">
                <span className="px-4 py-2 bg-neutral-100 rounded-full text-sm text-neutral-700">
                  ⏱️ Save hours of searching
                </span>
                <span className="px-4 py-2 bg-neutral-100 rounded-full text-sm text-neutral-700">
                  🎯 Personalised recommendations
                </span>
                <span className="px-4 py-2 bg-neutral-100 rounded-full text-sm text-neutral-700">
                  📱 iOS & Android
                </span>
              </div>
            </div>

            {/* Right: App Mockup */}
            <div className="flex justify-center lg:justify-end order-1 lg:order-2">
              <div className="relative">
                {/* Decorative elements */}
                <div className="absolute -top-4 -left-4 w-20 h-20 bg-[#FF6B6B]/10 rounded-full blur-xl"></div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#FFE066]/20 rounded-full blur-xl"></div>
                
                {/* Phone mockup */}
                <div className="phone-mockup w-[260px] md:w-[280px] relative z-10">
                  <div className="phone-screen aspect-[9/19] flex flex-col">
                    {/* Status bar */}
                    <div className="h-10 bg-white flex items-center justify-center">
                      <span className="text-xs text-neutral-400">9:41</span>
                    </div>
                    
                    {/* App header */}
                    <div className="px-4 py-2 flex items-center justify-between border-b border-neutral-100 bg-white">
                      <span className="text-base">☰</span>
                      <span className="font-bold text-[#FF6B6B] text-sm">Gifted</span>
                      <span className="text-base">📋</span>
                    </div>
                    
                    {/* Product card - more realistic */}
                    <div className="flex-1 p-3 bg-neutral-50">
                      <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full flex flex-col">
                        <div className="flex-1 bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center relative">
                          <span className="text-5xl">🎁</span>
                          {/* Swipe indicator */}
                          <div className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                            SAVE ♥
                          </div>
                        </div>
                        <div className="p-3">
                          <h3 className="font-semibold text-sm">Luxury Candle Set</h3>
                          <p className="text-xs text-neutral-500 mt-1">Jo Malone • Perfect for her</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-neutral-500">★ 4.9</span>
                            <span className="font-bold text-[#FF6B6B] text-sm">£45</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Action buttons */}
                    <div className="p-3 bg-white flex justify-center gap-3">
                      <div className="w-11 h-11 rounded-full border-2 border-red-300 flex items-center justify-center text-red-400">
                        <span className="text-lg">✕</span>
                      </div>
                      <div className="w-11 h-11 rounded-full border-2 border-amber-300 flex items-center justify-center text-amber-500">
                        <span className="text-lg">↓</span>
                      </div>
                      <div className="w-11 h-11 rounded-full bg-green-500 flex items-center justify-center text-white shadow-lg shadow-green-500/30">
                        <span className="text-lg">♥</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="py-8 px-6 bg-neutral-50 border-y border-neutral-100">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-neutral-500 text-sm mb-4">Products curated from trusted UK retailers</p>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12">
            <span className="text-lg font-semibold text-neutral-300">John Lewis</span>
            <span className="text-lg font-semibold text-neutral-300">Etsy</span>
            <span className="text-lg font-semibold text-neutral-300">ASOS</span>
            <span className="text-lg font-semibold text-neutral-300">Boots</span>
            <span className="text-lg font-semibold text-neutral-300">Not On The High Street</span>
          </div>
        </div>
      </section>

      {/* Problem → Solution Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Sound familiar?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Problems */}
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-red-50 rounded-xl">
                <span className="text-2xl">😩</span>
                <div>
                  <p className="font-medium text-neutral-800">&quot;What do I get someone who has everything?&quot;</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-red-50 rounded-xl">
                <span className="text-2xl">⏰</span>
                <div>
                  <p className="font-medium text-neutral-800">&quot;I spent 3 hours scrolling and still found nothing.&quot;</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-red-50 rounded-xl">
                <span className="text-2xl">🤷</span>
                <div>
                  <p className="font-medium text-neutral-800">&quot;I always end up buying the same boring stuff.&quot;</p>
                </div>
              </div>
            </div>

            {/* Solutions */}
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-green-50 rounded-xl">
                <span className="text-2xl">✨</span>
                <div>
                  <p className="font-medium text-neutral-800">Discover unique gifts you&apos;d never find yourself</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-green-50 rounded-xl">
                <span className="text-2xl">⚡</span>
                <div>
                  <p className="font-medium text-neutral-800">Find the perfect present in under 5 minutes</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-green-50 rounded-xl">
                <span className="text-2xl">🎯</span>
                <div>
                  <p className="font-medium text-neutral-800">Personalised suggestions that actually match</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works - Visual */}
      <section className="py-20 px-6 bg-neutral-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Gift-giving made <span className="gradient-text">ridiculously easy</span>
            </h2>
            <p className="text-neutral-600 max-w-xl mx-auto">
              Three simple steps to find presents they&apos;ll actually love
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#FF6B6B] text-white rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg shadow-[#FF6B6B]/30">
                1
              </div>
              <div className="text-4xl mb-4">👆</div>
              <h3 className="text-xl font-semibold mb-2">Swipe</h3>
              <p className="text-neutral-600">
                Right to save, left to skip. It&apos;s that simple.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#FF6B6B] text-white rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg shadow-[#FF6B6B]/30">
                2
              </div>
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-xl font-semibold mb-2">Organise</h3>
              <p className="text-neutral-600">
                Save to wishlists by person, occasion, or budget.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#FF6B6B] text-white rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg shadow-[#FF6B6B]/30">
                3
              </div>
              <div className="text-4xl mb-4">🎁</div>
              <h3 className="text-xl font-semibold mb-2">Gift</h3>
              <p className="text-neutral-600">
                Buy with confidence. Never give a boring present again.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything you need
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "🎯", title: "Smart Recommendations", desc: "AI learns your taste and suggests better gifts over time" },
              { icon: "📅", title: "Date Reminders", desc: "Never forget a birthday or anniversary again" },
              { icon: "👥", title: "Share Wishlists", desc: "Coordinate group gifts without spoiling surprises" },
              { icon: "💰", title: "Budget Filters", desc: "Find great gifts at any price point" },
              { icon: "🏪", title: "Top Retailers", desc: "Products from John Lewis, Etsy, ASOS & more" },
              { icon: "🔒", title: "Private & Secure", desc: "Your wishlists, your data, your control" },
            ].map((feature) => (
              <div key={feature.title} className="p-6 bg-white border border-neutral-100 rounded-2xl hover:shadow-lg hover:border-[#FF6B6B]/20 transition">
                <span className="text-3xl mb-4 block">{feature.icon}</span>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-neutral-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-gradient-to-br from-[#FF6B6B] to-[#FA5252] rounded-3xl p-10 md:p-14 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to become a better gift-giver?
            </h2>
            <p className="text-white/80 mb-8 max-w-md mx-auto">
              Join thousands of others and be first to try Gifted when we launch.
            </p>
            
            {!submitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="flex-1 px-5 py-4 rounded-full bg-white text-neutral-900 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-50"
                />
                <button 
                  type="submit" 
                  className="bg-white text-[#FF6B6B] px-6 py-4 rounded-full font-semibold hover:shadow-lg transition whitespace-nowrap disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? "..." : "Join Free"}
                </button>
              </form>
            ) : (
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
                <span className="text-3xl mb-2 block">🎉</span>
                <p className="font-semibold">You&apos;re on the list!</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="py-8 px-6 border-t border-neutral-100">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Image src="/logo-icon.svg" alt="Gifted" width={28} height={28} />
              <span className="font-bold text-sm">
                <span className="text-[#FF6B6B]">G</span>ifted
              </span>
            </div>
            
            <div className="flex gap-6 text-sm text-neutral-500">
              <a href="/blog" className="hover:text-[#FF6B6B] transition">Blog</a>
              <a href="#" className="hover:text-[#FF6B6B] transition">Privacy</a>
              <a href="#" className="hover:text-[#FF6B6B] transition">Terms</a>
            </div>
            
            <p className="text-sm text-neutral-400">
              © 2026 Gifted
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
