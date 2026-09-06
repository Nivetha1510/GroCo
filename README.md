# GroCo — React replication

A React replication of the supplied GroCo grocery website (Figma prototype +
83-frame PDF). This is a UI replication project, not a redesign — layout,
copy, colours and interactions follow the supplied frames.

## Run

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Stack

React 18 · Vite · JavaScript · React Router DOM 6 · plain CSS · Context API ·
LocalStorage · react-icons. No TypeScript, Tailwind, Bootstrap, MUI or any
external UI component library.

## Structure

```
src/
├── assets/images/      56 images extracted from the supplied PDF
├── components/         Header, Footer, SectionRibbon, ProductCard,
│                       BuyNowCard, CategoryCard, FeatureCard, ReviewCard,
│                       BlogCard, CategoryPanel, SearchBar, StarRating,
│                       StepProgress, BackButton, Layout, ScrollToTop
├── context/            CartContext, FavoritesContext, OrderContext, AuthContext
├── data/               products.js, categoryProducts.js, content.js
├── pages/              Home, About, Categories, ProductDetail, Contact, Cart,
│                       Login, Register, Search, BlogPost, Checkout, Payment,
│                       Confirmation, OrderTracking, Support, NotFound
├── styles/             variables.css (design tokens), global.css
├── App.jsx             routing
└── main.jsx            entry + providers
```

## Routes

| Route | Frame |
|---|---|
| `/` | 40 |
| `/about` | 50 |
| `/categories` | 43 |
| `/categories/:category` | 45–48 (vegetables, fruits, dairy-products, fresh-meats) |
| `/product/:id` | 55–60 |
| `/contact` | 51 |
| `/cart` | 44, 64 |
| `/login` | 52, 66, 70 |
| `/checkout` | 65, 71–82 |
| `/payment` | 53, 67–69 |
| `/confirmation` | 54 |
| `/tracking` | 49 |
| `/register`, `/search`, `/blog/:id`, `/support` | no frame — see Notes |

## Design tokens

Sampled directly from the frames (`src/styles/variables.css`):

| Token | Value | Use |
|---|---|---|
| `--page-bg` | `#FFF8F5` | page background |
| `--band` | `#FFDFD1` | header + footer band |
| `--brand-green` | `#2E7D32` | headings, nav, prices |
| `--accent` | `#FE844B` | buttons, ribbons |
| `--accent-strong` | `#FE5303` | active nav, icons |
| `--teal-cta` | `#009E6D` | "Continue to Payment" |

The five colours from the supplied UI reference image (`#4CAF50`, `#A5D6A7`,
`#E8F5E9`, `#333333`, `#757575`) are declared alongside these. Where the
GroCo frames differ from that reference, the frames win, as instructed.

Measured metrics: header 156px · cards 362×410 · review cards 418px wide ·
blog cards 345×386 · section rhythm 190px · ribbon 363×100 with a 39px notch
at 55% height (reproduced as a CSS `clip-path`).

## Typography

Poppins, self-hosted via `@fontsource/poppins` (npm) so the site renders
correctly offline. To use Google Fonts instead, remove the six
`@fontsource` imports from `src/main.jsx` and add the standard
`<link>` to `index.html`.

## Assets

The supplied ZIP (`Grocery App Images`) turned out to belong to a different
project — it contains an "Organia" logo and packaged Indian grocery items,
none of the GroCo cutouts, illustrations, avatars or blog images the frames
use. All 56 images here were therefore extracted from the supplied PDF
(reference #2), white-flattened and resized. Nothing was downloaded from the
web and nothing was generated.

## Notes on the supplied design

Reproduced as-is:

- Every card in the category grids carries the same label — "Fresh Milk" /
  "Avain milk" / "$8.99" — regardless of the product image.
- Spellings kept verbatim: "Fresh  Meet", "Add to card", "Avain milk",
  "vegitables And Fruits", "I would like to revive newsletter".
- Cart quantity is display-only with a delete control; the design has no
  +/− stepper.
- Applying a coupon or promo code shows an "Applied" state without changing
  the total, because the design specifies no discount value.

Resolved because the frames conflict:

- **Shipping fee** — Checkout says `$5.00`, Confirmation says `$15.00`.
  `$5.00` is used throughout so the arithmetic is consistent. Change
  `SHIPPING_FEE` in `src/data/content.js` to switch.
- **Payment amount** — the frame hardcodes `Rs.460`; the live order total is
  rendered instead, formatted in dollars to match every other screen.
- **Favourite heart** — the design only ever shows the filled red heart, so
  the resting state is a red outline heart and the active state fills.

Built without a frame (minimal, reusing existing design elements):

- `/register` — mirrors the Log In frame so "Create Now?" resolves.
- `/search` — the prototype has a search-bar component but no results screen;
  results reuse the two existing card styles.
- `/blog/:id` — renders the blog card's own content at page scale.
- `/support` — reuses the contact details already in the footer.

## Verification

- `npm run build` passes with no errors.
- Full journey tested headless: Home → Add to card → Category → Favourite →
  Buy Now → Cart → Coupon → Remove → Checkout (validation + 9 fields) →
  Payment (validation + card entry) → Confirmation → Tracking, plus Search,
  Login, and all remaining routes. No console errors.
- Home renders at 6886px against the Figma frame's 6910px (0.3%).
- No horizontal overflow at 1440 / 1024 / 768 / 375.
