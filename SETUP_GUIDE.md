# 3D Print Board Games - Setup & Customization Guide

Your beautiful board game e-commerce website is ready! Here's everything you need to know to customize and launch it.

## 🚀 Quick Start

1. The website is fully functional and ready to preview
2. All product images have been generated
3. Sample data is in place - you can replace it anytime

## 📝 Customizing Your Store

### Step 1: Update Product Information

Edit `/public/data/products.json` with your products:

```json
{
  "id": "unique-product-id",
  "name": "Your Product Name",
  "category": "Board Game Inserts",  // Must match a category name below
  "price": 29.99,
  "image": "/images/your-image.jpg",
  "description": "Product description here",
  "featured": false,  // Set to true to show on homepage
  "specs": {
    "material": "PLA",
    "weight": "250g",
    "compatibility": "Game name"
  }
}
```

### Step 2: Update Categories

Edit `/public/data/categories.json`:

```json
{
  "id": "category-id",
  "name": "Category Name",  // Must match category in products
  "description": "Category description",
  "image": "/images/category-image.jpg",
  "productCount": 5,  // Count of products in this category
  "icon": "📦"  // Any emoji you like
}
```

### Step 3: Add Your Images

Replace product images in `/public/images/` with your own photos:
- Gloomhaven Insert: `/public/images/gloomhaven-insert.jpg`
- Catan Tokens: `/public/images/catan-tokens.jpg`
- And so on...

## 📧 Email Configuration (Optional but Recommended)

To receive automatic order confirmations at razat249@gmail.com:

### Setup Gmail:

1. **Create an App Password:**
   - Go to [myaccount.google.com](https://myaccount.google.com)
   - Navigate to Security
   - Find "App passwords" (only if 2FA is enabled)
   - Select "Mail" and "Windows Computer"
   - Copy the 16-character password

2. **Add to v0 Vars:**
   - Click on **Vars** in the left sidebar
   - Add `GMAIL_USER` = your Gmail address (e.g., razat249@gmail.com)
   - Add `GMAIL_PASSWORD` = the app password you just created
   - Save and redeploy

3. **Orders will now:**
   - Send confirmation to customer's email
   - Send order details to razat249@gmail.com
   - Include all customer info and items

### Without Email Setup:
The checkout still works! Customers can place orders, but you won't receive automated emails. You'll need to manually check the website or implement a different solution.

## 🎨 Styling & Colors

The site uses a premium teal and warm color scheme. To change:

1. Edit `/app/globals.css` and update the CSS variables:

```css
:root {
  --primary: 168 86% 39%;      /* Teal accent color */
  --background: 250 10% 97%;   /* Off-white background */
  --foreground: 20 10% 15%;    /* Dark text color */
  --accent: 168 86% 39%;       /* Highlight color */
}
```

Use [HSL Color Picker](https://www.hsluv.org/) to find your colors, then update these values.

## 🛒 Testing Checkout

1. Add products to cart
2. Click cart icon or go to `/checkout`
3. Fill out the form
4. Click "Complete Order"
5. You'll be redirected to success page
6. (If email is set up) Check razat249@gmail.com for order

**Test with fake data - no payment processing happens!**

## 📱 Mobile Responsive

The entire site is mobile-first and responsive:
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3-4 columns

Test on your phone to ensure everything looks good.

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Add environment variables:
   - `GMAIL_USER`: your Gmail
   - `GMAIL_PASSWORD`: app password
5. Deploy! 🎉

### Deploy Elsewhere

You can deploy to any Node.js host:
- AWS Amplify
- Netlify
- DigitalOcean
- Railway
- Heroku

## 📊 File Structure Reference

```
/vercel/share/v0-project/
├── app/
│   ├── page.tsx              ← Home page (edit hero text here)
│   ├── products/page.tsx     ← Products listing
│   ├── products/[id]/page.tsx ← Product details
│   ├── checkout/page.tsx     ← Checkout form
│   └── api/checkout/route.ts ← Email processing
├── components/
│   ├── header.tsx            ← Navigation (edit logo/links)
│   ├── product-card.tsx      ← Product display card
│   ├── cart-sidebar.tsx      ← Shopping cart
│   └── ...
├── public/
│   ├── data/
│   │   ├── products.json     ← YOUR PRODUCTS (edit this!)
│   │   └── categories.json   ← YOUR CATEGORIES (edit this!)
│   └── images/
│       ├── gloomhaven-insert.jpg
│       ├── catan-tokens.jpg
│       └── ... (your product images)
└── lib/
    ├── cart-context.tsx      ← Shopping cart state
    └── format.ts             ← Utility functions
```

## 🔧 Customization Examples

### Change the logo text
Edit `/components/header.tsx` line 17:
```tsx
<span>Your Store Name</span>
```

### Change homepage hero text
Edit `/app/page.tsx` lines 54-60:
```tsx
<h1>Your Headline Here</h1>
<p>Your subtitle here</p>
```

### Add a new category
1. Add to `/public/data/categories.json`
2. Add products with matching category name
3. Category will appear automatically!

### Change footer content
Edit `/app/page.tsx` bottom section (Footer component)

## 💡 Pro Tips

1. **Product Images**: Use high-quality product photos. Professional lighting makes a difference!
2. **Descriptions**: Write detailed, benefit-focused descriptions
3. **Pricing**: Round prices to .99 for psychological pricing ($24.99 vs $25)
4. **Featured**: Mark your top sellers as featured to show on homepage
5. **Categories**: Keep 3-5 clear categories for easy navigation

## 🐛 Troubleshooting

**Products not showing?**
- Check image paths exist in `/public/images/`
- Verify category names match exactly between products.json and categories.json
- Restart dev server

**Checkout not working?**
- Check browser console for errors (F12)
- Verify all form fields have values
- Check API response in Network tab

**Emails not sending?**
- Verify GMAIL_USER and GMAIL_PASSWORD are set in Vars
- Use an app-specific password (not your regular password)
- Check Gmail security settings allow app access
- Check spam folder for test emails

## 📞 Support

For questions about this website:
1. Check the README.md for detailed documentation
2. Review component comments in the code
3. Test features on the live preview
4. Contact: razat249@gmail.com

## ✨ What's Included

✅ Beautiful homepage with hero, categories, featured products
✅ Full product catalog with search and filters
✅ Product detail pages with images and specs
✅ Shopping cart with add/remove functionality
✅ Checkout with customer information collection
✅ Email notifications to store owner
✅ Order confirmation page
✅ Mobile responsive design
✅ Modern design system with custom colors
✅ Fully customizable JSON data

## 🎯 Next Steps

1. **Preview**: Click "Version Box" to see the live preview
2. **Customize**: Edit products.json and categories.json with your data
3. **Add Images**: Replace placeholder images with your product photos
4. **Set Email** (Optional): Add GMAIL credentials to enable order notifications
5. **Deploy**: Push to GitHub and deploy to Vercel

Your beautiful board game e-commerce website is ready to go! 🚀
