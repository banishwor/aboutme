# BANI OS

## An Interactive Mobile Operating System for Banishwor Athokpam

> **This is not a normal portfolio website.**
>
> BANI OS is an interactive mobile-first personal operating system that lets visitors explore Banishwor Athokpam's work, education, software projects, writing, cultural work, experiments, gaming history, and personality through an OS-like interface.

The goal is to make the portfolio feel like **discovering a small operating system built around one person**, rather than scrolling through a conventional résumé.

The visitor should feel:

> "I am exploring Banishwor's digital world."

—not:

> "I am reading someone's portfolio."

---

# 1. Core Concept

Build a fictional personal operating system called:

## BANI OS

Possible visual subtitle:

**BANI // PERSONAL OS**

or

**BANI OS — A Digital Portfolio Experiment**

The OS is inspired by mobile operating systems, but it must **NOT be a clone of Android or iOS**.

Do not copy:

* Android UI
* iOS UI
* Apple icons
* Android system navigation
* Android/iOS settings screens
* copyrighted system graphics
* fake phone frames
* fake status bars

Instead, create an original visual language inspired by the *mental model* of an operating system.

The website itself becomes the operating system.

---

# 2. Most Important Design Principle

The site should be:

## A portfolio disguised as an operating system.

Not:

## An operating system disguised as a portfolio.

Every interaction should ultimately help the visitor understand:

* Who Banishwor is
* What he builds
* What technologies he uses
* What he has studied
* What he has worked on
* What he writes
* What he has created for the Meitei/Manipuri community
* What experiments he has explored
* What he has done as a creator/gamer

But the information should be discovered through interaction rather than presented as a long résumé.

---

# 3. Mobile Is Its Own Experience

The mobile experience must **NOT be a responsive miniature version of the desktop portfolio**.

Desktop and mobile should share:

* content
* project data
* images
* metadata
* links
* technical information
* articles
* books
* education
* work history

But they should have completely different interaction models.

## Desktop

Desktop:

**BANISHWOR.EXE**

An experimental cinematic portfolio.

Possible interactions:

* cinematic scrolling
* depth
* parallax
* WebGL
* 3D objects
* draggable elements
* physics
* project windows
* command palette
* terminal
* interactive experiments
* 3D books
* interactive Roots visualization
* Bani TV
* arcade

## Mobile

Mobile:

**BANI OS**

An interactive personal mobile operating system.

The mobile version should be:

* touch-first
* gesture-driven
* app-oriented
* spatial
* playful
* fast
* understandable
* usable with one hand where possible

---

# 4. Do NOT Use a Fake Phone Shell

The site itself is the experience.

Do not create:

```text
┌──────────────────────┐
│ 9:41     WiFi 100%   │
│                      │
│     BANI OS          │
│                      │
└──────────────────────┘
```

inside a browser.

The actual device already has:

* status bar
* battery indicator
* network information
* navigation gestures/buttons

Therefore:

## DO NOT create a fake status bar.

The BANI OS interface begins below the real device status area.

Use the browser viewport naturally.

---

# 5. Overall Navigation Model

The main navigation should use multiple dimensions.

## Horizontal navigation

Swipe left/right to move between major spaces.

Example:

```text
                  ROOTS
                    ↑
                    │
CREATE ←────────── HOME ──────────→ ROOTS
                    │
                    ↓
                 PLAY
```

However, do not literally force four-direction navigation everywhere.

The recommended mental model is:

### ← / →

Move between major home spaces.

### ↑

Open the Skills layer from Home.

### Tap

Open an application.

### Long press

Reveal technical/developer information.

### Edge swipe

Return from an application.

---

# 6. Home Spaces

The home screen should have several horizontally swipeable spaces.

These are not ordinary "pages."

They are different parts of Banishwor's identity.

Recommended structure:

1. HOME
2. ROOTS
3. CREATE
4. PLAY

Additional spaces can be introduced if necessary, but avoid creating too many.

---

# 7. HOME

HOME is the visitor's starting point.

Its purpose is:

> "This is who I am."

It should be visually clean and relatively calm compared with the experimental spaces.

---

# 8. The 4×2 Introduction Widget

The most important object on the Home screen is a **4×2 introduction widget**.

Conceptually:

```text
┌──────────────────────────────────┐
│                                  │
│        BANISHWOR ATHOKPAM        │
│                                  │
│        Software Developer        │
│        Builder · Author          │
│        Digital Heritage Creator  │
│                                  │
└──────────────────────────────────┘
```

The exact copy should be finalized during implementation.

Potential identity lines:

* Software Developer
* Mobile & Edge Systems Developer
* Builder
* Author
* Digital Heritage Creator
* Meitei Culture / Digital Heritage

Do not overcrowd the widget.

It should feel like a real OS widget rather than a résumé card.

The widget may subtly change its secondary text over time.

For example:

```text
Software Developer
```

then:

```text
Builder
```

then:

```text
Author
```

then:

```text
Digital Heritage Creator
```

But this animation must remain subtle.

---

# 9. Home Screen App Icons

The Home screen should contain a limited number of applications.

Do not put every portfolio section on the first screen.

Possible initial Home layout:

```text
[ ABOUT ]       [ WORK ]

[ PROJECTS ]    [ EDUCATION ]

[ BOOKS ]       [ BANI ]

[ ROOTS ]       [ GAMING ]

[ LAB ]         [ PLAY ]
```

The exact arrangement can be changed after visual testing.

The important thing is:

## The home screen should feel like a launcher.

Not a grid of portfolio cards.

---

# 10. Search Bar

Include a prominent search-like bar.

However:

## Do NOT pretend it is Google.

Do not create a fake Google search engine UI.

Instead call it something like:

* BANI SEARCH
* Search Banishwor
* Search My World

Possible placeholder:

> Search Banishwor...

When tapped, it can provide two conceptual modes.

### Search My World

Search content inside BANI OS:

* projects
* skills
* education
* work
* books
* blog posts
* experiments
* gaming
* cultural projects

Example:

Searching:

```text
Kotlin
```

could return:

```text
Kotlin

Used in:

Manipur Calculator
Manipuri Calendar
Khutsuman
```

Searching:

```text
books
```

opens Books.

Searching:

```text
calendar
```

opens Manipuri Calendar.

Searching:

```text
family
```

opens Athokpam Family Tree / Roots.

### Search the Web

Provide a clearly labeled external option.

For example:

> Search web for "Banishwor Athokpam"

This can launch an actual Google/Bing search externally.

The OS should never pretend that an external web search happened internally.

---

# 11. App Launcher Through Search

Search can also become a universal launcher.

Examples:

```text
"kotlin"
→ Kotlin skill

"calendar"
→ Manipuri Calendar

"books"
→ Books

"gaming"
→ Gaming

"family"
→ Roots / Family Tree

"bani"
→ Bani

"lab"
→ Lab

"projects"
→ Projects
```

This makes the search field useful rather than decorative.

---

# 12. HOME → SWIPE UP → SKILLS

This is one of the signature interactions.

Do NOT create a conventional scrollable Skills section.

The user should be able to:

## Swipe upward from Home.

The Home interface reacts physically.

For example:

1. Home icons move downward.
2. Widget contracts/fades.
3. Background layers shift.
4. Particles or nodes appear.
5. Large `SKILLS` typography emerges.
6. Skill categories assemble.
7. Individual technologies appear.
8. Projects connect to the technologies.

The result should feel like:

> opening another layer of the operating system.

Not:

> scrolling down a portfolio page.

---

# 13. Skills Interaction

Possible categories:

### CORE

* Software Development
* Debugging
* Testing
* Version Control

### MOBILE

* Kotlin
* Android
* Jetpack Compose
* Room
* MVVM
* React Native

### WEB

* JavaScript
* TypeScript
* React
* PWA
* IndexedDB
* HTML/CSS

### DATA / BACKEND / CLOUD

* Firebase
* Google Apps Script
* Google Sheets
* Local-first architecture

### EXPERIMENTAL

* AI
* On-device AI
* WebGL
* shaders
* physics
* creative coding

Do not assign arbitrary percentages such as:

```text
Kotlin 95%
React 87%
```

unless there is a real reason.

Instead, show evidence.

For example:

```text
KOTLIN

Used in

• Manipur Calculator
• Manipuri Calendar
• Khutsuman
```

This makes the Skills system credible.

---

# 14. Developer Mode

Consider adding a hidden or optional:

## Developer Mode

Normal visitors see:

> Kotlin

Developer Mode can reveal:

```text
Kotlin

Projects:
Manipur Calculator
Manipuri Calendar
Khutsuman

Architecture:
Jetpack Compose
Room
MVVM
Offline-first
```

Another example:

```text
Firebase

Used in:
Yek Salai

Purpose:
Remote-managed cultural data
```

Developer Mode should expose technical depth without forcing normal visitors to read it.

---

# 15. ROOTS

ROOTS represents the cultural and personal side of the portfolio.

Potential apps:

* Athokpam Family Tree
* Yek Salai
* Manipuri Calendar
* Bani

The visual language can use:

* branching structures
* nodes
* subtle organic lines
* cultural-inspired geometry
* layered depth

Avoid stereotypical "tribal" visual clichés.

The design should feel modern and respectful.

---

# 16. Athokpam Family Tree

This is an important personal project.

The existing project is:

**Athokpam Family Tree**

It uses a family database and interactive family-tree concepts.

Inside BANI OS, do not simply open the external website.

Create a small interactive demonstration.

For example:

```text
             Banishwor
                 │
       ┌─────────┴─────────┐
       │                   │
    Parent               Parent
       │
     Family
       │
    Ancestors
```

Users can:

* tap a node
* expand a branch
* inspect a person
* zoom/pan
* return to Roots

The full external family tree can still be linked when appropriate.

Do not expose private family information that is not intended for public display.

---

# 17. Yek Salai

Yek Salai is a digital guide to Meitei cultural heritage.

The current public project includes:

* traditional seven clans
* 860+ surname records
* clan identification
* Yek Tinnaba
* Shairuk Tinnaba
* cultural education
* community corrections
* React Native
* Firebase Remote Config

These details are confirmed on the current portfolio.

There is also an Advanced Yek Salai Eligibility Checker with seven traditional Salais:

* Mangang
* Luwang
* Khuman
* Angom
* Moirang
* Kha-Nganba
* Chenglei

The checker itself states that it is educational and not a substitute for legal, religious, genealogical, or customary authority.

Inside BANI OS, create a **small educational/demo version**, not the entire application.

Possible mini experience:

```text
YEK SALAI

Enter surname

[ __________ ]

Search

Result

Clan
Mangang

Learn about this
```

Or:

```text
Seven Salais

Mangang
Luwang
Khuman
Angom
Moirang
Kha-Nganba
Chenglei
```

The purpose is to demonstrate the project.

---

# 18. Manipuri Calendar

The current public project is a free, ad-free Manipuri cultural calendar available as:

* Android application
* Progressive Web App

It combines:

* Meitei lunar calendar
* Gregorian calendar
* festivals
* public holidays
* observances
* search
* Android widgets

Current public widget formats include:

* 2×2
* 4×1
* 4×2

The current site describes it as a community-oriented, ad-free application.

Inside BANI OS:

Create a mini calendar.

For example:

```text
MANIPURI CALENDAR

        Wakching

Mo Tu We Th Fr Sa Su
...

13
Gaan-Ngai
```

Possible interactions:

* swipe month
* tap a date
* reveal festival
* switch Gregorian/Meitei
* show lunar phase

Do not try to reproduce the complete calendar application inside the portfolio.

The portfolio version should be a **miniature demonstration**.

---

# 19. Khutsuman

Current public project:

**Khutsuman (ꯈꯨꯠꯁꯨꯃꯟ)**

Status:

**Beta / Coming Soon**

Purpose:

Daily wage, attendance and Hisab management.

Target users include:

* site supervisors
* petty contractors / Mohoriks
* carpenters
* daily wage workers

Current public feature set includes:

* Present = 1.0
* Half-Day = 0.5
* Overtime
* Absent
* multiple sites
* worker-specific rates
* client advances
* expenses
* net profit
* WhatsApp PDF statements
* editable worker statements
* local encrypted Room database
* Kotlin
* Jetpack Compose
* Material Design 3
* MVVM

These details are confirmed on the current portfolio.

Mini demo:

```text
KHUTSUMAN

Workers

Ratan      Present    ₹700
Sanjit     Half-Day   ₹350
Biren      Present    ₹650

Today's Total
₹1,700
```

Make the mini app interactive.

The visitor could tap:

```text
Present
Half-Day
Absent
```

and see the total change.

This demonstrates the product better than a screenshot.

---

# 20. Manipur Calculator

Current public project:

**Manipur Calculator**

It combines traditional Manipuri land/gold units with modern financial calculations.

Current features include:

### Land

Traditional Manipuri land units.

### Gold

Traditional gold weight conversion.

### Financial

* Loan EMI
* Gold Loan
* Car Loan
* Simple Interest
* Compound Interest

Technology currently presented publicly:

* Kotlin
* Jetpack Compose
* BigDecimal
* Room
* offline operation
* persistent calculation history

Inside BANI OS, make a small functional calculator.

Example:

```text
MANIPUR CALCULATOR

LAND
PARI
LOURAK
SANGAM

or

FINANCE
EMI
INTEREST
GOLD LOAN
```

Allow at least one calculation to work.

---

# 21. CREATE

CREATE represents the creative side.

Recommended applications:

* Books
* Bani
* Gaming
* Music
* Bani TV

This area should feel more editorial and expressive than HOME.

---

# 22. BOOKS

The portfolio should contain a dedicated Books application.

Known book information from previous project context:

### Book 1

Title:

**The Echoes of Silence**

It is part of the **Between Heartbeats** series.

Amazon ASIN previously provided:

`B0GT48RW96`

Amazon India link:

https://www.amazon.in/Echoes-Silence-Book-Between-Heartbeats-ebook/dp/B0GT48RW96

### Book 2

Title:

**Pushback: How Breakups Can Lead to Personal Growth and Development**

Amazon ASIN previously provided:

`B0BTB1JVVB`

Amazon India link:

https://www.amazon.in/Pushback-Breakups-Personal-Growth-Development-ebook/dp/B0BTB1JVVB

The legacy profile also confirms Pushback and describes it as a book about breakups, personal growth and development.

## IMPORTANT

The exact current:

* author metadata
* subtitle
* cover image
* publication metadata
* description
* series metadata

for both books should be **verified before implementation**.

Do not invent missing metadata.

---

# 23. Books Should Have Multiple Pages

Do not make Books a single screen.

Possible interaction:

```text
BOOKS
   ↓

Book 1
The Echoes of Silence

   ↔

Book 2
Pushback
```

Tapping a book opens:

```text
COVER

TITLE

ABOUT THE BOOK

THEMES

READ PREVIEW

BUY / VIEW ON AMAZON
```

Use large typography and cinematic transitions.

Possible interaction:

* swipe between books
* rotate cover slightly with device movement
* tap cover
* expand book
* reveal details
* read preview
* return to Books

Do not reproduce copyrighted book content beyond authorized previews.

---

# 24. BANI — THE BLOG

This is one of the most important parts.

The existing Bani blog should **NOT simply redirect to Blogger**.

It should also **NOT appear inside an iframe**.

Do not create:

```text
BANI OS
 └── fake browser
      └── Blogger
           └── browser-like UI
```

That would feel like a browser inside a browser.

Instead:

# BANI becomes a first-class application.

The existing blog remains the publishing backend.

BANI OS becomes the reading experience.

---

# 25. BANI Blog Architecture

Conceptually:

```text
BANI OS
   │
   ▼
BANI APP
   │
   ├── Featured
   ├── Stories
   ├── Culture
   ├── History
   ├── Literature
   └── About Bani
          │
          ▼
     Blog content source
```

The exact content retrieval method should be determined during implementation.

Possible sources:

* Blogger feed
* Blogger API
* generated JSON
* cached content
* static build-time extraction

Prefer an architecture that avoids unnecessary runtime requests.

---

# 26. BANI Home

Inside the BANI app:

```text
BANI

Voices of Meitei Heritage

FEATURED
────────────────────

[Large story]

Story title

Short introduction

READ →

────────────────────

LATEST

Story
Story
Story
Story
```

No browser address bar.

No browser back button.

No duplicated website navbar.

The OS's own navigation system controls the experience.

---

# 27. BANI Categories

Potential categories:

* Stories
* Culture
* History
* Literature
* Folklore
* Indigenous Storytelling

Only show categories that actually exist in the source content.

Do not fabricate categories just to fill the UI.

---

# 28. BANI Reader

Opening an article should feel like entering a dedicated reading mode.

Example:

```text
← BANI

CATEGORY

ARTICLE TITLE

Short introduction

[Hero image]

Article body
...
...
...

────────────

Related Stories
```

Features:

* reading progress
* clean typography
* large images
* expandable images
* related posts
* share
* return to BANI
* next/previous story
* saved/bookmarked articles if feasible

The reader should feel closer to a modern editorial app than a website.

---

# 29. Blog Content Must Remain Maintainable

The developer should not manually copy every article into source code if this can be avoided.

Ideally:

```text
Blogger
   ↓
Content ingestion
   ↓
Normalized article data
   ↓
BANI app
```

Example normalized structure:

```ts
type BaniPost = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  coverImage?: string;
  publishedAt: string;
  updatedAt?: string;
  categories?: string[];
  tags?: string[];
  sourceUrl: string;
};
```

The source URL should remain available for:

* attribution
* fallback
* sharing
* opening the original article

But the normal reading experience remains inside BANI OS.

---

# 30. BANI Should Not Become a Browser

This is a hard requirement.

Do not include:

* address bar
* browser tabs
* browser bookmarks
* browser refresh button
* browser-style toolbar
* duplicated Blogger navigation
* iframe browser experience

BANI is an app.

---

# 31. External Links Philosophy

Whenever possible:

## Experience inside BANI OS.

When an action genuinely requires an external platform:

## Leave the OS intentionally.

Examples:

Amazon purchase:

```text
BUY / VIEW ON AMAZON
```

opens Amazon.

GitHub:

```text
VIEW SOURCE
```

opens GitHub.

Google search:

```text
SEARCH WEB
```

opens the search engine.

Play Store:

```text
GET APP
```

opens Google Play.

Do not hide external transitions.

---

# 32. GAMING

Gaming is part of the user's creator history.

The user has previously described:

* Bani Entertainment
* Facebook Gaming
* 15K+ followers
* Mobile Legends: Bang Bang
* former MIL Influencer

The 15K+ follower figure and MIL status should be treated as **user-provided claims unless supporting screenshots/evidence are added**.

The legacy profile also contains a Content Creator & Gaming Influencer section mentioning MLBB/Mobile Legends and digital content creation.

Gaming should therefore be presented as:

## Creator Era / Gaming Archive

Not as a current software project.

Possible UI:

```text
GAMING

BANI ENTERTAINMENT

15K+ COMMUNITY

Mobile Legends: Bang Bang

Creator Archive
```

Include:

* screenshots
* old content
* creator history
* gaming clips if available
* social links

Use evidence assets supplied by the owner for follower counts and historical claims.

---

# 33. PLAY

PLAY is the experimental area.

Possible applications:

* Arcade
* Lab
* Experiments
* Creative Coding

This is where the portfolio can become deliberately playful.

---

# 34. LAB

LAB represents experimentation.

Possible experiments:

* particles
* physics
* generative art
* WebGL
* shaders
* audio visualization
* AI experiments
* interactive simulations

The experiments should be small and fast.

Do not build a huge game engine.

Each experiment should demonstrate one idea.

Example:

```text
LAB

[ PARTICLES ]

[ GRAVITY ]

[ SHADER ]

[ AI ]

[ PHYSICS ]

[ GENERATIVE ]
```

---

# 35. ARCADE

The portfolio can contain small games.

Possible games:

* Snake
* Breakout
* Bug Runner
* hidden game

The games should be optional.

Do not force visitors to play before they can access portfolio information.

Arcade exists because:

> building things for fun is part of the creator identity.

---

# 36. MUSIC

Optional Music application.

It can function as an experimental visual player.

Possible:

* waveform
* visualizer
* play/pause
* track selection
* generative animation

Do not autoplay audio.

Respect browser autoplay restrictions.

If there is no final music content available, keep this as a placeholder rather than inventing a music catalogue.

---

# 37. BANI TV

Optional interactive media section.

Possible channels:

```text
BANI TV

01 — ABOUT
02 — PROJECTS
03 — GAMING
04 — HERITAGE
05 — LAB
06 — ARCHIVE
```

The visitor swipes vertically/horizontally through channels.

This should feel like a creative experiment, not a real streaming service.

Only implement if it contributes meaningfully to the experience.

---

# 38. EDUCATION

Education should be represented as an interactive timeline.

Verified from the existing profile:

### Master of Computer Applications

Manipur University, Chanchipur

2020–2023

The existing profile states **7th Position in State** and describes this as 7th position among affiliated colleges at state level.

### Bachelor of Computer Applications

NIELIT Imphal

2017–2020

Do not exaggerate the academic ranking.

Use the exact wording after final verification.

---

# 39. WORK

Current profile information:

### Software Developer & Instructor

NTS Institute of Technology, Yairipok

October 2023 – Present

The profile describes the role as software development alongside instruction.

### Instructor

Hi-Tech Education, Thoubal

April 2022 – September 2023

The profile describes teaching computer science/programming and technical support.

### Freelance Software Developer

Ongoing

The profile describes custom web/mobile application work, including culturally relevant solutions for the Manipuri community.

---

# 40. CURRENT PROJECT LIBRARY

The current public portfolio should be treated as the authoritative starting point for project inventory.

Current major applications:

1. Manipur Calculator
2. Yek Salai
3. Manipuri Calendar
4. Khutsuman

Current archived/experimental projects:

5. LeikaiFix
6. On-Device AI Keyboard
7. Viral Prompts

These are currently shown on the live portfolio.

---

# 41. LEIKAIFIX

Status:

**Prototype / Paused**

Purpose:

Civic infrastructure reporting and public accountability.

The public portfolio describes features including:

* photo reports
* geolocation
* maps
* constituency mapping
* infrastructure issues
* transparency analytics
* most neglected constituency concept

Development was paused because of sensitive regulatory, administrative and legal considerations.

Inside BANI OS, this should be presented as:

## Engineering Archive

not as an active product.

The purpose is to demonstrate engineering exploration and lessons learned.

Do not present it as an active civic platform.

---

# 42. ON-DEVICE AI KEYBOARD

Status:

**R&D / Archived**

The current portfolio describes it as:

* Android keyboard
* based on FlorisBoard architecture
* lightweight offline language model
* paraphrasing
* grammar correction
* tone modification
* zero cloud dependencies

The project was archived because inference latency and RAM pressure affected typing responsiveness on budget Android devices.

This is an excellent project for the Developer Mode / Lab section because it demonstrates:

* edge AI
* mobile optimization
* privacy
* hardware constraints
* engineering tradeoffs

---

# 43. VIRAL PROMPTS

Status:

**Archived / Sunset**

The project focused on:

* AI art prompts
* content ideas
* creative writing
* Midjourney
* DALL·E
* Gemini
* Stable Diffusion

The current portfolio explains that continuous manual curation became too operationally expensive, leading to the project being discontinued.

Present it as:

## A product experiment that taught something.

Do not make it look active.

---

# 44. HORIZONTAL HOME NAVIGATION

Each home space should have a strong visual identity.

Suggested:

## HOME

Clean / futuristic / personal.

## ROOTS

Organic / connected / cultural.

## CREATE

Editorial / cinematic / literary.

## PLAY

Experimental / energetic / playful.

The transition between spaces should not simply be:

```text
page 1 → page 2
```

Instead use:

* parallax
* depth
* scaling
* object movement
* subtle blur
* layered transitions
* gesture-following motion

The transition should follow the user's finger.

---

# 45. Gesture Design

Gestures must remain predictable.

### Tap

Open.

### Swipe left/right

Change Home space.

### Swipe up from Home

Skills.

### Swipe down

Return/collapse where appropriate.

### Edge swipe

Back.

### Long press

Technical information / developer mode / contextual menu.

### Pinch

Only where the content benefits from it:

* Family Tree
* Roots
* certain Lab experiments

Do not add gestures simply because they are technically possible.

---

# 46. APP OPENING ANIMATION

Applications should feel like actual OS applications.

Example:

User taps:

```text
CALENDAR
```

The icon expands into the application.

The application's visual identity should originate from the icon.

Then:

```text
← CALENDAR
```

allows returning to Home.

The reverse animation collapses the app back into the icon.

This creates the illusion that the applications actually belong to the OS.

---

# 47. APP CLOSING

Do not always use generic:

```text
X
```

buttons.

Prefer:

* back gesture
* edge swipe
* contextual back button
* icon-collapse animation

A close button can exist where necessary for accessibility.

---

# 48. HOME SCREEN WIDGETS

The 4×2 introduction widget is mandatory.

Other live widgets can be added later.

Possible examples:

### Calendar

Shows today's date.

### Music

Shows waveform.

### Books

Shows rotating book cover.

### Lab

Shows moving particles.

### Roots

Shows a growing node structure.

But don't overload the Home screen.

---

# 49. LIVE ICONS

Icons can contain subtle animations.

Examples:

### Calendar

Date changes.

### Music

Waveform moves.

### Books

Cover rotates slightly.

### Roots

Nodes subtly connect.

### Lab

Particles move.

### Arcade

Pixel animation.

These animations must pause when:

* page is hidden
* reduced motion is enabled
* performance is low

---

# 50. SETTINGS

Create a small Settings application.

Possible sections:

```text
SETTINGS

Appearance
Motion
Sound
Performance
Accessibility
Developer Mode
About BANI OS
```

### Appearance

* theme
* visual intensity
* wallpaper/background

### Motion

* full motion
* reduced motion

### Sound

* UI sounds
* music

### Performance

* high
* balanced
* low

Do not make settings unnecessarily complicated.

---

# 51. ACCESSIBILITY

The site must remain usable without gestures.

Every major action must have an alternative.

For example:

Swipe right:

```text
Next space →
```

Swipe up:

```text
Open Skills
```

There should be accessible buttons or keyboard alternatives where appropriate.

Support:

* reduced motion
* keyboard navigation where relevant
* readable text
* sufficient contrast
* semantic HTML
* screen-reader labels
* focus states
* touch target sizes

Do not sacrifice usability for the concept.

---

# 52. REDUCED MOTION

If:

```text
prefers-reduced-motion: reduce
```

is enabled:

* remove large parallax
* reduce spring animations
* disable unnecessary particles
* reduce 3D movement
* keep transitions short
* preserve navigation

The OS concept must still work.

---

# 53. PERFORMANCE

This is especially important because the experience is mobile-first.

Avoid:

* enormous WebGL scenes
* unnecessary 3D models
* huge images
* constant particle simulations
* continuous expensive rendering
* autoplay video
* unnecessary network requests

Use:

* lazy loading
* code splitting
* compressed images
* WebP/AVIF where appropriate
* dynamic imports
* requestAnimationFrame carefully
* intersection observers
* cached content
* static data where possible

The website should feel fast on mid-range Android devices.

---

# 54. OFFLINE / RESILIENCE

Where practical, the OS shell should still work even if external content cannot be loaded.

For example:

* Home works
* Projects work
* Skills work
* Education works
* Work works
* Books metadata works
* BANI shell works

If BANI content cannot be retrieved:

```text
BANI

Stories temporarily unavailable.

Try again
Open original Bani
```

Do not show a broken white screen.

---

# 55. TECHNOLOGY DIRECTION

Preferred architecture:

* React
* TypeScript
* Vite

Potential libraries:

* React Three Fiber
* Three.js
* Drei
* GSAP
* Framer Motion
* Rapier
* Web Audio API
* GLSL

Do not install every library automatically.

Only use a library when it solves a real problem.

---

# 56. CONTENT ARCHITECTURE

Keep content separate from UI.

For example:

```text
src/
  content/
    profile.ts
    projects.ts
    education.ts
    work.ts
    books.ts
    skills.ts
    roots.ts
    gaming.ts
    experiments.ts
    bani.ts

  mobile/
    os/
    home/
    roots/
    create/
    play/
    skills/
    apps/

  desktop/
    ...
```

This allows Desktop and Mobile to share information without sharing their UI.

---

# 57. PROJECT DATA MODEL

Example:

```ts
type Project = {
  id: string;
  name: string;
  category: string;
  status: "active" | "beta" | "paused" | "archived";
  description: string;
  technologies: string[];
  features: string[];
  links?: {
    website?: string;
    github?: string;
    playStore?: string;
  };
  assets?: {
    icon?: string;
    screenshots?: string[];
  };
};
```

Do not hardcode project descriptions inside components.

---

# 58. SKILLS DATA MODEL

Example:

```ts
type Skill = {
  id: string;
  name: string;
  category: string;
  description?: string;
  projects: string[];
};
```

This allows:

```text
Kotlin
↓
Manipur Calculator
Manipuri Calendar
Khutsuman
```

automatically.

---

# 59. EXTERNAL LINK DATA

Use centralized metadata.

Example:

```ts
const externalLinks = {
  portfolio: "...",
  blog: "...",
  github: "...",
  amazonBook1: "...",
  amazonBook2: "...",
  familyTree: "...",
  yekSalai: "...",
  gaming: "..."
};
```

Do not scatter URLs throughout components.

---

# 60. SEARCH INDEX

Build a unified search index from content.

Searchable objects:

```text
Projects
Skills
Education
Work
Books
Bani posts
Experiments
Gaming
Roots
```

Example:

```text
Search: "Room"

→ Manipur Calculator
→ Khutsuman
→ Developer Mode
→ Skills
```

Search:

```text
"Meitei"
```

could return:

* Yek Salai
* Manipuri Calendar
* Bani
* Roots

---

# 61. ACHIEVEMENTS / DISCOVERY

Optional.

The OS can reward exploration.

Examples:

```text
ACHIEVEMENT UNLOCKED

You discovered ROOTS.
```

```text
ACHIEVEMENT UNLOCKED

You found the archived AI Keyboard.
```

```text
ACHIEVEMENT UNLOCKED

You opened Developer Mode.
```

Keep this subtle.

Do not turn the portfolio into a game unless the visitor chooses to explore that way.

---

# 62. EASTER EGGS

The site should contain a few hidden interactions.

Examples:

* Konami-style input
* secret terminal command
* hidden arcade
* developer mode
* secret animation
* unusual icon interaction

Do not make essential information dependent on Easter eggs.

---

# 63. PERSONAL IDENTITY

The site should communicate multiple sides of Banishwor.

## Builder

Software applications.

## Engineer

Architecture, offline-first systems, mobile development.

## Educator

Teaching and instructor experience.

## Writer

Books and storytelling.

## Cultural Creator

Bani, Yek Salai, Manipuri Calendar, digital heritage.

## Family / Roots

Athokpam Family Tree.

## Creator

Gaming/content creation.

## Experimenter

AI, WebGL, prototypes and creative coding.

The OS metaphor exists to connect these identities.

---

# 64. THE CENTRAL METAPHOR

The application structure should communicate:

```text
Apps
= What I built

Skills
= What powers it

Work
= Where I applied it

Education
= Where I learned

Books
= What I write

Bani
= What I preserve and publish

Roots
= Where I come from

Gaming
= My creator history

Lab
= What I experiment with

Arcade
= What I build for fun

Search
= How you find me
```

This is the conceptual foundation of BANI OS.

---

# 65. VISUAL DESIGN

Avoid generic "AI portfolio" aesthetics.

Do not create:

* generic glassmorphism everywhere
* random gradients
* excessive neon
* meaningless 3D objects
* stock illustrations
* fake dashboards
* giant "Hello, I'm Banishwor" hero section
* generic skill progress bars
* résumé cards everywhere

Instead use:

* strong typography
* intentional spacing
* subtle depth
* motion
* original icons
* meaningful animations
* visual storytelling
* carefully selected imagery
* project screenshots
* real assets

---

# 66. CULTURAL DESIGN

Cultural elements should be authentic and purposeful.

Do not use random:

* tribal patterns
* decorative symbols
* fake traditional motifs
* generic Indian cultural visuals

If Meitei visual elements are used, they should have a reason and should be researched/verified.

The overall UI should still look contemporary.

---

# 67. CONTENT TRUTH RULE

This is extremely important.

## Never invent facts about Banishwor.

If information is not available:

```text
TODO: VERIFY
```

Do not generate fake:

* employers
* awards
* follower counts
* project statistics
* publication dates
* book metadata
* client names
* technology claims
* certifications
* testimonials
* achievements

If a number is supplied by the owner but cannot be independently verified, it may be included with appropriate treatment, but should not be embellished.

---

# 68. CURRENT VERIFIED PROJECT INFORMATION

At the time this README is being prepared, the current portfolio publicly lists:

### Active / featured

* Manipur Calculator
* Yek Salai
* Manipuri Calendar
* Khutsuman

### Engineering archive

* LeikaiFix
* On-Device AI Keyboard
* Viral Prompts

Source:

https://banishwor.github.io/

The legacy profile additionally contains education, work history, publications and creator information.

---

# 69. WHAT MUST NOT BE ASSUMED

The following should be verified before final implementation if not supplied as assets/data:

* exact current book covers
* exact current book descriptions
* exact publication dates
* exact author metadata
* exact follower screenshots
* exact gaming history dates
* exact current social metrics
* exact Bani article categories
* exact Bani API/feed architecture
* exact GitHub repository inventory
* exact current Play Store URLs
* exact current social profile URLs

If the developer cannot verify something:

## ASK OR MARK VERIFY.

Never invent it.

---

# 70. BANI BLOG IMPLEMENTATION PRIORITY

The Bani application is not optional decoration.

It should demonstrate that the portfolio can consume and present real publishing content.

Priority:

### Phase 1

* Bani home
* featured article
* latest articles
* article reader
* categories
* back navigation

### Phase 2

* search
* related articles
* reading progress
* image viewer
* share
* bookmarks

### Phase 3

* offline cache
* smarter recommendations
* animations
* article transitions

---

# 71. MINI APPS IMPLEMENTATION PRIORITY

Do not attempt to recreate entire applications.

Recommended first versions:

### Manipur Calculator

One or two working calculations.

### Yek Salai

Surname/clan educational demo.

### Manipuri Calendar

Date/month/festival demo.

### Khutsuman

Attendance + wage calculation demo.

### Family Tree

Small interactive sample tree.

The goal is:

> demonstrate the real product idea.

Not:

> rebuild the entire application inside the portfolio.

---

# 72. FIRST LAUNCH EXPERIENCE

First visit can have a short boot-like transition.

Example:

```text
BANI OS

Initializing...

Projects ........ OK
Roots ........... OK
Books ........... OK
Bani ............ OK
Experiments ..... OK

WELCOME
```

Keep it short.

Approximately 1–2 seconds maximum.

After the first visit, consider skipping or shortening the boot sequence.

Do not force users to watch an animation every time.

---

# 73. HOME SCREEN FIRST IMPRESSION

After boot:

```text
                BANI OS

      ┌─────────────────────────┐
      │                         │
      │    BANISHWOR ATHOKPAM   │
      │    Software Developer   │
      │    Builder · Author     │
      │                         │
      └─────────────────────────┘

        [ Search Banishwor... ]

     ABOUT       WORK
     PROJECTS    EDUCATION

     BOOKS       BANI
     ROOTS       GAMING

     LAB         PLAY

            ↑
       SWIPE FOR SKILLS
```

This is conceptual, not a final visual specification.

---

# 74. HORIZONTAL SPACE INDICATOR

The user should understand that Home is horizontally navigable.

Possible subtle indicator:

```text
      ● ○ ○ ○
```

or a more creative spatial indicator.

Do not use a huge traditional carousel indicator.

It should feel like part of the OS.

---

# 75. MOBILE NAVIGATION PRINCIPLE

Always preserve orientation.

The visitor should know:

> Where am I?

> What can I do?

> How do I go back?

> What happens if I swipe?

Avoid gesture overload.

---

# 76. RESPONSIVE BEHAVIOR

Mobile should be designed first.

Then support:

* small phones
* large phones
* tablets

Do not simply scale the phone interface to tablet.

For tablets, adapt the spatial layout while keeping the BANI OS mental model.

---

# 77. DESKTOP FALLBACK

If the user visits the mobile BANI OS on desktop accidentally, do not simply stretch it.

Detect viewport/device appropriately and direct the experience toward the desktop BANISHWOR.EXE version.

However, do not block access.

There should always be a usable fallback.

---

# 78. URL / ROUTING STRATEGY

Although the interface behaves like an OS, URLs should remain meaningful.

Possible routes:

```text
/
 /mobile
 /desktop

/mobile/projects
/mobile/books
/mobile/bani
/mobile/roots
/mobile/skills
/mobile/gaming
/mobile/lab
```

The exact routing architecture can be decided during implementation.

Important:

Browser back/forward must still work.

Do not make the website inaccessible to normal browser navigation.

---

# 79. DEEP LINKING

A visitor should be able to share:

```text
/mobile/bani/article/example
```

and open directly into that content.

The OS should reconstruct the necessary UI state.

This is important for:

* SEO
* sharing
* bookmarks
* social media
* usability

---

# 80. SEO

Even though the interface is experimental, normal web fundamentals remain important.

Provide:

* title
* meta description
* Open Graph
* Twitter/X metadata
* canonical URLs
* structured data where appropriate
* semantic HTML
* crawlable content where practical

The creative OS should not destroy search discoverability.

---

# 81. SOCIAL SHARING

When sharing an article or project, generate a meaningful URL.

For example:

```text
BANI
Article title

Read inside BANI OS
```

Social previews should use real article/project images.

---

# 82. ANALYTICS

If analytics are added, keep them minimal and privacy-conscious.

Potential anonymous events:

```text
opened_project
opened_book
opened_bani
opened_article
used_search
opened_skills
entered_lab
played_game
```

Do not collect unnecessary personal information.

---

# 83. SECURITY

Never expose:

* API secrets
* Firebase private credentials
* service account credentials
* private family data
* private API keys

Any public data source must be designed as public.

---

# 84. CONTENT SOURCE PRIORITY

Use this priority:

1. Current portfolio data
2. Existing project repositories/data
3. Owner-supplied content
4. Existing public websites
5. Verified external sources

If sources conflict:

## Do not silently choose.

Mark the discrepancy and ask for confirmation when necessary.

---

# 85. DEVELOPMENT APPROACH

Do not attempt to build the entire OS at once.

Build a vertical slice first.

## Milestone 1

Create:

* Home
* 4×2 widget
* Search
* 10 icons
* horizontal swipe
* swipe-up Skills

Make this feel excellent.

## Milestone 2

Add:

* Projects
* mini apps
* app transitions

## Milestone 3

Add:

* Roots
* Family Tree
* Yek Salai
* Calendar

## Milestone 4

Add:

* Books
* Bani
* article reader

## Milestone 5

Add:

* Gaming
* Lab
* Arcade
* Music
* Bani TV

## Milestone 6

Add:

* Developer Mode
* Easter eggs
* achievements
* advanced motion

---

# 86. DO NOT OVERBUILD

The portfolio itself is the product.

If an interaction takes weeks to build but adds little value, don't build it.

Priority should be:

```text
Identity
↓
Navigation
↓
Projects
↓
Content
↓
Interactions
↓
Experiments
```

Not:

```text
3D effects
↓
particles
↓
shader
↓
portfolio content
```

---

# 87. FINAL EXPERIENCE GOAL

The visitor should be able to enter BANI OS and naturally discover:

```text
WHO IS HE?
    ↓
WHAT DOES HE BUILD?
    ↓
HOW DOES HE BUILD IT?
    ↓
WHAT HAS HE STUDIED?
    ↓
WHERE HAS HE WORKED?
    ↓
WHAT DOES HE WRITE?
    ↓
WHAT IS BANI?
    ↓
WHAT ARE HIS ROOTS?
    ↓
WHAT DID HE EXPERIMENT WITH?
    ↓
WHAT DOES HE DO FOR FUN?
```

without ever feeling like they are reading a résumé.

---

# 88. THE BIG IDEA

The entire project can be summarized as:

> **Don't build a portfolio that looks like an OS. Build an OS that happens to be a portfolio.**

The Home screen represents the person.

The Apps represent the things he built.

The Skills layer represents the technology behind them.

Roots represent culture and family.

Books represent writing.

Bani represents publishing and Meitei heritage.

Gaming represents the creator era.

Lab represents experimentation.

Arcade represents play.

Search represents discovery.

And the entire system becomes one interactive representation of:

# BANISHWOR ATHOKPAM

---

# 89. IMPLEMENTATION RULE

Before implementing any major feature:

1. Understand its purpose.
2. Determine whether it belongs to Home, Roots, Create, Play, or Skills.
3. Decide whether it should be an app, interaction, or content layer.
4. Check whether the information is verified.
5. Check whether the interaction is useful.
6. Build the smallest working version.
7. Test on a real mobile device.
8. Only then add visual polish.

Do not start by building decorative effects.

---

# 90. DEFINITION OF DONE

BANI OS is successful when a first-time visitor can:

* immediately identify Banishwor
* understand that this is an interactive portfolio
* navigate horizontally
* discover Skills by swiping upward
* open real project demos
* explore the cultural projects
* explore Books
* read Bani articles without leaving the OS
* discover gaming/creator history
* find archived experiments
* access external destinations when necessary
* use the website without understanding the underlying implementation
* enjoy the experience even if they never read the résumé

And technically:

* works on mobile
* works on desktop through the separate desktop experience
* respects reduced motion
* remains performant
* supports browser navigation
* supports deep links
* does not depend on fake browser UI
* does not invent personal information
* does not expose private information
* does not turn into an unnecessary 3D game

---

# 91. FINAL DESIGN DIRECTION

The final mobile experience should feel like:

**a personal operating system + interactive archive + mini app store + digital publication + creative playground.**

It should be unusual enough that someone remembers it after leaving.

But it should never become so experimental that the visitor cannot understand what Banishwor actually does.

The rule is:

> **Playful on the surface. Structured underneath.**

And above everything:

> **The interface is the portfolio.**
