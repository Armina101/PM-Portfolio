# Portfolio change log

Each update lists the files that changed and what changed in them.
The easiest way to apply an update is to replace those files in your repo with the new copies, then commit.
If you'd rather edit by hand, each entry has the exact text to find and replace.

---

## 2026-10-28 · Search discoverability: sitemap, robots.txt, structured data

**New files:** `sitemap.xml`, `robots.txt` (both at the top level, next to `index.html`)
**Files changed:** `index.html` (structured data added in the `<head>`)
**Not changed:** how anything looks or works

### 1. `sitemap.xml`
- **What's in it:** your 7 public pages at their clean addresses: `/`, `/beyond`, `/work/hackathon`, `/work/stacstart-idice`, `/work/mimuads`, `/work/zuri` and `/work/nevara`. Each has the date it was last built.
- **Left out on purpose:** `/work` and `/contact` are just the homepage scrolled to a section, so listing them would make Google see the same page three times.
- **Kept up to date:** it's generated with the site, so a new case study is added automatically.

### 2. `robots.txt`
- **Crawling:** every search engine (Googlebot, Bingbot and others) may crawl the whole site. There were no restrictions before.
- **The only exclusions:** `CHANGELOG.md` and `README.txt`, which are repo notes, not pages for visitors.
- **Sitemap:** it points search engines to `https://theafolabiamina.com/sitemap.xml`.

### 3. Structured data (homepage only)
- **Markup:** a JSON-LD block describing the site as **Person + WebSite**, not "Organization", because the site is about you, not a company.
- **Person:** Aminat Afolabi, Product Manager, works for Conclase, Lagos, Nigeria, University of Ilorin alumna. It uses your social preview image and links your LinkedIn, GitHub and X.
- **WebSite:** the site's name, address and description.
- **Where the details come from:** all of them are already on the site. Nothing is invented.

### Checked before release
- `/robots.txt` and `/sitemap.xml` load, the sitemap is valid XML, and every address in it opens.
- The structured data is valid JSON, on the homepage only.

---

## 2026-10-27 · Two new recommendations, Sabilytics analytics

**Files changed:** `index.html`, `beyond.html`, all five `work/*.html` pages
**New images:** `img/hs-olaoluwa.webp`, `img/hs-saka.webp`
**Not changed:** `styles.css`, `site.js` and everything else

Apply by copying the files in, keeping the `work` and `img` folders.

### 1. Kind words: two new recommendations (`index.html`, `img/`)
- **Olaoluwa Adesakin**, Head of Marketing Operations, Conclase: "Few people make a team better just by being in the room, Aminat is one of them. She consistently elevated every project we worked on, from early brainstorms to final delivery. I could always count on her to follow through, even during short deadlines."
- **Saka Jamiu**, Senior Software Engineer, FCMB and Conclase: "I had the pleasure of working with her, and I can confidently attest to her exceptional work ethic, professionalism, and dedication to excellence. She is a highly dependable and results-driven Product Owner who consistently demonstrates strong ownership, attention to detail, and a genuine commitment to delivering value. Her ability to communicate effectively, collaborate across teams, and balance business objectives with user needs makes her a valuable asset to any organization."
- **Placement:** both are in the top row of the reel, each with their headshot, and open in the reader.
- **Link:** "See my LinkedIn" goes to your profile, like the other recommendations.
- **Count:** the reel now has 14 items.
- **Editing later:** the content lives in `site-src/kind_words.py`.

### 2. Sabilytics web analytics (every page)
- **Where:** this script is in the `<head>` of all seven pages: `<script async src="https://www.sabilytics.com/script.js" data-site="fq1wqhvx4m2n" data-domain="theafolabiamina.com"></script>`
- **Safe to load:** it loads in the background (`async`), so it never slows down or blocks the page. If Sabilytics is unreachable, the site still works normally.
- **Claude preview:** the script isn't added there, so only real visits to theafolabiamina.com are counted.

### Checked before release
- **New cards:** both open with the right person, photo and text. Close, Escape and outside-click all work, and focus returns to the card.
- **Pages:** all seven pass at phone, tablet and desktop sizes, in light and dark.
- **Analytics:** the test environment can't reach sabilytics.com, so I checked the script is present on every page and loads asynchronously. Visits will start showing in your Sabilytics dashboard after you deploy.

---

## 2026-10-26 · Featured books, bookcase design, latest CV

**Files changed:** `index.html`, `styles.css`, `Aminat-Afolabi-CV.pdf`
**Not changed:** everything else

Apply by copying the files in.

### 1. Featured books (`index.html`, `styles.css`)
- **The sticker:** Hackathon Platform, StacStart × iDICE and Mimuads each carry a round yellow "Featured" sticker with a purple star, pinned to the top corner of the book and slightly tilted. It pops in when the page loads and wiggles on hover. On phones it shows just the star.
- **Screen readers:** these three books are announced as "featured".
- **The caption:** a new line under "Pick a book to open it": "★ Starred books are my top picks."
- **Nodecademy:** stays on the shelf but isn't starred, because it has no case study page yet.

### 2. Bookcase design (`index.html`, `styles.css`)
- **Before:** the lilac panel with the yellow shadow.
- **After:** a lavender bookcase, following the reference: a top board with a shaded underside, two side posts with legs, the shelf board the books stand on, and a soft floor shadow. It turns deep purple in dark mode.

### 3. Latest CV on the site (`Aminat-Afolabi-CV.pdf`)
- Download CV now serves the 26 Oct CV: the new Summary, Conclase, Splexxlabs, Selected Builds and Leadership; Monnify; "support 50,000+ users"; Nigeria, Kenya and Uganda.
- It was checked clean, with no watermark and no hidden characters.

### 4. Follow-up the same morning (`styles.css`)
- **Books and plants:** they now stand directly on the shelf board. Before, there was a gap above it.
- **Background circles:** unchanged (a brief resize was reverted).
- **Featured sticker redesign:**
  - It's now a small scalloped yellow seal with a cream centre and a purple star, with a crisp dark offset shadow.
  - It replaces the larger round sticker with "FEATURED" lettering around the edge.
  - The "Starred books are my top picks" line uses the same seal.

### 5. Plant fix for in-between widths (`styles.css` only)
- **Why:** a phone in "desktop view" pretends to be about 980px wide. At that width the plants were placed against the section edges, not the bookcase, so they slid onto the posts and hung off the shelf.
- **Plants:** they're now anchored just inside each post, sitting on the shelf board.
  - At 941 to 1099px they're slightly smaller.
  - On tablets below 940px and on phones they're hidden, because there's no room.
  - On tablets the frame sits at the edges so the books fit inside it.
- **Frame look:** a bolder, more "defined" frame was tried and then reverted, so the bookcase keeps its previous look.
- **Checked:** at 390, 820, 980, 1024, 1100, 1180, 1280, 1440 and 1920px:
  - plants are inside the frame and clear of the books
  - books stand on the board
  - no overflow
  - every book still flies out from and back to its spot

---

## 2026-10-25 (night, 2) · Clean URLs, social preview, Beyond page restyle

**Files changed:** `index.html`, `beyond.html`, all five `work/*.html` pages, `styles.css`, `site.js`, `og-image.png` (replaced)
**New file:** `vercel.json` (at the top level, next to `index.html`)

Apply by copying the files in, keeping the `work` folder. `vercel.json` must sit at the top level of the repo.

### 1. Clean URLs (`vercel.json`, every page, `site.js`)
- **The new addresses:**
  - `/work` and `/contact` open the homepage and land on those sections.
  - `/beyond` is the Beyond page.
  - `/work/hackathon`, `/work/stacstart-idice`, `/work/mimuads`, `/work/zuri` and `/work/nevara` are the case studies.
- **`vercel.json`:**
  - `cleanUrls` serves pages without `.html`, and 308-redirects old `.html` links to the clean version.
  - `trailingSlash: false` redirects `/work/` to `/work`.
  - Two rewrites serve the homepage at `/work` and `/contact`.
- **On the homepage:** clicking Work, Contact, See the work or the logo scrolls smoothly and updates the address bar without reloading. Back and forward scroll between sections, and refreshing `/contact` lands on Contact.
- **Local previews:** every rewritten link keeps its old target in `data-dev`. On hosts without Vercel's rewrites (the Claude preview, a local file server), `site.js` switches links back to `index.html#work` etc., so previews keep working. Clean links are used only on theafolabiamina.com and *.vercel.app.

### 2. Social sharing preview (every page, `og-image.png`)
- **Homepage title and description:** "Aminat Afolabi | Product Manager" / "Product manager with a software engineering background. Explore my work, product decisions, and the outcomes behind products I've helped build."
- **Tags updated:** the meta description, Open Graph title, description, URL and image (with size and alt text), Twitter/X `summary_large_image` tags, and a canonical link.
- **Absolute image URL:** every page points to `https://theafolabiamina.com/og-image.png`. Social sites need the full address.
- **New `og-image.png` (1200×630):** in the current design, with the "Product Manager" pill, "I show my workings." with the yellow highlight, your name and line, your portrait with the dark outline, yellow shadow and lavender tile, and theafolabiamina.com.

### 3. Beyond page in the same visual language (`beyond.html`, `styles.css`)
- **Pill labels:** "Beyond the products", "Communities", "On stage", "The toolbox" and "Off the clock".
- **Highlighted headings:** yellow highlight on "led" and "panels".
- **CareerFest:** the photos have rounded outlined frames, the stats sit in a lilac card with the yellow shadow, and the quote is a card with a purple edge.
- **Communities and talks:** each row is a card that lifts with the yellow shadow on hover, with dates in purple.
- **Corkboard:** gets the yellow shadow.
- **Off the clock:** becomes a small card.
- **Closing link:** "Now, the product work" is now the same lilac panel as the homepage's Beyond link.

### Checked before release
- **Real URLs:** tested on a local server that behaves like Vercel:
  - Every clean URL loads directly and refreshes correctly.
  - `.html` addresses and trailing slashes redirect.
  - Nav clicks scroll without reloading, back and forward work, and All work and Contact from other pages land on the right section.
  - The book links open the clean case-study URLs.
- **Without rewrites:** the Claude preview and plain file server still use the old links and work.
- **Pages:** all pages pass at phone, tablet and desktop sizes, in light and dark. The bookshelf, reel and journey all still work.

---

## 2026-10-25 (evening, 5) · One visual language across the whole site, new label font

**Files changed:** `index.html`, `styles.css`
**Not changed:** the other pages' HTML. They pick up the new label font through `styles.css`.

Apply by copying the two files in.

### 1. Small labels: new font everywhere (`styles.css`)
- **Before:** every small uppercase label used IBM Plex Mono, a typewriter-style font. This covers labels like "STRATEGY · LEARNED ON...", the dates on The plot so far, the case study tags and "IN 30 SECONDS".
- **After:** they now use the site's main font, Familjen Grotesk, in bold with a little letter spacing.
- **How:** one line in `styles.css`: `--mono` now points to Familjen Grotesk.

### 2. Top half of the homepage matches Beyond, Kind words and Contact (`index.html`, `styles.css`)
- **Section labels:** purple pill labels added above Selected work ("The work"), Principles I build by ("How I think") and The plot so far ("The journey").
- **Headings:** yellow highlight on "work" and "so far".
- **Bookshelf:** now sits in a lilac panel with a dark outline and the yellow offset shadow.
- **Principles:** each principle is now a white card with rounded corners. On hover it gets a dark outline and the yellow shadow. The category ("Users", "Strategy"...) is a purple chip, followed by "Learned on ..." in bold.
- **The plot so far:**
  - **Map:** rounded corners and the yellow shadow.
  - **Stops:** each stop is a small card; the open stop is lilac with the yellow shadow.
- **Hero photo:** dark outline and the yellow offset shadow, like the panels below.

### Checked before release
- All pages pass at phone, tablet and desktop sizes, in light and dark.
- The bookshelf, The plot so far autoplay and the Kind words reel all still work.

---

## 2026-10-25 (evening, 4) · Book copy, case study headers, Skim switch

**Files changed:** `index.html`, `styles.css`, all five `work/*.html` case study pages
**Not changed:** everything else

Apply by copying the files in (keep the `work` folder).

### 1. Books (`index.html`)
- **Page numbers:** the little "1" and "2" page numbers are hidden on desktop. They still show in the phone reader, where they tell you which page you're on.
- **StacStart × iDICE:** "StacStart was built for academy students who sign up and pay for their learning. Then came iDICE, a federal government Skills to Jobs programme that needed the platform to support 50,000+ sponsored learners across Northwest Nigeria." / "I led product and worked closely with engineering on the platform rebuild to support both programmes. The priority was clear: make large-scale learner onboarding work first, then sequence job-readiness tools around the needs of the programme. Because before learners can build skills or find opportunities, they need to get through the door."
- **Zuri:** "Built for the Monnify × API Conference Lagos Developer Challenge, Zuri is a multilingual money assistant that helps users plan and make payments using their real spending data." / "I shaped the product vision and drove product decisions, balancing a conversational experience with the trust and safeguards needed for financial transactions."
- **Nevara:** "Group payments get messy when someone has to match bank alerts to people just to figure out who has paid." / "Nevara is a group payment collection platform that gives every payer a unique virtual account and updates payment status automatically as transfers arrive. The idea came from a weekend I spent matching bank alerts to people for a friend's asoebi." / "I led product strategy and designed the collection workflow, then led the pitch."
- **Nodecademy:**
  - **Heading:** now "The website and LMS behind an engineering school."
  - **Text:** "I product-managed work across the public-facing website, application tracking and payment workflows, and the Learning Management System (LMS)." / "I mapped end-to-end user flows across these experiences and conducted user research, speaking with the internal team of tutors to understand their needs. I translated those insights and business requirements into PRDs and acceptance criteria to guide engineering and align delivery across the platform."
  - **Highlights:** "LMS supporting every learner activity" is now "LMS supporting 50+ users and growing", and "Freelance with Splexxlabs, Apr to Aug 2026" is removed.

### 2. Case study headers (all `work/*.html`, `styles.css`)
- **Kicker:** the small "Case study 02 · StacStart × iDICE · Learning platform" line is now a solid "Case study 02" pill in the project's colour (with a yellow shadow), followed by outlined tag chips.
- **Details:** Role, Team, When and Status are now four cards, each with a coloured top edge, a bold coloured label and darker, easier-to-read text. They show two per row on tablets and one per row on phones.

### 3. Skim / Show workings switch (all `work/*.html`, `styles.css`)
- It's now a soft white segmented control with icons: lines for Skim, a pencil for Show workings.
- The selected option is yellow with a dark outline. It still remembers your choice across case studies.

### Checked before release
- All pages pass at phone, tablet and desktop sizes, in light and dark.
- The Skim switch still hides and shows the reasoning and remembers your choice.
- All books open with the new copy, and the page numbers are hidden on desktop.

---

## 2026-10-25 (evening, 3) · Contact, labels, Beyond link panel, "The plot so far", hackathon book

**Files changed:** `index.html`, `styles.css`
**Not changed:** everything else

Apply by copying the two files in.

### 1. Homepage "Beyond the products" link (`index.html`, `styles.css`)
- **Before:** a full-width black band.
- **After:** a soft lilac panel with rounded corners, a dark outline and a yellow offset shadow, in the page colours (dark grey in dark mode).
- **Arrow:** a purple circle that turns yellow on hover. On phones it sits under the title.

### 2. Bolder section labels (`index.html`, `styles.css`)
- "Communities, talks and stages", "Contact" and "Kind words" now share one style: a purple pill with a small yellow badge and a yellow offset shadow (class `eyebrow-pill`).

### 3. Contact (`index.html`)
- **Heading:** "Got something good brewing?", with "brewing?" highlighted.
- **Text:** "I'm open to product opportunities and conversations with people building interesting things. My inbox is open."
- **Buttons:**
  - The email address and Copy button are replaced by an "Email me" button (yellow, first in the row), which opens a new email to your address.
  - The row now reads Email me, Download CV, LinkedIn, X, GitHub.

### 4. "How I got here" renamed (`index.html`)
- **Title:** now "The plot so far".
- **Intro:** "Some things make more sense with context. Pick a stop, or let it play."

### 5. Kind words screenshot cards (`index.html`, `styles.css`)
- The "WhatsApp" / "LinkedIn" / "Medium" line under each screenshot card is removed.
- The source still shows inside the reader when a card is opened.

### 6. Hackathon book (`index.html`)
- **Spine title:** now "Hackathon Platform".
- **Text:**
  - "Most hackathons end with a ranking and silence. 96 teams deserved to know why they placed where they did."
  - "I product-managed the judging and results experience for Borderless Bytes, spanning 323 developers across four countries."
  - "The product decision: Public rankings. Private feedback. Every score came with a written reason, and each team could access feedback on its own submission."
- **Bullets:** replaced by four stats:
  - 96 / Project submissions
  - 323 / Developers across 4 countries
  - 288 / Judge scores, each with a written reason
  - Every team / Private feedback on its submission

### Checked before release
- All pages pass at phone, tablet and desktop sizes, in light and dark.
- The Email me button opens a new email to your address.
- The book opens with the new text, the reel still works, and the bookshelf still works.

---

## 2026-10-25 (late) · Kind words becomes a receipts reel; Beyond page band fixed

**Files changed:** `index.html`, `beyond.html`, `styles.css`, `site.js`
**Not changed:** the images and every other page (the reel photos now load with the page, at low priority, so cards never slide in blank). All 12 kind-words items, people, photos and links are exactly as before.

Apply by copying the four files in.

### 1. Kind words: receipts reel instead of the clothesline (`index.html`, `styles.css`, `site.js`)
- **Layout:** two rows of cards slowly scroll sideways in opposite directions.
  - **Row 1:** the four recommendations, plus Staff of the Quarter and the 2nd place ticket.
  - **Row 2:** the six screenshots.
- **Pausing:** the reel stops when you hover over it, tab into it, or open a card. There's also a Pause/Play button under the intro.
- **Reader:** tapping any card opens the same reader as before: full message, photo, name, role, source link, Enlarge, Previous/Next, and close with Close, Escape or a click outside.
- **Reduced motion:** with reduced motion switched on, nothing moves and each row becomes a swipeable strip instead.
- **Duplicate cards:** each row is repeated once so the loop is seamless. The copies are hidden from screen readers and skipped by Tab.
- **The content itself:** still lives in `site-src/kind_words.py`. The `line`, `at` and `tilt` fields are no longer used.

### 2. Bolder "Kind words" label (`index.html`, `styles.css`)
- It's now a purple pill with a yellow heart badge and a yellow offset shadow, instead of small grey text.
- The headline is a touch larger.

### 3. Beyond page: no more hard dark band in light mode (`beyond.html`, `styles.css`)
- In light mode, the CareerFest section now uses the same page colour as the rest of the page.
- A thin rule separates it from the intro, like the other sections.
- In dark mode it looks the same as before.

### Checked before release
- **Reader:** all 12 cards open the right person and close every way, and focus returns to the right card. A repeated copy of a card opens the right note too.
- **Pausing:** the reel pauses on hover, focus and while reading, and the Pause button works.
- **Reduced motion:** the rows become still, swipeable strips.
- **Sizes:** desktop and phone, light and dark. No sideways overflow and no errors. All pages still pass, and the bookshelf works.

---

## 2026-10-25 (night) · "Apparently, I'm really cool to work with 😎": the clothesline

**Files changed:** `index.html`, `styles.css`, `site.js`
**New images:** `img/hs-abdulquddus.webp`, `img/hs-lekan.webp`, `img/hs-habeeb.webp`, `img/hs-abimbola.webp`,
`img/kw-google.webp`, `img/kw-abdullahi.webp`, `img/kw-gdsc.webp`, `img/kw-demo.webp`, `img/kw-abimbola.webp`, `img/kw-medium.webp`
**Not changed:** every other page

Apply by copying the files in, keeping the `img` folder. Hand edits aren't practical for this one.

### What it is
- **Placement:** replaces the old "Noticed at work" Recognition block, right before Contact.
- **Headline and copy:** used exactly as written.
- **The clothesline:** two strings with 12 real items pegged on:
  - four recommendations (Abdulquddus, Lekan, Habeeb, Abimbola)
  - six screenshots: Google for Developers, the Conclase demo-day chat, the Medium feature, the GDG sponsorship chat, Abdullahi's message, Abimbola's chat
  - the Staff of the Quarter graphic
  - the ALAT by Wema 2nd place ticket

### How it behaves
- **Entrance:** as the section comes into view, the strings draw in and the notes drop on one by one, then sway very gently. With reduced motion switched on, there's no movement.
- **Hover or keyboard focus:** a note lifts and straightens.
- **Click, tap or Enter:** opens the reader with the full message, the person's photo, name and role, and a discreet source link. Screenshots keep their shape and can be enlarged. Previous and Next (or the arrow keys) browse every note. Close, Escape or clicking outside closes it, and focus returns to the note you opened.
- **Desktop dragging:** drag a note left or right along its string; it stays on the line and comes to the front. With the keyboard, use Shift plus the left or right arrow.
- **Phones and tablets:** each string becomes a swipeable line of hanging notes, and the reader goes full screen.

### Links
- **Recommendations:** "See my LinkedIn" goes to the LinkedIn profile, because LinkedIn can't link to a single recommendation.
- **Google for Developers:** the comment link.
- **Medium feature:** the full article.
- **Staff of the Quarter:** the LinkedIn post.
- **2nd place ticket:** the Nevara case study.
- **WhatsApp screenshots:** no link.

### Editing the notes later
- All the content lives in `site-src/kind_words.py` (one entry per note: author, role, photo, image, text, caption, link, position on the line).
- To add or remove a note, change that list and rebuild; the design doesn't need touching.
- If you're editing the built site directly instead, the same data is in the `<script id="kw-data">` block in `index.html`, but the card markup must match it.

### Checked before release
- **Sizes:** desktop at 1920, 1440 and 1280; tablet at 820; phone at 390; light and dark. No sideways overflow and no errors.
- **Reader:** all 12 notes open with the right person and link. Close, Escape and outside-click all work; focus returns to the note, Tab stays inside the reader, and screenshots enlarge.
- **Dragging:** moving a note doesn't open it by accident.
- **Phones:** every image loads as it's swiped into view.
- **The rest of the site:** all other pages still pass, and the bookshelf still works.

---

## 2026-10-25 (evening, 2) · Removed the "You are here" badge from the list

**Files changed:** `index.html`

- The "You are here" label next to Conclase in the stop list is removed.
- The location pin on the map stays.

---

## 2026-10-25 (evening) · How I got here: new copy, order, "You are here" on Conclase

**Files changed:** `index.html`, `styles.css`, `site.js`
**Not changed:** everything else

Best applied by copying the three files in.

### 1. Order (`index.html`)
- Splexxlabs (ended Aug 2026) now comes before Conclase (still current).
- The last two stops are now 07 Splexxlabs (Apr 2026 to Aug 2026) and 08 Conclase (Jan 2026 to Present).

### 2. "You are here" on Conclase (`index.html`, `styles.css`, `site.js`)
- **On the map:** a purple location pin sits above stop 8. When the route reaches it, the pin drops in and keeps gently bobbing, with soft pulses rippling out from the stop, like the "current location" dot on a map.
- **In the list:** Conclase carries a "You are here" badge with a pulsing dot.
- **Reduced motion:** with reduced motion switched on, the pin shows without moving.

### 3. More reading time on product stops (`site.js`, `index.html`)
- When the journey plays on its own, it now pauses about 6 seconds on Mimuads and Splexxlabs, and lingers on Conclase, where it ends.
- Earlier stops stay at about 2.4 seconds. Each stop's pause is set by `data-dwell` (in milliseconds) on its `<li>`.

### 4. New copy (`index.html`)
- **University of Ilorin:** "I learnt to question assumptions, follow the evidence, and understand complex problems. Outside the lab, I played volleyball for the university team, where I learned the value of teamwork, discipline, and showing up for the team."
- **ALX Africa:** "Built a foundation in software engineering, front-end development, and practical problem-solving. My projects, including my capstone, are available on GitHub ↗" (GitHub is the link).
- **Headstarter AI:** "US-based software engineering fellowship where I strengthened my development skills through hands-on projects, building applications and practising technical problem-solving. The experience deepened my understanding of how software is built, tested, and improved."
- **Mimuads AI:** "Co-founded with Femi Obadimu, we are building a self-serve marketplace for verified digital screen advertising. Now live in Lagos, the platform is growing as we work to simplify how businesses discover, book, and manage out-of-home advertising. So far, we've onboarded 50+ users across both sides of the marketplace, with 31 screen hosts and 20+ businesses listing their offerings on the platform. Read the case study." ("Read the case study" is the link.)
- **Splexxlabs:** "Led product development for Nodecademy at Splexxlabs, spanning the public-facing website, application tracking and payment workflows, and the Learning Management System (LMS). Translated business needs into Product Requirements Documents (PRDs) to guide engineering and align delivery across these connected experiences. The platform currently serves 50+ users and continues to scale." (Nodecademy links to nodecademy.com.)

### Checked before release
- All seven pages at phone, tablet and desktop sizes, light and dark: no overflow, no broken images, no errors.
- Autoplay timing measured: about 2.4 seconds on stops 1 to 5, about 6 seconds on Mimuads and Splexxlabs, then it ends on Conclase with the pin dropped in.
- Clicking a stop or pin still works, and all six bookshelf books still open and close.

---

## 2026-10-25 (afternoon) · Zuri and Nevara case studies, shelf order, hackathon image, All work button

**Files changed:** `index.html`, `styles.css`, `work/hackathon.html`, `work/stacstart-idice.html`, `work/mimuads.html`
**New files:** `work/zuri.html`, `work/nevara.html`, `img/hk-queue.webp`
**Not changed:** `beyond.html`, `site.js`, the CV and every other image

These are best applied by copying the files in (keep the `work` and `img` folders), not by hand.

### 1. "Beyond the products" link opens the top of the Beyond page (`index.html`, `styles.css`)
- The band now links to `beyond.html#main`, which always starts at the top of the page.
- `styles.css` gains `#main{scroll-margin-top:80px}` so the sticky header never covers the start.

### 2. Hackathon book uses the judging queue screenshot (`index.html`, `img/hk-queue.webp`)
- The left page of the hackathon book now shows the judge's view ("Welcome back, Amina" and the judging queue).
- The StacStart footer from the original screenshot is cropped out. The leaderboard image is still used on the hackathon case study.

### 3. New case studies for Zuri and Nevara (`work/zuri.html`, `work/nevara.html`)
- Lighter than the first three: the problem, what was built, two or three decisions with their trade-offs, and where it is now.
- **Zuri:** labelled Demo, with links to the demo and pitch deck.
- **Nevara:** labelled 2nd place, with a link to the pitch deck.
- Both books on the shelf now include "Read the case study".
- The "Next case study" chain now runs Mimuads, Zuri, Nevara, back to the hackathon (`work/mimuads.html`).

### 4. Shelf order and colours (`index.html`, `styles.css`)
- **New order:** 01 Hackathon, 02 StacStart × iDICE, 03 Mimuads, 04 Zuri, 05 Nevara, 06 Nodecademy.
- **Colours:** Nodecademy is now the custard-yellow book on the far right; Nevara is now white.

### 5. A clearer "All work" button on every case study (all `work/*.html` pages, `styles.css`)
- It is now a rounded button with a dark circular arrow, instead of small grey text.
- On hover the arrow circle turns yellow and nudges left.
- It still goes back to the bookshelf (`index.html#work`).

### Checked before release
- All seven pages at phone, tablet and desktop sizes, light and dark: no sideways overflow, no broken images, no errors.
- The shelf order is right, and all six books open and close; Zuri and Nevara link to their case studies.
- The Beyond band lands at the top of the Beyond page, and All work returns to the shelf.

---

## 2026-10-25 · Journey durations, Conclase copy, Beyond link, anime

**Files changed:** `index.html`, `beyond.html`, `styles.css`
**Files not changed:** everything else (site.js, images, fonts, CV, case studies)

### 1. How I got here: every stop shows its full duration (`index.html`)
Find each label on the left and replace it with the one on the right:

| Find | Replace with |
|---|---|
| `01 · 2021` | `01 · Sep 2021 to Aug 2025` |
| `02 · Jan 2023` | `02 · Jan 2023 to Jun 2024` |
| `03 · Aug 2023` | `03 · Aug 2023 to 2025` |
| `04 · Jul 2024` | `04 · Jul 2024 to Oct 2024` |
| `05 · Oct 2024` | `05 · Oct 2024 to 2025` |
| `06 · Oct 2025` | `06 · Oct 2025 to Present` |
| `07 · Jan 2026` | `07 · Jan 2026 to Present` |
| `08 · Apr 2026` | `08 · Apr 2026 to Aug 2026` |

### 2. How I got here: new Conclase description (`index.html`)
Inside the Conclase stop, the one-paragraph summary ("Shipped the StacStart MVP, led the rebuild for iDICE...")
is replaced by three paragraphs:

> As a Product Manager at Conclase, I contribute to building and scaling StacStart, an AI-powered talent platform designed to bridge the gap between learning and employment. The platform brings together two complementary experiences: a Learning Management System (LMS) that supports learners in developing in-demand skills, and StacStart Jobs, which connects jobseekers with recruiters.
>
> One of my key contributions has been leading the rebuild of the StacStart LMS to support the iDICE Skills to Jobs programme, commissioned by the Bank of Industry, which targets 50,000+ learners across Northwest Nigeria, with StacStart as the implementation partner. Since inception, StacStart (formerly Conclase Academy) has also supported 10,000+ users across its learning and job application platform.
>
> My work spans translating business needs into product requirements, collaborating with engineering and cross-functional teams, and driving product delivery from planning through implementation. I also product-managed the platform for the Borderless Bytes Hackathon and transitioned the software development workflow from WhatsApp-based coordination to Jira, improving visibility and collaboration across the development lifecycle. In recognition of my contributions, I was named Staff of the Quarter for Q2 2026.

"Borderless Bytes Hackathon" links to the hackathon case study (`work/hackathon.html`).
Each paragraph is its own `<p>` tag inside `<div class="stop-body">`.

### 3. Homepage: Beyond teaser replaced by a link band (`index.html`, `styles.css`)
The dark "I bring people into the room." block on the homepage (photo, 2,600+ / 100+ / 40% stats)
repeated the Beyond page, so it is replaced by one dark band that links to the Beyond page:
small label "Communities, talks and stages", large "Beyond the products", and a yellow round arrow.
On hover or keyboard focus, the title gets a yellow underline and the arrow slides right.
The numbers still appear, and still count up, on the Beyond page itself.

In `index.html` the old block starts with `<section class="night band" aria-labelledby="beyond-title">`;
the new one starts with `<section class="beyond-cta-band" aria-label="Beyond the products">`.
`styles.css` gains a block at the end headed `/* Homepage: link band to the Beyond page */`,
plus one rule, `.stop-body p + p{margin-top:10px}`, that spaces the Conclase paragraphs.
This one is easiest to apply by replacing the files.

### 4. Beyond page: anime added to "Off the clock" (`beyond.html`)

| Find | Replace with |
|---|---|
| `Off the clock I run, play volleyball, and say yes to more side quests than my calendar can handle.` | `Off the clock I run, play volleyball, watch anime, and say yes to more side quests than my calendar can handle.` |

### Checked before release
- All five pages at phone, tablet and desktop sizes, light and dark: no sideways overflow, no broken images, no errors.
- The Conclase stop opens and shows all three paragraphs; the hackathon link works.
- The Beyond link band opens the Beyond page.
- All six bookshelf books still open and close correctly.
