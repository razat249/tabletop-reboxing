# Instagram promotion: show products by user interest

Use a **product catalog** and **dynamic ads** so the posts people see are your actual products, and you can target by what they search or like (e.g. “board games”, “Wingspan”, “tabletop”).

## 1. Generate the product feed

From the project root:

```bash
# CSV + JSON only (for upload or manual use)
node scripts/generate-product-feed.mjs

# Also copy first product image into public/feed-images/ (needed for catalog image URLs)
COPY_IMAGES=1 node scripts/generate-product-feed.mjs
```

- **Output:** `public/product-feed.csv`, `public/product-feed.json`, and (if `COPY_IMAGES=1`) `public/feed-images/<product-id>.<ext>`.
- **Base URL:** Set `BASE_URL=https://yoursite.com` if your site is not `https://tabletopreboxing.shop`.
- Deploy the site so `https://yoursite.com/feed-images/...` and `https://yoursite.com/product-feed.csv` are live (or host the CSV/feed elsewhere).

## 2. Create a catalog in Meta (Facebook / Instagram)

1. Go to [Meta Business Suite](https://business.facebook.com) → **Commerce Manager** (or **Settings** → **Commerce**).
2. Create a **Catalog** (e.g. “Tabletop Re-Boxing products”).
3. Add products:
   - **Upload** → “Upload product feed” → choose **CSV**.
   - Upload `product-feed.csv` (or use a **feed URL** if you host it: `https://tabletopreboxing.shop/product-feed.csv`).
4. Map columns: `id`, `title`, `description`, `link`, `image_link`, `price`, `availability`, `condition`, `brand`. Use “price” as single price field; currency can be set in catalog/currency settings (INR).
5. Make sure **image_link** URLs are reachable (that’s why we copy images to `public/feed-images/` and deploy).

After upload, Meta will show your products in the catalog. You can re-upload the CSV or update the feed URL when you add/change products.

## 3. Run Instagram / Facebook ads that show your products

- **Catalog / dynamic ads:** Create an ad campaign that uses this catalog. Meta can show **different products to different people** based on who’s most likely to care (e.g. people who searched “board game inserts” or engaged with board-game content).
- **Audience:** In the ad set, use **Audiences** → **Custom audiences** or **Interests** and add interests like “Board game”, “Tabletop game”, “Wingspan”, “Terraforming Mars”, etc. The **posts** users see will be your products from the catalog.
- **Creative:** For dynamic ads, choose “Use catalog” and pick a template; Meta fills in product image, title, description, and link from the feed. So the “post” each user sees is literally one of your products.

## 4. Targeting “by search” (interest-based)

Instagram/Facebook don’t target by “search query” the same way Google does. You approximate “user searches” with:

- **Interest targeting:** Add interests such as “Board game”, “Tabletop game”, “Catan”, “Wingspan”, “Dungeons & Dragons”, “Hobby”, “Strategy game”.
- **Lookalike audiences:** Create a lookalike of people who visited your site or bought, so you reach people who behave like your customers.
- **Retargeting:** Show product ads to people who visited your site or opened a product page (install Meta Pixel if you haven’t).

So “products according to user searches” = **right product from your catalog** (e.g. Wingspan insert) shown to people whose **interests** match (e.g. Wingspan, board games). The feed’s `game` and `category` columns are in the CSV for your reference; you can use them later if Meta supports custom attributes for targeting.

## 5. Checklist

- [ ] Run `COPY_IMAGES=1 node scripts/generate-product-feed.mjs` and deploy so `feed-images/` and `product-feed.csv` are live.
- [ ] Create a Meta catalog and upload `product-feed.csv` (or add feed URL).
- [ ] Confirm all products have an image and a working `link` and `image_link`.
- [ ] Create a campaign that uses the catalog (dynamic ads) and set interests/lookalikes so the **posts users see are your products**.

## 6. Updating the feed

When you add or edit products:

1. Regenerate: `node scripts/generate-product-feed.mjs` (and `COPY_IMAGES=1` if you need to refresh `feed-images/`).
2. Re-upload the CSV in Commerce Manager, or wait for Meta to re-fetch the feed URL if you use one.
3. Redeploy the site so new `feed-images/` and CSV are live.

This keeps the posts users see in your Instagram campaign aligned with your current products and images.
