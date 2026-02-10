/**
 * Script to seed blog posts into Supabase
 * Run with: npx ts-node scripts/seed-blog-posts.ts
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xvbendwssoteawvrbglr.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseServiceKey) {
  console.error('❌ Missing SUPABASE_SERVICE_ROLE_KEY environment variable');
  console.log('\nRun with:');
  console.log('SUPABASE_SERVICE_ROLE_KEY=your_key npx ts-node scripts/seed-blog-posts.ts');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image: string;
  author: string;
  tags: string[];
  published: boolean;
  published_at: string;
  seo_title: string;
  seo_description: string;
  seo_keywords: string[];
}

const blogPosts: BlogPost[] = [
  {
    slug: 'science-of-perfect-presents',
    title: 'The Science of Perfect Presents: What Research Tells Us About Great Gifts',
    excerpt: "Forget guesswork. Psychology research reveals exactly what makes a gift memorable—and it's probably not what you think.",
    cover_image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=1200&q=80',
    author: 'The Gifted Team',
    tags: ['Psychology', 'Research', 'Tips'],
    published: true,
    published_at: new Date().toISOString(),
    seo_title: 'The Science of Perfect Presents | What Makes a Great Gift',
    seo_description: 'Discover what psychology research reveals about giving memorable gifts. Learn the surprising science behind presents people actually love.',
    seo_keywords: ['gift giving psychology', 'perfect present', 'gift research', 'memorable gifts'],
    content: `We've all been there.

Standing in a shop, phone in hand, completely stumped. What do you get someone who seems to have everything? What if they hate it?

Here's the good news: scientists have actually studied this. And their findings might surprise you.

## Price Doesn't Equal Appreciation

Let's start with the biggest myth in gift-giving.

A study from the Journal of Experimental Social Psychology found something fascinating. Givers consistently believe expensive presents will be more appreciated. Recipients? They don't care about price at all.

What matters is thoughtfulness. A £15 book that shows you *really* know someone beats a £100 generic item every time.

## The "Desirability Gap"

Here's where it gets interesting.

Researchers at Harvard discovered what they call the "desirability gap." Givers love surprising people with unexpected presents. But recipients actually prefer getting things they've asked for.

That wish list your friend shared? Take it seriously.

The surprise factor we obsess over? It matters far less than we think.

## Experiences Beat Things

This one's backed by decades of research.

Professor Thomas Gilovich at Cornell has spent 20 years studying happiness. His conclusion? Experiences create more lasting joy than material possessions.

A cooking class together. Concert tickets. A spa day.

These create memories. And memories, unlike objects, actually get *better* over time.

## The Presentation Effect

Don't skip the wrapping paper.

Studies show that attractive packaging increases positive expectations. It signals care and effort before the present is even opened.

You don't need to be an expert wrapper. A nice bag, some tissue paper, and a handwritten card go a long way.

## What This Means For You

So how do you apply all this?

**Listen throughout the year.** When someone mentions wanting something, write it down.

**Don't overthink uniqueness.** If they asked for it, they want it.

**Consider experiences.** Especially for people who have everything.

**Make it personal.** A thoughtful £20 present beats a generic £100 one.

**Present it well.** The unwrapping is part of the joy.

---

*Finding the perfect present doesn't have to be stressful. It just takes a little science—and a lot of listening.*`
  },
  {
    slug: 'birthday-gift-ideas-for-her',
    title: "25 Birthday Gift Ideas She'll Actually Love (Not Just Tolerate)",
    excerpt: "Skip the generic flowers. These thoughtful birthday presents for women are the ones she'll actually use, love, and remember.",
    cover_image: 'https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?w=1200&q=80',
    author: 'The Gifted Team',
    tags: ['Birthday', 'Gifts for Her', 'Ideas'],
    published: true,
    published_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    seo_title: "25 Birthday Gift Ideas for Her 2026 | Presents She'll Actually Love",
    seo_description: "Find birthday gifts for her that go beyond the ordinary. 25 thoughtful ideas for girlfriends, wives, mums, and friends—presents she'll actually love.",
    seo_keywords: ['birthday gifts for her', 'gifts for women', 'girlfriend birthday', 'wife birthday present'],
    content: `Let's be honest.

Most "gifts for her" lists are full of the same tired suggestions. Candles. Bath bombs. A scarf she'll never wear.

This isn't that list.

These are presents women actually get excited about. The ones that show you paid attention.

## For the One Who Loves Self-Care

**Silk pillowcase set** — Better for hair and skin than cotton. She'll use it every single night.

**High-end skincare she won't buy herself** — Drunk Elephant, Sunday Riley, or Tatcha. The good stuff.

**A really nice robe** — Not the thin hotel kind. A proper, cosy, wear-it-every-morning robe.

**Aromatherapy diffuser** — Paired with a set of essential oils. Instant spa vibes at home.

## For the Experience Seeker

**Cooking class for two** — Learn to make pasta, sushi, or French pastries together.

**Spa day voucher** — Full day of treatments. No decisions required.

**Theatre or concert tickets** — Something she's mentioned wanting to see.

**Afternoon tea booking** — The Ritz, Claridge's, or a lovely local spot.

## For the Homebody

**Cashmere throw blanket** — Luxurious and practical. She'll actually use it.

**Fresh flower subscription** — Weekly or monthly deliveries. Joy that keeps coming.

**Premium coffee machine** — If she loves her morning coffee, upgrade the ritual.

**Indoor plant in a beautiful pot** — Low maintenance, high style.

## For the Style-Conscious

**Quality leather bag** — A classic that goes with everything.

**Personalised jewellery** — Initial pendant or birthstone piece. Meaningful and wearable.

**Designer sunglasses** — Ray-Ban, Quay, or something she's been eyeing.

**Silk scarf** — From Ted Baker or Aspinal. Versatile and elegant.

## For the Wellness Lover

**Yoga mat bag** — Stylish and practical for her practice.

**Meditation app subscription** — Headspace or Calm for a full year.

**Smart water bottle** — Tracks hydration. Surprisingly useful.

**Massage gun** — Recovery is self-care too.

## For the Creative

**Quality sketchbook and pens** — Thick paper that handles any medium.

**Craft subscription box** — New projects delivered monthly.

**Instant camera** — Fujifilm Instax for capturing memories.

**Online masterclass** — Photography, writing, or whatever she's curious about.

## The Secret to Getting It Right

Here's what separates a good present from a great one:

**Pay attention to what she mentions.** That thing she pointed out in a shop window? That's your answer.

**Think about her daily life.** What would make her mornings better? Her evenings more relaxing?

**When in doubt, go experiential.** Memories last longer than things.

---

*The best birthday present isn't the most expensive one. It's the one that shows you really know her.*`
  },
  {
    slug: 'last-minute-gift-ideas',
    title: "12 Last-Minute Gifts That Don't Look Last-Minute",
    excerpt: "Forgot a birthday? Don't panic. These thoughtful options can be arranged in hours—and no one will ever know you left it late.",
    cover_image: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?w=1200&q=80',
    author: 'The Gifted Team',
    tags: ['Last Minute', 'Quick Gifts', 'Ideas'],
    published: true,
    published_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    seo_title: 'Last-Minute Gift Ideas That Look Thoughtful | Quick Presents',
    seo_description: 'Need a gift fast? These 12 last-minute ideas can be arranged in hours and still look incredibly thoughtful. Same-day and instant options included.',
    seo_keywords: ['last minute gifts', 'quick presents', 'same day gifts', 'emergency gift ideas'],
    content: `It happens to the best of us.

You suddenly realise a birthday is tomorrow. Or worse—today.

The good news? Some of the most thoughtful presents can be arranged in hours. Here's how to save the day.

## Instant Digital Gifts

These arrive in their inbox immediately.

**Experience vouchers** — Spa treatments, cooking classes, escape rooms. Most providers offer instant e-vouchers.

**Streaming subscriptions** — Netflix, Spotify Premium, Audible. A year of entertainment, delivered instantly.

**Masterclass membership** — Access to hundreds of classes from world experts. Impressive and instant.

**Charity donation** — Donate to a cause they care about in their name. Oxfam Unwrapped has brilliant options.

## Same-Day Delivery

Order now, arrives today.

**Flowers** — Bloom & Wild, Interflora, or local florists. Beautiful bouquets delivered to their door.

**Gourmet food hampers** — Hotel Chocolat, Fortnum & Mason. Luxury treats that arrive fast.

**Amazon Prime same-day** — Filter by "Get it today" for books, beauty, tech, and more.

**Restaurant delivery credit** — Deliveroo or UberEats gift cards. Dinner on you, tonight.

## Quick DIY Options

Sometimes the best presents are personal.

**Homemade voucher book** — Breakfast in bed. A home-cooked meal. Movie night (their pick). Babysitting for parent friends.

**Curated playlist** — Create a Spotify playlist of songs that remind you of them. Add a note explaining each choice.

**Photo book express** — Services like Photobox offer rush printing. Fill it with your favourite memories together.

## In-Store Rescue Mission

When you need something physical, fast.

**Quality chocolates** — Hotel Chocolat or a local chocolatier. Always appreciated, beautifully packaged.

**A great book** — Pop into Waterstones. Staff can help you find something perfect based on their interests.

**Luxury candle** — Jo Malone, The White Company. Grab a gift bag and you're done.

## Making It Look Thoughtful

Here's the secret: presentation matters more than timing.

**Add a handwritten card.** Write specifically about why you chose it and what they mean to you.

**Never hand over a carrier bag.** Take five minutes to wrap it or find a nice gift bag.

**Be honest if appropriate.** "I wanted to find something perfect and ran out of time, so I'm planning something special for next weekend" can work better than a rushed item.

---

*The best last-minute present is one that shows you care—even if you only had an hour to find it.*`
  },
  {
    slug: 'gifts-for-men-who-have-everything',
    title: 'What to Get the Man Who Has Everything (And Wants Nothing)',
    excerpt: '"I don\'t need anything." Sound familiar? Here\'s how to find presents for the impossible-to-shop-for men in your life.',
    cover_image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80',
    author: 'The Gifted Team',
    tags: ['Gifts for Him', 'Men', 'Hard to Buy For'],
    published: true,
    published_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    seo_title: 'Gifts for Men Who Have Everything | Ideas for 2026',
    seo_description: 'Find the perfect gift for the man who has everything. Unique ideas for dads, husbands, and boyfriends who say they want nothing.',
    seo_keywords: ['gifts for men who have everything', 'gifts for dad', 'hard to buy for men'],
    content: `"I don't need anything."

Five words that strike fear into every gift-giver's heart.

Here's what that phrase actually means: he buys what he wants when he wants it. He doesn't want you to spend money. He genuinely can't think of anything.

The solution isn't finding something he needs. It's finding something he'd love but would never buy himself.

## Experiences He'll Remember

Things gather dust. Memories don't.

**Driving experience** — Ferrari, Lamborghini, or Aston Martin track days. Childhood dreams, fulfilled.

**Whisky tasting** — Distillery tour or at-home premium tasting experience.

**Flying lesson** — A trial lesson is unforgettable and surprisingly affordable.

**Golf at a dream course** — Book a round somewhere he's always wanted to play.

## Upgrades to Things He Uses

Look at what he already owns. Then make it better.

**Premium wallet** — If his is worn, upgrade to Bellroy or Aspinal leather.

**Quality headphones** — Sony WH-1000XM5 or Bose. A step up from his current pair.

**Better watch strap** — Premium leather or metal for his existing watch.

**Luxury shaving kit** — Proper safety razor, badger brush, premium cream.

## Food and Drink

Consumables are perfect for the man who has everything. No clutter.

**Rare whisky** — Limited editions or bottles from closed distilleries.

**Steak subscription** — Monthly deliveries of premium cuts.

**Artisan hot sauce collection** — For the spice lover.

**Coffee subscription** — Freshly roasted beans from around the world.

## Hobby Enhancers

Whatever he's into, there's a way to level it up.

**Golf gadgets** — Rangefinders, training aids, personalised balls.

**BBQ accessories** — Premium tools, smoker boxes, quality meat thermometer.

**Vinyl records** — First pressings of his favourite albums.

**Photography gear** — A new lens, tripod, or camera bag.

## Personalised Pieces

Something made just for him.

**Custom portrait** — Commission an artist to create a portrait of him, his pet, or his car.

**Engraved pen** — Montblanc or Parker with his initials.

**Personalised book** — A newspaper book from his birth date or favourite team's history.

**Monogrammed leather goods** — Wash bag, passport holder, or luggage tag.

## What Not to Buy

Some presents seem like good ideas but rarely land well.

**Novelty items** — Funny for five minutes, then forgotten.

**Clothes** — Unless you know his exact taste and size.

**Cologne** — He probably has a signature scent already.

**Generic "man" gifts** — Beer brewing kits and BBQ sets are overdone.

---

*The man who has everything doesn't need more stuff. He needs an experience, an upgrade, or something personal.*`
  },
  {
    slug: 'sustainable-gift-guide',
    title: "Eco-Friendly Gifts That Don't Compromise on Style",
    excerpt: "Sustainable doesn't mean boring. These eco-friendly presents are beautiful, practical, and good for the planet.",
    cover_image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&q=80',
    author: 'The Gifted Team',
    tags: ['Sustainable', 'Eco-Friendly', 'Green'],
    published: true,
    published_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    seo_title: 'Eco-Friendly Gift Guide 2026 | Sustainable Presents That Look Great',
    seo_description: 'Discover sustainable gift ideas that are good for the planet and perfect for your loved ones. Eco-friendly presents for every budget.',
    seo_keywords: ['sustainable gifts', 'eco-friendly presents', 'green gift ideas', 'ethical gifts'],
    content: `Here's a secret about sustainable presents.

The best ones aren't just good for the planet. They're often higher quality, longer-lasting, and more thoughtful than conventional alternatives.

Win-win-win.

## Bathroom Swaps

Small changes, big impact.

**Bamboo toothbrushes** — Biodegradable and just as effective. A set makes a great stocking filler.

**Shampoo and conditioner bars** — Last longer than bottles, zero plastic. Brands like Ethique make beautiful options.

**Safety razor** — One-time purchase, recyclable blades. Elegant and economical.

**Reusable cotton pads** — Washable, soft on skin, and surprisingly luxurious.

## Sustainable Fashion

Style that doesn't cost the earth.

**Organic cotton basics** — Pact, People Tree, and Patagonia make beautiful essentials.

**Recycled activewear** — Girlfriend Collective turns plastic bottles into leggings.

**Vintage finds** — Curated pieces from Vestiaire Collective. One-of-a-kind and sustainable.

**Cork leather accessories** — Bags and wallets that look like leather but come from trees.

## Kitchen Essentials

Practical presents they'll use daily.

**Beeswax wraps** — Beautiful alternative to cling film. Lasts for years.

**Stainless steel lunchbox** — No plastic, lasts forever. Perfect for work lunches.

**Glass storage containers** — Healthier than plastic and endlessly reusable.

**Reusable produce bags** — Organic cotton or recycled mesh. Makes grocery shopping greener.

## Home and Garden

Sustainable living, beautifully designed.

**Organic bedding** — Better for sleep and the planet. Look for GOTS certification.

**Soy or beeswax candles** — In reusable containers. Cleaner burning than paraffin.

**Indoor plants** — Natural air purifiers. Choose a beautiful pot to complete the gift.

**Seed collections** — Heirloom vegetables or wildflower seeds. The gift that keeps growing.

## The Most Sustainable Option

Sometimes the greenest choice is no physical item at all.

**Tree planting donations** — Plant trees in their name through organisations like One Tree Planted.

**Wildlife adoptions** — WWF and similar charities offer meaningful symbolic adoptions.

**Experience vouchers** — Cooking classes, spa days, adventures. Zero waste, maximum memories.

## Wrapping Sustainably

Don't undo your eco-friendly choice with wasteful packaging.

**Furoshiki** — Japanese fabric wrapping. Reusable and beautiful.

**Brown paper and twine** — Classic, recyclable, and surprisingly elegant.

**Fabric gift bags** — They become part of the present.

---

*Sustainable presents show you care about the recipient and the planet. That's a gift worth giving.*`
  },
  {
    slug: 'anniversary-gifts-by-year',
    title: 'Anniversary Gift Ideas by Year: A Complete Guide',
    excerpt: 'From paper to diamond, every anniversary has a theme. Here\'s how to find meaningful presents for every milestone.',
    cover_image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1200&q=80',
    author: 'The Gifted Team',
    tags: ['Anniversary', 'Couples', 'Milestones'],
    published: true,
    published_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    seo_title: 'Anniversary Gift Ideas by Year | Traditional & Modern Guide',
    seo_description: 'Find the perfect anniversary gift by year. Traditional and modern themes from 1st to 50th anniversary with creative present ideas.',
    seo_keywords: ['anniversary gifts by year', 'wedding anniversary ideas', 'traditional anniversary gifts'],
    content: `Every wedding anniversary has a theme.

Some are traditional, dating back centuries. Others are modern updates. All of them offer a starting point for meaningful presents.

Here's your complete guide.

## Year 1: Paper

The first year is about building your story together.

**Love letter on beautiful stationery** — Write about your favourite moments from year one.

**First dance lyrics as art** — Printed and framed for your wall.

**Concert or theatre tickets** — Paper tickets for a memorable night out.

**A book you can read together** — Start a tradition of sharing stories.

## Year 2: Cotton

Comfort and closeness.

**Luxury Egyptian cotton bedding** — Upgrade your shared space.

**Matching robes** — Cosy mornings together.

**Cotton anniversary print** — Custom artwork for your home.

**Hammock for two** — For lazy summer afternoons.

## Year 3: Leather

Durability and timelessness.

**Quality wallet or bag** — Something they'll use every day.

**Leather-bound journal** — For capturing memories together.

**Watch strap upgrade** — Refresh their favourite timepiece.

**Leather photo album** — Fill it with your best moments.

## Year 5: Wood

Growth and strength.

**Wooden watch** — Unique and sustainable.

**Engraved chopping board** — For cooking together.

**Tree planted in your name** — A living symbol of your relationship.

**Wooden jewellery box** — Handcrafted and personal.

## Year 10: Tin or Aluminium

Flexibility and resilience.

**Vintage tin signs** — Nostalgic decor for your home.

**Tin anniversary keepsake box** — Store your memories together.

**Aluminium travel accessories** — For adventures ahead.

## Year 15: Crystal

Clarity and light.

**Crystal champagne flutes** — For celebrating together.

**Crystal jewellery** — Swarovski or similar.

**Crystal decanter set** — Elegant and practical.

## Year 25: Silver

A quarter century of love.

**Silver jewellery** — Classic and timeless.

**Silver photo frames** — Display your favourite memories.

**Silversmithing class** — Create something together.

## Year 50: Gold

The golden anniversary.

**Gold jewellery** — A significant piece to mark the milestone.

**Golden experiences** — Champagne, fine dining, luxury travel.

**Memory book** — 50 years of moments, collected and celebrated.

## Making Any Anniversary Special

Whatever the year, these principles apply:

**Reference your wedding day.** Incorporate elements from when it all began.

**Create new memories.** Revisit meaningful places or try something new together.

**Write it down.** A heartfelt card transforms any present.

---

*Every anniversary is a chance to celebrate how far you've come—and look forward to where you're going.*`
  },
  {
    slug: 'gifts-under-25',
    title: '30 Thoughtful Gifts Under £25 That Look Expensive',
    excerpt: "Great presents don't require a big budget. These affordable ideas look and feel far more expensive than they are.",
    cover_image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1200&q=80',
    author: 'The Gifted Team',
    tags: ['Budget', 'Affordable', 'Under £25'],
    published: true,
    published_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    seo_title: '30 Best Gifts Under £25 | Thoughtful Presents on a Budget',
    seo_description: 'Find amazing gifts under £25 that look expensive. Thoughtful, affordable present ideas for every person and occasion.',
    seo_keywords: ['gifts under 25 pounds', 'cheap gift ideas', 'affordable presents', 'budget gifts'],
    content: `Here's a truth about gift-giving.

The best presents aren't always the most expensive. A thoughtful £20 item beats a generic £100 one every time.

These options prove it.

## Beauty and Self-Care

**Mini perfume discovery set** — Designer scents at a fraction of the price.

**Sheet mask collection** — K-beauty masks in beautiful packaging.

**Luxury hand cream** — L'Occitane or Crabtree & Evelyn.

**Silk scrunchie set** — Practical luxury for everyday.

**Natural lip balm gift set** — Burt's Bees or similar.

## Food and Drink

**Artisan chocolate selection** — Hotel Chocolat selectors are always a hit.

**Specialty tea collection** — T2 or Fortnum's mini tins.

**Single-origin coffee beans** — Freshly roasted, beautifully packaged.

**Hot sauce trio** — Artisan small-batch varieties.

**Gourmet honey selection** — Different varieties and origins.

## Home and Lifestyle

**Quality scented candle** — Smaller sizes from premium brands.

**Succulent in a nice pot** — Low maintenance, high style.

**Linen tea towels** — Beautiful patterns, surprisingly useful.

**Photo clip string lights** — For displaying memories.

**Nice notebook** — Moleskine or Leuchtturm1917.

## Books and Entertainment

**Bestselling novel** — Current must-reads make great presents.

**Beautiful puzzle** — 1000 pieces, stunning artwork.

**Card game** — Exploding Kittens, Codenames, or Wavelength.

**Coffee table book** — Photography, travel, or art.

## Accessories

**Quality socks** — Happy Socks or Pantherella.

**Stylish phone case** — Practical and personal.

**Canvas tote bag** — With a design they'll love.

**Keyring** — Leather or personalised.

## Experience Vouchers

**Cinema tickets** — A pair for date night.

**Coffee shop credit** — Their favourite local spot.

**Streaming trial** — A month of Netflix, Spotify, or Audible.

## Making Budget Gifts Feel Special

**Presentation is everything.** Nice wrapping elevates any present.

**Combine smaller items.** Create themed bundles—spa night, movie night, coffee lover.

**Add a personal touch.** A handwritten card explaining why you chose it.

---

*The thought behind a present matters more than the price tag. Always.*`
  },
  {
    slug: 'christmas-gift-guide',
    title: 'The No-Stress Christmas Gift Guide for Everyone on Your List',
    excerpt: 'From stocking fillers to show-stoppers, find the perfect Christmas present for everyone—without the holiday panic.',
    cover_image: 'https://images.unsplash.com/photo-1512389142860-9c449e58a814?w=1200&q=80',
    author: 'The Gifted Team',
    tags: ['Christmas', 'Holiday', 'Gift Guide'],
    published: true,
    published_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    seo_title: 'Christmas Gift Guide 2026 | Ideas for Everyone on Your List',
    seo_description: 'Find perfect Christmas gifts for everyone. Ideas for mum, dad, kids, partners, and friends at every budget. Make holiday shopping stress-free.',
    seo_keywords: ['christmas gift guide', 'christmas present ideas', 'holiday gifts', 'xmas ideas'],
    content: `Christmas shopping doesn't have to be stressful.

With a little planning and the right ideas, you can find perfect presents for everyone. No last-minute panic required.

Let's break it down.

## For Your Partner

**Romantic gestures** — Weekend away, meaningful jewellery, experience you've talked about.

**Practical luxury** — Upgrade something they use daily. Quality over quantity.

**Budget-friendly romance** — Homemade voucher book, photo album of your year, their favourite treats beautifully wrapped.

## For Mum

**Pampering** — Spa day voucher, luxury skincare set, cashmere accessories.

**Sentimental** — Photo book of family memories, personalised jewellery, "reasons we love you" book.

**Practical** — Kitchen gadget she's mentioned, quality handbag, subscription to something she loves.

## For Dad

**Experiences** — Driving day, sports event tickets, whisky tasting.

**Hobbies** — Quality tools, gadget upgrades, books on his interests.

**Comfort** — Luxury slippers, quality robe, premium coffee.

## For Kids

**Toddlers** — Wooden toys, textured books, ride-on toys.

**Young children** — LEGO, art supplies, outdoor toys, family board games.

**Tweens** — Tech accessories, craft kits, book series, sports equipment.

**Teenagers** — Gift cards (let them choose), headphones, room decor, experience vouchers.

## For Friends

**The foodie** — Cooking class, gourmet ingredients, restaurant voucher.

**The homebody** — Luxury candle, cosy blanket, book and hot chocolate set.

**The adventurer** — Experience voucher, travel accessories, outdoor gear.

## Stocking Fillers Under £15

Luxury hot chocolate. Nice socks. Mini skincare. Quality chocolate. Small candles. Hair accessories. Card games. Nice pens. Lip balms.

## Secret Santa Ideas (£10-20)

Desk accessories. Mugs with great design. Food gifts (always safe). Small plants. Cosy socks. Mini pamper sets. Books. Games.

## Making Christmas Morning Special

**Save the best for last.** Build anticipation.

**Include something small to open first.** A treat to start the day.

**Take photos of reactions.** You'll want to remember.

**Have backup gifts.** For unexpected guests.

---

*The best Christmas presents show you know the person. Start with who they are, not what's on sale.*`
  },
  {
    slug: 'how-to-give-better-gifts',
    title: '7 Habits of People Who Give Amazing Presents',
    excerpt: "Some people always nail it. Here's what they do differently—and how you can become a better gift-giver too.",
    cover_image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
    author: 'The Gifted Team',
    tags: ['Tips', 'Advice', 'Gift Giving'],
    published: true,
    published_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    seo_title: 'How to Give Better Gifts | 7 Habits of Thoughtful People',
    seo_description: 'Learn how to give better gifts with these 7 habits of naturally thoughtful people. Transform your gift-giving from stressful to meaningful.',
    seo_keywords: ['how to give better gifts', 'gift giving tips', 'thoughtful presents'],
    content: `We all know someone who gives perfect presents.

Every birthday, every Christmas, they somehow find exactly the right thing. It seems like magic.

It's not. It's a set of habits anyone can learn.

## 1. They Listen All Year

Great gift-givers don't start thinking about presents a week before.

They pay attention when someone says "I've been wanting to try..." or "I wish I had..." or "That looks amazing."

Then they write it down. Immediately.

A notes app on your phone is all you need.

## 2. They Notice What People Already Have

Before buying anything, they consider:

What brands does this person already use and love? What's their style? What do they have too much of? What's missing?

This prevents duplicates and ensures the present fits their life.

## 3. They See the Whole Person

They don't just think about someone's job or main hobby.

A lawyer might love cooking. A fitness instructor might be obsessed with skincare. A busy parent might desperately want a quiet evening alone.

Look beyond the obvious.

## 4. They Choose Experiences Over Things

Research consistently shows experiences create more lasting happiness than objects.

Classes. Events. Adventures. Meals together.

These create memories. And memories, unlike things, actually get better over time.

## 5. They Prioritise Quality Over Quantity

One perfect item beats three mediocre ones.

They spend their budget on fewer, better things. They avoid "filler" presents that add clutter. They focus on impact, not volume.

## 6. They Care About Presentation

How you give something affects how it's received.

Beautiful wrapping shows care. Handwritten cards add meaning. The setting matters.

A £20 present wrapped beautifully with a heartfelt note feels more special than a £50 present in a carrier bag.

## 7. They Give Outside of Occasions

The best gift-givers know presents don't have to be for birthdays or Christmas.

"I saw this and thought of you" gifts are often the most appreciated. They show you were thinking of someone when you didn't have to be.

## Start Today

You don't need to wait for an occasion to practice.

Start a notes file for gift ideas. Pay attention in your next conversation. Notice what people in your life enjoy.

The best present isn't the most expensive one. It's the one that shows you really know someone.

---

*Great gift-giving isn't a talent. It's a skill. And like any skill, it gets better with practice.*`
  },
  {
    slug: 'unique-gift-ideas',
    title: '20 Unique Gift Ideas for People Who Are Impossible to Shop For',
    excerpt: 'For the person who has everything, wants nothing, and is impossible to surprise. These unexpected ideas actually work.',
    cover_image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=1200&q=80',
    author: 'The Gifted Team',
    tags: ['Unique', 'Creative', 'Ideas'],
    published: true,
    published_at: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
    seo_title: '20 Unique Gift Ideas for Hard-to-Shop-For People',
    seo_description: 'Find unique gift ideas for people who are impossible to shop for. Creative, unexpected presents that actually work.',
    seo_keywords: ['unique gift ideas', 'creative presents', 'unusual gifts', 'hard to shop for'],
    content: `Some people are just hard to shop for.

They have everything. They want nothing. They're impossible to surprise.

These ideas are for them.

## Unexpected Experiences

**Star-naming certificate** — Cheesy? Maybe. Memorable? Definitely.

**Hot air balloon ride** — For the person who's done everything else.

**Foraging walk** — Learn to find wild food with an expert guide.

**Pottery class** — Hands-on, creative, and surprisingly relaxing.

**Private chef experience** — Restaurant-quality dinner in their own home.

## Personalised Pieces

**Custom illustration** — Commission an artist to draw their home, pet, or favourite place.

**Personalised map print** — The location where you met, got married, or had your first date.

**Custom puzzle** — Turn a favourite photo into a 500-piece puzzle.

**Engraved item** — A pen, watch, or piece of jewellery with meaning.

## Subscription Surprises

**Mystery book subscription** — Curated reads based on their taste, delivered monthly.

**Cheese or chocolate club** — Artisan selections they'd never buy themselves.

**Flower subscription** — Fresh blooms every week or month.

**Craft kit delivery** — New creative projects arriving regularly.

## Charitable Gifts

**Donation in their name** — To a cause they care about.

**Adopt an animal** — Symbolic adoptions from wildlife charities.

**Plant trees** — Through organisations like One Tree Planted.

**Fund a specific project** — Clean water, school supplies, medical equipment.

## Nostalgic Touches

**Newspaper from their birth date** — A window into the day they arrived.

**Retro sweet box** — Childhood favourites, beautifully packaged.

**Restored photo** — Take an old family photo and have it professionally restored.

**Memory book** — Collect messages from friends and family into one keepsake.

## The Key to Unique Gifts

The best unexpected presents share one thing: they show you thought about the person, not just the occasion.

What makes them laugh? What do they talk about? What would they never buy themselves?

Start there.

---

*The most unique gift isn't the most unusual item. It's the one that shows you truly understand someone.*`
  }
];

async function seedBlogPosts() {
  console.log('🚀 Starting blog post seeding...\n');

  // First, delete existing posts
  console.log('🗑️  Clearing existing blog posts...');
  const { error: deleteError } = await supabase
    .from('blog_posts')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

  if (deleteError) {
    console.error('Error deleting existing posts:', deleteError);
  } else {
    console.log('✓ Existing posts cleared\n');
  }

  // Insert new posts
  console.log('📝 Inserting new blog posts...\n');
  
  for (const post of blogPosts) {
    const { error } = await supabase
      .from('blog_posts')
      .insert(post);

    if (error) {
      console.error(`❌ Error inserting "${post.title}":`, error.message);
    } else {
      console.log(`✓ ${post.title}`);
    }
  }

  console.log('\n✅ Blog seeding complete!');
  console.log(`📊 Total posts: ${blogPosts.length}`);
  console.log('\n🌐 View your blog at: https://www.thegiftedapp.com/blog');
}

seedBlogPosts().catch(console.error);
