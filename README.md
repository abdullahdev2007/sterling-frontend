# Sterlings Lanka Performance

A React e-commerce frontend for a performance auto-parts retailer in Sri Lanka — built from design references into a fully interactive, production-structured SPA, with a real AI fitment assistant.

**Stack:** React 18 · Vite · React Router · Context API · Vercel Serverless Functions · CSS3

## Features

- **6 fully routed pages** — Home, Shop (live search/filter/sort), Product Detail, Cart, Wishlist, plus a 404 fallback
- **AI Fitment Assistant** — a chat widget that recommends parts from the live catalogue based on the customer's vehicle and goal. Backed by a Vercel serverless function calling the Anthropic API, grounded only in real catalogue data (no hallucinated products/prices). Degrades gracefully to a local keyword matcher with zero setup in dev or if the API is unavailable.
- **Persistent cart & wishlist** — state survives a page refresh via `localStorage`, no backend required
- **Toast notification system** — non-blocking UX feedback on every add-to-cart / wishlist action
- **WhatsApp-native checkout** — builds an order summary from live cart state into a pre-filled `wa.me` message, matching how small retailers in Sri Lanka actually take orders
- **Accessible by default** — semantic landmarks, `aria-label`/`aria-pressed` on icon-only controls, `aria-live` toast region, lazy-loaded images
- **SEO-ready** — Open Graph + Twitter Card meta tags, descriptive title/description, custom favicon

## Why these choices

| Decision | Reasoning |
|---|---|
| Context API over Redux | Three small, independent slices of state (cart, wishlist, toasts) — Redux would be unjustified boilerplate at this scale |
| Vite over CRA | CRA is deprecated; Vite's dev server and HMR are the current standard |
| Serverless function over a full backend | The AI assistant needs a server only to hide the API key — a Vercel function is the minimum viable server, not a maintained Express app |
| Client-side fallback for the AI assistant | The widget must never look broken — if there's no API key (local dev) or the call fails, it degrades to local keyword matching instead of an error state |
| Plain CSS with design tokens over Tailwind | The visual system was fixed by an existing design reference — CSS variables gave pixel control without fighting a utility framework |
| Static product data over a database | This repo is the frontend layer; swapping `src/data/products.js` for a real API is a drop-in follow-up, not a rewrite |

## Project structure

```
api/
  assistant.js    Vercel serverless function — proxies to Claude API, server-side only
src/
  components/     Header, Footer, ProductCard, AiAssistant — shared UI
  context/        CartContext, WishlistContext, ToastContext
  data/           products.js — static catalogue (swap for an API later)
  pages/          Home, Shop, ProductDetail, Cart, Wishlist, About, NotFound
```

## Run locally

```bash
npm install
npm run dev
```

The AI assistant works immediately with zero setup — it uses the local keyword matcher
since Vite doesn't execute `/api` functions in dev mode.

## Enabling the real AI assistant (after deploying to Vercel)

1. Deploy this repo to [Vercel](https://vercel.com) (zero-config for Vite).
2. In your Vercel project → Settings → Environment Variables, add `ANTHROPIC_API_KEY`
   with a key from [console.anthropic.com](https://console.anthropic.com).
3. Redeploy. The assistant now calls Claude directly, grounded in your product catalogue.

Never commit a real key — see `.env.example` for local `vercel dev` testing.

## Known limitations (and the plan for each)

- **No backend database** — product data is static. Next step: a small API behind the same data shape.
- **No payment gateway** — checkout is a WhatsApp message by design (matches the client's actual sales process); a gateway (Stripe/PayHere) would be additive, not a redesign.
- **Placeholder product photography** — images were extracted from the design reference for prototyping; swapping in real photos is a file-replacement task, not a code change.

## License

MIT — built as a learning/portfolio project.

