# BANI // OS — Accomplishments by Phase

This document tracks all delivered features, architectural milestones, design decisions, and interactive details for each phase of **BANI // OS** (Banishwor Athokpam's mobile-first personal operating system portfolio).

---

## 🟢 Phase 1: OS Shell & Core Launcher

**Completed:** September 19, 2026  
**Status:** 100% Complete & Visually Verified

### 1. Architectural & Technology Foundation
- **Stack:** Modern lightweight stack using **React 18**, **TypeScript**, and **Vite**, with zero heavy UI libraries or unnecessary bloat.
- **Content Separation Layer:** Pure data contracts decoupled from presentation in `src/content/`:
  - [`profile.ts`](file:///d:/Project/aboutme/src/content/profile.ts): Core biography, links, merit credentials, and role subtitles.
  - [`apps.ts`](file:///d:/Project/aboutme/src/content/apps.ts): Definitions for 10 core apps, spaces, colors, and SVG icon mappings.
  - [`skills.ts`](file:///d:/Project/aboutme/src/content/skills.ts): 17 technologies mapped directly to real production projects.
- **Static Assets:** Cleanly organized in `public/`:
  - High-res portrait `profile-pic.jpg`
  - Published book covers (`pushback-cover.jpg`, `echoes-cover.jpg`)
  - Curriculum vitae `resume.pdf`

### 2. Executive Porcelain Light Theme & Ambient Wallpaper
- **Design Tokens (`src/index.css`):**
  - Base canvas: `#F6F8FB` / `#F8FAFC`
  - Crisp typography: *Space Grotesk* (mono technical) + *Plus Jakarta Sans* (humanist sans-serif)
  - Specular glass: `backdrop-filter: blur(24px) saturate(180%)` with tactile 1px borders (`rgba(255, 255, 255, 0.85)`).
- **Ambient Fluid Gradient Wallpaper (`Wallpaper.tsx`):**
  - Multi-point diffuse gradient mesh with soft electric indigo, warm amber, cyan, and dawn rose light plumes.
  - Gives genuine organic depth to frosted glass elements floating on top.

### 3. BANI OS Micro-Boot Sequence (1.2–1.5s)
- **Monogram & Readiness Indicator:** Minimal `BANI // OS` monogram with glowing indicator ring and smooth progress line.
- **State Caching:** Remembers user session in `sessionStorage` so return visits open directly to the Home screen.
- **User Control:** Includes instant "Tap to Skip" and strictly respects `prefers-reduced-motion`.

### 4. Standalone Companion Widgets (Side-by-Side)
- **Compact Clock & System Glance Widget (~118px):**
  - **Live Digital Clock:** Real-time ticking time (`HH:mm :ss`) with pulsing colon `:` indicator.
  - **Interactive 12H / 24H Switcher:** Tap anywhere on the clock widget to toggle between 24-hour mode (`22:20`) and 12-hour mode (`10:20 PM`).
  - **Live Status & Weather:** Emerald pulsing `LIVE` badge, `SAT 19 SEP`, and live weather chip (`⛅ 24°`).
- **Spacious Profile & Identity Widget (~320px):**
  - **Enlarged 48px Portrait:** Authentic portrait with active availability status ring.
  - **Full Name & Distinction:** Displays **Banishwor Athokpam** alongside the `✨ 80.3%` MCA distinction tag.
  - **Dynamic Role Cycler:** Directly rotates through:
    1. *Software Developer*
    2. *Android & Full Stack*
    3. *Author of Pushback*
    4. *Digital Heritage Creator*
    5. *Open Source Builder*
  - **Location & Bio:** `📍 Manipur, India` and an interactive `Bio ↗` button.
- **Humorous Avatar Easter Egg (Option B):**
  - Tapping specifically on the 48px photo reveals an in-place liquid-glass popover:
    - *"🔍 Enhance... Error 404!"*
    - *"Widget is too small for this face 😉 Check Instagram for the 4K version!"*
    - Sunset-gradient button directly linking to **[@banishwor_ath](https://www.instagram.com/banishwor_ath/)** on Instagram.
    - Auto-dismisses after 7s or on tapping `✕`.

### 5. Connected Morphing Search Bar
- **Unified Liquid-Glass Anchor:** Sits cleanly on the home screen with search input and shortcut hint (`⌘ K`).
- **Seamless Dropdown Tray:** Expands directly downwards from the search capsule without awkward disconnected popups.
- **Google-Style Recent Queries (Zero Spoilers):**
  - *Who is Banishwor Athokpam?*
  - *Banishwor fav player*
  - *Banishwor gf*
  - *Why Banishwor build apps?*
  - *Banishwor sleep schedule*
  - *Banishwor net worth*
- **Interactive Knowledge Graph Answer Cards:** Tapping reveals contextual answer cards:
  - Lionel Messi (8× Ballon d'Or, World Cup Champion)
  - Forever Single status card (`☕ Single & Building`)
  - Live query filtering across all skills and applications.

### 6. Authentic Floating App Icons & Dynamic Grid (Option A)
- **No Outer Card Enclosure:** The 10 app icons float freely directly on the fluid wallpaper, matching real iOS / Android / Nothing OS launchers.
- **Authentic App Squircles:** 54px × 54px with 16px radius, chromatic gradient glass tint, specular rim highlights, and crisp SVG icons:
  1. `About` (User / Blue)
  2. `Work` (Briefcase / Emerald)
  3. `Projects` (FolderGit2 / Violet)
  4. `Education` (GraduationCap / Amber)
  5. `Books` (BookOpen / Red)
  6. `Bani` (Feather / Cyan)
  7. `Roots` (GitBranch / Indigo)
  8. `Gaming` (Gamepad2 / Orange)
  9. `Lab` (FlaskConical / Purple)
  10. `Arcade` (Sparkles / Green)
- **Dynamic Responsive Grid:**
  - Standard & Desktop Preview (≥ 390px): **5 columns × 2 rows**.
  - Narrow Mobile Viewports (≤ 380px): Automatically drops to **4 columns** with dynamic wrapping to prevent label squishing or truncation.

### 7. Horizontal Multi-Space Swipe Track
- 4 distinct functional spaces:
  - `HOME` (Launcher, Widgets & Search)
  - `ROOTS` (Heritage, Genealogy & Family Tree)
  - `CREATE` (Books, Writing & Publications)
  - `PLAY` (Gaming Archive, Interactive Labs & Arcade)
- Header with live space title and spatial dot pagination (`● ○ ○ ○`).

### 8. Desktop Preview Wrapper
- For visitors viewing on desktop/laptop browsers:
  - Renders BANI OS inside a centered, realistic mobile phone canvas (`412px × 870px`).
  - Top helper bar with system status, "Re-Boot" trigger button, and "Phone Frame / Full Width" viewport switcher.

### 9. Strategic Architectural Decision: Swipe-Up Polymath Deck
- **The Concept:** Selected **Option 1 ("The 4 Dimensions of Banishwor")** — a pinned-stage, ambient background-morphing showcase (*Software Engineer · Published Author · Heritage Preserver · Gaming Creator · Researcher*).
- **Roadmap Placement:** Scheduled for **Phase 8 / 9** so it launches with rich, authentic data from fully built applications (book chapters, family tree nodes, gaming media, and production APKs) rather than shallow placeholders.

---

## 🟢 Phase 2: BANI Search & Universal Launcher

**Completed:** September 20, 2026  
**Status:** 100% Complete & Verified

### 1. Unified Search Database (`src/content/searchIndex.ts`)
- **Multi-Domain Indexing:** Centralized database indexing 45+ searchable entities across:
  - **10 Core Applications:** About, Work, Projects, Education, Books, Bani, Roots, Gaming, Lab, Arcade.
  - **5 Functional Mini-Demos & Prototypes:** Manipur Calculator, Manipuri Calendar, Khutsuman, LeikaiFix Civic Prototype, On-Device AI Keyboard.
  - **17 Engineering Skills & Technologies:** Kotlin, Android SDK, Jetpack Compose, Room DB, MVVM, TypeScript, React, Modern CSS, QA Testing, Debugging, Git, HPC, ML Missing Data Imputation, Offline-First Systems, On-Device AI, Prompt Engineering.
  - **Published Books & Literature:** *Pushback: The Manipuri Diaspora in Bangladesh*, *The Echoes of Silence (Between Heartbeats Series)*.
  - **Cultural Heritage Databases:** *Yek Salai (Seven Clans)*, *Athokpam Family Tree*, *Bani Heritage Publication*.
  - **Academic Credentials & Research:** Manipur University MCA (80.30%, 7th State Rank), National Supercomputing Mission Workshop (IIT Kharagpur × MU), MCA Master's Thesis on Clustering Imputation.

### 2. Semantic Tagging & Query Engine (`searchUniversal`)
- **Semantic Synonym Matching:** Every entity includes rich keywords and tags so users find the right tools naturally:
  - Searching `"meitei"` surfaces *Yek Salai*, *Manipuri Calendar*, *Bani*, and *Roots*.
  - Searching `"pari"`, `"loukrak"`, `"gold"`, or `"san"` surfaces *Manipur Calculator*.
  - Searching `"room"` or `"offline"` surfaces *Room DB*, *Manipur Calculator*, and *Khutsuman*.
  - Searching `"diaspora"` or `"bangladesh"` surfaces *Pushback*.
- **Tokenized Multi-Word Matching:** Handles compound queries (e.g. `"kotlin calculator"`, `"meitei calendar"`, `"mca rank"`).

### 3. Touch-First Universal Launcher Tray (`ConnectedSearch.tsx`)
- **Dynamic Categorized Sections:**
  - 📱 **APPS & TOOLS:** With app icon, title, subtitle, and an instant `"Open"` action chip.
  - ⚡ **SKILLS & STACK:** With domain badges, technology description, and mapped production projects.
  - 📖 **BOOKS & PUBLICATIONS:** With synopsis preview and direct `"Read"` action chip.
  - 🌿 **HERITAGE & ROOTS:** With cultural context and `"Explore"` action chip.
  - 🎓 **ACADEMIC & RESEARCH:** With credential details and `"View"` action chip.
- **Decoupled One-Tap App Launching:**
  - Tapping any search result calls `onLaunchApp(appId)` immediately.
  - Seamlessly launches the full app modal today, and will automatically reveal full interactive app views as future phases build them.
- **Google Web Fallback:**
  - External search action clearly labeled: *"Search Google for '[query]' ↗"*.
  - Opens Google externally in a new tab; never pretends an external web search happened internally.
- **Witty Google Recents Retained:**
  - Empty input retains Google-style recents (*Messi*, *GF status*, *Sleep schedule*, *Net worth*, *Builder philosophy*, *Profile*) with instant answer card reveals on tap.
- **Mobile Touch Usability:**
  - One-tap `✕` clear button to reset input instantly.
  - Large touch targets (min 48px) with tactile active press feedback.
  - Friendly empty state when no local results match.

---

## 🟢 Phase 3: Identity Apps (`[ABOUT]`, `[WORK]`, `[EDUCATION]`)
 
**Completed:** September 20, 2026  
**Status:** 100% Complete & Built (0 Errors)

### 1. Touch-First App Sheet & Gesture Engine (`AppWindow.tsx`)
- **Swipe-Down-To-Dismiss Gesture:**
  - Integrated mobile touch gesture engine on the top drag handle pill.
  - Features natural downward elastic resistance tracking `clientY`.
  - Automatically dismisses the active application when dragged past threshold (`dragY > 110px`), or smoothly springs back into position if released early.
- **Header & Navigation Bar:**
  - Specular porcelain header bar with app color badge, capitalized monospace title (`[ABOUT]`, `[WORK]`, `[EDUCATION]`), and subtitle description.
  - Crisp `✕` close button with responsive `.pressable` tactile feedback.
- **Dynamic Content Router:**
  - Routes directly to dedicated app views (`AboutApp`, `WorkApp`, `EducationApp`).
  - Unscheduled apps gracefully display an OS "Ready for dedicated milestone" placeholder card.

### 2. `[ABOUT]` App (`AboutApp.tsx`)
- **Executive Profile Card:**
  - 64px portrait with subtle border and emerald live availability status pill (`● Available for Work`).
  - Monospace system name `BANI // OS`, full name **Banishwor Athokpam**, and dual title (*Software Developer & Educator*).
  - Geographic origin tag: `📍 Thoubal, Manipur, India`.
- **One-Tap Contact & Action Chips:**
  - Six touch chips with real links and distinct colors:
    - 📄 `Download Resume` (Direct PDF download)
    - ✉️ `Email` (`mailto:banishworath@gmail.com`)
    - 💼 `LinkedIn` (`https://www.linkedin.com/in/banishwor/`)
    - 🐙 `GitHub` (`https://github.com/banishwor`)
    - 📸 `Instagram` (`https://www.instagram.com/banishwor_ath/`)
    - 🐦 `Twitter / X` (`https://x.com/banishwor`)
- **Quick Stats Matrix (4 Tactile Tiles):**
  - `MCA State Rank` — **7th Rank** (80.30% Distinction)
  - `Published Books` — **2 Titles** (Pushback & Echoes)
  - `Dev & Teaching` — **3+ Years** (100+ Students Mentored)
  - `Origin & Base` — **Thoubal** (Manipur, India)
- **Narrative Biography Card:**
  - Comprehensive personal story bridging high-reliability software engineering, algorithmic rigor, and human-first cultural purpose.
- **Personal Passions & Verified Legacy Favourites (6 Themed Cards):**
  1. ⚽ **Die-Hard Football & Lionel Messi Fan** (Sports & Passion)
  2. 🪙 **Cryptocurrency Enthusiast** (Decentralized Tech, Bitcoin & Blockchain investor since 2019)
  3. 📖 **Published Author** (*Pushback* & *The Echoes of Silence*, with direct Amazon link)
  4. 🎬 **Entertainment & Superhero Lore Geek** (Marvel & DC universe nerd)
  5. 🧭 **Cultural Explorer & Traveller** (Historical documentation & heritage)
  6. 🎮 **Co-owner of HaloBan Media** (Gaming & Creator Economy, MIL Influencer for MLBB)

### 3. `[WORK]` App (`WorkApp.tsx`)
- **Vertical Connected Milestone Timeline:**
  - Continuous timeline line connecting all career stops with customized color-coded icon nodes.
- **Industry & Pedagogical Roles:**
  - **NTS Institute of Technology (Oct 2023 – Present):**
    - *Role:* Software Developer & Instructor (Full-time, Yairipok).
    - *Highlights:* Teaching foundational & advanced programming (C, C++, Java, Web, Data Structures), building production web & mobile systems, leading QA test routines, and mentoring 100+ students.
    - *Tech tags:* C, C++, Java, JavaScript, React, Kotlin, SQL, QA Testing, Git.
  - **Hi-Tech Computer Education (Apr 2022 – Sep 2023):**
    - *Role:* Instructor & Technical Support (Full-time, Thoubal).
    - *Highlights:* Structured CS curriculum delivery, live code debugging lab sessions, network/OS hardware administration, and vocational exam prep.
    - *Tech tags:* C, C++, Python Fundamentals, DBMS, Operating Systems, Technical Support.
  - **Freelance Software Developer (2021 – Present):**
    - *Role:* Self-Employed / Community Solutions (Thoubal).
    - *Highlights:* Manipur Calculator (indigenous land & gold units), Manipuri Calendar (lunar phases & festivals), Khutsuman (offline daily wage tracker), Athokpam Family Tree lineage.
    - *Tech tags:* Kotlin, Android SDK, Jetpack Compose, Room DB, TypeScript, React, Offline-First.

### 4. `[EDUCATION]` App (`EducationApp.tsx`)
- **Dual-Tab Segmented Switcher:**
  - Seamless pill switcher between `🎓 Degrees & Schooling` and `🔬 Research & HPC`.
- **Academic Distinction Banner:**
  - Highlight card celebrating Manipur University **7th State Rank** with **80.30% First Division with Distinction**.
- **Official Examination Gazette Verification (Lightbox Modal):**
  - Integrated authentic proof from Manipur University Examination Department (`No. MU/EXAM/MCA(6)/2023`, Dated: 2-11-2023).
  - Tapping **"View Official Merit Gazette (MU Proof)"** launches an elegant liquid-glass lightbox displaying the official gazette with the arrow pointing to:
    - **Roll No:** 2036
    - **Name:** BANISHWOR ATHOKPAM
    - **Department:** Computer Science Department, Manipur University
    - **Grand Total:** 2651
    - **Position:** Rank 7 (First Division with Distinction)
  - Features high-resolution zoom, full image external link, and quick dismiss.
- **Comprehensive Degrees & Schooling:**
  - **Master of Computer Applications (MCA):** Manipur University (2023, 80.30%, I Div Distinction).
  - **Bachelor of Computer Applications (BCA):** NIELIT Imphal, Akampat (2020, 68.38%, I Div).
  - **Higher Secondary Examination (HSE / Class 12):** The Fancier Abhiram Hr. Sec. School (2016, 72.80%, I Div, COHSEM; core subjects: Physics, Chemistry, and Mathematics).
  - **All India Secondary School Examination (AISSE / Class 10):** Ruda Academy School, Thoubal (2014, 89.93%, I Div Distinction, CBSE).
- **Specialized Research & Supercomputing Modules:**
  - **MCA Research Dissertation (2023):**
    - *Title:* "Empirical study on clustering-based missing data imputation techniques".
    - *Institution:* Department of Computer Science, Manipur University.
    - *Focus:* Evaluated K-Means, Fuzzy C-Means, and Hierarchical clustering for missing value reconstruction in incomplete datasets; benchmarked MSE and computational latency.
  - **MCA Research Project (2021–2022):**
    - *Title:* "A Study on Machine Learning-Based Imputations in Tackling Missing Data".
    - *Institution:* Department of Computer Science, Manipur University.
    - *Focus:* Exploratory study analyzing predictive vs clustering machine learning models on missing data and high-dimensional matrix completion.
  - **National Supercomputing Mission (NSM) Technical Program (July 2023):**
    - *Title:* "Workshop on High Performance Computing".
    - *Institution:* Manipur University & IIT Kharagpur.
    - *Focus:* Parallel supercomputing architectures, OpenMP & MPI programming, GPU memory hierarchy, SLURM cluster scheduling.

---

## 🟢 Phase 4: `[PROJECTS]` Catalog & Engineering Archive

**Completed:** September 20, 2026  
**Status:** 100% Complete & Built (0 Errors)

### 1. Data Contracts & Architecture Layer (`src/content/projects.ts`)
- **Centralized Data Model (`ProjectItem`):**
  - Defines strict typing for title, native title (Meitei Mayek), subtitle, category, status (`Active`, `Beta`, `Prototype`, `Archived`), icon path, tech stack, capabilities, architecture highlights, lessons learned, and store action links.
- **7 Production & Exploratory Initiatives Indexed:**
  - 4 Active / Beta production community applications.
  - 3 Candid engineering archive post-mortems.

### 2. High-Resolution Production Icons Integrated (`public/projects/`)
- Discovered and copied genuine production assets from local project roots:
  - **Manipur Calculator:** `public/projects/manipur-calculator.png` (Official 512×512 Google Play Store graphic).
  - **Manipuri Calendar:** `public/projects/manipuri-calendar.png` (Android xxxhdpi launcher icon).
  - **Yek Salai:** `public/projects/yek-salai.png` (Android xxxhdpi launcher icon).
  - **Khutsuman:** `public/projects/khutsuman.webp` (Official xxxhdpi squircle icon).

### 3. Interactive Touch Catalog Component (`ProjectsApp.tsx`)
- **Porcelain Segmented Filter Track:**
  - One-tap category chips with live count pills: `All (7)`, `Native Android (3)`, `Community Tools (1)`, and `Engineering Archives (3)`.
- **Card Anatomy & Aesthetics:**
  - 46px rounded squircle icon container with subtle specular rim and drop shadow.
  - Title and native Meitei Mayek badge (e.g. `ꯈꯨꯠꯁꯨꯃꯟ`).
  - Tactile status badge (`● ACTIVE`, `● BETA / SOON`, `⏸ PAUSED`, `📦 ARCHIVED`).
  - Tech stack tag row (Kotlin, Compose, Room DB, BigDecimal, React Native, PWA, etc.).
  - Concise executive summary and target audience tag.
  - Expandable deep specs accordion (`Specs` / `Less` toggle):
    - Key capabilities checklist with custom colored icons.
    - Architectural decisions list (zero floating-point errors, local encrypted DB, unidirectional state flow).

### 4. Verified Store Actions & Beta Requests
- **Manipuri Calendar:**
  - Direct Google Play link (`https://play.google.com/store/apps/details?id=com.manipurcalendar&hl=en`).
  - Direct PWA installable web app link (`https://banishwor.github.io/manipuri-calendar-pwa/?install=auto`).
- **Manipur Calculator:**
  - Direct Google Play link (`https://play.google.com/store/apps/details?id=com.manipurcalculator.app&hl=en`).
- **Yek Salai:**
  - Direct Google Play link (`https://play.google.com/store/apps/details?id=com.yeksalaiapp&hl=en`).
- **Khutsuman (Beta Access via WhatsApp):**
  - High-visibility emerald button linking directly to WhatsApp (`wa.me/+919612111619`) with pre-filled message:
    `"Hi Banishwor, I would like to request beta access to Khutsuman!"`.
- **Upcoming In-OS Mini Demo Cues:**
  - Dashed porcelain tag cueing the upcoming live mini-demos in Phase 7.

### 5. Engineering Archives (Transparent Post-Mortems)
- Each archived project features an amber-highlighted callout box detailing real engineering tradeoffs:
  - **LeikaiFix:** *Lessons Learned:* Paused due to sensitive regulatory and administrative realities; civic software requires institutional alignment (government API access & ward response pipelines) rather than pure code.
  - **On-Device AI Keyboard:** *Lessons Learned:* On-device neural SLM inference generated 120ms–250ms token latency and severe RAM pressure on budget Android devices; proved that soft keyboards demand non-negotiable 16ms touch loop over heavy generative features.
  - **Viral Prompts:** *Lessons Learned:* Manual editorial curation without automated web scraping pipelines proved unsustainable as diffusion models evolved every few weeks; proved that content catalogs require autonomous ingestion loops.

### 6. Universal Search & OS Integration
- Connected `ProjectsApp` directly into `AppWindow.tsx` for one-tap launcher access.
- Fully synchronized all 7 project tags and titles in `src/content/searchIndex.ts` (including `proj-viral-prompts`).

---

## 🟢 Phase 5: `[BOOKS]` Editorial Shelf & Native E-Reader

**Completed:** September 20, 2026  
**Status:** 100% Complete & Built (0 Errors)

### 1. Data Contracts & Verbatim Extraction (`src/content/books.ts`)
- **Centralized Data Models (`BookItem`, `BookExcerptSection`):**
  - Defines strict typing for title, subtitle, series, author, ASIN, Amazon URL, cover path, genre, format, publication year, read time estimate, synopsis, core themes, and multi-section excerpts.
- **100% Verbatim Extracted Text (Zero Raw Screenshots):**
  - ***The Echoes of Silence: Book I — The Silence Between Heartbeats:***
    - Author: Banishwor Athokpam · Series: Between Heartbeats · ASIN: `B0GT48RW96`.
    - Chapter 1: *The Boy Who Solved Words Like Equations* (Bren Atherton, Brayden, silence as refuge, sentences as equations, Valerian exam struggles).
    - Chapter 1 (Part II): *The Notice Board & Gemma Lancaster* (Bright Meridian Academy, Rank 11 out of 130, Soren Vale tutoring in Arath Village, meeting Gemma Lancaster).
  - ***Pushback: How Breakups Can Lead to Personal Growth and Development:***
    - Author: Banishwor Athokpam · ASIN: `B0BTB1JVVB`.
    - Introduction: *The Catalyst for Personal Growth* (Pain of endings, self-reflection, introspection, and using breakups as an indispensable "pushback" to rebuild self-worth).
    - Chapter 1: *Understanding the Reasons Behind a Breakup* (The 8 core root causes: Communication, Trust, Infidelity, Priorities, Drifting Apart, Intimacy, Finances, Abuse).

### 2. 3D Perspective Bookshelf Presentation & Immersive Architecture
- **Full-Bleed Immersive Native Feel (`AppWindow.tsx`):**
  - Suppressed generic OS window headers (`BOOKS / Published Author`) and default container padding specifically for `appId === 'books'` via an `isImmersiveApp` flag.
  - Gives `[BOOKS]` an authentic, edge-to-edge native Apple Books feel with custom floating drag indicators and integrated header controls.
- **Realistic 3D Book Cover Bindings:**
  - High-resolution cover artwork (`public/echoes-cover.jpg` & `public/pushback-cover.jpg`) with subtle 3D perspective tilt (`rotateY(-4deg)`), spine shadow overlays, and ambient drop shadows.
  - Monospace series indicators, format tags (`Kindle Edition`), ASIN badges, and genre categorization.
  - Synopsis description and literary theme hashtags (`#Mathematics of Grammar`, `#Quiet Resilience`, `#The Loudest Silence`, `#Catalyst for Growth`).
  - Dual action buttons: `📖 Open Book` and `🛒 Amazon`.

### 3. Two-Step Physical Book Opening Experience & Native E-Reader
- **Two-Step Tactile Hardcover Interaction (Zero-Gap Physical Feel):**
  - **Step 1 (Full-Screen Physical Hardcover Mode):** Tapping any book card lifts it into an edge-to-edge physical hardcover inspection (`viewMode === 'cover'`) without any distracting text, titles, buttons, or links. The front cover artwork spans the full viewport (`width: 100%`, `maxHeight: 620px`) with realistic left-spine curvature lighting, ambient specular reflection, stacked paper page edges, and floating glass controls (`<` and `X`). This eliminates all visual size gaps.
  - **Step 2 (3D Cover Flip Animation into Reader):** Tapping anywhere on the full-screen hardcover triggers a physical 3D cover swing animation (`rotateY(-92deg)`) pivoting on the left spine edge, seamlessly unfurling into the full-bleed Kindle reading canvas with Chapter 1.
  - Quick return navigation: Floating `<` breadcrumb returns smoothly back to the shelf at any time.
- **Distraction-Free Reading Canvas:**
  - Comfortable book line-height (`1.8`) with responsive typography scaling.
  - Authentic chapter heading hierarchy and paragraph indentation.
  - Translucent golden/amber highlight quotes styled identically to Kindle's "Popular Highlights":
    - *"To me, sentences were equations: subjects, verbs, objects, everything with a position, everything with logic."*
    - *"And that evening, I was about to meet the girl who would someday become the loudest silence in my heart."*
    - *"People can use the experience of a breakup as a 'pushback' in their lives, to help them grow and develop into a better version of themselves."*
- **Kindle "Aa" Appearance Drawer:**
  - **3 Paper Themes:**
    1. 📜 *Porcelain Paper:* Clean off-white (`#FCFBF9`) with charcoal ink typography.
    2. 🕯️ *Warm Sepia:* Vintage paperback warmth (`#F5EEDB`) with espresso typography.
    3. 🌙 *Midnight OLED:* Deep pitch black (`#0A0A0C`) with pearl typography.
  - **Typeface Switcher:** Instant toggle between *Literary Serif* (Georgia) and *Clean Sans* (Plus Jakarta Sans).
  - **Font Size Steppers:** Interactive `A-` and `A+` controls scaling between 13px and 20px.
- **Kindle Progress & Location Scrubber:**
  - Interactive bottom progress bar displaying authentic location tags (e.g. `Location 37 of 243 · 4%`).
  - Tactile `< Prev` and `Next >` page navigation buttons.
  - End-of-sample callout card with direct **"Buy on Amazon Kindle"** CTA.

### 4. Direct Amazon Store Integration
- Verified Amazon India store links:
  - *The Echoes of Silence:* `https://www.amazon.in/Echoes-Silence-Book-Between-Heartbeats-ebook/dp/B0GT48RW96`
  - *Pushback:* `https://www.amazon.in/Pushback-Breakups-Personal-Growth-Development-ebook/dp/B0BTB1JVVB`

---

## 🟢 Phase 6: `[BANI]` Native Blog Reader (Voices of Meitei Heritage)

**Completed:** September 20, 2026  
**Status:** 100% Complete, Verified & Built (0 Errors)

### 1. Ingested 14 Live Blogger Articles & Flagship Curation (`src/content/blog.ts`)
- Extracted directly from Banishwor's live publication at `https://baniat.blogspot.com/`.
- Normalized into typed `BaniPost` interfaces with `id`, `title`, `slug`, `excerpt`, `content`, `coverImage`, `publishedAt`, `readTime`, `category`, `tags`, and `sourceUrl`.
- **Architectural Curation (2 Flagship Articles + 12 Teasers):**
  - **2 Flagship In-OS E-Readers:** *The Yek-Salai System: The Bedrock of Meitei Civilization* and *The Dark Era of Kangleipak: How Pamheiba and Santidas Gosai Attempted to Erase an Ancient Civilization* are fully embedded in rich offline HTML with kinship tables, drop-caps, and 7 Salais flag graphics.
  - **12 Curated Teaser Articles:** Complete with titles, dates, categories, read times, and synopsis excerpts. Tapping them triggers an elegant in-OS **"Read on Bani"** prompt modal linking directly to `baniat.blogspot.com`.
  - **Performance & Bundle Slashed:** Cut blog contract size by ~70% (245 kB down to 79 kB) and total bundle down to 415 kB with 0 warnings.
- Categorized across 6 distinct cultural domains:
  1. **Kinship & Clans (3):** *The Yek-Salai System*, *Kinship Beyond the Seven Clans*, *Meitei Yek Salai System and Genetic Science*.
  2. **History & Retrospective (3):** *The Dark Era of Kangleipak (Pamheiba & Santidas Gosai)*, *Beyond the Ningthi (Meitei & Shan Alliance)*, *Unveiling the Ancient Roots*.
  3. **Culture & Festivals (3):** *Sajibu Nongma Panba*, *The True Origins of Yaoshang*, *Ningol Chakouba*.
  4. **Identity & Surnames (2):** *Beyond the Lion's Shadow (Imposition of 'Singh')*, *The Lions of Manipur*.
  5. **Pioneers (1):** *A tribute to Hijam Irabot: The revolutionary who transformed modern Manipur*.
  6. **Digital Heritage (2):** *Yek Salai App: Your Digital Guide to Meitei Heritage*, *YEK SALAI : Interactive Meitei Clan Finder*.

### 2. Editorial Magazine Home View & Teaser Prompt Modal (`BaniApp.tsx`)
- **Branding Header:** `BANI / Voices of Meitei Heritage` with live publication count chip (`14 STORIES`).
- **Hero Featured Story:** Large full-width visual hero card highlighting *"The Yek-Salai System: The Bedrock of Meitei Civilization"* with lead excerpt, reading time badge, and `Read Story →` button.
- **Horizontal Category Filter Track:** One-tap filtering across all categories with article counts.
- **Magazine Story Feed with Dynamic Badges:**
  - `📖 In-OS Reader` badge for the 2 flagship articles.
  - `↗ Blog Article` badge for the 12 external archive articles.
- **Tactile In-OS "Read on Bani" Teaser Modal:**
  - Frosted glass backdrop with spring pop transition.
  - Article cover artwork, date, read time, full title, and excerpt.
  - Primary button: `Read Full Article on Blog ↗` (opens `baniat.blogspot.com` in new tab).
  - Secondary button: `Back to Stories`.
- **Publication Footer:** Attribution to Banishwor Athokpam with direct link to `baniat.blogspot.com`.

### 3. Dedicated Editorial Reader Canvas
- **Immersive Full-Bleed Mode:** Configured in `AppWindow.tsx` (`isImmersiveApp`), eliminating OS chrome in favor of a native publication layout.
- **Top Sticky Editorial Header:** `< Stories` return button, centered category tag, bookmark toggle (persisted in `localStorage`), one-tap share/copy link button with feedback toast, and dismiss handle.
- **Live Scroll Reading Progress:** Top gradient bar dynamically tracking scroll depth from 0% to 100%.
- **Rich Editorial Typography:**
  - Classic Georgia drop-cap on opening paragraph.
  - Styled quotes with cyan/indigo accent borders.
  - Full CSS implementation of the 7-stripe Salai Taret flag (`.salai-flag`, `.flag-stripe`, `.bg-mangang`, `.bg-luwang`, `.bg-khuman`, `.bg-angom`, `.bg-moirang`, `.bg-khanganba`, `.bg-sarang`).
  - Structured kinship tables and historical references.
- **Attribution & Related Stories:** Callout card to *"Open on baniat.blogspot.com"*, Next Story / Previous Story navigation, and related articles in the same category.

### 4. BANI Universal Search Integration
- All 14 articles indexed in `src/content/searchIndex.ts`.
- Searching for *"Puya Meithaba"*, *"Pamheiba"*, *"Yek Salai"*, *"Sajibu Nongma Panba"*, or *"Hijam Irabot"* immediately surfaces the specific article card with a one-tap `Read Story` action.

---

## 🟢 Phase 7A: `[PROJECTS]` OS App Drawer & Frosted Details Pop-up

**Completed:** September 20, 2026  
**Status:** 100% Complete & Visually Verified

### 1. Authentic Mobile OS App Drawer (`ProjectsApp.tsx`)
- **Zero Wall-of-Text on Entry:** Transformed `[PROJECTS]` from a long text-heavy scroll list into an authentic mobile OS App Drawer over the ambient wallpaper.
- **Top Segmented Filter Bar:** Quick switcher for `All Apps (7)`, `Production (4)`, and `Archives (3)` with instant animated count pills.
- **Production Applications Suite (4):**
  - High-resolution, tactile 58px floating app squircles with specular borders, soft drop shadows, and verified status dots:
    1. **Manipur Calculator** (Play Store production icon)
    2. **Manipuri Calendar** (Android xxxhdpi production icon)
    3. **Khutsuman** (High-res royal blue clipboard ledger icon)
    4. **Yek Salai** (7 Salais leaves emblem icon)
- **Engineering Archives & Post-Mortems Section (3):**
  - Minimal tactile squircles for R&D initiatives:
    - **LeikaiFix** (Civic infrastructure crowdsourcing, `⏸ PAUSED`)
    - **On-Device AI Keyboard** (Local quantized SLM inference, `📦 R&D`)
    - **Viral Prompts** (AI prompt taxonomy, `📦 R&D`)

### 2. Executive Frosted Glass Details Pop-up Modal
- **Spring-Popped Frosted Sheet:** Tapping any app squircle triggers an executive modal sheet (`backdrop-filter: blur(24px) saturate(180%)`).
- **Rich Metadata & Status:** 64px rounded app squircle, verified status badge (`● PRODUCTION ACTIVE`, `● COMING SOON / BETA`, `● ARCHIVED`), native Meitei Mayek script (`ꯈꯨꯠꯁꯨꯃꯟ`), and concise summary.
- **Technical Specifications:** Production tech stack badges (`Kotlin`, `Jetpack Compose`, `Room DB`, `BigDecimal`), target user profiles, and capabilities checklist.
- **Engineering Archive Post-Mortems:** Transparent "Lessons Learned" callout cards explaining real-world friction and architectural takeaways.
- **Verified Actions:**
  - Direct links to **Google Play Store** and installable **PWA**.
  - Direct **Request Beta Access (WhatsApp)** button for Khutsuman (`wa.me/+919612111619`).
- **Interactive "⚡ Try In-OS Demo" CTA:**
  - Interactive button that triggers an in-modal notice banner: *"⚡ Mini-App Engine for [App] will open right here in Phase 7B!"*.
  - Ensures zero dead clicks and primes user anticipation for the upcoming functional engines.

---

## 🟢 Phase 7B: In-OS Functional Mini-Apps (100% Android Match)

**Completed:** September 20, 2026  
**Status:** 100% Live & Verified

### 1. Manipur Calculator Mini-App
- **100% UI Match:** Deep royal blue `#1565C0` header with triangle set-square icon, `LOCAL SPECIAL` badge, zero duplicate status bar.
- **Segmented Sub-Tabs:** White rounded card `⇄ Unit Converter` with red icon + `🖩 Rate Calculator` gate.
- **Material Outlined Inputs:** "Land Value" outlined textfield + "From" notched dropdown + centered lavender pill `[ ⇅ Swap ]` + full-width "Convert To" notched dropdown.
- **Real-Time Bidirectional Arithmetic:** Exact conversion formulas from Kotlin `CalculationUtils.kt` (1 Point = 435.6191 sq ft = 40.470339 m², Pari = 250, Lourak = 125, Sangam = 62.5, Loukhai = 31.25, Loushal = 15.625, Tong = 7.8125) with 2-column Bento breakdown.
- **6-Tab Bottom Navigation Bar:** `🏠 Home`, `📐 Land`, `💲 Gold`, `🔧 Tools`, `👤 Profile`, `🖩 Calc` + 3-button Android system controls (`◀`, `●`, `■`).

### 2. Manipuri Calendar Mini-App
- **Flush Crimson Header:** `#800E13` crimson header sits flush at top displaying `Manipuri Calendar`.
- **Evergreen Overview & Quick-Launch `Today` Page:** Traditional greeting `Khurumjari / ꯈꯨꯔꯨꯝꯖꯔꯤ`, time-of-day greeting, verified badges, and quick-launch button to 2027 calendar grid.
- **Interactive Month Grid View (January & February 2027):** Month selector with Meitei Mayek subtitle (`ꯄꯣꯏꯅꯨ / ꯋꯥꯛꯆꯤꯡ`), 7 Meitei weekday headers, squircle day cards with Meitei Mayek numerals, holiday badges, lunar markers (`EKADASI`, `THASI`, `PURNIMA`), and Day Detail bottom drawer.
- **4-Tab Navigation & Android Controls:** `Today` (☾), `Calendar` (📅), `Almanac` (⚡), `Info` (🕮) + 3-button Android navigation.

### 3. Yek Salai Mini-App
- **Flush Emerald Header:** `#065F46` to `#047857` header with app icon and `PRODUCTION` badge.
- **`Home` Tab:** Official squircle icon, 7 Salais of Kangleipak grid with authentic colors and Meitei Mayek, traditional kinship prohibitions cards (`Yek Tinnaba`, `Sairuk Tinnaba`, `Pee/Pen Tinnaba`, `Leinung Pen Tinnaba`).
- **Interactive Marriage Compatibility Checker:** Boy's & Girl's surname inputs with swap button, quick-select chips for 7 scoped surnames (`Athokpam`, `Leimapokpam`, `Langpoklakpam`, `Laishram`, `Ningombam`, `Mutum`, `Thongam`), live validation engine, and branch disambiguation.
- **5-Tab Navigation & Android Controls:** `Yek Salai`, `Marriage Check`, `Find Clan`, `Facts`, `Profile` + 3-button Android navigation.

### 4. Khutsuman Mini-App
- **Flush Royal Blue Header:** `#005AC1` to `#1E40AF` header with app icon and `BETA / OFFLINE` badge.
- **`Home` Tab:** High-res squircle icon, financial overview bento tiles (*Active Sites: 2*, *Wages Due: ₹23,400*, *Laborers: 4 Active*), WhatsApp beta request link.
- **`Attendance` Tab:** Job site indicator, live attendance payout banner with real-time INR calculation, worker roster cards with tap-to-toggle attendance chips (`Full 1.0`, `Half 0.5`, `OT 1.5x`, `Absent 0.0`).
- **`Hisab` Tab:** Statement balance sheet + 1-tap formatted WhatsApp receipt generator with copy and share feedback.
- **5-Tab Navigation & Android Controls:** `Home`, `Attendance`, `Hisab`, `Works`, `Info` + 3-button Android navigation.

---

## 🟢 Phase 7C: `[ROOTS]` Athokpam Family Tree & Heritage App

**Completed:** September 20, 2026  
**Status:** 100% Live & Verified

- **Scroll-Driven Living Ancestral Lineage Trunk (`RootsApp.tsx`):** Continuous vertical lineage spine growing chronologically downwards through 6 generations with live progress indicator (`GEN 1 OF 6` ➔ `GEN 6 OF 6`).
- **`⚡ Focus on Me` Floating Action Pill:** Smoothly accelerates down the trunk to center on Banishwor at 60fps.
- **Theatrical Culmination at Generation 6:** Pulsing emerald & indigo halo, `👑 YOU ARE HERE` badge, authentic photo avatar, credentials, and sibling wings (Banikanta & Silky, Bishwal).
- **100% Offline 42-Member Data Model (`athokpamTreeData.ts`):** Ingested from live Google Apps Script genealogy database with zero latency.
- **Interactive Relative Detail Drawer:** Kinship to Banishwor, photo, occupation, education, and historical bio.
- **Collateral Branches Accordion:** Collateral uncles/aunts and cousins packaged in clean expandable chips.

---

## 🟢 Phase 8A: Signature Swipe-Up Gesture — "The 5 Dimensions of Banishwor"

**Completed:** September 20, 2026  
**Status:** 100% Live & Verified

- **Ambient Background-Morphing Polymath Deck (`DimensionsDeck.tsx`):**
  1. *The Software Engineer* (Android Emerald glow + direct links to all 4 production apps)
  2. *The Published Author* (Warm Crimson glow + *Pushback* & *The Echoes of Silence* + Amazon links)
  3. *The Cultural Preserver* (Deep Indigo glow + Athokpam Family Tree & Yek Salai links)
  4. *The Content & Gaming Creator* (Neon Esports Orange glow + Bani Entertainment & HaloBan Media)
  5. *The CS Researcher & Scholar* (Cyber Violet glow + Manipur University MCA 7th State Rank & NSM HPC)
- **Top Segmented Switcher:** `✦ Dimensions` ↔ `⚡ Tech Stack` (interactive 17+ skill matrix).

---

## 🟢 Phase 8B: `[GAMING]` App (Bani Entertainment & HaloBan Media Hub)

**Completed:** September 20, 2026  
**Status:** 100% Live & Verified

### 1. Dual-Hub Segmented Header
- Instant switching between **`🎮 Bani Entertainment (15K)`** and **`💡 HaloBan Media (Facts)`**.
- Top scroll position resets smoothly on tab switch.

### 2. Bani Entertainment (15,000+ Followers Gaming Creator)
- **Authentic Branding:** Golden leaping silhouette logo (`public/gaming/bani-entertainment-logo.png`).
- **4-Metric Bento Grid:** *15,000+ Followers*, *Official MIL Creator*, *Mobile Legends*, *Skin Giveaways*.
- **Verified Link Button:** Direct link to official Facebook page `https://www.facebook.com/banientertainment`.
- **Key Tactics Breakdown:** *Burst Fighter Mastery* (Badang wall stuns), *Macro Map Awareness*, *Community Shotcalling*.
- **Authentic Giveaway Proof Lightbox:**
  - High-res screenshot of the September 4, 2021 Badang Susanoo special skin giveaway gifted to Dhaneshwor Waikhom with Banishwor's personal message: *"Enjoy your Day... Keep Supporting... 👍"*.
  - Tap-to-zoom interactive modal lightbox with caption.
- **Milestones Timeline:** Genesis community launch, official MIL verification by Moonton, 15K followers milestone, skin & diamond giveaways.

### 3. HaloBan Media Hub (Short-Form Facts & Lessons)
- **Authentic Branding:** Circular golden brain & tree emblem (`public/gaming/haloban-media-logo.png`).
- **Documentary Mission Narrative & 4-Metric Grid:** Short-form documentaries, Facts & Lessons pillars, research-driven production style, curiosity & mindset audience goal.
- **4 Core Documentary Pillars:**
  1. *Unsolved Curiosities & History*
  2. *Psychology & Cognitive Bias*
  3. *Science & Natural Wonders*
  4. *Resilience & Life Lessons*
- **3-Step Production Pipeline:** 01 Fact Verification ➔ 02 Hook & Narrative ➔ 03 Cinematic Editing.
- **Strict Compliance:** Zero external links for HaloBan Media as requested by user.

### 4. HaloBan 9:16 Shorts Theater (TikTok/Reels Style Player)
- **3 Authentic Published Episodes:**
  - *Episode 01:* Christopher Columbus: The Myth vs. The Unfiltered Truth (88 Seconds, `#ColumbusMyth #SchoolLies`).
  - *Episode 02:* Taj Mahal: Beyond the Love Story — The Dark Secrets (Mughal Empire, 14 children, `#TajMahal #HiddenHistory`).
  - *Episode 03:* The Two Churchills: Savior of the West or Tyrant of the Empire? (1943 Bengal Famine, `#BengalFamine1943 #TwoChurchills`).
- **Pure Swipe-Up Gesture Navigation:** Zero next/prev buttons anywhere on screen. Swipe up advances to next video, swipe down returns to previous video, with rubber-band resistance.
- **Autoplay & Audio Controls:** Starts muted with eye-catching top `Tap for Sound 🔊` badge, and 1-tap unmute toggle.
- **Tap-to-Play/Pause:** Single tap video toggles playback with animated splash feedback.
- **Reel Overlays:** Top HaloBan branding, right 3-dot position indicator pill (`● ○ ○`), bottom title, authentic narrative hook, hashtags, and real-time scrub bar.
- **Zero External Links:** 100% compliant with local HTML5 streaming from `public/gaming/videos/`.

### 5. Android System Controls & Universal Search Integration
- Authentic bottom 3-button navigation bar (`◀`, `●`, `■`) + centered Android gesture pill.
- Indexed in `searchIndex.ts` for instant discovery via the BANI search bar (indexed for Columbus, Taj Mahal, Churchill, Bengal Famine, Shorts, Reels).

---

## ⚪ Upcoming Milestones

### Phase 8: Creator Archive & Lab
- [ ] **Milestone 8C: `[LAB]` App:** Lightweight interactive canvas experiment (touch gravity particles or wave physics).
- [ ] **Milestone 8D: `[PLAY]` / Arcade App:** Touch-native mini runner game with high score storage.

### Phase 9: Settings, Developer Mode & System Polish
- [ ] **`[SETTINGS]` App:** Motion toggle, theme tints, audio FX, developer mode switch.
- [ ] **Deep Linking & SEO:** URL hash routing, Open Graph tags.
- [ ] **Performance Audit:** 60fps mobile verification and layout stability.

