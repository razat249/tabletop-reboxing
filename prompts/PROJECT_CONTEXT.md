# Tabletop Re-Boxing — Full Project Context

> **Domain:** [tabletopreboxing.shop](https://tabletopreboxing.shop)
> **Stack:** Next.js 16 (App Router) · React 19 · TypeScript 5.7 · Tailwind CSS 3.4 · shadcn/ui (Radix)
> **Target audience:** Board gamers in India (90% mobile traffic)
> **Owner:** Rajat — designs and 3D-prints every product by hand

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack & Dependencies](#2-tech-stack--dependencies)
3. [Directory Structure](#3-directory-structure)
4. [Configuration Files](#4-configuration-files)
5. [Data Layer](#5-data-layer)
6. [Image System](#6-image-system)
7. [Routing & Pages](#7-routing--pages)
8. [Component Architecture](#8-component-architecture)
9. [State Management](#9-state-management)
10. [Styling & Theming](#10-styling--theming)
11. [Mini Apps System](#11-mini-apps-system)
12. [SEO & Metadata](#12-seo--metadata)
13. [Checkout & Payments](#13-checkout--payments)
14. [Build, Deploy & Scripts](#14-build-deploy--scripts)
15. [Conventions & Patterns](#15-conventions--patterns)
16. [Common Tasks & How-Tos](#16-common-tasks--how-tos)

---

## 1. Project Overview

Tabletop Re-Boxing is an e-commerce site for premium, custom 3D-printed board game accessories sold in India. The product catalog includes:

- **Board Game Inserts** — custom-fit organizers for specific games
- **Board Game Upgrades** — premium replacement tokens and components
- **Travel Boxes** — compact portable game cases
- **Card and Resource Trays** — table-use holders for cards and tokens
- **Dice Towers and Trays** — rolling and organizing dice
- **PnP Board Games** — premium print-and-play games with professionally printed cards, boards, and 3D-printed components
- **Other Accessories** — miscellaneous board game accessories

The site also features **Mini Apps** — free, mobile-first browser tools (score trackers, player mats) for use at the game table.

All prices are in **INR (₹)**. Orders are placed through a checkout form and completed via **UPI payment** (QR code / payment link). Order confirmations are sent via **EmailJS**. Custom requests go through **WhatsApp**.

---

## 2. Tech Stack & Dependencies

### Core

| Package | Version | Purpose |
|---------|---------|---------|
| `next` | 16.1.6 | Framework (App Router, static export support) |
| `react` / `react-dom` | 19.2.3 | UI library |
| `typescript` | 5.7.3 | Type safety |
| `tailwindcss` | 3.4.17 | Utility-first CSS |
| `@tailwindcss/postcss` | ^4.1.13 | PostCSS plugin |

### UI & Components

| Package | Purpose |
|---------|---------|
| `@radix-ui/*` | Headless UI primitives (dialog, accordion, dropdown, select, tabs, tooltip, etc.) |
| `lucide-react` | Icon library |
| `class-variance-authority` | Component variant management (shadcn) |
| `clsx` + `tailwind-merge` | Class name merging (via `cn()` utility) |
| `tailwindcss-animate` | Animation utilities |
| `next-themes` | Dark/light mode |
| `sonner` | Toast notifications |
| `vaul` | Drawer component |
| `cmdk` | Command palette component |
| `embla-carousel-react` | Carousel |
| `recharts` | Charts |

### Forms & Validation

| Package | Purpose |
|---------|---------|
| `react-hook-form` | Form state management |
| `zod` | Schema validation |
| `@hookform/resolvers` | Zod ↔ react-hook-form bridge |

### Utilities

| Package | Purpose |
|---------|---------|
| `date-fns` | Date formatting |
| `input-otp` | OTP input component |

### Dev

| Package | Purpose |
|---------|---------|
| `@types/node`, `@types/react`, `@types/react-dom` | Type definitions |

---

## 3. Directory Structure

```
board-game-inserts/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (fonts, metadata, JSON-LD)
│   ├── client-layout.tsx         # Client shell (providers, header, footer)
│   ├── page.tsx                  # Home page (client component)
│   ├── globals.css               # Global styles, CSS variables, animations
│   ├── icon.svg                  # Favicon
│   ├── sitemap.ts                # Dynamic sitemap generator
│   ├── robots.ts                 # Robots.txt generator
│   │
│   ├── about/page.tsx            # About page
│   ├── guide/page.tsx            # Product care guide
│   ├── success/page.tsx          # Order success page
│   │
│   ├── products/
│   │   ├── page.tsx              # Product listing (server wrapper)
│   │   ├── products-client.tsx   # Product listing (client: search, filter, sort)
│   │   └── [id]/
│   │       ├── page.tsx          # Product detail (server: metadata, static params)
│   │       └── product-client.tsx # Product detail (client: gallery, cart)
│   │
│   ├── category/[id]/
│   │   ├── page.tsx              # Category page (server: metadata)
│   │   └── category-client.tsx   # Category page (client: product grid)
│   │
│   ├── checkout/
│   │   ├── layout.tsx            # Checkout layout (metadata)
│   │   └── page.tsx              # Full checkout flow (client)
│   │
│   ├── mini-apps/
│   │   ├── page.tsx              # Mini apps listing (server: SEO, schema)
│   │   ├── mini-apps-client.tsx  # Mini apps listing (client: search, grid)
│   │   ├── [slug]/page.tsx       # Mini app detail (server: metadata, schema)
│   │   ├── _data/mini-apps.ts    # Mini app registry and helpers
│   │   └── _apps/                # Individual mini app components
│   │       ├── terraforming-mars-player-mat/index.tsx
│   │       ├── sea-salt-and-paper-score-counter/index.tsx
│   │       └── flip-7-score-counter/index.tsx
│   │
│   └── assets/
│       ├── data/
│       │   ├── products.json     # Product catalog (~91 products)
│       │   ├── categories.json   # 7 categories
│       │   ├── colors.json       # Available print colors (7 colors)
│       │   ├── config.json       # Site config (shipping, currency, contact)
│       │   └── index.ts          # Data exports, enrichment, helpers
│       └── images/
│           ├── index.ts          # Image map, getImageSrc(), categoryFallbacks
│           ├── product-images.ts # Auto-generated product image manifest
│           └── *.svg/webp/jpg/png # ~76 image files
│
├── components/                   # Shared UI components
│   ├── header.tsx                # Site header with nav, search, cart, theme toggle
│   ├── footer.tsx                # Site footer
│   ├── product-card.tsx          # Product card (grid/list variants)
│   ├── category-card.tsx         # Category card with image and count
│   ├── search-box.tsx            # Search with autocomplete suggestions
│   ├── cart-sidebar.tsx          # Slide-out cart drawer
│   ├── floating-cart-bar.tsx     # Bottom sticky cart bar
│   ├── custom-request-bar.tsx    # Sticky custom request CTA
│   ├── request-modal.tsx         # Custom request form → WhatsApp
│   ├── newsletter-signup.tsx     # Email signup (mock)
│   ├── animated-background.tsx   # Decorative floating SVG background
│   ├── checkout-form.tsx         # Reusable checkout form (unused currently)
│   ├── quantity-selector.tsx     # +/- quantity control (unused currently)
│   ├── theme-provider.tsx        # next-themes wrapper
│   └── ui/                       # shadcn/ui components (~40 primitives)
│       ├── button.tsx, card.tsx, dialog.tsx, input.tsx, ...
│       └── (accordion, badge, carousel, command, drawer, etc.)
│
├── lib/                          # Utilities and context providers
│   ├── utils.ts                  # cn() class name merger
│   ├── format.ts                 # formatPrice, generateOrderId, formatDate, etc.
│   ├── cart-context.tsx          # Cart state (React Context + localStorage)
│   └── request-context.tsx       # Custom request modal state
│
├── hooks/                        # Custom React hooks
│   ├── use-mobile.tsx            # useIsMobile() — 768px breakpoint
│   └── use-toast.ts              # Toast notification state
│
├── public/
│   ├── CNAME                     # Custom domain: tabletopreboxing.shop
│   ├── sitemap.xml               # Static sitemap (also generated dynamically)
│   ├── robots.txt                # Static robots.txt
│   ├── product-feed.json         # Product feed for marketing
│   └── product-feed.csv          # Product feed CSV
│
├── scripts/
│   ├── generate-image-manifest.mjs  # Scans images → product-images.ts
│   ├── generate-product-feed.mjs    # Generates product-feed.json/csv
│   ├── generate-static-seo.mjs     # Pre-build SEO generation
│   ├── deploy.sh                    # GitHub Pages deployment
│   └── add-game-key.mjs            # Utility: add game field to products
│
├── docs/                         # Marketing docs
│   ├── BACKLINK-OUTREACH-GUIDE.md
│   └── INSTAGRAM-CAMPAIGN.md
│
├── prompts/                      # AI assistant context files
│   ├── promt.txt
│   └── mini-app-generation
│
└── Config files
    ├── package.json
    ├── tsconfig.json
    ├── next.config.mjs
    ├── tailwind.config.ts
    ├── postcss.config.mjs
    ├── components.json           # shadcn/ui configuration
    └── .npmrc                    # legacy-peer-deps=true
```

---

## 4. Configuration Files

### `next.config.mjs`

```javascript
const nextConfig = {
  ...(process.env.STATIC_EXPORT === '1' && { output: 'export' }),
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '',
  typescript: { ignoreBuildErrors: true },
  images: {
    unoptimized: true,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
}
```

- Static export is conditional (`STATIC_EXPORT=1`)
- Images are unoptimized (static export compatible)
- SVG rendering is allowed
- `basePath` supports GitHub Pages project sites

### `tailwind.config.ts`

- `darkMode: ["class"]` — class-based theme switching
- Fonts: `sans` = Inter, `serif` = Playfair Display
- Custom font size: `2xs` (0.6875rem)
- Colors: All HSL CSS variable-based (shadcn pattern)
- Shadows: `card`, `card-hover`, `elevated`
- Animations: `accordion-down`, `accordion-up`
- Plugin: `tailwindcss-animate`

### `components.json` (shadcn/ui)

- Style: default, RSC: true, TSX: true
- Base color: neutral, CSS variables: true
- Icon library: lucide
- Aliases: `@/components`, `@/lib`, `@/hooks`

### `tsconfig.json`

- Target: ES6, Strict mode, JSX: react-jsx
- Path alias: `@/*` → `./*`
- Module resolution: bundler

---

## 5. Data Layer

All product data is stored in **static JSON files** under `app/assets/data/`. There is no database or API.

### `products.json` — Product Catalog

~91 products. Each product has this schema:

```typescript
interface Product {
  id: string;              // Unique ID, e.g. "terraforming_mars_inserts"
  name: string;            // Display name
  category: string;        // Must match a category name from categories.json
  game?: string;           // Board game name (empty for generic accessories)
  price: number;           // Price in INR
  description: string;     // Product description
  featured: boolean;       // Show in "Featured Products" section
  hidden: boolean;         // Hide from listings (direct URL still works)
  outOfStock: boolean;     // Stock status
  showColorOption: boolean; // Show color picker on product page
  customizable?: string;   // Customization note (e.g. "Available in custom colours")
  specs: {                 // Technical specifications
    material?: string;     // e.g. "High quality PLA"
    compatibility?: string;
    weight?: string;
    size?: string;
    count?: string;
    [key: string]: string | undefined;
  };
  // These are set at runtime by the data module:
  image: string;           // Primary image URL (from product-images.ts)
  images: string[];        // Gallery image URLs
}
```

**Product counts by category (visible only):**

| Category | Count |
|----------|-------|
| Board Game Inserts | 28 |
| Board Game Upgrades | 16 |
| Card and Resource Trays | 15 |
| Other Accessories | 17 |
| Dice tower and Trays | 8 |
| Travel Boxes | 5 |
| PnP Board Games | 0 (newly added) |

### `categories.json` — Product Categories

```typescript
interface Category {
  id: string;             // URL slug, e.g. "board-game-inserts"
  name: string;           // Display name (used for product.category matching)
  description: string;    // Category description
  image: string;          // Category image path
  defaultImage?: string;  // Fallback SVG for products without images
  icon: string;           // Emoji icon
  productCount: number;   // Computed at runtime from visible products
}
```

**Current categories:** Board Game Inserts, Board Game Upgrades, Travel Boxes, Card and Resource Trays, Dice tower and Trays, PnP Board Games, Other Accessories.

### `colors.json` — Available Print Colors

7 colors: White (#f5f5f0), Black (#1a1a1a), Gray (#808080), Red (#ff0000), Blue (#0000ff), Green (#008000), Yellow (#f5c713).

### `config.json` — Site Configuration

```json
{
  "defaultSort": "newest",
  "freeShippingThreshold": 1000,
  "shippingCharge": 120,
  "currency": "INR",
  "currencySymbol": "₹",
  "whatsappNumber": "917014186406",
  "contactEmail": "razat249@gmail.com",
  "shippingDays": "4-5"
}
```

### `index.ts` — Data Exports & Helpers

This is the central data module. It:

1. Imports all JSON data files and `productImages` manifest
2. **Enriches products** with images: maps `productImages[product.id]` to `image` (first) and `images` (all)
3. **Filters hidden products**: `products = allProducts.filter(p => !p.hidden)`
4. **Computes `productCount`** per category from visible products
5. **Exports helpers:**
   - `getProductById(id)` — includes hidden products (for direct URLs)
   - `getFeaturedProducts()` — `featured === true`
   - `getProductsByCategory(categoryName)`
   - `getCategoryById(id)`

**Critical:** Category matching uses `product.category === category.name` (string comparison). When adding a new category, the `name` in `categories.json` must exactly match the `category` field in products.

---

## 6. Image System

### Product Images

Product images live in `app/assets/images/` and follow the naming convention:

```
{product_id}_1.{ext}   ← Primary image
{product_id}_2.{ext}   ← Gallery image 2
{product_id}_3.{ext}   ← Gallery image 3
...
```

Supported formats: `.webp`, `.jpg`, `.jpeg`, `.png`

The script `scripts/generate-image-manifest.mjs` scans the images directory and generates `app/assets/images/product-images.ts`, which webpack-imports all product images so they get hashed URLs that work with `basePath` on GitHub Pages.

This script runs automatically:
- Before `npm run dev` (`predev`)
- Before `npm run build` (`prebuild`)

### Image Resolution

`app/assets/images/index.ts` provides:

- **`imageMap`**: Maps paths like `/images/logo.svg` to webpack-imported assets
- **`getImageSrc(path)`**: Resolves a path to its bundled URL; falls back to original path
- **`getImage(path)`**: Returns full `{ src, width, height }` object
- **`categoryFallbacks`**: Maps category names to default SVG paths for products without images

### Adding Product Images

1. Place images in `app/assets/images/` following the naming convention
2. Run `npm run generate-images` (or it runs automatically on dev/build)
3. The product will automatically pick up its images

---

## 7. Routing & Pages

### Route Map

| Route | Type | Description |
|-------|------|-------------|
| `/` | Client | Home page — hero, search, new arrivals, categories, mini apps, featured, newsletter |
| `/products` | Server + Client | Product listing with search, filter, sort, grid/list toggle |
| `/products/[id]` | Server + Client | Product detail with gallery, lightbox, color picker, add-to-cart |
| `/category/[id]` | Server + Client | Category page with filtered products |
| `/checkout` | Client | Full checkout flow with UPI payment |
| `/success` | Client | Order confirmation (reads from sessionStorage) |
| `/about` | Server | Static about page |
| `/guide` | Server | Product care guide |
| `/mini-apps` | Server + Client | Mini apps listing with search |
| `/mini-apps/[slug]` | Server + Client | Individual mini app (full-bleed on mobile) |

### Server / Client Split Pattern

The project follows a consistent pattern:
- **Server `page.tsx`**: Handles metadata, `generateStaticParams`, `generateMetadata`, JSON-LD structured data
- **Client `*-client.tsx`**: Handles interactivity, URL state, user interactions

### Static Generation

- `generateStaticParams()` is used for `/products/[id]`, `/category/[id]`, `/mini-apps/[slug]`
- The site can be statically exported with `STATIC_EXPORT=1`
- `sitemap.ts` and `robots.ts` use `dynamic = "force-static"`

### Home Page Structure (`app/page.tsx`)

The home page is a client component with these sections (in order):

1. **Hero** — radial gradient background, headline, search box, "Browse all products" CTA
2. **Trust Strip** — custom colours, quality PLA, 4-5 day delivery
3. **About / Request Box** — personal message from Rajat + "Make a Request" CTA
4. **New Arrivals** — last 8 products (reversed), 4-column grid
5. **Categories** — all categories as cards, 3-column grid
6. **Mini Apps** — live mini apps as gradient cards, 3-column grid
7. **Featured Products** — products with `featured: true`, 4-column grid
8. **Newsletter** — email signup form

Each content section follows a consistent structure:
- `relative py-14 sm:py-20 overflow-hidden` wrapper
- Themed gradient background (teal, emerald, violet, amber per section)
- Header: colored badge pill, serif h2, muted description, "View all" link (desktop top-right, mobile bottom-center)

---

## 8. Component Architecture

### Provider Hierarchy (`app/client-layout.tsx`)

```
ThemeProvider (attribute="class", defaultTheme="system")
  └── CartProvider (localStorage-persisted cart)
        └── RequestProvider (custom request modal)
              ├── AnimatedBackground (decorative floating SVGs)
              ├── Header (nav, search, cart, theme toggle, mobile menu)
              ├── CustomRequestBar (sticky gradient CTA)
              ├── CartSidebar (slide-out cart drawer)
              ├── main → {children}
              ├── Footer (links, contact, copyright)
              ├── FloatingCartBar (bottom sticky cart summary)
              └── RequestModal (custom request form → WhatsApp)
```

### Key Components

| Component | File | Description |
|-----------|------|-------------|
| `Header` | `components/header.tsx` | Sticky header with logo, search, navigation links, cart button (with item count badge), theme toggle (sun/moon), custom request button, and mobile hamburger menu |
| `Footer` | `components/footer.tsx` | Site links, contact info, copyright |
| `SearchBox` | `components/search-box.tsx` | Text input with dropdown suggestions, keyboard navigation (arrow keys, Enter, Escape), `hero` variant for larger styling |
| `ProductCard` | `components/product-card.tsx` | Product card with image (fallback to category default on error), name, price, "Add to bag" button. Supports `variant="list"` for horizontal layout |
| `CategoryCard` | `components/category-card.tsx` | Category card with gradient overlay image, name, product count, description. Links to `/products?category={id}` |
| `CartSidebar` | `components/cart-sidebar.tsx` | Fixed right-side drawer with cart items, quantity controls, free-shipping progress nudge, subtotal, and "Proceed to checkout" link |
| `FloatingCartBar` | `components/floating-cart-bar.tsx` | Bottom sticky bar showing cart count and total; hidden on checkout page and when cart is empty |
| `CustomRequestBar` | `components/custom-request-bar.tsx` | Gradient sticky bar prompting custom requests; opens request modal |
| `RequestModal` | `components/request-modal.tsx` | Form for category, game name, and message; constructs WhatsApp URL and opens in new tab |
| `AnimatedBackground` | `components/animated-background.tsx` | Decorative SVGs (board game themed) with parallax scroll and float animations |
| `NewsletterSignup` | `components/newsletter-signup.tsx` | Email input with mock submit (500ms delay success) |
| `ThemeProvider` | `components/theme-provider.tsx` | Thin wrapper around `next-themes` `ThemeProvider` |

### shadcn/ui Components (`components/ui/`)

~40 pre-built Radix-based UI primitives: `Button`, `Card`, `Dialog`, `Input`, `Select`, `Tabs`, `Tooltip`, `Badge`, `Accordion`, `Carousel`, `Command`, `Drawer`, `Sheet`, `Skeleton`, etc.

These use the `cn()` utility for class merging and semantic color tokens (`bg-primary`, `text-primary-foreground`, etc.).

---

## 9. State Management

There is **no global store** (no Redux, Zustand, etc.). State is managed through React Context.

### Cart (`lib/cart-context.tsx`)

```typescript
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  customization?: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  total: number;  // Computed: sum of price * quantity
}
```

- Persisted in `localStorage` under key `"cart"`
- Hydration guard: waits for `isHydrated` before writing to localStorage
- `addToCart` increments quantity if item already exists

### Request (`lib/request-context.tsx`)

- Simple context exposing `openRequest()` function
- Parent (`ClientLayout`) holds `isRequestOpen` state and passes toggle as `onOpen`

### Theme

- Managed by `next-themes` via `ThemeProvider`
- Access via `useTheme()` hook
- Toggle in Header: `setTheme(theme === "dark" ? "light" : "dark")`

### Custom Hooks

| Hook | File | Purpose |
|------|------|---------|
| `useCart()` | `lib/cart-context.tsx` | Access cart state and actions |
| `useRequest()` | `lib/request-context.tsx` | Open custom request modal |
| `useIsMobile()` | `hooks/use-mobile.tsx` | Returns `true` when viewport < 768px |
| `useToast()` | `hooks/use-toast.ts` | Toast notification state via reducer |

---

## 10. Styling & Theming

### CSS Variables (HSL-based)

Defined in `app/globals.css` under `:root` (light) and `.dark` (dark):

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--background` | 0 0% 99% | 220 20% 6% | Page background |
| `--foreground` | 220 20% 10% | 210 20% 96% | Primary text |
| `--card` | 0 0% 100% | 220 18% 10% | Card backgrounds |
| `--primary` | 172 50% 28% (teal) | 172 50% 40% | Brand color, CTAs, links |
| `--secondary` | 220 14% 96% | 220 14% 16% | Secondary backgrounds |
| `--muted` | 220 14% 92% | 220 14% 20% | Muted backgrounds |
| `--accent` | 172 50% 28% | 172 50% 40% | Accent (same as primary) |
| `--destructive` | 0 72% 51% | 0 62.8% 30.6% | Error/danger |
| `--border` | 220 13% 91% | 220 14% 18% | Borders |
| `--radius` | 0.625rem | — | Border radius base |

### Utility Classes

| Class | Definition |
|-------|-----------|
| `section-padding` | `px-4 sm:px-6 lg:px-8 py-12 sm:py-16` |
| `section-padding-sm` | `px-4 sm:px-6 lg:px-8 py-8 sm:py-10` |
| `page-container` | `max-w-6xl mx-auto` |
| `smooth-transition` | `transition-all duration-200 ease-out` |
| `scrollbar-hide` | Hides scrollbar (webkit + Firefox) |
| `text-balance` | `text-wrap: balance` |

### Custom Animations (globals.css)

| Animation | Purpose |
|-----------|---------|
| `pulse-subtle` | Request button opacity pulse |
| `request-glow` | Request button box-shadow glow |
| `float-slow` / `float-medium` / `float-reverse` | Background SVG floating |
| `twinkle` / `twinkle-delayed` | Star/sparkle effects |
| `drift-1` / `drift-2` / `drift-3` | Background element drift |

### Dark Mode

- Library: `next-themes`
- Method: Class-based (`<html class="dark">`)
- Default: System preference
- Toggle: Sun/Moon button in Header
- All components use Tailwind `dark:` variants

### Typography

- Body: Inter (variable weight)
- Headings: Playfair Display (serif)
- Both loaded via `next/font/google`

### Fonts are set via CSS variables:

```
--font-inter → font-sans
--font-playfair → font-serif
```

---

## 11. Mini Apps System

Mini apps are standalone, mobile-first browser tools for use during board game sessions.

### Registry (`app/mini-apps/_data/mini-apps.ts`)

```typescript
interface MiniApp {
  slug: string;           // URL slug
  name: string;           // Full display name
  description: string;    // Short description
  game: string;           // Board game name
  icon: string;           // Emoji icon
  status: "live" | "coming-soon";
  gradient: string;       // Tailwind gradient classes for card backgrounds
  borderAccent: string;   // Tailwind hover border class
}
```

**Helpers:** `getMiniAppBySlug(slug)`, `getLiveMiniApps()`

### Current Mini Apps

| Slug | Name | Game | Status |
|------|------|------|--------|
| `terraforming-mars-player-mat` | Terraforming Mars Player Mat | Terraforming Mars | live |
| `sea-salt-and-paper-score-counter` | Sea Salt & Paper Score Counter | Sea Salt & Paper | live |
| `flip-7-score-counter` | Flip 7 Score Counter | Flip 7 | live |

### Architecture

Each mini app is a self-contained React component in `app/mini-apps/_apps/{slug}/index.tsx`. The dynamic route page (`app/mini-apps/[slug]/page.tsx`) maps slugs to components:

```typescript
const appComponents: Record<string, React.ComponentType> = {
  "terraforming-mars-player-mat": TerraformingMarsPlayerMat,
  "sea-salt-and-paper-score-counter": SeaSaltAndPaperScoreCounter,
  "flip-7-score-counter": Flip7ScoreCounter,
};
```

### Mobile Layout

On mobile (`sm:hidden`), mini apps render **full-bleed** below a compact header (back link + app name). No padding, no card borders — the entire viewport below the navbar is available for the app.

On desktop (`hidden sm:block`), apps render inside a card container with standard padding and a back link.

### Design Principles for Mini Apps

- **Mobile-first**: 90% of users are on mobile. Large touch targets (min 40×40px), `active:scale-95` for tactile feedback, `select-none` to prevent text selection
- **Thematic**: Each app is themed to its game with custom SVG illustrations, animations, and color palettes
- **Dark/Light mode**: Apps support both themes using Tailwind `dark:` classes
- **Self-contained**: Each app manages its own state internally (no global state needed)

### Adding a New Mini App

1. Create `app/mini-apps/_apps/{slug}/index.tsx` with a `"use client"` component
2. Add an entry to the `miniApps` array in `app/mini-apps/_data/mini-apps.ts`
3. Import and add the component to `appComponents` in `app/mini-apps/[slug]/page.tsx`
4. The listing page, home page, sitemap, and SEO will automatically pick it up

---

## 12. SEO & Metadata

### Root Metadata (`app/layout.tsx`)

- Title template: `"%s | Tabletop Re-Boxing"`
- Default title: `"Tabletop Re-Boxing – Premium Board Game Inserts & Accessories"`
- Keywords: board game inserts, 3D-printed, accessories, mini apps, PnP games, etc.
- OpenGraph: type website, site name, image
- Twitter: summary_large_image
- JSON-LD: `Organization` + `WebSite` with `SearchAction`
- Canonical: `https://tabletopreboxing.shop`

### Per-Page Metadata

- **Product pages**: Dynamic metadata with product name, description, price, category. JSON-LD `Product` schema
- **Category pages**: Dynamic metadata with category name and description
- **Mini app pages**: JSON-LD `WebApplication` + `BreadcrumbList`
- **Mini apps listing**: JSON-LD `ItemList` + `CollectionPage`

### Sitemap (`app/sitemap.ts`)

Dynamically generates sitemap entries for:
- Static pages: `/`, `/products`, `/mini-apps`, `/checkout`, `/about`, `/guide`
- All visible products: `/products/{id}`
- All categories: `/category/{id}`
- All live mini apps: `/mini-apps/{slug}`

A static copy is also maintained at `public/sitemap.xml`.

### Robots (`app/robots.ts`)

- Allow: `/`
- Disallow: `/success`
- Sitemap: `https://tabletopreboxing.shop/sitemap.xml`

---

## 13. Checkout & Payments

### Flow

1. **Cart empty** → Message with link to products
2. **Cart has items** → Two-column layout:
   - Left: Personal info form (name, email, phone) + Shipping address (address, city, state, pincode)
   - Right: Order summary (items, quantities, subtotal, shipping, total)
3. **Submit** → Payment modal appears:
   - UPI QR code image (`phonepe_qr.jpg`)
   - UPI payment link button
   - "I've Completed the Payment" confirmation button
4. **Confirm payment** →
   - Generate order ID (`ORD-{timestamp}-{random}`)
   - Send order email via EmailJS
   - Clear cart
   - Show `OrderConfirmed` view with order details and WhatsApp link

### Payment

- **Method**: UPI (PhonePe QR code)
- **No payment gateway integration** — honor system with QR code
- **Email service**: EmailJS (`service_k00i427`, `template_order`)

### Shipping

- Free shipping on orders ≥ ₹1,000
- Shipping charge: ₹120
- Delivery: 4-5 business days

---

## 14. Build, Deploy & Scripts

### npm Scripts

| Script | Command | Purpose |
|--------|---------|---------|
| `dev` | `next dev --turbo` | Start dev server with Turbopack |
| `build` | `next build` | Production build |
| `start` | `next start` | Start production server |
| `lint` | `next lint` | Run ESLint |
| `generate-images` | `node scripts/generate-image-manifest.mjs` | Regenerate product image manifest |
| `generate-feed` | `node scripts/generate-product-feed.mjs` | Generate product feed JSON/CSV |
| `deploy` | `bash scripts/deploy.sh` | Deploy to GitHub Pages |

### Pre-hooks

- `predev` → `generate-image-manifest.mjs` (auto-discover new product images)
- `prebuild` → `generate-image-manifest.mjs` + `generate-static-seo.mjs`

### Deployment (`scripts/deploy.sh`)

Deploys to **GitHub Pages** via the `gh-pages` branch:

1. Detects repository name from git remote for `basePath`
2. Sets `STATIC_EXPORT=1` and `NEXT_PUBLIC_BASE_PATH`
3. Temporarily moves API routes (not supported in static export)
4. Runs `npm run build`
5. Adds `.nojekyll` to output
6. Force-pushes the `out/` directory to `gh-pages` branch

### Custom Domain

- `public/CNAME` contains `tabletopreboxing.shop`
- GitHub Pages serves the site from this domain

### Environment Variables

| Variable | Purpose |
|----------|---------|
| `STATIC_EXPORT` | Set to `1` for static export build |
| `NEXT_PUBLIC_BASE_PATH` | Base path for GitHub Pages project sites |
| `BASE_URL` | Used in product feed script (default: `https://tabletopreboxing.shop`) |
| `COPY_IMAGES` | Copy images when generating product feed |

---

## 15. Conventions & Patterns

### File Naming

- Pages: `page.tsx` (Next.js App Router convention)
- Client components: `*-client.tsx` (co-located with server page)
- Data files: kebab-case `.json`
- Images: `{product_id}_{n}.{ext}` for products, kebab-case for static assets
- Mini apps: `app/mini-apps/_apps/{slug}/index.tsx`

### Component Patterns

- **Server page + client component split**: Server handles metadata/SSG, client handles interactivity
- **`"use client"` directive**: Only on components that need browser APIs or React hooks
- **Props over context**: Components receive data via props where possible; context only for cross-cutting concerns (cart, theme, request modal)
- **`cn()` for class names**: All conditional classes use `cn()` from `lib/utils.ts`

### Styling Patterns

- **Tailwind-first**: All styling via Tailwind utility classes
- **No CSS modules**: Global CSS only in `globals.css`
- **Consistent section structure**: Badge pill → serif heading → muted description → grid content
- **Responsive breakpoints**: Mobile-first with `sm:`, `md:`, `lg:` breakpoints
- **Gradient backgrounds**: Each section has a unique gradient using `from-{color}/5 via-background to-{color}/5`

### Data Patterns

- **No API routes**: All data is static JSON imported at build time
- **No database**: Product catalog is `products.json`
- **Category matching**: `product.category` must exactly match `category.name`
- **Image enrichment**: Done at import time in `app/assets/data/index.ts`
- **Hidden products**: `hidden: true` removes from listings but keeps direct URLs working

### Currency

- All prices are in **INR (₹)**
- `formatPrice()` in `lib/format.ts` formats as USD (this is a legacy artifact; the checkout page formats prices as `₹{price}` directly)

---

## 16. Common Tasks & How-Tos

### Adding a New Product

1. Add a product object to `app/assets/data/products.json` with all required fields
2. Set `category` to exactly match an existing category name
3. Place product images in `app/assets/images/` as `{product_id}_1.{ext}`, `{product_id}_2.{ext}`, etc.
4. Run `npm run generate-images` (or restart dev server)
5. Update `public/sitemap.xml` with the new product URL

### Adding a New Category

1. Add category object to `app/assets/data/categories.json` (before "Other Accessories")
2. Create or source a category image (SVG preferred) in `app/assets/images/`
3. Import and register the image in `app/assets/images/index.ts` (import, imageMap entry, categoryFallbacks entry)
4. Update site-wide text in: `app/page.tsx` (hero, categories description), `app/layout.tsx` (keywords, description), `app/products/page.tsx` (metadata), `app/about/page.tsx` (metadata, body text)
5. Add the category URL to `public/sitemap.xml`
6. The dynamic sitemap (`app/sitemap.ts`) will auto-include it

### Adding a New Mini App

1. Create `app/mini-apps/_apps/{slug}/index.tsx` as a `"use client"` component
2. Add entry to `miniApps` array in `app/mini-apps/_data/mini-apps.ts` with `slug`, `name`, `description`, `game`, `icon`, `status: "live"`, `gradient`, `borderAccent`
3. Import the component in `app/mini-apps/[slug]/page.tsx` and add to `appComponents` map
4. The listing page, home page, sitemap, and SEO schemas will automatically pick it up
5. Design mobile-first with game-themed SVG illustrations and animations
6. Support dark/light mode using Tailwind `dark:` classes

### Deploying

```bash
npm run deploy    # Builds static export and deploys to GitHub Pages
```

Or for a standard server deployment:

```bash
npm run build && npm start
```

### Regenerating Product Feed

```bash
npm run generate-feed              # JSON + CSV
npm run generate-feed:images       # Also copy images
```

---

## Appendix: Key File Quick Reference

| What you need | Where to find it |
|---------------|-----------------|
| Product data | `app/assets/data/products.json` |
| Category data | `app/assets/data/categories.json` |
| Site config (shipping, currency, contact) | `app/assets/data/config.json` |
| Color options | `app/assets/data/colors.json` |
| Data exports & helpers | `app/assets/data/index.ts` |
| Image map & fallbacks | `app/assets/images/index.ts` |
| Product image manifest | `app/assets/images/product-images.ts` (auto-generated) |
| Mini app registry | `app/mini-apps/_data/mini-apps.ts` |
| Cart state | `lib/cart-context.tsx` |
| Class name utility | `lib/utils.ts` → `cn()` |
| Format helpers | `lib/format.ts` |
| CSS variables & themes | `app/globals.css` |
| Tailwind config | `tailwind.config.ts` |
| Root layout & metadata | `app/layout.tsx` |
| Client shell & providers | `app/client-layout.tsx` |
| shadcn/ui config | `components.json` |
| Deploy script | `scripts/deploy.sh` |
