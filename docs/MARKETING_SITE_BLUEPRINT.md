# Biteaze multi-product marketing site — blueprint

> Structure-not-skin teardown of Petpooja.com synthesized into a plan for biteaze.com. Adopt the STRUCTURE/patterns; the dark neo-brutalist orange shell stays Biteaze's own. Generated 2026-06-27.

## Executive summary
Biteaze should adopt Petpooja's STRUCTURAL DNA — not its skin — to scale from a single consulting/Billing site into a multi-product F&B platform site (biteaze.com) that sells Billing (live, self-serve on Play Store), an Attendance & Payroll module (consultative), a launch Marketplace, and future modules under one brand. The winning model is a single config-driven Product-Page template (a fixed "hook -> prove -> explain -> trust -> convert" spine where a new product = one TS config object), a central product registry that auto-cross-sells every product into every sibling page, a two-verb CTA system, and a HYBRID conversion posture (public pricing + Play-Store self-serve for Billing; demo/waitlist gating for Payroll and multi-outlet/enterprise). The single highest-leverage growth asset is a content/SEO engine — a resources hub with a 38-style ungated client-side calculator farm, glossary, templates, and silo'd blog. The one non-negotiable change: the current Vite client-side SPA ships a near-empty HTML shell and will NOT rank content pages. The marketing + resources surface MUST move to SSG/SSR (recommended: migrate to Next.js on Vercel, or carve resources onto an Astro subdomain) with per-route metadata, OG (og:locale en_IN), self-canonical, robots, clean URLs, and JSON-LD that Petpooja itself lacks. Everything stays inside Biteaze's dark neo-brutalist burnt-orange (#ea580c) shell with Archivo Black / Montserrat / Space Mono.

## Top takeaways
- Codify ONE config-driven product-page spine (12 fixed slots: nav -> hero -> proofStrip -> primaryFeatures -> secondaryFeatures -> useCaseGrid -> whyUs -> socialProof -> midCta -> faq -> finalCta -> footer). A new product is a single `ProductPageConfig` object + an asset folder, never a new page design. Slots render conditionally on non-empty config so thin/new products never show hollow sections.
- Build a SINGLE central product registry as the source of truth. The nav dropdown, every page's ecosystem cross-sell strip, the footer Products column, and the homepage product grid all read from it — so adding the Nth product auto-propagates everywhere instead of forcing edits to N-1 pages.
- Run a HYBRID conversion posture, not Petpooja's blanket demo-gate: PUBLISH pricing + self-serve 'Get it on Play Store' for single-outlet Billing (the app already enforces 30-day trial + 1yr/5yr/lifetime server-side); DEMO/waitlist-gate Attendance & Payroll, Marketplace, and multi-outlet/enterprise. Primary CTA target is a per-product config field, never a hardcoded demo form.
- Two CTA verbs sitewide for muscle memory: one CONVERT verb (per-page: 'Get Biteaze Billing' / 'Book a demo') repeated at nav + hero + midCta + finalCta, and one EXPLORE verb ('Explore [Product]') for navigation. No third 'Buy/Sign up/Pricing' button competing for attention.
- SEO-FATAL FLAG: the site is a client-side Vite SPA serving an empty #root shell — blog/glossary/tool pages would crawl blank and never rank. Migrate the marketing+resources surface to SSG/SSR (Next.js on Vercel preferred; Astro subdomain as the pragmatic carve-out) with full per-route meta + JSON-LD. This is a prerequisite, not an enhancement.
- Ship an ungated, client-side calculator farm as the top-of-funnel magnet (one reusable input->pure-calc->result+PDF+product-CTA shell, data-driven across ~20-30 slugs: CTC, In-Hand, PF, ESI, Gratuity, PT, Overtime, FnF for Payroll; GST, Reverse GST, Food Cost, Recipe Costing, Menu Pricing, Break-Even, Profit Margin, Staff Cost% for Billing). Each evergreen '[X] calculator India' query is high-intent and recurs monthly.
- Trust = honest slots, not fabricated numbers. Use a three-stat band mapped to the three SMB fears (adoption / durability / reliability) filled with VERIFIABLE proxies ('Live on Google Play', 'Built for Indian GST/F&B', 'Data on Google Cloud, encrypted'), real named F&B testimonials only, and platform-wide fallback proof so a brand-new product page still looks credible. Never invent '150k+ businesses' or award badges.
- Stand up a lightweight /security page NOW (Safe-Harbor responsible-disclosure, security@biteaze.com) and a footer trust/legal cluster (Privacy, Terms, Refund/Cancellation, Grievance/Escalation per Indian IT rules). It is near-free credibility for a multi-tenant POS handling sales + payroll PII; defer a full SafeBase/Vanta trust vault until real ISO/SOC certs exist.

## Recommended sitemap / IA
- / (homepage — platform-level: who Biteaze is + product grid + cross-sell + trust + demo)
- /products (optional product index / 'all products' overview hub reading the registry)
- /billing (Biteaze Billing POS — product page, self-serve + public pricing)
- /payroll (Attendance & Payroll module — product page, demo/waitlist-gated)
- /marketplace (launch Marketplace — product page)
- /products/<new-slug> (every future module = one new route + one config object, no new design)
- /solutions/qsr, /solutions/dine-in, /solutions/cloud-kitchen, /solutions/cafe, /solutions/bakery (verticalized use-case landing pages, shared useCaseGrid targets)
- /pricing (public pricing for Billing self-serve tiers; 'talk to us' rows for Payroll/enterprise)
- /resources (resources hub root — SSG/SSR, NOT SPA routes)
- /resources/blog and /resources/blog/<silo>/<slug> (silo'd blog: Operations, Payroll & People, GST & Compliance, Cost Control, Growth, Industry Guides)
- /resources/glossary and /resources/glossary/<term> (DefinedTerm pages: GST, KOT, food cost, EPF, ESI, ONDC)
- /resources/templates and /resources/templates/<slug> (downloadable templates & checklists)
- /tools and /tools/<calculator-slug> (ungated client-side calculator farm)
- /about (company / Biteaze Solutions LLP identity)
- /contact (support + WhatsApp + lead form)
- /security (Safe-Harbor responsible-disclosure page — ship at launch)
- /demo (or #free-demo / shared lead component target for gated products)
- /legal/privacy, /legal/terms, /legal/refund, /legal/grievance (footer trust/legal cluster)
- /sitemap.xml + /robots.txt (generated at build)

## Navigation model
"A sticky top nav with a persistent primary CTA, built around three mega-dropdowns that mirror the IA so the menu reads 'Products | Solutions | Resources | Pricing | Company'. (1) PRODUCTS dropdown is registry-driven — it lists every product as a row (icon + name + one-line tagline + 'Explore' link) so adding the Nth product auto-appears with zero menu edits; group as 'Live' (Billing) vs 'New / Coming soon' (Payroll, Marketplace) with a small status pill. (2) SOLUTIONS dropdown lists the F&B verticals (QSR, Dine-in, Cloud Kitchen, Cafe, Bakery) linking to the verticalized /solutions pages. (3) RESOURCES dropdown lists the four content TYPES as peers (Blog, Glossary, Templates & Checklists, Free Tools) — structurally identical to the Products dropdown. PRICING and COMPANY (About/Contact/Security) are simple links. The nav's right side holds the single per-page primary CTA (self-serve 'Get Billing' on Billing pages, 'Book a demo' on Payroll/enterprise pages) rendered from `primaryCta` config — never two equal-weight CTAs. On mobile, collapse to a full-screen neo-brutalist drawer with the same registry-driven sections; keep the primary CTA pinned as a sticky bottom bar. WCAG: dropdowns keyboard-navigable, focus-visible rings in burnt-orange, aria-expanded on triggers."

## Product-page template (scales to N products — a new product = one config object)
1. 1. STICKY NAV — global component; renders the per-product `primaryCta` (label + target) persistently. Registry-driven Products/Solutions/Resources dropdowns.
2. 2. HERO — one-line value prop + product wordmark/illustration + the primary CTA (self-serve Play-Store deep-link/QR for Billing; demo/waitlist for Payroll/Marketplace) + one secondary 'Explore features' anchor. Per-product accent imagery to break monotony across N products.
3. 3. PROOF STRIP — directly under hero: logo parade + ONE headline metric. Config-driven with platform-wide fallback (total Biteaze businesses / Play rating) so a new product isn't empty.
4. 4. PRIMARY FEATURES — array of `<FeatureBlock>` (alternating image-left/right, heading + 3-5 bullets + product screenshot + optional `href` deep-link). Count is data: Billing ~4 (Billing/Inventory/Reporting/Online-ordering), Payroll ~3 (Attendance/Payroll/Leave).
5. 5. SECONDARY / EXPANDED FEATURES — array of compact `<FeatureCard>` (icon card + 'Read more') for add-ons / marketplace categories. Optional slot; omitted when the array is empty (no accidental Petpooja-style duplicate cluster).
6. 6. USE-CASE GRID — F&B segment cards (QSR / Dine-in / Cloud Kitchen / Cafe / Bakery), each linking to the matching /solutions verticalized page. Fed from the GLOBAL catalog config, authored once, shared across all product pages.
7. 7. WHY-US / DIFFERENTIATORS — short callout row (3-4) on what makes Biteaze distinct (Indian GST/F&B native, owner_uid tenant isolation, one unified suite, offline-resilient POS).
8. 8. SOCIAL PROOF — testimonials[] (real name + role + F&B brand + avatar) + a 3-stat band + ratingBadges[] (Play rating; G2/SoftwareSuggest as they accrue). Platform-wide fallback values for thin products.
9. 9. MID CTA BAND — image-led CTA repeating the SAME `primaryCta` so the visitor is never more than a scroll from converting.
10. 10. FAQ — `faq[]` accordion (objection-handling Q&As); emits FAQPage JSON-LD for SEO. Plus the ECOSYSTEM / related-products strip pulled from the central registry (Billing <-> Payroll <-> Marketplace) so every page routes to siblings.
11. 11. FINAL CTA BAND — image + headline + the primary CTA / contact, last conversion catch before footer; pulled from `finalCta` config.
12. 12. SHARED FOOTER — global `<Footer>`: registry-driven Products column + Solutions + Resources + Company + the trust/legal cluster + a repeated demo/contact link. Authored once, inherited by every product page.

## Homepage section sequence
1. 1. Sticky nav + persistent primary CTA (platform-level: 'Book a demo' or 'Explore products').
2. 2. Platform hero — the suite-level value prop ('One platform to run your F&B business — billing, staff & payroll, marketplace'), with dual affordance: 'Get Biteaze Billing' (self-serve) + 'Book a demo' (assisted). Strong above-the-fold value prop, scannable.
3. 3. Proof strip — logos + one honest headline metric (e.g. 'Live on Google Play, built for Indian F&B').
4. 4. PRODUCT GRID — the registry rendered as cards (Billing / Attendance & Payroll / Marketplace / Coming soon), each with one-line value + 'Explore [Product]'. This is the multi-product router and the heart of the homepage.
5. 5. How-it-works / unified-suite narrative — 3-4 steps showing the products reinforcing each other (one login, one operator console, products cross-feed data).
6. 6. Use-case / segment grid — QSR / Dine-in / Cloud Kitchen / Cafe / Bakery cards -> /solutions pages.
7. 7. Three-stat trust band — mapped to adoption / durability / reliability, honest proxies only.
8. 8. Social proof — real named F&B testimonials + Play rating + (later) review-site badges.
9. 9. Resources teaser — surface the calculator farm + a couple of guide cards ('Free tools: GST, food cost, payroll calculators') to seed the SEO engine and demonstrate value.
10. 10. Mid/late image CTA band — repeat the platform primary CTA.
11. 11. FAQ accordion (platform-level) — emit FAQPage JSON-LD.
12. 12. Final CTA band + shared footer (trust/legal cluster, registry-driven Products column, Resources, Company, support/WhatsApp).

## Conversion & trust system
- Two-verb CTA system sitewide: ONE convert verb (per-page primary, repeated at nav/hero/midCta/finalCta from a single `primaryCta` config field) + ONE explore verb ('Explore [Product]'). No third Buy/Signup/Pricing button. Reuse identical labels everywhere for recall.
- HYBRID gating by product, not blanket demo-gate: Billing single-outlet = PUBLISH pricing (30-day trial + 1yr/5yr/lifetime already server-enforced) + self-serve Play-Store install as the conversion. Payroll, Marketplace, multi-outlet/enterprise = demo/waitlist-gated (price-on-call, consultative). The primary CTA TARGET is per-product config.
- ONE shared lead-capture component reused across all pages, with a HIDDEN product/source field + UTM/page-source so sales can route a Payroll lead vs a Billing lead. Minimal India-appropriate fields: Name, Phone (WhatsApp-capable), City, Business type, #outlets. Offer WhatsApp (wa.me) as a submit affordance, not just email. Instrument the Play-Store install as a conversion event too.
- Three-stat trust band mapped to the three SMB fears — adoption ('Live on Google Play' + rating once earned), durability ('Built by Biteaze Solutions LLP for Indian F&B'), reliability ('Your data on Google Cloud, encrypted in transit & at rest; per-tenant isolation'). Keep the slots, swap to real numbers as traction lands. Never fabricate Petpooja-scale claims.
- Named, role-stamped testimonials only — 2-3 REAL early F&B customers (name + role + brand + avatar), each ideally carrying a short outcome ('billing in seconds at the counter', 'payroll in minutes'). Build the component now; fill as customers land. Never use stock-photo or invented quotes.
- Earnable third-party badge row (component built, populated as real recognition accrues): Google Play rating, G2 / SoftwareSuggest / Capterra listings (India SMBs check SoftwareSuggest), 'Google Cloud / Firebase' tech-trust marks. No empty/mystery award ribbons at launch.
- Always-visible support as pre-sale trust: a real WhatsApp Business number (wa.me link) + support@biteaze.com (the launch identity), tel:/mailto: linked in header or a sticky footer, with an HONEST support promise you can keep ('WhatsApp support, replies within X hrs') — never an unbacked '24x7'.
- Footer trust/legal cluster (Indian IT-rules expectation): Privacy, Terms, Refund/Cancellation, Grievance/Escalation contact + a /security page. Ship a lightweight Safe-Harbor responsible-disclosure /security page at launch (security@biteaze.com) with honest concrete signals (Google Cloud infra, encryption, owner_uid tenant isolation, data-deletion path). Defer a full trust vault until real ISO 27001 / SOC 2 exist.
- Platform-wide fallback proof baked into proofStrip/socialProof components so a brand-new product page with no customers still renders credible aggregate Biteaze numbers instead of empty slots.

## Content / SEO engine
- Stand up a resources hub (resources.biteaze.com or biteaze.com/resources) as a SEPARATELY-RENDERED SSG/SSR surface — NOT bolted onto the Vite SPA — exposing four distinct content TYPES as nav peers: Blog, Glossary, Templates & Checklists, Free Tools. Each is its own URL namespace targeting a different searcher intent and SERP feature.
- CALCULATOR FARM is the single highest-leverage asset: one reusable framework (inputs -> pure TS calc -> result + one-click PDF export + contextual product CTA), data-driven across ~20-30 slugs. Payroll-side: CTC, In-Hand Salary, PF, ESI, Gratuity, Professional Tax, Overtime, FnF, Statutory Bonus, Minimum Wage. Billing-side: GST, Reverse GST, Food Cost, Recipe Costing, Menu Pricing, Break-Even, Profit Margin, Staff Cost %, Table Turnover. Ungated, 'no data leaves your browser' trust pill, ends with a product CTA.
- Topic-silo blog architecture (~5-6 DURABLE business buckets, not product-feature buckets): Restaurant Operations, Payroll & People, GST & Compliance, Cost Control & Procurement, Growth & Marketing, Industry Guides. Each a real category-hub URL, listed in the Resources nav dropdown, rendered as a homepage-of-hub section, and repeated in the footer 'Topics' column.
- Content-type mix engineered for SERP coverage — assign every piece a format with a job: pillar 'Complete Guide' (1-2 per silo), how-tos (featured snippets), one stat-roundup backlink magnet per quarter, comparison pages ('In-house POS vs aggregator-only', 'Manual attendance vs biometric payroll'), glossary DefinedTerm pages (definition snippets), and a downloadable template/checklist paired to each pillar.
- Ungated everything — no email walls on tools or content (gating kills the traffic/backlink flywheel). Convert via ONE consistent header CTA on every hub page + a contextual product-CTA block at the bottom of every calculator/guide/glossary page that names the relevant product (PF calculator -> Payroll; food-cost/GST tool -> Billing; calculators can CTA straight to the Play Store for lower friction).
- Dense internal-linking / crawl redundancy: expose the taxonomy three times (Resources nav dropdown + hub homepage sections + footer columns). Cross-link content types — every calculator links to its glossary term + related guide; every guide links to its calculator + template; every glossary term links to the pillar guide. This doubles as multi-product cross-sell (payroll calculator naturally routes to the Payroll module).
- E-E-A-T scaffolding: named author + publish/updated date on every resource page; a compact trust strip in the hub footer (Play rating, restaurant count); one social-proof number inline next to each tool. Lead with verifiable Play metrics, never fabricated comparables.
- Compliance hygiene on payroll/GST calculators (trust + liability): version the calc logic, show the formula/assumptions, date-stamp the rates ('ESI 2025', 'PF 2025'), and add a 'not legal/financial advice' disclaimer — mirroring Petpooja's year-stamped tool naming.

## Design & UX patterns (within Biteaze's shell)
- Two reusable body primitives only: `<FeatureBlock>` (alternating image-left/right, bullets, optional deep-link) and `<FeatureCard>` (compact icon/add-on card). Count and content are DATA from config arrays — guaranteeing visual rhythm while keeping authoring trivial. Reject Petpooja's accidental duplicate-cluster artifact.
- Strong above-the-fold value prop with a single dominant CTA, scannable section bands, and repeated contextual CTAs at fixed anchor points (hero/mid/final) — the conversion logic baked into the spine, not re-decided per page.
- Render the dark neo-brutalist burnt-orange (#ea580c) shell as the COMPONENT SKIN over the Petpooja structural spine: thick borders/offsets, hard shadows, high-contrast slabs, Archivo Black display + Montserrat body + Space Mono for numbers/code/metrics (use Space Mono for the trust-stat band and calculator outputs for a deliberate 'data' feel). Invoke the `biteaze-design` skill / BzTheme tokens before building any UI.
- Per-product variation to avoid N-product monotony: each product gets its own hero illustration + accent imagery + screenshot folder, and OPTIONAL slots (useCaseGrid, secondaryFeatures, testimonials) render only when their config array is non-empty — thin/new products never show empty bands.
- Accessibility as a premium signal: WCAG AA contrast (watch burnt-orange-on-dark and the muted '—'/'not applied' states — bump slate-400 to slate-600+), focus-visible rings, keyboard-navigable mega-dropdowns + FAQ accordions (aria-expanded), proper heading hierarchy, labelled form fields, prefers-reduced-motion honored on neo-brutalist motion.
- Premium motion within the shell: tasteful scroll-reveal on feature blocks, hover-elevate on cards, sticky-nav shrink on scroll, an animated counter on the trust-stat band — kept fast and reduced-motion-aware so it reads premium, not gimmicky.
- Mobile-first: the use-case and product grids reflow to single-column stacks, the nav collapses to a full-screen drawer, and the primary CTA pins to a sticky bottom bar (most Indian F&B operators are on phones).

## Tech & SEO
- CRITICAL: the site is a client-side Vite + React 19 SPA (react-router-dom 6) serving an empty #root shell — content pages crawl blank and will NOT rank. The marketing + resources surface MUST move to SSG/SSR. RECOMMENDED: migrate the marketing site to Next.js on Vercel (you're already on Vercel; keeps React 19 components incl. the calculators; gives per-route metadata + static/ISR generation of blog/glossary/tool pages). PRAGMATIC ALTERNATIVE: keep the app shell on Vite but carve the resources hub onto its own Astro (or Next) SSG subdomain — mirroring Petpooja's separate-subdomain pattern.
- Per-route SEO metadata on every page: unique <title> + <meta description>, OG (og:title/description/type/url, og:locale=en_IN, twitter:card=summary_large_image), a self-referencing <link rel=canonical>, and <meta name=robots='index,follow,max-snippet:-1,max-image-preview:large'>. Clean hierarchical URLs (/resources/blog/<silo>/<slug>, /tools/<slug>).
- ADD the JSON-LD structured data Petpooja is MISSING (leapfrog opportunity): SoftwareApplication/WebApplication on product + calculator pages, Article on blog posts, BreadcrumbList sitewide, FAQPage on product/FAQ pages, DefinedTerm on glossary terms, Organization on the homepage (Biteaze Solutions LLP, LocalBusiness signals for Palanpur, Gujarat).
- Generate sitemap.xml + robots.txt at build (split: marketing, blog, tools, glossary). Submit to Google Search Console; set up the en_IN locale targeting.
- Central product registry as a typed source of truth (TS): a `Product[]` powering nav dropdown, ecosystem cross-sell strips, footer Products column, homepage grid, and the per-product `ProductPageConfig`. Define `ProductPageConfig` and a global `CatalogConfig` (shared useCaseGrid + verticals) so a new product = one config object + asset folder + a sitemap entry.
- Calculator framework: one shell (typed inputs -> pure deterministic calc fn -> result + PDF export + product CTA), each variant a small data-driven module so ~30 calculators don't need 30 hand-built pages. Pure functions = unit-testable; version + date-stamp the compliance formulas.
- Performance budget (you already run a size-budget script): keep the SSG pages fast — preconnect/preload fonts (already in index.html), self-host or subset Archivo Black/Montserrat/Space Mono, lazy-load below-fold images and screenshots, ship per-route code-splitting. Core Web Vitals matter for India SERP + mobile.
- Reuse existing infra where sensible: Supabase (already a dependency) can back the lead-capture form + blog/glossary content (or a headless CMS); lucide-react for icons; Tailwind 3 for the shell tokens. Keep the privacy-guard + size-budget verify scripts in the new build pipeline.
- Instrument both conversion paths: Play-Store install (deep-link/QR click + Play referrer) AND the demo-lead form, each tagged with the hidden product/source + UTM field, into one analytics funnel.

## Roadmap

### Phase 0 — Foundation & SSR decision (Weeks 1-2)
- DECIDE rendering: migrate marketing to Next.js on Vercel (recommended) or carve a separate Astro/Next SSG resources subdomain. This unblocks everything SEO.
- Stand up the central product registry (typed `Product[]`) + define `ProductPageConfig` and global `CatalogConfig` types.
- Port the dark neo-brutalist shell tokens (BzTheme: #ea580c, Archivo Black/Montserrat/Space Mono, borders/shadows) and build the global Nav + Footer + the two body primitives (`<FeatureBlock>`, `<FeatureCard>`).
- Wire base SEO plumbing: per-route meta + OG (og:locale en_IN) + canonical + robots + sitemap/robots.txt generation + Organization JSON-LD.

### Phase 1 — First product pages + conversion + trust (Weeks 3-5)
- Build the 12-slot config-driven ProductPage layout; ship /billing (self-serve, PUBLIC pricing, Play-Store CTA) and /payroll (demo/waitlist-gated) from config objects.
- Ship the ONE shared lead component with hidden product/source + UTM, WhatsApp affordance, minimal India fields; instrument Play-Store install as a conversion.
- Build trust components with honest slots + platform-wide fallback: three-stat band, named-testimonial component, earnable badge row, sticky support (WhatsApp + support@biteaze.com).
- Ship the platform homepage (registry-driven product grid + use-case grid + trust + resources teaser) and /pricing.
- Ship a lightweight /security Safe-Harbor page + footer trust/legal cluster (Privacy, Terms, Refund, Grievance).

### Phase 2 — Content/SEO engine (Weeks 5-9)
- Build the reusable calculator framework (inputs -> pure calc -> result + PDF + product CTA) and ship the first ~12-15 ungated calculators (GST, Reverse GST, Food Cost, Recipe Costing, Menu Pricing, Break-Even, CTC, In-Hand, PF, ESI, Gratuity, Overtime); add WebApplication JSON-LD + date-stamped formulas + disclaimer.
- Stand up the resources hub IA: /resources with the four content-type peers, 5-6 durable blog silos, glossary scaffold (DefinedTerm), templates scaffold.
- Seed content: 1-2 pillar guides per silo + a cluster of how-tos + 2-3 comparison pages + the first glossary terms + 2-3 paired templates. Add Article/BreadcrumbList/FAQPage JSON-LD.
- Wire dense internal-linking: nav dropdown + hub homepage sections + footer columns; cross-link calculator <-> glossary <-> guide <-> product. Submit sitemaps to GSC.

### Phase 3 — Scale, verticals & multi-product propagation (Weeks 9-14)
- Ship verticalized /solutions pages (QSR, Dine-in, Cloud Kitchen, Cafe, Bakery) as shared useCaseGrid targets.
- Add /marketplace product page (config object) — verify it auto-propagates into every sibling page's ecosystem strip + nav + footer via the registry.
- Expand the calculator farm to the full ~25-30; add stat-roundup backlink magnets; pursue G2/SoftwareSuggest/Capterra listings to fill the badge row.
- Add A/B testing on the two CTA verbs + hero value props; build an analytics funnel dashboard unifying Play-install and demo-lead conversions.

### Phase 4 — Trust maturation & Nth-product proof (ongoing)
- Replace fallback proxy stats with real traction numbers as they accrue; add real customer testimonials + Play rating + earned third-party badges.
- Add the Nth future module via a single config object + asset folder + sitemap entry — validating the 'new product = fill the slots' promise end-to-end.
- Upgrade /security toward a real trust vault ONLY once ISO 27001 / SOC 2 exist; add escalation matrix and compliance portal.
- Quarterly: refresh date-stamped calculator rates, publish a stat-roundup backlink magnet, expand glossary + comparison pages for long-tail coverage.

## Structure, not skin
"Every recommendation extracts Petpooja's STRUCTURE only — the fixed 12-slot product-page spine and section order, the single-conversion-goal CTA placement, the two-primitive feature-card system, the central catalog/cross-sell registry model, the layered trust scaffold (early proof strip + deeper social proof + ratings), the FAQ-then-CTA close, the four-content-type resources engine, the ungated calculator-farm magnet, the topic-silo IA, and the server-rendered SEO-complete page template + JSON-LD. NONE of Petpooja's copy, screenshots, layout pixels, color, typography, or light visual language is carried over. Biteaze keeps its own dark neo-brutalist burnt-orange (#ea580c) shell with Archivo Black / Montserrat / Space Mono as the skin painted over the borrowed skeleton; the data (product registry, configs, calculators, content) is entirely Biteaze's own. Two explicit DEVIATIONS from Petpooja where blind copying would hurt Biteaze: (1) HYBRID conversion — public pricing + self-serve Play-Store for Billing instead of blanket demo-gating, because Billing is a live self-serve app and hiding its price would add friction and kill bottom-market conversion; (2) honest, verifiable trust slots with platform-wide fallback instead of fabricated scale numbers or mystery award badges, because a young entrant claiming '150k+ businesses' is non-credible and legally exposed under Indian advertising law — for Biteaze, honesty is the moat."
