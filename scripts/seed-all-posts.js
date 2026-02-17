const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const supabaseUrl = 'https://xvbendwssoteawvrbglr.supabase.co';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseServiceRoleKey) {
  console.error('Error: SUPABASE_SERVICE_ROLE_KEY environment variable is not set.');
  console.log('\nTo run this script:');
  console.log('1. Go to: https://supabase.com/dashboard/project/xvbendwssoteawvrbglr/settings/api');
  console.log('2. Copy the "service_role" key');
  console.log('3. Run: SUPABASE_SERVICE_ROLE_KEY=your_key node scripts/seed-all-posts.js');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: { persistSession: false }
});

// All blog posts data
const blogPosts = [
  {
    title: "Gifts for Book Lovers That Aren't Just Another Book",
    slug: "gifts-for-book-lovers-not-books",
    excerpt: "Shopping for a bookworm? These thoughtful gifts enhance their reading life without adding to their towering TBR pile.",
    cover_image: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=1200&q=80",
    author: "The Gifted Team",
    tags: ["Gift Ideas", "Books", "Hobbies"],
    published: true,
    published_at: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000).toISOString(),
    seo_title: "Best Gifts for Book Lovers 2026 | Bookworm Gift Ideas",
    seo_description: "Find perfect gifts for book lovers that aren't books. Reading accessories, bookish decor, and experiences for the bibliophile in your life.",
    seo_keywords: ["gifts for book lovers", "bookworm gifts", "reader gifts", "bibliophile presents", "reading accessories"],
    content: `Book lovers are easy to buy for, right? Just get them a book. But here's the problem: they probably have a stack of unread books already, very specific taste, and strong opinions about editions and formats.

Instead of adding to their TBR pile, consider gifts that enhance their reading experience.

## Reading Comfort

### Book Light

A quality reading light like the [Mighty Bright](https://www.mightybright.com) or [LuminoLite](https://www.amazon.co.uk) lets them read in bed without disturbing anyone. Rechargeable versions are best.

**Price:** £15-30

### Reading Pillow

A proper reading pillow with arm rests makes reading in bed infinitely more comfortable. [Vekkia](https://www.amazon.co.uk) and similar brands make purpose-built options.

**Price:** £30-50

![Cosy reading setup](https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80)

### Cashmere Blanket

A soft throw from [The White Company](https://www.thewhitecompany.com) or [Johnstons of Elgin](https://www.johnstonsofelgin.com) for cosy reading sessions.

**Price:** £80-200

### Book Holder

A wooden book stand or holder keeps pages open hands-free. [Etsy](https://www.etsy.com) has beautiful handmade options. Perfect for reading while eating or taking notes.

**Price:** £20-50

## Book Care & Storage

### Beautiful Bookends

Quality bookends from [Oliver Bonas](https://www.oliverbonas.com), [Anthropologie](https://www.anthropologie.com), or designer options. Functional and decorative.

**Price:** £25-80

### Book Embosser

A personalised embosser from [Papier](https://www.papier.com) or [Etsy](https://www.etsy.com) marks their books as theirs. Beautiful for anyone who lends books.

**Price:** £40-80

## Reading Accessories

### Luxury Bookmark

Not a freebie from a bookshop—a beautiful leather or metal bookmark from [Smythson](https://www.smythson.com), [Aspinal](https://www.aspinaloflondon.com), or a handmade option.

**Price:** £20-50

### Book Sleeve

A padded sleeve protects books in bags. [Book Beau](https://www.bookbeau.com) makes beautiful, quilted options in various sizes.

**Price:** £15-30

### Reading Journal

A journal specifically for tracking books read, favourite quotes, and thoughts. [Leuchtturm1917](https://www.leuchtturm1917.co.uk) makes a dedicated reading journal.

**Price:** £15-25

![Reading journal](https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=800&q=80)

## Subscriptions & Services

### Book Subscription Box

[The Willoughby Book Club](https://www.willoughbybookclub.co.uk) sends personally selected books based on their taste. [Rare Birds](https://www.rarebirdsbookclub.com) focuses on literary fiction.

**Price:** £30-50/month

### Audible Subscription

[Audible](https://www.audible.co.uk) lets them "read" during commutes, walks, and chores. Perfect for book lovers who want more reading time.

**Price:** £8/month

## Experiences

### Literary Festival Tickets

Tickets to [Hay Festival](https://www.hayfestival.com), [Edinburgh Book Festival](https://www.edbookfest.co.uk), or [Cheltenham Literature Festival](https://www.cheltenhamfestivals.com).

**Price:** £15-50 per event

### Bookshop Gift Card

A gift card to their favourite independent bookshop, [Waterstones](https://www.waterstones.com), or [Blackwell's](https://blackwells.co.uk). Let them choose.

**Price:** £20-100

## Bookish Home Decor

### Literary Candle

Candles inspired by books or reading from [Paddywax Library Collection](https://paddywax.com) or [Etsy](https://www.etsy.com) sellers.

**Price:** £20-35

### Book Art Print

Prints featuring literary quotes, book illustrations, or library imagery. [King & McGaw](https://www.kingandmcgaw.com) has beautiful options.

**Price:** £30-80

## What to Avoid

- Random bestsellers (they probably have opinions about those)
- Books you think they "should" read
- E-readers (they likely have strong format preferences)
- Anything that implies they read too much

The best gifts for book lovers enhance the reading experience they already love.

---

*Looking for more gift inspiration? [Join the Gifted waitlist](/#signup) and discover personalised recommendations for everyone on your list.*`
  },
  {
    title: "Gifts for Coffee Snobs: What Serious Coffee Lovers Actually Want",
    slug: "gifts-for-coffee-snobs",
    excerpt: "Shopping for someone who takes their coffee seriously? These gifts will impress even the most discerning caffeine connoisseur.",
    cover_image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80",
    author: "The Gifted Team",
    tags: ["Gift Ideas", "Food & Drink", "Hobbies"],
    published: true,
    published_at: new Date(Date.now() + 19 * 24 * 60 * 60 * 1000).toISOString(),
    seo_title: "Best Gifts for Coffee Lovers 2026 | Coffee Snob Gift Ideas",
    seo_description: "Find perfect gifts for coffee snobs. From premium beans to professional equipment, impress the serious coffee lover in your life.",
    seo_keywords: ["gifts for coffee lovers", "coffee snob gifts", "barista gifts", "coffee equipment", "specialty coffee gifts"],
    content: `Coffee snobs are particular. They've moved beyond instant coffee, past pod machines, and into the world of single-origin beans, precise brewing ratios, and heated debates about extraction times.

The good news? They're always looking to upgrade their setup. Here's what they actually want.

## Premium Beans

### Specialty Coffee Subscription

[Pact Coffee](https://www.pactcoffee.com), [Square Mile](https://shop.squaremilecoffee.com), or [Hasbean](https://www.hasbean.co.uk) deliver freshly roasted, specialty-grade beans. A subscription means they never run out.

**Price:** £8-15/bag, subscriptions from £25/month

### Single Origin Selection

A curated selection of single-origin beans from different regions. [Origin Coffee](https://www.origincoffee.co.uk) or [Workshop Coffee](https://www.workshopcoffee.com) offer excellent variety packs.

**Price:** £30-50

![Specialty coffee beans](https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80)

## Brewing Equipment

### Precision Grinder

A quality burr grinder is essential. The [Baratza Encore](https://www.baratza.com) is the entry point for serious coffee. [Comandante](https://www.comandantegrinder.com) or [1Zpresso](https://1zpresso.coffee) for hand grinders.

**Price:** £100-300

### Pour-Over Setup

A [Chemex](https://www.chemexcoffeemaker.com), [Hario V60](https://www.hario.co.uk), or [Kalita Wave](https://www.kalita.co.jp) for pour-over brewing. Include filters and a gooseneck kettle for the complete setup.

**Price:** £30-80

### AeroPress

The [AeroPress](https://aeropress.com) is beloved by coffee nerds for its versatility and portability. If they don't have one, they want one.

**Price:** £30-35

### Gooseneck Kettle

Precise pouring requires a gooseneck kettle. [Fellow Stagg EKG](https://fellowproducts.com) is the gold standard—temperature control, beautiful design, and precise pour.

**Price:** £100-150

![Pour over coffee setup](https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=800&q=80)

### Coffee Scale

Precision matters. The [Acaia Pearl](https://acaia.co) is the professional choice, but [Hario](https://www.hario.co.uk) and [Timemore](https://www.timemore.com) offer excellent budget options with timers.

**Price:** £30-200

## Espresso Upgrades

### Bottomless Portafilter

A naked portafilter for their espresso machine lets them see (and improve) their extraction. Satisfying to use and educational.

**Price:** £30-60

### Precision Tamper

A quality tamper like [Pullman](https://pullman.coffee) or [Decent](https://decentespresso.com) ensures consistent pressure. Levelling tampers are particularly useful.

**Price:** £50-150

## Learning & Experiences

### Barista Course

A course at [London School of Coffee](https://www.londonschoolofcoffee.com), [Prufrock](https://www.prufrockcoffee.com), or their local specialty roaster. Learn from professionals.

**Price:** £100-300

### The World Atlas of Coffee by James Hoffmann

The definitive guide to coffee origins, processing, and brewing. Essential reading for any coffee enthusiast.

**Price:** £25

## What to Avoid

- Pod machines or capsules (they've moved past these)
- Flavoured coffee (purists generally avoid it)
- Pre-ground coffee (freshness matters)
- Cheap blade grinders (they destroy beans)

## The Safe Bet

When in doubt, a gift card to their favourite roaster or [Has Bean](https://www.hasbean.co.uk) lets them choose exactly what they want.

---

*Looking for more gift inspiration? [Join the Gifted waitlist](/#signup) and discover personalised recommendations for everyone on your list.*`
  },
  {
    title: "Long Distance Relationship Gifts: Staying Connected Across Miles",
    slug: "long-distance-relationship-gifts",
    excerpt: "Miles apart but still close at heart? These thoughtful gifts help couples stay connected when they can't be together.",
    cover_image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=1200&q=80",
    author: "The Gifted Team",
    tags: ["Gift Ideas", "Relationships", "Couples"],
    published: true,
    published_at: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
    seo_title: "Best Long Distance Relationship Gifts 2026 | LDR Gift Ideas",
    seo_description: "Find perfect gifts for long distance relationships. Thoughtful presents that help couples stay connected across the miles.",
    seo_keywords: ["long distance relationship gifts", "LDR gifts", "gifts for couples apart", "distance relationship presents"],
    content: `Long distance relationships are hard. The miles between you can feel insurmountable, especially on difficult days. The right gift can bridge that gap—not by pretending the distance doesn't exist, but by acknowledging it and finding ways to feel closer despite it.

## Touch & Connection

### Long Distance Touch Bracelets

[Bond Touch](https://www.bond-touch.com) or [HEY](https://www.heybracelet.com) bracelets let you send a touch to your partner's wrist from anywhere in the world. When you tap yours, theirs vibrates. Simple but meaningful.

**Price:** £80-120 per pair

### Long Distance Lamps

[Friendship Lamps](https://www.friendlamps.com) or [Filimin](https://filimin.com) light up when touched—touch yours and theirs lights up too, no matter where they are. A gentle way to say "thinking of you."

**Price:** £100-200 per pair

![Connected couple](https://images.unsplash.com/photo-1522098543979-ffc7f79a56c4?w=800&q=80)

## Shared Experiences

### Watch Party Subscription

[Netflix](https://www.netflix.com), [Disney+](https://www.disneyplus.com), or [Amazon Prime](https://www.amazon.co.uk/prime) with [Teleparty](https://www.teleparty.com) extension lets you watch together in sync while chatting.

**Price:** £10-15/month

### Same Book, Same Time

Buy two copies of the same book and read it together, discussing as you go. Creates shared experience and conversation.

**Price:** £20-30

## Sentimental Keepsakes

### Photo Book of Your Relationship

A [Photobox](https://www.photobox.co.uk) or [CEWE](https://www.cewe.co.uk) book documenting your time together. Something physical to hold when you miss them.

**Price:** £25-50

### Coordinates Jewellery

A necklace or bracelet with the coordinates of where you met, or where they are. [Etsy](https://www.etsy.com) has many options.

**Price:** £30-80

### Open When Letters

A set of letters to open at specific times: "Open when you miss me," "Open when you need a laugh," "Open when you can't sleep." Requires effort but means everything.

**Price:** Minimal (maximum effort)

![Planning future visits](https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80)

## Practical Connection

### Good Webcam

Video calls are your lifeline. A quality webcam like [Logitech Brio](https://www.logitech.com) or [Elgato Facecam](https://www.elgato.com) makes calls feel more present.

**Price:** £100-200

### Comfortable Headphones

For long calls, comfortable headphones matter. [Sony WH-1000XM5](https://www.sony.co.uk) or [Bose](https://www.bose.co.uk) for quality and comfort.

**Price:** £250-350

## Care Packages

### Comfort Package

Your hoodie (that smells like you), their favourite treats, a handwritten letter, and something soft to hug.

**Price:** £30-60

### Date Night Box

Everything needed for a virtual date: same wine, same snacks, same candle. Open together over video call.

**Price:** £40-80

## The Most Important Gift

Consistency. Regular calls, good morning texts, and showing up even when it's hard. Physical gifts matter, but presence—even virtual presence—matters more.

---

*Looking for more gift inspiration? [Join the Gifted waitlist](/#signup) and discover personalised recommendations for everyone on your list.*`
  },
  {
    title: "Gifts for Gamers: What They Actually Want (Not Another Gift Card)",
    slug: "gifts-for-gamers",
    excerpt: "Shopping for a gamer? These gifts enhance their setup, comfort, and gaming experience—without guessing which games they want.",
    cover_image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1200&q=80",
    author: "The Gifted Team",
    tags: ["Gift Ideas", "Gaming", "Tech"],
    published: true,
    published_at: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
    seo_title: "Best Gifts for Gamers 2026 | Gaming Gift Ideas",
    seo_description: "Find perfect gifts for gamers. From peripherals to comfort items, these presents enhance their gaming without guessing which games they want.",
    seo_keywords: ["gifts for gamers", "gaming gifts", "gamer presents", "video game gifts", "PC gaming gifts"],
    content: `Gamers are tricky to buy for. They know exactly which games they want, have strong opinions about peripherals, and their setup is deeply personal. Buying the wrong thing means it'll sit unused.

The solution? Focus on comfort, quality-of-life improvements, and accessories rather than games themselves.

## Comfort & Ergonomics

### Gaming Chair Upgrade

Not a racing-style chair—a proper ergonomic chair. [Secretlab](https://secretlab.co.uk), [Herman Miller x Logitech](https://store.hermanmiller.com), or [Autonomous](https://www.autonomous.ai) make chairs designed for long sessions.

**Price:** £300-1500

### Blue Light Glasses

Gaming glasses from [Gunnar](https://gunnar.com) or [HyperX](https://hyperx.com) reduce eye strain during long sessions.

**Price:** £40-80

![Gaming setup](https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800&q=80)

## Audio

### Quality Headset

A proper gaming headset makes a huge difference. [SteelSeries Arctis](https://steelseries.com), [HyperX Cloud](https://hyperx.com), or [Audeze Maxwell](https://www.audeze.com) for premium.

**Price:** £80-400

### Headphone Stand

A proper stand keeps headphones safe and looks good. [Corsair](https://www.corsair.com), [Razer](https://www.razer.com), or wooden options from [Etsy](https://www.etsy.com).

**Price:** £20-50

## Desk Setup

### Monitor Light Bar

The [BenQ ScreenBar](https://www.benq.eu) illuminates the desk without screen glare. Essential for eye comfort during evening sessions.

**Price:** £100-130

### LED Strip Lights

[Philips Hue](https://www.philips-hue.com) or [Govee](https://www.govee.com) LED strips for ambient lighting. Many sync with games for immersive effects.

**Price:** £30-100

![RGB gaming setup](https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?w=800&q=80)

## Collectibles & Decor

### Game Art Prints

[Cook & Becker](https://www.cookandbecker.com) sells official game art prints. Beautiful, frameable art from games they love.

**Price:** £40-200

### Figures & Statues

Official figures from [First 4 Figures](https://www.first4figures.com), [Good Smile Company](https://www.goodsmile.info), or game-specific merchandise.

**Price:** £30-500

## What to Avoid

- Games (they know what they want)
- Cheap peripherals (they'll replace them)
- "Gamer" branded junk food
- Anything that assumes their taste

## The Safe Bet

Gift cards to [Steam](https://store.steampowered.com), [PlayStation Store](https://store.playstation.com), [Xbox](https://www.xbox.com), or [Nintendo eShop](https://www.nintendo.co.uk) let them choose. Not exciting, but always appreciated.

---

*Looking for more gift inspiration? [Join the Gifted waitlist](/#signup) and discover personalised recommendations for everyone on your list.*`
  },
  {
    title: "Teacher Appreciation Gifts: What Educators Actually Want",
    slug: "gifts-for-teachers",
    excerpt: "Want to thank a teacher properly? Skip the mugs and apples—here's what educators actually appreciate receiving.",
    cover_image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&q=80",
    author: "The Gifted Team",
    tags: ["Gift Ideas", "Thank You", "Teachers"],
    published: true,
    published_at: new Date(Date.now() + 22 * 24 * 60 * 60 * 1000).toISOString(),
    seo_title: "Best Gifts for Teachers 2026 | Teacher Appreciation Gift Ideas",
    seo_description: "Find perfect gifts for teachers. What educators actually want - from self-care treats to classroom supplies and thoughtful gestures.",
    seo_keywords: ["gifts for teachers", "teacher appreciation gifts", "end of year teacher gifts", "thank you teacher presents"],
    content: `Teachers are chronically underappreciated and often underpaid. They spend their own money on classroom supplies, work evenings and weekends, and genuinely care about your children's futures.

They deserve better than another "World's Best Teacher" mug. Here's what they actually want.

## Self-Care (They Need It)

### Spa or Massage Voucher

Teaching is physically and emotionally exhausting. A massage or spa treatment from [Urban](https://urban.co) or a local spa gives them permission to relax.

**Price:** £50-100

### Nice Candle

A quality candle from [Jo Malone](https://www.jomalone.co.uk), [Diptyque](https://www.diptyque.com), or [Neom](https://www.neom.com) for unwinding at home.

**Price:** £30-60

![Teacher relaxing](https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80)

## Practical Classroom Supplies

### Amazon or Staples Gift Card

Teachers spend their own money on supplies. A gift card specifically for classroom needs is genuinely useful.

**Price:** £20-50

### Quality Pens

Teachers go through pens constantly. A box of their preferred pens—[Pilot G2](https://www.pilotpen.co.uk), [Flair](https://www.amazon.co.uk), or [Sharpies](https://www.sharpie.com)—is practical luxury.

**Price:** £15-30

## Food & Drink

### Coffee Shop Gift Card

Teachers run on caffeine. [Costa](https://www.costa.co.uk), [Starbucks](https://www.starbucks.co.uk), or their local coffee shop.

**Price:** £15-30

### Chocolate

Not a box of Celebrations—proper chocolate from [Hotel Chocolat](https://www.hotelchocolat.com), [Rococo](https://www.rococochocolates.com), or [Paul A Young](https://www.paulayoung.co.uk).

**Price:** £15-40

![Quality chocolate](https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=800&q=80)

## The Most Meaningful Gift

### A Thoughtful Letter

A genuine letter explaining how they've made a difference. Specific examples of what they've done, how they've helped, what your child has learned. Teachers keep these forever.

**Price:** Free (priceless value)

## What to Avoid

- "Best Teacher" mugs (they have dozens)
- Apples or apple-themed anything
- Cheap chocolates
- Anything that adds to their workload

---

*Looking for more gift inspiration? [Join the Gifted waitlist](/#signup) and discover personalised recommendations for everyone on your list.*`
  },
  {
    title: "Housewarming Gifts: What New Homeowners Actually Need",
    slug: "housewarming-gifts-new-homeowners",
    excerpt: "Know someone who just bought their first home? These practical and thoughtful gifts help them settle in without adding clutter.",
    cover_image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80",
    author: "The Gifted Team",
    tags: ["Gift Ideas", "Home", "Milestones"],
    published: true,
    published_at: new Date(Date.now() + 23 * 24 * 60 * 60 * 1000).toISOString(),
    seo_title: "Best Housewarming Gifts 2026 | New Homeowner Gift Ideas",
    seo_description: "Find perfect housewarming gifts for new homeowners. Practical presents they actually need - from tools to luxuries for their new space.",
    seo_keywords: ["housewarming gifts", "new homeowner gifts", "first home presents", "moving in gifts"],
    content: `Buying a first home is exciting but expensive. New homeowners have just spent everything on deposits, fees, and probably some emergency repairs. They need practical things but might not have budget for nice versions.

## Practical Essentials

### Quality Tool Kit

A proper tool kit from [Stanley](https://www.stanleytools.co.uk) or [Bosch](https://www.bosch-diy.com) with essentials: hammer, screwdrivers, pliers, tape measure, level. They'll use these forever.

**Price:** £40-100

### Cordless Drill

A [Bosch](https://www.bosch-diy.com) or [DeWalt](https://www.dewalt.co.uk) cordless drill is essential for hanging pictures, assembling furniture, and countless DIY tasks.

**Price:** £60-150

![Home tools](https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=800&q=80)

## Kitchen Upgrades

### Quality Knives

A good chef's knife from [Victorinox](https://www.victorinox.com) or a small set from [ProCook](https://www.procook.co.uk). Better than the cheap ones they probably have.

**Price:** £30-100

### Cast Iron Pan

A [Lodge](https://www.lodgecastiron.com) or [Le Creuset](https://www.lecreuset.co.uk) cast iron pan lasts forever and improves with use.

**Price:** £30-200

## Home Comfort

### Quality Bedding

Nice sheets from [The White Company](https://www.thewhitecompany.com), [Bedfolk](https://bedfolk.com), or [Piglet in Bed](https://pigletinbed.com). They might have skimped on bedding after spending so much on the house.

**Price:** £80-200

### Plants

Houseplants from [Patch Plants](https://www.patchplants.com) make a new house feel lived-in. Choose low-maintenance varieties.

**Price:** £20-50

![Cosy home](https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80)

## Smart Home

### Smart Speaker

An [Amazon Echo](https://www.amazon.co.uk) or [Google Nest](https://store.google.com) starts their smart home journey.

**Price:** £50-100

## Experiences & Services

### Cleaner for a Month

A few sessions with a cleaning service from [Hassle.com](https://hassle.com) while they're still unpacking.

**Price:** £60-120

### DIY Store Gift Card

[B&Q](https://www.diy.com), [Screwfix](https://www.screwfix.com), or [Homebase](https://www.homebase.co.uk) gift cards. They'll definitely need things.

**Price:** £30-100

## The Thoughtful Touch

Include a card with local recommendations—best coffee shop, reliable plumber, good takeaway. Local knowledge is valuable when you're new to an area.

---

*Looking for more gift inspiration? [Join the Gifted waitlist](/#signup) and discover personalised recommendations for everyone on your list.*`
  },
  {
    title: "Gifts for People Who Love to Host: Elevate Their Entertaining",
    slug: "gifts-for-people-who-love-to-host",
    excerpt: "Know someone who throws the best dinner parties? These gifts help them entertain in style—from barware to kitchen upgrades.",
    cover_image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80",
    author: "The Gifted Team",
    tags: ["Gift Ideas", "Home", "Entertaining"],
    published: true,
    published_at: new Date(Date.now() + 24 * 24 * 60 * 60 * 1000).toISOString(),
    seo_title: "Best Gifts for Hosts 2026 | Entertaining Gift Ideas",
    seo_description: "Find perfect gifts for people who love to host. Barware, kitchen tools, and entertaining essentials for the host with the most.",
    seo_keywords: ["gifts for hosts", "entertaining gifts", "dinner party gifts", "hostess gifts", "barware gifts"],
    content: `Some people are natural hosts. They throw dinner parties, organise gatherings, and make everyone feel welcome. These people deserve gifts that support their passion for bringing people together.

## Barware & Drinks

### Quality Cocktail Set

A proper cocktail set from [Cocktail Kingdom](https://www.cocktailkingdom.com) or [Viski](https://www.viski.com)—shaker, jigger, strainer, bar spoon. The tools professionals use.

**Price:** £50-100

### Beautiful Glassware

Elevate their bar with glasses from [LSA](https://www.lsa-international.com), [Riedel](https://www.riedel.com), or [Waterford](https://www.waterford.com).

**Price:** £40-100

![Beautiful barware](https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=80)

## Kitchen & Serving

### Beautiful Serving Platters

Ceramic or wooden serving boards from [Toast](https://www.toa.st), [Arket](https://www.arket.com), or [Anthropologie](https://www.anthropologie.com). Presentation matters.

**Price:** £30-80

### Cast Iron Casserole

A [Le Creuset](https://www.lecreuset.co.uk) or [Staub](https://www.staub.com) casserole dish goes from oven to table beautifully.

**Price:** £150-300

### Linen Napkins

Quality linen napkins from [The Linen Works](https://www.thelinenworks.co.uk) or [Piglet in Bed](https://pigletinbed.com). Reusable and elegant.

**Price:** £40-80 for a set

![Table setting](https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&q=80)

## Ambiance

### Quality Speaker

A [Sonos](https://www.sonos.com) or [Marshall](https://www.marshallheadphones.com) speaker for dinner party playlists. Good sound sets the mood.

**Price:** £150-400

### Fresh Flowers Subscription

[Freddie's Flowers](https://www.freddiesflowers.com) or [Bloom & Wild](https://www.bloomandwild.com) subscription ensures they always have fresh flowers for the table.

**Price:** £25-40/delivery

## Experiences

### Private Chef Experience

A private chef from [La Belle Assiette](https://www.labelleassiette.co.uk) to cook for them for once, instead of them cooking for everyone else.

**Price:** £50-100 per person

The best gifts for hosts either elevate what they already do or give them a night off from hosting.

---

*Looking for more gift inspiration? [Join the Gifted waitlist](/#signup) and discover personalised recommendations for everyone on your list.*`
  },
  {
    title: "Gifts for Photographers: What They Actually Want",
    slug: "gifts-for-photographers",
    excerpt: "Shopping for a photographer? Skip the camera (they're particular) and focus on accessories, experiences, and tools they'll actually use.",
    cover_image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=1200&q=80",
    author: "The Gifted Team",
    tags: ["Gift Ideas", "Photography", "Hobbies"],
    published: true,
    published_at: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(),
    seo_title: "Best Gifts for Photographers 2026 | Photography Gift Ideas",
    seo_description: "Find perfect gifts for photographers. Accessories, tools, and experiences they actually want - without guessing their camera preferences.",
    seo_keywords: ["gifts for photographers", "photography gifts", "camera accessories", "photographer presents"],
    content: `Photographers are notoriously difficult to buy for. They have specific camera systems, strong opinions about gear, and probably already own the obvious accessories.

## Camera Accessories

### Quality Camera Strap

A comfortable, stylish strap from [Peak Design](https://www.peakdesign.com), [Holdfast](https://holdfastgear.com), or [ONA](https://onabags.com). Most kit straps are uncomfortable—an upgrade is always welcome.

**Price:** £40-100

### Memory Cards

You can never have too many. Fast, reliable cards from [SanDisk Extreme Pro](https://www.westerndigital.com) or [Lexar Professional](https://www.lexar.com).

**Price:** £30-80

![Camera equipment](https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80)

## Storage & Organisation

### External Hard Drive

Photographers need endless storage. A [LaCie Rugged](https://www.lacie.com) or [Samsung T7](https://www.samsung.com) portable SSD for backups.

**Price:** £80-200

### Photo Printing Credit

Credit for professional printing at [WhiteWall](https://www.whitewall.com), [CEWE](https://www.cewe.co.uk), or [Photobox](https://www.photobox.co.uk). Many photographers never print their own work.

**Price:** £50-100

## Learning & Experiences

### Photography Workshop

A workshop or course from [The Photographers' Gallery](https://thephotographersgallery.org.uk), [Central Saint Martins](https://www.arts.ac.uk), or local photography schools.

**Price:** £100-500

### MasterClass Subscription

[MasterClass](https://www.masterclass.com) features photography courses from Annie Leibovitz, Jimmy Chin, and other masters.

**Price:** £170/year

![Photo organisation](https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&q=80)

## What to Avoid

- Cameras or lenses (too personal, too specific)
- Cheap tripods or accessories (they'll replace them)
- Photo frames (they have opinions about presentation)

## The Safe Bet

Gift cards to [Wex Photo Video](https://www.wexphotovideo.com), [Park Cameras](https://www.parkcameras.com), or [MPB](https://www.mpb.com) let them choose exactly what they need.

---

*Looking for more gift inspiration? [Join the Gifted waitlist](/#signup) and discover personalised recommendations for everyone on your list.*`
  },
  {
    title: "Gifts for People Who Are Always Cold: Cosy Presents They'll Love",
    slug: "gifts-for-people-who-are-always-cold",
    excerpt: "Know someone who's perpetually freezing? These warming gifts will help them stay cosy—from heated blankets to thermal everything.",
    cover_image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&q=80",
    author: "The Gifted Team",
    tags: ["Gift Ideas", "Comfort", "Winter"],
    published: true,
    published_at: new Date(Date.now() + 26 * 24 * 60 * 60 * 1000).toISOString(),
    seo_title: "Best Gifts for People Who Are Always Cold 2026 | Cosy Gift Ideas",
    seo_description: "Find perfect gifts for people who are always cold. Warming presents from heated blankets to thermal layers that keep them cosy.",
    seo_keywords: ["gifts for cold people", "warming gifts", "cosy presents", "heated blanket gifts"],
    content: `We all know someone who's always cold. They're wearing a jumper in summer, have a blanket at their desk, and their hands are perpetually icy. For these people, warmth isn't just nice—it's essential.

## Heated Everything

### Electric Blanket

A quality electric blanket from [Dreamland](https://www.dreamlanduk.co.uk), [Silentnight](https://www.silentnight.co.uk), or [Beurer](https://www.beurer.com) transforms their bed into a warm cocoon.

**Price:** £50-150

### Hand Warmers

Rechargeable hand warmers from [Ocoopa](https://www.amazon.co.uk) or [Zippo](https://www.zippo.co.uk) that double as phone chargers.

**Price:** £20-40

![Cosy blanket](https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800&q=80)

## Cosy Layers

### Cashmere Jumper

A quality cashmere jumper from [Johnstons of Elgin](https://www.johnstonsofelgin.com), [N.Peal](https://www.npeal.com), or [Uniqlo](https://www.uniqlo.com). Warm without bulk.

**Price:** £80-300

### Wool Socks

Quality wool socks from [Pantherella](https://www.pantherella.com), [Falke](https://www.falke.com), or [Darn Tough](https://darntough.com). Cold feet make everything worse.

**Price:** £15-30

## Hot Drinks

### Ember Mug

The [Ember Mug](https://ember.com) keeps drinks at the perfect temperature for hours. No more cold coffee.

**Price:** £100-150

### Hot Chocolate Set

[Hotel Chocolat](https://www.hotelchocolat.com) velvetiser and hot chocolate, or artisan drinking chocolate from [Pump Street](https://pumpstreetchocolate.com).

**Price:** £30-150

![Hot drinks](https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&q=80)

## Home Warmth

### Hot Water Bottle

A quality hot water bottle with a beautiful cover from [The White Company](https://www.thewhitecompany.com), [Yuyu](https://yuyubottle.com) (extra long), or [Warmies](https://www.warmies.co.uk).

**Price:** £20-50

### Weighted Blanket

A [Gravity Blanket](https://gravityblankets.co.uk) or [Simba Orbit](https://simbasleep.com) provides warmth and comfort.

**Price:** £100-200

Cold people often feel like they're being dramatic or difficult. Gifts that acknowledge their reality—and help solve it—show you take their comfort seriously.

---

*Looking for more gift inspiration? [Join the Gifted waitlist](/#signup) and discover personalised recommendations for everyone on your list.*`
  },
  {
    title: "Gifts for Wine Lovers: Beyond Just Another Bottle",
    slug: "gifts-for-wine-lovers",
    excerpt: "Shopping for a wine enthusiast? These gifts enhance their appreciation—from proper glassware to experiences that deepen their knowledge.",
    cover_image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1200&q=80",
    author: "The Gifted Team",
    tags: ["Gift Ideas", "Wine", "Food & Drink"],
    published: true,
    published_at: new Date(Date.now() + 27 * 24 * 60 * 60 * 1000).toISOString(),
    seo_title: "Best Gifts for Wine Lovers 2026 | Wine Enthusiast Gift Ideas",
    seo_description: "Find perfect gifts for wine lovers. From quality glassware to wine experiences, these presents go beyond just another bottle.",
    seo_keywords: ["gifts for wine lovers", "wine gifts", "wine enthusiast presents", "sommelier gifts"],
    content: `Wine lovers are particular. They have preferences, opinions, and probably a cellar full of bottles. Buying them wine is risky—you might not match their taste.

## Glassware

### Quality Wine Glasses

Proper glasses make a genuine difference. [Riedel](https://www.riedel.com), [Zalto](https://www.zalto.com) (the connoisseur's choice), or [Gabriel-Glas](https://www.gabriel-glas.com).

**Price:** £30-80 per glass

### Decanter

A beautiful decanter from [Riedel](https://www.riedel.com), [LSA](https://www.lsa-international.com), or [Waterford](https://www.waterford.com).

**Price:** £40-150

![Wine glasses](https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=800&q=80)

## Wine Accessories

### Quality Corkscrew

A proper waiter's friend from [Laguiole](https://www.laguiole.com) or [Pulltap's](https://www.amazon.co.uk). The tool professionals use.

**Price:** £20-80

### Wine Preserver

The [Coravin](https://www.coravin.com) lets them pour wine without removing the cork—preserving bottles for weeks or months.

**Price:** £200-400

## Learning & Experiences

### Wine Tasting Experience

A tasting at [Berry Bros & Rudd](https://www.bbr.com), [67 Pall Mall](https://www.67pallmall.com), or [Hedonism Wines](https://hedonism.co.uk).

**Price:** £50-150

### WSET Course

A [WSET](https://www.wsetglobal.com) wine course—from beginner Level 1 to advanced. The gold standard in wine education.

**Price:** £150-500

![Wine tasting](https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80)

## Books

### The World Atlas of Wine

The definitive wine reference by Hugh Johnson and Jancis Robinson. Essential for any serious wine lover.

**Price:** £40

## If You Must Buy Wine

### Champagne

Champagne is always appropriate. [Krug](https://www.krug.com), [Bollinger](https://www.champagne-bollinger.com), or grower Champagnes.

**Price:** £40-200

### Wine Gift Card

A gift card to [Berry Bros & Rudd](https://www.bbr.com), [The Wine Society](https://www.thewinesociety.com), or [Hedonism Wines](https://hedonism.co.uk) lets them choose.

**Price:** £50-200

---

*Looking for more gift inspiration? [Join the Gifted waitlist](/#signup) and discover personalised recommendations for everyone on your list.*`
  },
  {
    title: "Thoughtful Gifts for Someone Who Is Grieving",
    slug: "gifts-for-someone-grieving",
    excerpt: "When someone is grieving, finding the right way to show support is hard. These thoughtful gifts offer comfort without empty platitudes.",
    cover_image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=1200&q=80",
    author: "The Gifted Team",
    tags: ["Gift Ideas", "Support", "Sympathy"],
    published: true,
    published_at: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000).toISOString(),
    seo_title: "Sympathy Gifts for Grieving | Thoughtful Bereavement Gift Ideas",
    seo_description: "Find thoughtful gifts for someone who is grieving. Supportive presents that offer comfort during bereavement without empty platitudes.",
    seo_keywords: ["sympathy gifts", "gifts for grieving", "bereavement gifts", "condolence presents"],
    content: `When someone loses a loved one, words often feel inadequate. A thoughtful gift can express what's hard to say—that you care, you're thinking of them, and you're here for the long haul.

## Practical Support

### Meal Delivery

Grief makes cooking feel impossible. [Cook](https://www.cookfood.net) frozen meals, [Deliveroo](https://deliveroo.co.uk) credit, or [Gousto](https://www.gousto.co.uk) boxes remove one daily burden.

**Price:** £30-100

### Cleaning Service

A session with [Hassle.com](https://hassle.com) or a local cleaner. Maintaining a home while grieving is exhausting.

**Price:** £60-100

![Comfort and support](https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&q=80)

## Physical Comfort

### Soft Blanket

A incredibly soft throw from [Barefoot Dreams](https://www.barefootdreams.com), [The White Company](https://www.thewhitecompany.com), or [Piglet in Bed](https://pigletinbed.com).

**Price:** £60-150

### Weighted Blanket

A [Gravity Blanket](https://gravityblankets.co.uk) provides gentle, constant pressure that many find soothing during difficult times.

**Price:** £100-200

## Gentle Distractions

### Puzzle

A beautiful jigsaw from [Cloudberries](https://cloudberries.co.uk) or [Liberty](https://www.libertylondon.com). Something absorbing that doesn't require emotional energy.

**Price:** £20-40

### Audiobook Subscription

[Audible](https://www.audible.co.uk) provides escape and company during sleepless nights without requiring concentration.

**Price:** £8/month

## Memorial & Remembrance

### Memorial Tree

Plant a tree in memory through [Trees for Cities](https://www.treesforcities.org), [Woodland Trust](https://www.woodlandtrust.org.uk), or in their garden if appropriate.

**Price:** £20-100

![Memorial keepsake](https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=800&q=80)

## The Most Important Gift

Your presence. Show up. Keep showing up. Say their loved one's name. Listen without trying to fix. Grief is a long road, and the best gift is someone who walks alongside them.

---

*Looking for more thoughtful gift ideas? [Join the Gifted waitlist](/#signup) and discover personalised recommendations for everyone on your list.*`
  },
  {
    title: "Gifts for Outdoor Enthusiasts: Gear They'll Actually Use",
    slug: "gifts-for-outdoor-enthusiasts",
    excerpt: "Shopping for someone who loves hiking, camping, or just being outside? These practical gifts enhance their adventures.",
    cover_image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&q=80",
    author: "The Gifted Team",
    tags: ["Gift Ideas", "Outdoors", "Adventure"],
    published: true,
    published_at: new Date(Date.now() + 29 * 24 * 60 * 60 * 1000).toISOString(),
    seo_title: "Best Gifts for Outdoor Lovers 2026 | Hiking & Camping Gift Ideas",
    seo_description: "Find perfect gifts for outdoor enthusiasts. Practical gear for hikers, campers, and nature lovers that enhances their adventures.",
    seo_keywords: ["gifts for outdoor lovers", "hiking gifts", "camping gifts", "adventure presents"],
    content: `Outdoor enthusiasts are particular about their gear. They've researched, tested, and have strong opinions. But they also always need something—outdoor activities consume equipment.

## Hiking Essentials

### Quality Water Bottle

A [Hydro Flask](https://www.hydroflask.com), [Nalgene](https://www.nalgene.com), or [Klean Kanteen](https://www.kleankanteen.com). Insulated for hot or cold drinks on the trail.

**Price:** £25-45

### Hiking Socks

[Darn Tough](https://darntough.com) (lifetime guarantee), [Smartwool](https://www.smartwool.com), or [Bridgedale](https://www.bridgedale.com). Good socks prevent blisters.

**Price:** £15-25 per pair

![Hiking gear](https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80)

### Head Torch

A [Petzl](https://www.petzl.com) or [Black Diamond](https://www.blackdiamondequipment.com) head torch. Essential for early starts and late finishes.

**Price:** £25-80

## Camping Gear

### Quality Sleeping Bag

A [Rab](https://rab.equipment), [Mountain Equipment](https://www.mountain-equipment.co.uk), or [Sea to Summit](https://seatosummit.com) sleeping bag.

**Price:** £100-400

### Camp Stove

A [Jetboil](https://www.jetboil.com) or [MSR](https://www.msrgear.com) stove system. Compact, efficient, and reliable.

**Price:** £80-150

![Camping setup](https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80)

## Navigation & Safety

### OS Maps Subscription

[Ordnance Survey](https://shop.ordnancesurvey.co.uk) digital maps subscription for offline navigation. Essential for UK hiking.

**Price:** £24/year

## Clothing & Layers

### Quality Base Layer

Merino wool from [Icebreaker](https://www.icebreaker.com), [Smartwool](https://www.smartwool.com), or [Finisterre](https://finisterre.com).

**Price:** £50-100

### Waterproof Jacket

A [Patagonia](https://www.patagonia.com), [Arc'teryx](https://www.arcteryx.com), or [Rab](https://rab.equipment) shell. Essential for UK weather.

**Price:** £150-400

## The Safe Bet

Gift cards to [Cotswold Outdoor](https://www.cotswoldoutdoor.com), [Snow+Rock](https://www.snowandrock.com), or [Ultralight Outdoor Gear](https://www.ultralightoutdoorgear.co.uk) let them choose exactly what they need.

---

*Looking for more gift inspiration? [Join the Gifted waitlist](/#signup) and discover personalised recommendations for everyone on your list.*`
  },
  {
    title: "Last Minute Gift Ideas That Don't Look Last Minute",
    slug: "last-minute-gift-ideas",
    excerpt: "Forgot a birthday? Need a gift tomorrow? These thoughtful options are available instantly or with next-day delivery—without looking rushed.",
    cover_image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=1200&q=80",
    author: "The Gifted Team",
    tags: ["Gift Ideas", "Last Minute", "Quick"],
    published: true,
    published_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    seo_title: "Best Last Minute Gifts 2026 | Quick Gift Ideas That Impress",
    seo_description: "Find perfect last minute gifts that don't look rushed. Instant delivery options, e-gifts, and thoughtful presents available tomorrow.",
    seo_keywords: ["last minute gifts", "quick gift ideas", "same day gifts", "emergency presents"],
    content: `We've all been there. A birthday you forgot, a gift you meant to buy, an occasion that crept up. The good news? Last minute doesn't have to mean thoughtless.

## Instant Digital Gifts

### E-Gift Cards

Instant delivery to their email:
- [Amazon](https://www.amazon.co.uk/gift-cards)
- [John Lewis](https://www.johnlewis.com/gift-cards)
- [Spotify](https://www.spotify.com/gift-card/)
- [Netflix](https://www.netflix.com/gift-cards)

**Price:** Any amount

### Experience Vouchers

E-vouchers sent instantly:
- [Virgin Experience Days](https://www.virginexperiencedays.co.uk)
- [Red Letter Days](https://www.redletterdays.co.uk)
- [Buyagift](https://www.buyagift.co.uk)

**Price:** £30-300

![Digital gift](https://images.unsplash.com/photo-1557200134-90327ee9fafa?w=800&q=80)

## Same-Day Delivery

### Flowers

- [Bloom & Wild](https://www.bloomandwild.com) (same-day in some areas)
- [Interflora](https://www.interflora.co.uk) (same-day available)

**Price:** £30-80

### Food & Drink

- [Deliveroo](https://deliveroo.co.uk) gift card + order their favourite meal
- [Hotel Chocolat](https://www.hotelchocolat.com) (same-day in stores)

**Price:** £20-60

## Next-Day Options

### Premium Retailers

Next-day delivery available:
- [John Lewis](https://www.johnlewis.com)
- [Selfridges](https://www.selfridges.com)
- [The White Company](https://www.thewhitecompany.com)

**Price:** Varies

![Gift hamper](https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80)

## In-Person Saves

### Local Options

Things you can buy today:
- Bookshop gift card + a book you choose
- Nice bottle of wine from a wine merchant
- Spa or salon gift voucher
- Restaurant gift card

### Promise Vouchers

Create a "voucher" for:
- A home-cooked meal
- A day out together
- Help with a project

**Price:** Free (but meaningful)

## The Honest Approach

Sometimes the best option is honesty: "I wanted to get you something perfect, so I'd love to take you shopping / to dinner / to choose something together." Turning it into time together can be better than a rushed gift.

---

*Never get caught out again. [Join the Gifted waitlist](/#signup) and discover personalised recommendations for everyone on your list.*`
  }
];

async function seedPosts() {
  console.log('Starting blog post seeding...\n');
  
  let successCount = 0;
  let errorCount = 0;
  
  for (const post of blogPosts) {
    try {
      // Check if post exists
      const { data: existing } = await supabase
        .from('blog_posts')
        .select('id')
        .eq('slug', post.slug)
        .single();
      
      if (existing) {
        // Update existing post
        const { error } = await supabase
          .from('blog_posts')
          .update({
            ...post,
            updated_at: new Date().toISOString()
          })
          .eq('slug', post.slug);
        
        if (error) throw error;
        console.log(`✓ Updated: ${post.title.substring(0, 50)}...`);
      } else {
        // Insert new post
        const { error } = await supabase
          .from('blog_posts')
          .insert(post);
        
        if (error) throw error;
        console.log(`✓ Inserted: ${post.title.substring(0, 50)}...`);
      }
      
      successCount++;
    } catch (err) {
      console.error(`✗ Failed: ${post.title.substring(0, 50)}...`);
      console.error(`  Error: ${err.message}`);
      errorCount++;
    }
  }
  
  console.log(`\n========================================`);
  console.log(`Completed: ${successCount} successful, ${errorCount} failed`);
  console.log(`Total posts in database should now be: ${successCount + 17} (17 existing + ${successCount} new)`);
}

seedPosts().catch(console.error);
