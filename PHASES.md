# BANI OS — Phased Implementation Roadmap

> **Core Philosophy:** "A portfolio disguised as an operating system."
> Built mobile-first with an authentic, original design language (Porcelain Light Theme, tactile micro-borders, fluid gestures). Not a clone of iOS or Android, and never a fake browser shell.

This document tracks each phase of BANI OS. Each phase is kept granular, isolated, and verified before moving to the next.

---

## 🗺️ Master Phase Overview

| Phase | Milestone Name | Key Focus | Status |
| :--- | :--- | :--- | :--- |
| **Phase 1** | **OS Shell & Core Launcher** | Vite + React + TS setup, Porcelain light theme, 1.5s micro-boot, 4×2 Intro Widget, 4-space horizontal swipe, swipe-up Skills layer, desktop preview wrapper | 🟢 Completed |
| **Phase 2** | **BANI Search & Launcher** | System search modal, local index search (projects, skills, education, books), external web fallback | 🟢 Completed |
| **Phase 3** | **Identity Apps Suite** | App sheet transition engine, `[ABOUT]`, `[WORK]`, `[EDUCATION]` with verified credentials (MCA 7th rank, HPC workshop, instructor roles) | 🟢 Completed |
| **Phase 4** | **`[PROJECTS]` Catalog** | Filterable project showcase, deep cards for Engineering Archives (*LeikaiFix*, *On-Device AI Keyboard*, *Viral Prompts*) with lessons learned | 🟢 Completed |
| **Phase 5** | **`[BOOKS]` Editorial Shelf** | 3D visual book presentation (*The Echoes of Silence*, *Pushback*), native Kindle e-reader, themes, sample excerpts, Amazon links | 🟢 Completed |
| **Phase 6** | **`[BANI]` Native Blog Reader** | Meitei heritage & culture publication reader, category filters, progress bar, native reader (no iframes) | 🟢 Completed |
| **Phase 7A** | **`[PROJECTS]` App Drawer & Frosted Details** | OS App Drawer with floating icons and executive frosted glass details pop-up sheet for the 4 software projects | 🟢 Completed |
| **Phase 7B** | **In-OS Functional Mini-Apps** | Stripped-down 1–2 working core feature engines: Manipur Calculator (land/gold math - 🟢 Live), Yek Salai, Calendar, Khutsuman | 🟡 In Progress |
| **Phase 7C** | **`[ROOTS]` Athokpam Family Tree** | Dedicated Roots app: interactive genealogical pedigree graph, generational nodes, Khuman Salai heritage | ⚪ Planned |
| **Phase 8** | **Creator Archive & Lab** | HaloBan Media & MLBB gaming creator archive, lightweight touch canvas experiment, touch arcade mini-game | ⚪ Planned |
| **Phase 9** | **Settings, Dev Mode & Polish** | System preferences (motion, theme tints), Developer Mode toggle, deep linking, SEO metadata, performance audit | ⚪ Planned |

---

## 📱 Detailed Phase Breakdown

### Phase 1: OS Shell & Core Launcher 🟢 Completed
- [x] **Architecture:** Setup clean Vite + React 18 + TypeScript in `./` without bloat.
- [x] **Data Core:** Establish `src/content/` data contracts (`profile.ts`, `skills.ts`, `apps.ts`).
- [x] **Executive Porcelain Light Theme:**
  - Ambient Fluid Wallpaper: Radiant gradient mesh with indigo, amber, rose, and cyan plumes.
  - Tactile Liquid Glass: Deep frosted blur (`backdrop-filter: blur(24px) saturate(180%)`), 1px specular borders.
  - High-contrast typography: Space Grotesk + Plus Jakarta Sans.
- [x] **Micro-Boot Sequence (1.2–1.5s):**
  - Minimal `BANI // OS` monogram with pulsing loader ring.
  - Cached in `sessionStorage` with instant tap-to-skip.
- [x] **Standalone Dynamic Companion Widgets:**
  - **Clock & Glance Widget (~118px):** Live ticking clock (`HH:mm :ss`), pulsing colon `:`, `24H/12H` tap switcher, live weather chip (`⛅ 24°`), and `● LIVE` status.
  - **Profile & Persona Widget (~320px):** Enlarged 48px portrait, full name **Banishwor Athokpam**, `✨ 80.3%` MCA distinction tag, dynamic cycler for primary developer roles, and location (`📍 Manipur, India`).
  - **Option B Avatar Easter Egg:** Tapping specifically on the 48px avatar pops up a humorous roast (*"🔍 Enhance... Error 404! Widget is too small for this face 😉 Check Instagram for the 4K version!"*) with direct button to `@banishwor_ath` on Instagram.
- [x] **Connected Morphing Search Bar:**
  - Attached liquid-glass dropdown tray with Google-style recent searches (`who is banishwor athokpam`, `banishwor fav player`, `banishwor gf`, etc.).
  - Zero spoilers in search list; reveals interactive answer cards (e.g. Messi, Forever Single emoji) upon tapping.
- [x] **Floating App Icons & Dynamic Grid (Option A):**
  - Outer white container removed so app squircles float freely directly on wallpaper.
  - Dynamic responsive layout: 5 columns on desktop/tablets, automatically wraps to 4 columns on narrow mobile screens (≤ 380px) to prevent cramping.
- [x] **Horizontal Spaces:** 4 swipeable spaces (`HOME`, `ROOTS`, `CREATE`, `PLAY`) with spatial dot pagination.
- [x] **Desktop Canvas Wrapper:** Centered mobile phone canvas preview with re-boot and full-width toggle.
- [x] **Signature Swipe-Up Experience Decision:**
  - **Architecture Decision:** Swiping up will feature **Option 1 ("The 4 Dimensions of Banishwor")** — a pinned-stage ambient background-morphing polymath showcase.
  - **Scheduled for Phase 8 / 9:** Intentionally scheduled after Apps are built so the cards can dynamically pull and deep-link to real book chapters, family tree nodes, gaming media, and production APKs rather than shallow placeholders.

---

### Phase 2: BANI Search & Universal Launcher 🟢 Completed
- [x] **Connected Morphing Search Tray:** Tapping search bar seamlessly expands into liquid-glass launcher tray with backdrop blur.
- [x] **Unified Search Index (`src/content/searchIndex.ts`):** Comprehensive searchable database indexing:
  - **Apps & Projects:** Core OS apps and functional prototypes (*Manipur Calculator, Manipuri Calendar, Khutsuman, LeikaiFix, AI Keyboard*).
  - **Skills & Stack:** 17 technologies (*Kotlin, Android SDK, Compose, Room DB, MVVM, TypeScript, React, Testing, HPC, ML Imputation*).
  - **Books & Publications:** Published titles (*Pushback: Manipuri Diaspora in Bangladesh, The Echoes of Silence*).
  - **Heritage & Culture:** Cultural databases (*Yek Salai (7 Clans), Athokpam Family Tree, Bani Editorial*).
  - **Academic & Research:** Credentials (*Manipur University MCA 80.3% 7th Rank, IIT Kharagpur HPC, Missing Data Thesis*).
- [x] **Semantic Tag & Multi-Word Engine (`searchUniversal`):**
  - Searches across titles, descriptions, and semantic keywords (e.g. `"Meitei"` surfaces *Yek Salai, Calendar, Bani, Roots*; `"Room"` surfaces *Room DB, Manipur Calculator, Khutsuman*; `"Pari"` or `"Gold"` surfaces *Manipur Calculator*).
- [x] **Touch-First Categorized Results:**
  - Distinct sections with icons and badges: **APPS & TOOLS**, **SKILLS & STACK**, **BOOKS & PUBLICATIONS**, **HERITAGE & ROOTS**, **ACADEMIC & RESEARCH**.
  - One-tap app launch: Tapping any app or book result immediately launches the target app window via decoupled `onLaunchApp`.
- [x] **External Google Web Fallback:**
  - Clearly labeled external button: *"Search Google for '[query]' ↗"*, opening directly in an external tab. Never pretends external search is internal.
- [x] **Empty State & Clear Button:**
  - Retains witty Google recents (*Messi, GF status, Sleep schedule, Net worth, Builder philosophy*) when query is empty.
  - One-tap `✕` clear button to reset input instantly.
  - Friendly empty state with prominent Google fallback button when query has no local matches.

---

### Phase 3: Identity Apps (`[ABOUT]`, `[WORK]`, `[EDUCATION]`) 🟢 Completed
- [x] **App Sheet & Touch Gesture Engine (`AppWindow.tsx`):**
  - Tactile top drag pill with downward elastic dragging and swipe-down-to-dismiss threshold (`dragY > 110px`).
  - Tactile close button `✕` with quick press feedback.
  - Dynamic app container routing to individual identity apps.
- [x] **`[ABOUT]` Identity App (`AboutApp.tsx`):**
  - Verified profile hero with avatar, name, location, and active status chip.
  - One-tap action chips: Resume PDF download, Email, LinkedIn, GitHub, Instagram, Twitter.
  - 4-item core stats matrix (MCA State Rank, Published Books, Dev & Teaching, Origin & Base).
  - Detailed narrative bio bridging technical algorithms and human purpose.
  - 6 verified personal passion cards from legacy archives:
    1. Die-Hard Football & Lionel Messi Fan
    2. Cryptocurrency Enthusiast & Investor since 2019
    3. Published Author (*Pushback* & *The Echoes of Silence*)
    4. Pop-Culture & Superhero Lore Geek (Marvel & DC)
    5. Cultural Explorer & Traveller
    6. Co-owner of HaloBan Media (MLBB gaming influencer & creator)
- [x] **`[WORK]` Experience App (`WorkApp.tsx`):**
  - Vertical connected milestone timeline with organization badges, duration tags, and location.
  - NTS Institute of Technology: Software Developer & Instructor (Oct 2023 – Present).
  - Hi-Tech Computer Education: Instructor & Technical Support (Apr 2022 – Sep 2023).
  - Freelance Software Developer (2021 – Present): Native Android utilities and community tools.
  - Complete responsibility lists and skill tags for each role.
- [x] **`[EDUCATION]` Academic & Research App (`EducationApp.tsx`):**
  - Segmented dual-tab switcher: `🎓 Degrees & Schooling` ↔ `🔬 Research & HPC`.
  - State Merit banner highlighting Manipur University MCA 7th State Rank (80.30% Distinction).
  - Comprehensive educational milestones:
    - Master of Computer Applications (MCA) — Manipur University (2023, 80.30%, I Div with Distinction).
    - Bachelor of Computer Applications (BCA) — NIELIT Imphal, Akampat (2020, 68.38%, I Div).
    - Higher Secondary Examination (HSE / Class 12) — The Fancier Abhiram (2016, 72.80%, I Div, COHSEM; Physics, Chemistry, Mathematics).
    - All India Secondary School Examination (AISSE / Class 10) — Ruda Academy School, Thoubal (2014, 89.93%, I Div with Distinction, CBSE).
  - Specialized Research & Workshop Modules:
    - MCA Thesis: *"Empirical study on clustering-based missing data imputation techniques"* (2023, K-Means, Fuzzy C-Means, MSE benchmarks).
    - MCA Research Project: *"A Study on Machine Learning-Based Imputations in Tackling Missing Data"* (2021–2022, Department of Computer Science, Manipur University).
    - NSM Technical Program: *"Workshop on High Performance Computing — Manipur University, IIT Kharagpur, under the National Supercomputing Mission (July 2023)"* (OpenMP, MPI, GPU architectures, SLURM).
  - Official Verification Document:
    - Interactive proof lightbox displaying the authentic Manipur University Examination Gazette (`No. MU/EXAM/MCA(6)/2023`) verifying Roll No. 2036 · BANISHWOR ATHOKPAM · Rank 7 · First Division with Distinction (2651 Marks).

---

### Phase 4: `[PROJECTS]` Catalog & Engineering Archive 🟢 Completed
- [x] **Filterable Porcelain Segmented Directory (`ProjectsApp.tsx`):**
  - Instant category switcher: `All (7)`, `Native Android (3)`, `Community Tools (1)`, and `Engineering Archives (3)`.
- [x] **High-Resolution Production Icons Integrated:**
  - `public/projects/manipur-calculator.png`: Official 512×512 Play Store launcher icon.
  - `public/projects/manipuri-calendar.png`: Production Android xxxhdpi icon.
  - `public/projects/yek-salai.png`: Production Android xxxhdpi icon.
  - `public/projects/khutsuman.webp`: Official xxxhdpi squircle icon.
- [x] **Active & Beta Software with Live Store Links:**
  - **Manipur Calculator (Production Active):** Indigenous Land (Pari, Lourak, Sangam) & Gold conversions + Loan EMI & Interest. Direct Play Store link.
  - **Manipuri Calendar (Production Active):** Meitei lunar calendar + Gregorian synchronization, festivals & Tatnaba, Android widgets. Direct Play Store link + PWA version link.
  - **Khutsuman (Coming Soon / Beta):** Daily wage attendance & Hisab manager. Direct one-tap **WhatsApp Beta Access CTA** to `wa.me/+919612111619`.
  - **Yek Salai (Production Active):** Ancestral Meitei 7 Clans & 860+ surname database. Direct Play Store link.
- [x] **Engineering Archives with Transparent "Lessons Learned":**
  - **LeikaiFix (Paused / Prototype):** Civic infrastructure photo reports and municipal transparency analytics. Candid post-mortem on regulatory and governmental coordination hurdles.
  - **On-Device AI Keyboard (R&D / Archived):** FlorisBoard fork with local quantized SLM. Candid post-mortem on inference latency dropping below 60fps and RAM constraints on budget hardware.
  - **Viral Prompts (Sunset / Archived):** AI prompt engineering taxonomy. Candid post-mortem on manual editorial overhead without automated ingestion loops.
- [x] **In-OS Mini Demo Teasers:** Clear status tags cueing the upcoming interactive mini-demos in Phase 7.

---

### Phase 5: `[BOOKS]` Editorial Shelf & Native E-Reader 🟢 Completed
- [x] **Full-Bleed Native E-Reader Architecture (`AppWindow.tsx` & `BooksApp.tsx`):**
  - Suppressed OS window title bar (`BOOKS / Published Author`) and padding for `books` (`isImmersiveApp`), giving an edge-to-edge Apple Books native feel.
  - Realistic 3D card tilt with book cover binding depth, spine shadows, and ambient drop shadows.
  - High-res cover artwork (`public/echoes-cover.jpg` & `public/pushback-cover.jpg`).
  - Monospace series indicators, ASIN badges (`B0GT48RW96` & `B0BTB1JVVB`), genre tags, and synopses.
- [x] **Two-Step Physical Book Opening Experience (Zero-Gap Full-Bleed):**
  - **Step 1 (Full-Screen Physical Hardcover):** Tapping any book opens a full-screen, text-free, link-free physical hardcover with realistic spine lighting, specular reflection, and paper-edge thickness.
  - **Step 2 (3D Cover Flip):** Tapping the cover triggers a physical 3D cover swing (`rotateY(-92deg)`) opening seamlessly into the full-bleed Kindle reading canvas with zero visual size gap.
- [x] **In-OS Native Kindle E-Reader (100% Extracted Text):**
  - Distraction-free typography reader with comfortable line-height (`1.75`) and clean margins (zero raw screenshots).
  - **`Aa` Appearance Customizer Drawer:**
    - 3 Reading Themes: 📜 Porcelain Paper (`#FCFBF9`), 🕯️ Warm Sepia (`#F5EEDB`), 🌙 Midnight OLED (`#0A0A0C`).
    - Typeface Switcher: *Literary Serif* (Georgia / Bookman) vs *Modern Sans* (Plus Jakarta Sans).
    - Font Sizer Stepper: `A-` / `A+` scaling font size from 13px to 20px.
  - **Kindle Progress & Location Scrubber:**
    - Interactive bottom scrubber track and Kindle location badge (e.g. `Location 37 of 243 · 4%`).
    - Tactile `< Prev` and `Next >` page flipping buttons.
  - **Popular Highlight Styling:**
    - Translucent golden marker stroke on key pivotal sentences (e.g., *"To me, sentences were equations..."*, *"The loudest silence in my heart..."*, *"Pushback to grow into a better version..."*).
- [x] **Verbatim Extracted Chapters:**
  - ***The Echoes of Silence:*** Bren Atherton, Brayden, Everfield Flower School, Bright Meridian Academy, Soren Vale, Gemma Lancaster.
  - ***Pushback:*** The emotional pain of breakups as a catalyst for growth + Chapter 1 root causes (Communication, Trust, Infidelity, Differing Priorities, Growing Apart, Intimacy, Finances, Abuse).
- [x] **Direct Amazon Kindle Purchase Links:** Verified Amazon India buttons on both the 3D shelf, the cover inspection view, and the end-of-sample callout card.

---

### Phase 6: `[BANI]` Native Blog Reader 🟢 Completed
- [x] **Ingested 14 Live Blogger Articles (`src/content/blog.ts`):** Extracted from `https://baniat.blogspot.com/` into typed offline contracts.
- [x] **Editorial Magazine Feed (`BaniApp.tsx`):**
  - Hero visual card featuring *"The Yek-Salai System: The Bedrock of Meitei Civilization"*.
  - Category filters: `All (14)`, `Kinship & Clans (3)`, `History & Retrospective (3)`, `Culture & Festivals (3)`, `Identity & Surnames (2)`, `Pioneers (1)`, `Digital Heritage (2)`.
  - Clean card list with thumbnails, reading times, and publication dates.
- [x] **Dedicated Reading Canvas:**
  - Full-bleed native reading mode without iframes or webview wrappers.
  - Live top reading progress bar tracking scroll depth (0% to 100%).
  - Classic Georgia drop-cap, stylized blockquotes, tables, and 7-stripe Salai Taret flag CSS graphics.
  - Callout attribution card linking back to `baniat.blogspot.com`.
  - Next/Previous story navigation and related stories recommendations.
- [x] **Universal Search Integration:** All 14 articles indexed in `searchIndex.ts` for instant discovery.

---

### Phase 7A: `[PROJECTS]` OS App Drawer & Frosted Details Sheet 🟢 Completed
- [x] **OS App Drawer Presentation (`ProjectsApp.tsx`):**
  - Transform `[PROJECTS]` from long text feed into a genuine mobile OS App Drawer.
  - Ambient wallpaper backdrop with clean header and floating app squircles with labels.
  - Segmented top pill: `All Apps (7)`, `Production (4)`, `Engineering Archives (3)`.
  - The 4 flagship production apps displayed front and center:
    1. 📐 **Manipur Calculator**
    2. 📅 **Manipuri Calendar**
    3. 💼 **Khutsuman**
    4. 👑 **Yek Salai**
  - Separate secondary drawer section for the 3 Engineering Archives (*LeikaiFix*, *AI Keyboard*, *Viral Prompts*) with post-mortem insights.
- [x] **Executive Frosted Glass Details Pop-up Window:**
  - Tapping any app squircle triggers an executive frosted glass sheet (`backdrop-filter: blur(28px) saturate(190%)`).
  - 64px squircle icon, verified status badge (`Production Active` vs `Beta` vs `Archived`), Meitei Mayek script.
  - Two-sentence summary, capabilities list, and production tech stack pills (`Kotlin`, `Jetpack Compose`, `Room DB`, `BigDecimal`).
  - Verified store actions (Google Play Store, WhatsApp beta request, PWA link).
  - Prominent primary CTA button: **"⚡ Try In-OS Demo"** (cueing the 7B mini-app engine).
  - Smooth tap-outside-to-dismiss and `✕` close button.

---

### Phase 7B: In-OS Functional Mini-Apps (1–2 Core Features) 🟡 In Progress
- [x] **Manipur Calculator Mini-App (100% Android Source & UI Match):**
  - **Direct Launch Architecture:** Tapping Manipur Calculator in the App Drawer opens the app directly without a modal.
  - **Flush Android Phone Header (Zero Double-Status-Bar):** Top simulated status bar completely removed so the app header sits flush cleanly on mobile devices without duplicate status bars. Deep royal blue `#1565C0` header with triangle set-square ruler vector icon (📐), "Land Tools", "Pari • Lourak • Sangam • Point • Sq Ft", and crimson pill badge `LOCAL SPECIAL`.
  - **Segmented Sub-Tabs:** White rounded card `⇄ Unit Converter` with red icon + `🖩 Rate Calculator` (download gate).
  - **Material Outlined Inputs:** "Land Value" outlined textfield + "From" notched dropdown + centered lavender pill `[ ⇅ Swap ]` + full-width "Convert To (Target Unit)" notched dropdown.
  - **Live Bidirectional Calculation & Bento Breakdown:** Exact conversion formulas from Kotlin `CalculationUtils.kt` (1 Point = 435.6191 sq ft = 40.470339 m², Pari = 250, Lourak = 125, Sangam = 62.5, Loukhai = 31.25, Loushal = 15.625, Tong = 7.8125) with 2-column Bento breakdown.
  - **Authentic 6-Tab Bottom Navigation Bar:**
    1. **`🏠 Home`:** Project overview dashboard displaying Banishwor's summary, capabilities, tech stack (Kotlin, Jetpack Compose, Room DB, BigDecimal), target users, and Google Play Store link.
    2. **`📐 Land`:** Active live land converter matching user's phone screenshot pixel-for-pixel.
    3. **`💲 Gold`:** Traditional Manipuri gold suite (San, Rati, Ana) with Google Play download prompt.
    4. **`🔧 Tools`:** Land valuation & survey tools with Google Play download prompt.
    5. **`👤 Profile`:** Developer credentials (Banishwor Athokpam, MCA Graduate 7th Rank, GitHub, Google Play dev profile).
    6. **`🖩 Calc`:** Loan EMI & compound interest calculator with Google Play download prompt.
  - **Android System Navigation & Gesture Bar:** Bottom 3-button system controls (`◀`, `●`, `■`) + centered Android gesture pill bar.
- [x] **Manipuri Calendar Mini-App (100% PWA & Screenshot Match):**
  - **Direct Launch Architecture:** Tapping *Manipuri Calendar* in the App Drawer launches the mini-app canvas immediately without a modal delay.
  - **Flush Crimson Header (Zero Double-Status-Bar):** Simulated status bar completely removed; clean `#800E13` crimson header sits flush at the top displaying `Manipuri Calendar`.
  - **Evergreen Overview & Quick-Launch `Today` Page:**
    - Zero hardcoded dates: no manual update maintenance required.
    - Traditional greeting banner: `Khurumjari / ꯈꯨꯔꯨꯝꯖꯔꯤ` + dynamic time-of-day greeting (`ꯃꯪꯉꯥꯡ ꯄꯨꯟꯁꯤꯕ`).
    - Executive app identity card with verified badges (`PRODUCTION ACTIVE`, `GOOGLE PLAY`, `PWA`).
    - **`📅 Open 2027 Calendar Grid`** CTA action button jumping into the 2027 calendar in 1 tap.
    - Core capabilities checklist, Zero-Ad & Zero-Tracking guarantee, and store links (Google Play & Web PWA).
  - **Interactive Month Grid View (January & February 2027):**
    - Month Selector with Meitei Mayek subtitle (`ꯄꯣꯏꯅꯨ / ꯋꯥꯛꯆꯤꯡ`, `ꯋꯥꯛꯆꯤꯡ / ꯐꯤꯔꯦꯟ`), `<` / `>` buttons, and centered dark red pill **`Today`** (`#800E13`).
    - 7 Meitei weekday headers in crimson text (`ꯅꯣꯡꯃꯥꯏꯖꯤꯡ`, `ꯅꯤꯡꯊꯧꯀꯥꯕ`, `ꯂꯩꯕꯥꯛꯄꯣꯛꯄ`, etc.).
    - Tactile squircle day cards with day numbers (Sundays in red), Meitei month & Thasi in Meitei Mayek numerals (`ꯋꯥꯛꯆꯤꯡ ꯱`).
    - Holiday badges: `NEW YEAR`, `IMOINU...`, `GAAN-NGAI`, `REPUBLIC...`, `LUI-NGAI-NI`, `SARASWATI...`.
    - Lunar markers: `EKADASI` (split circle), `THASI` (New Moon), `PURNIMA` (Full Moon).
    - Selected day outline: `2px solid #800E13`.
    - Interactive Day Detail bottom drawer showing full festival descriptions, lunar day, and auspicious notes.
  - **Authentic 4-Tab Bottom Navigation Bar:**
    - `Today` (☾), `Calendar` (📅 in dark red), `Almanac` (⚡), `Info` (🕮).
  - **Android System Controls:** Bottom Back (`◀`), Home (`●`), Recents (`■`) + centered gesture pill handle.
- [x] **Yek Salai Mini-App (100% Android Match with 7 Scoped Surnames):**
  - **Direct Launch Architecture:** Tapping Yek Salai in the App Drawer opens the mini-app canvas immediately without modal delay.
  - **Flush Android Header (Zero Double-Status-Bar):** Simulated top status bar completely removed; clean emerald `#065F46` to `#047857` header sits flush to window top with app icon and `PRODUCTION` badge.
  - **`Home` Tab (Executive Detail & Project Overview Page):**
    - Official 58px squircle icon (`/projects/yek-salai.png`), verified badges (`● PRODUCTION ACTIVE`, `● GOOGLE PLAY`).
    - App overview & cultural mission narrative.
    - Primary CTA: **`⚡ Open Marriage Compatibility Checker`** + direct Google Play Store link.
    - **The Seven Salais of Kangleipak Grid:** All 7 Salais (`Mangang`, `Luwang`, `Khuman`, `Angom`, `Moirang`, `Khaba Nganba`, `Salang Leisangthem`) with authentic color swatches, Meitei Mayek script, and elemental domains.
    - **Traditional Kinship Prohibitions Section:** Cards explaining `Yek Tinnaba`, `Sairuk Tinnaba`, `Pee/Pen Tinnaba`, and `Leinung Pen Tinnaba`.
    - Community integrity guarantee (zero tracking, self-funded, offline).
  - **`Marriage Check` Tab (Interactive Marriage Compatibility Checker):**
    - Boy's Surname & Girl's Surname inputs with centered Swap button (`⇄`).
    - Quick-Select Suggestion Chips for the 7 user-requested surnames:
      1. `Athokpam` (Luwang)
      2. `Leimapokpam` (Mangang)
      3. `Langpoklakpam` (Mangang)
      4. `Laishram` (Khuman)
      5. `Ningombam` (Angom)
      6. `Mutum` (Mangang / Moirang branches)
      7. `Thongam` (Khuman / Khaba Nganba branches)
    - **Live Compatibility Engine:**
      - **Allowed:** Green `#059669` card with heart icon, exogamy validation, and dual-lineage breakdown.
      - **Yek Tinnaba Prohibited:** Red `#DC2626` card with close icon, same-clan violation notice, and paternal lineage rationale.
      - **Same-Surname Prohibited:** Immediate rejection with siblings alert.
      - **Branch Disambiguation:** Interactive branch selection for multi-clan surnames (`Mutum` and `Thongam`).
    - **Recent Queries History:** 1-tap re-evaluation log.
  - **Authentic 5-Tab Bottom Navigation Bar:**
    - `Yek Salai` (Home), `Marriage Check` (Heart), `Find Clan` (Search), `Facts` (HelpCircle), `Profile` (User).
  - **Android System Controls:** Bottom Back (`◀`), Home (`●`), Recents (`■`) + centered gesture pill handle.
- [x] **Khutsuman Mini-App (100% Android Match with Attendance Roster & WhatsApp Hisab):**
  - **Direct Launch Architecture:** Tapping Khutsuman in the App Drawer opens the mini-app canvas immediately without modal delay.
  - **Flush Android Header (Zero Double-Status-Bar):** Simulated top status bar completely removed; clean royal blue gradient `#005AC1` to `#1E40AF` header sits flush to window top with app icon and `BETA / OFFLINE` badge.
  - **`Home` Tab (Executive Detail & Project Overview Page):**
    - High-resolution squircle icon (`/projects/khutsuman.png`), verified badges (`● BETA IN PROGRESS`, `100% OFFLINE ROOM DB`).
    - Problem & solution mission narrative for Manipur's construction and daily wage ecosystem.
    - Financial Overview Bento tiles (*Active Sites: 2*, *Wages Due: ₹23,400*, *Laborers: 4 Active*).
    - Primary CTA: **`📋 Open Today Attendance`** + direct WhatsApp Beta request link (`wa.me/+919612111619`).
    - Core architectural pillars (*Transparent Attendance & Auto-Accountability*, *WhatsApp Statements*, *100% Offline SQLite Room DB*).
  - **`Attendance` Tab (Core Interactive Feature 1):**
    - Current job site indicator (*House Construction — Imphal West*).
    - Today's Live Attendance Payout banner with total equivalent days worked and real-time INR (₹) payout calculation.
    - Worker daily roster cards (*Ibomcha Singh - ₹800*, *Tomba Meitei - ₹750*, *Chaoba Sharma - ₹500*, *Biren Luwang - ₹700*).
    - **Tap-to-Toggle Attendance Chips:** `Full (1.0)` in Emerald `#059669`, `Half (0.5)` in Amber `#D97706`, `OT (1.5x)` in Indigo `#4F46E5`, and `Absent (0.0)` in Red `#DC2626`.
    - Live real-time arithmetic: Tapping any chip immediately updates worker payout and site total.
  - **`Hisab` Tab (Core Interactive Feature 2):**
    - Worker statement balance sheet showing Equivalent Days Worked, Gross Wages Accrued, Advances Paid, and Net Outstanding Balance Due.
    - **1-Tap WhatsApp Receipt Generator:** Formats clean, dispute-free WhatsApp message text with INR (₹) formatting.
    - Interactive **`Copy WhatsApp Text`** (with tactile check feedback) and **`Share`** buttons.
  - **`Works` Tab & `Info` Tab:**
    - Interactive job sites list (*House Construction — Imphal West*, *Tile & Granite — Thoubal*) with tap-to-switch site capability.
    - Developer credentials & offline SQLite/Room DB architecture notes.
  - **Authentic 5-Tab Bottom Navigation Bar:**
    - `Home`, `Attendance`, `Hisab`, `Works`, `Info`.
  - **Android System Controls:** Bottom Back (`◀`), Home (`●`), Recents (`■`) + centered gesture pill handle.

---

### Phase 7C: `[ROOTS]` Athokpam Family Tree & Heritage App 🟢 Completed
- [x] **Scroll-Driven Living Ancestral Trunk Architecture (`RootsApp.tsx`):**
  - Continuous vertical lineage spine growing chronologically downwards through 6 generations.
  - Generational progression tracker (`GEN 1 OF 6` ➔ `GEN 6 OF 6`).
  - **`⚡ Focus on Me` Floating Action Pill:** Smoothly accelerates down the trunk to center on Banishwor at 60fps.
  - **Theatrical Culmination at Generation 6:**
    - Radial emerald & indigo pulsing spotlight halo.
    - Verified badge: `👑 YOU ARE HERE // 6TH GENERATION`.
    - Real photo avatar in gradient animated ring.
    - Credentials: `Programmer · M.C.A. (7th State Rank) · Published Author · Athokpam Mayai Leikai`.
    - Sibling wings: Elder brother **Banikanta** & **Silky** (left) and Younger brother **Bishwal** (right).
    - Quick actions: `[ ⬆ Return to Ancestral Roots (Tonu) ]` + `[ 🌐 Open Full Web Portal (42 Members) ]`.
- [x] **Verified 42-Member Offline Data Ingestion (`athokpamTreeData.ts`):**
  - 100% offline data model extracted directly from live Google Apps Script genealogy database.
  - Zero network latency (0ms load) with CDN thumbnail optimization for Google Drive photos.
  - Luwang Salai heraldic metadata, clan lore, and Meitei Mayek titles (`ꯑꯊꯣꯛꯄꯝ ꯂꯨꯋꯥꯡ`).
- [x] **Interactive Relative Detail Drawer:**
  - Tapping any ancestor or relative (Tonu, Tolen, Thaniljao, Master Shamu, Basanta, Anita, etc.) slides open a modal sheet with kinship to Banishwor, photo, occupation, education, birth/death dates, and historical bio.
- [x] **Collateral Branches Accordion:**
  - Paternal uncles/aunts and cousins in Generations 4 & 5 cleanly packaged in expandable chips to keep the direct scroll narrative focused on mobile.

---

### Phase 8: Creator Archive, Lab & The Signature Swipe-Up Experience
- [x] **Milestone 8A: Signature Swipe-Up Gesture — "The 5 Dimensions of Banishwor" (`DimensionsDeck.tsx`):**
  - Ambient background-morphing liquid glass showcase with 5 facets:
    1. *The Software Engineer* (Android Emerald glow + live deep-links to all 4 production apps)
    2. *The Published Author* (Warm Crimson glow + *Pushback* & *The Echoes of Silence* + Amazon Kindle links)
    3. *The Cultural Preserver* (Deep Indigo glow + Athokpam Family Tree interactive node & Yek Salai)
    4. *The Content & Gaming Creator* (Neon Esports Orange glow + Bani Entertainment with 15K+ followers & MLBB MIL Influencer + HaloBan Media short-form interesting facts documentary channel)
    5. *The CS Researcher & Scholar* (Cyber Violet glow + Manipur University MCA 7th State Rank 80.30% Distinction + IIT KGP Supercomputing)
  - Real-time atmospheric background gradient halo morphing between Emerald, Crimson, Indigo, Orange, and Violet.
  - Interactive top segmented toggle: `✦ Dimensions` ↔ `⚡ Tech Stack` (complete 17+ categorized technical skills matrix).
  - Launcher pill updated to `Swipe up for Dimensions ✦`.
- [x] **Milestone 8B: `[GAMING]` App (Bani Entertainment & HaloBan Media Hub) 🟢 Completed:**
  - **Dual-Hub Segmented Header:** Instant switching between `🎮 Bani Entertainment (15K)` and `💡 HaloBan Media (Facts)`.
  - **Bani Entertainment Profile (15K+ MLBB Community):**
    - High-res golden leaping silhouette logo (`/gaming/bani-entertainment-logo.png`).
    - 4-metric bento grid (*15,000+ Followers*, *Official MIL Creator*, *Mobile Legends*, *Skin Giveaways*).
    - Verified link button to official Facebook page `https://www.facebook.com/banientertainment`.
    - Key tactics breakdown (*Burst Fighter Mastery*, *Macro Map Awareness*, *Community Shotcalling*).
    - Authentic community giveaway proof: interactive lightbox featuring the 2021 Badang Susanoo skin giveaway gifted to Dhaneshwor Waikhom with Banishwor's personal message.
    - Community milestones (*Genesis*, *Official MIL Status*, *15K Milestone*, *Skin & Diamond Giveaways*).
  - **HaloBan Media Hub (Short-Form Facts & Lessons):**
    - High-res circular emblem (`/gaming/haloban-media-logo.png`).
    - Documentary mission narrative & 4-metric statistics grid.
    - 4 core documentary pillars (*Unsolved Curiosities & History*, *Psychology & Cognitive Bias*, *Science & Natural Wonders*, *Resilience & Life Lessons*).
    - 3-step production pipeline (*01 Fact Verification*, *02 Hook & Narrative*, *03 Cinematic Editing*).
    - Strict adherence: Zero external links for HaloBan Media.
  - **Android System Controls:** Bottom Back (`◀`), Home (`●`), Recents (`■`) + centered gesture bar.
  - **Search Integration:** Fully indexed in `searchIndex.ts` for instant launcher discovery.
- [ ] **Milestone 8C: `[LAB]` App:**
  - Lightweight interactive canvas experiment (touch gravity particles or wave physics).
- [ ] **Milestone 8D: `[PLAY]` / Arcade App:**
  - Touch-native mini runner game (tap to jump over bugs/glitches) with high score storage.

---

### Phase 9: Settings, Developer Mode & System Polish
- [ ] **`[SETTINGS]` App:**
  - Motion toggle (reduced motion / full motion).
  - Light theme tint adjustments (Porcelain, Pure White, Warm Cream).
  - UI sound FX toggle (synthesized audio clicks via Web Audio API).
  - Developer Mode switch (reveals software architecture details under each skill/app).
- [ ] **Deep Linking & SEO:**
  - Hash/path routing (`/#/projects`, `/#/books`, `/#/skills`) for sharable URLs.
  - Open Graph meta tags and structured JSON-LD.
- [ ] **Performance Audit:**
  - Ensure 60fps animations on mid-range mobile devices.
  - Zero layout shifts and strict accessibility contrast checks.
