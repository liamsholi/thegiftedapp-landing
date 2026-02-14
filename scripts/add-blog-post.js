const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://xvbendwssoteawvrbglr.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2YmVuZHdzc290ZWF3dnJiZ2xyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NzM1NTQxOCwiZXhwIjoyMDgyOTMxNDE4fQ.Rio8xXVIhaFqHtWxnIYHAONe7thYYBGMpF6UrPjyFOY'
);

async function createPost() {
  const post = {
    title: '15 Perfect Gift Ideas for 20-30 Year Olds (That They\'ll Actually Use)',
    slug: 'gift-ideas-for-20-30-year-olds',
    excerpt: 'Stuck finding a gift for someone in their twenties? From luxury watch accessories to the latest tech, here are 15 thoughtful gifts that millennials and Gen-Z actually want.',
    cover_image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1200&q=80',
    author: 'The Gifted Team',
    tags: ['Gift Ideas', 'Tech', 'Under £100', 'Gifts for Him', 'Gifts for Her'],
    published: true,
    published_at: new Date().toISOString(),
    seo_title: '15 Best Gift Ideas for 20-30 Year Olds in 2026 | Unique & Thoughtful',
    seo_description: 'Discover the perfect gifts for 20-30 year olds. From the Ellipse Watch Roll to instant cameras and premium speakers - gifts they\'ll actually love and use.',
    seo_keywords: ['gifts for 20 year olds', 'gifts for 30 year olds', 'millennial gifts', 'gen z gifts', 'tech gifts', 'unique gift ideas'],
    content: `Finding the perfect gift for someone in their twenties or early thirties can feel impossible. They're past the age of wanting random stuff, but haven't quite settled into "practical gifts only" territory either.

The sweet spot? Thoughtful items that blend style, functionality, and a touch of luxury they might not buy themselves.

We've curated 15 gift ideas that hit that perfect balance—whether you're shopping for a birthday, Christmas, or just because.

## Style & Accessories

### 1. Ellipse Watch Roll

For the watch enthusiast or frequent traveller, the [Ellipse Watch Roll](https://www.ellipsecase.com) is a game-changer. This beautifully crafted leather case protects watches in style, whether they're heading to a business trip or weekend away.

**Why they'll love it:** It's the kind of elevated accessory they'd admire but never buy themselves. Premium quality, timeless design.

**Price:** From £79

![Luxury watch roll](https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80)

### 2. Quality Leather Wallet

A slim, RFID-blocking leather wallet is something everyone needs but few invest in properly. Look for brands like Bellroy or Secrid that combine minimalist design with functionality.

**Price:** £50-90

### 3. Personalised Jewellery

A simple gold or silver necklace with their initial, or a bracelet with a meaningful date engraved. Subtle, personal, and something they'll wear daily.

**Price:** £30-80

## Tech & Gadgets

### 4. Instant Camera (Fujifilm Instax Mini)

In an age of 10,000 phone photos, there's something magical about instant prints. The Fujifilm Instax Mini 12 is perfect for parties, trips, and capturing memories that actually get displayed.

**Why they'll love it:** Nostalgic, fun, and creates physical memories in our digital world.

**Price:** Around £75

![Instant camera](https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80)

### 5. Premium Bluetooth Speaker (Marshall or Sonos)

A quality speaker transforms any space. The Marshall Emberton II has that iconic vintage look with seriously impressive sound, while the Sonos Roam is perfect for those deep in the smart home ecosystem.

**Why they'll love it:** Great sound, great design, and way better than whatever cheap speaker they're currently using.

**Price:** £130-180

### 6. Wireless Earbuds

If they haven't upgraded to quality wireless earbuds yet, this is a gift they'll use every single day. AirPods Pro remain the gold standard for iPhone users, while the Sony WF-1000XM5 wins for Android.

**Price:** £180-250

### 7. Kindle Paperwhite

For the reader (or aspiring reader), the latest Kindle Paperwhite is waterproof, has adjustable warm light, and weeks of battery life. Pair it with a nice leather case.

**Price:** £140

### 8. Portable Charger (Anker)

Not glamorous, but genuinely useful. A slim 10,000mAh Anker power bank means they'll never be caught with a dead phone again.

**Price:** £30-50

## Experiences & Subscriptions

### 9. Subscription Box

Whether it's coffee (Pact), wine (Naked Wines), or grooming products (Cornerstone), a 3-month subscription is a gift that keeps giving.

**Price:** £30-60 for 3 months

### 10. Masterclass Annual Subscription

Access to classes from world experts in cooking, photography, music, writing, and more. Perfect for the curious learner.

**Price:** £170/year

## Home & Lifestyle

### 11. Luxury Candle

Jo Malone, Diptyque, or Le Labo—a premium candle elevates any space and is a treat most people won't buy themselves.

**Price:** £50-70

![Luxury candle](https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=800&q=80)

### 12. Quality Coffee Kit

An AeroPress, a bag of specialty beans, and a simple hand grinder. The gateway to better mornings.

**Price:** £60-80 for the set

### 13. Weighted Blanket

The gift of better sleep. Look for one that's about 10% of their body weight.

**Price:** £60-100

## Fitness & Wellness

### 14. Smart Water Bottle (HidrateSpark)

Tracks water intake and glows to remind them to drink. Surprisingly effective for building better habits.

**Price:** £50

### 15. Yoga Mat (Lululemon)

If they're into fitness, a premium yoga mat makes a real difference. Lululemon's reversible mat is worth the investment.

**Price:** £78

## How to Choose the Right Gift

Still not sure? Ask yourself:

- **What do they do daily?** Gifts that improve daily routines get used most
- **What would they never buy themselves?** Small luxuries make the best gifts
- **What are they into right now?** Pay attention to what they talk about

The best gifts show you've paid attention. It's not about the price tag—it's about the thought.

---

*Looking for more gift inspiration? [Join the Gifted waitlist](/#signup) and be first to discover our app that makes finding the perfect present as easy as a swipe.*`
  };

  const { data, error } = await supabase
    .from('blog_posts')
    .upsert(post, { onConflict: 'slug' })
    .select();

  if (error) {
    console.error('Error:', error);
  } else {
    console.log('✅ Blog post created successfully!');
    console.log('📝 URL: /blog/gift-ideas-for-20-30-year-olds');
  }
}

createPost();
