"use client";

import { useState } from "react";

export default function WaitlistBanner() {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      
      if (response.ok) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Subtle Sticky CTA Banner */}
      {!bannerDismissed && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-t border-neutral-200 py-2.5 px-4">
          <div className="max-w-6xl mx-auto flex items-center justify-center gap-4">
            <p className="text-sm text-neutral-600 text-center">
              <span className="hidden sm:inline">Want this in a swipeable app? </span>
              <button 
                onClick={() => setShowModal(true)}
                className="text-[#FF6B6B] hover:text-[#FA5252] font-medium hover:underline"
              >
                Join the early access list →
              </button>
            </p>
            <button 
              onClick={() => setBannerDismissed(true)}
              className="text-neutral-400 hover:text-neutral-600 p-1 absolute right-4"
              aria-label="Dismiss"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Waitlist Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />
          <div className="relative bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {!submitted ? (
              <>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#FF6B6B] to-[#FA5252] rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🎁</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Get Early Access</h3>
                  <p className="text-neutral-600">
                    Swipe through gift ideas like dating apps. Save favourites. Never give a boring present again.
                  </p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:border-[#FF6B6B] focus:ring-2 focus:ring-[#FF6B6B]/20"
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-gradient-to-r from-[#FF6B6B] to-[#FA5252] text-white py-3 rounded-xl font-semibold hover:shadow-lg transition disabled:opacity-50"
                  >
                    {submitting ? "Joining..." : "Join the Waitlist"}
                  </button>
                </form>
                
                <p className="text-xs text-neutral-400 text-center mt-4">
                  Free forever. No spam. Unsubscribe anytime.
                </p>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🎉</span>
                </div>
                <h3 className="text-2xl font-bold mb-2 text-green-600">You&apos;re in!</h3>
                <p className="text-neutral-600 mb-4">
                  We&apos;ll email you when Gifted launches.
                </p>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-[#FF6B6B] font-medium hover:underline"
                >
                  Continue reading →
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Spacer for footer when banner is visible */}
      {!bannerDismissed && <div className="h-10" />}
    </>
  );
}

export function WaitlistButton({ className = "" }: { className?: string }) {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      
      if (response.ok) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setShowModal(true)}
        className={className || "btn-primary text-sm py-2 px-5"}
      >
        Join Waitlist
      </button>

      {/* Waitlist Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />
          <div className="relative bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {!submitted ? (
              <>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#FF6B6B] to-[#FA5252] rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🎁</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Get Early Access</h3>
                  <p className="text-neutral-600">
                    Swipe through gift ideas like dating apps. Save favourites. Never give a boring present again.
                  </p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:border-[#FF6B6B] focus:ring-2 focus:ring-[#FF6B6B]/20"
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-gradient-to-r from-[#FF6B6B] to-[#FA5252] text-white py-3 rounded-xl font-semibold hover:shadow-lg transition disabled:opacity-50"
                  >
                    {submitting ? "Joining..." : "Join the Waitlist"}
                  </button>
                </form>
                
                <p className="text-xs text-neutral-400 text-center mt-4">
                  Free forever. No spam. Unsubscribe anytime.
                </p>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🎉</span>
                </div>
                <h3 className="text-2xl font-bold mb-2 text-green-600">You&apos;re in!</h3>
                <p className="text-neutral-600 mb-4">
                  We&apos;ll email you when Gifted launches.
                </p>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-[#FF6B6B] font-medium hover:underline"
                >
                  Continue reading →
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
