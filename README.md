# Pixel Point

Online store for an electronics shop in Argentina: phones, consoles, peripherals, accessories and drones. Customer accounts, favorites, cart, Mercado Pago payments and an admin panel with sales metrics. Built as freelance work by [Kevin Villegas](https://github.com/Kev-Villegas). The interface is in Spanish.

## What it does

**Customers**

- Browse by category and brand, search products, save favorites.
- Cart and checkout with Mercado Pago: the preference is created on the server and the payment form is embedded in the checkout.
- Sign in with email and password or Google; email verification before orders and favorites.
- Order history with a status flow: `PAGO_PENDIENTE` → `ENVIO_PENDIENTE` → `ENVIADO` → `ENTREGADO`.

**Admin**

- Product management with image uploads (Cloudinary).
- Orders and shipping status.
- Dashboard with KPIs, sales summary, monthly trends and best sellers (Recharts).

## Engineering notes

**Payments (`app/api/checkout`)**

- The Mercado Pago webhook is authenticated: the `x-signature` header is checked with HMAC-SHA256 over the documented manifest and compared in constant time. The payment id comes from the signed query string, not from the body, and the payment is then fetched from Mercado Pago's API.
- Notifications are idempotent. Mercado Pago retries, so the order is marked as paid by one conditional `UPDATE ... WHERE paid = false`; only the first notification matches and discounts stock.
- Out-of-order notifications cannot revert an order that was already paid. Unknown payments (404) are acknowledged so they are not retried forever; transient errors (5xx) return an error so Mercado Pago retries.
- Purchase and checkout events are also sent server-side to the Meta Conversions API, deduplicated with the browser event id, and a Meta failure never affects the order.

**Access control**

- NextAuth v5 with a Prisma adapter and JWT sessions. Roles `ADMIN` and `USER`.
- Middleware keeps `/protected/*` for admins and sends unverified accounts to email verification before `/orders` and `/favorites`.

**Data**

- PostgreSQL with Prisma 7 (`pg` adapter). 19 migrations, including the move from MySQL to PostgreSQL.
- A product catalog feed for Meta at `/api/fb-catalog`.

**Quality**

- Strict TypeScript, ESLint and Prettier, Husky and lint-staged on commit.
- Playwright end-to-end tests in `tests/`: sign-in, registration, form validation and a checkout against Mercado Pago's sandbox. They run in GitHub Actions on every push and pull request.

## Stack

Next.js (App Router), React, TypeScript, Prisma, PostgreSQL, NextAuth v5, Mercado Pago SDK, Cloudinary, Tailwind CSS with Radix UI, Zustand, SWR, Recharts, Playwright.

## Run it locally

```bash
npm install
# create .env with the variables below
npx prisma migrate deploy
npx prisma db seed
npm run dev
```

Variables the code reads:

| Variable | Used for |
| --- | --- |
| `DATABASE_URL` | PostgreSQL connection |
| `AUTH_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | NextAuth |
| `ACCESS_TOKEN`, `NEXT_PUBLIC_PUBLIC_KEY`, `MP_WEBHOOK_SECRET` | Mercado Pago (credentials and webhook secret) |
| `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Image uploads |
| `META_PIXEL_ID`, `NEXT_PUBLIC_META_PIXEL_ID`, `FB_CONVERSION_API_TOKEN` | Meta Pixel and Conversions API |
| `NEXT_PUBLIC_URL` | Base URL used by the app and by the Playwright suite |

Run the tests with `npx playwright test`.

## Next steps

- Run the Playwright suite against a local server and a seeded database in CI, instead of the deployed URL.
- Add lint, type-check and build steps to the workflow.
- Move the remaining `any` types in the API routes to shared, validated schemas.
