# Quick Tips & FAQ

## Common Tasks

### How do I add a new product?

1. Edit `/public/data/products.json`
2. Add a new product object to the array:
```json
{
  "id": "unique-id-here",
  "name": "Product Name",
  "category": "Board Game Inserts",
  "price": 24.99,
  "image": "/images/product-name.jpg",
  "description": "Describe what makes this product special",
  "featured": false,
  "specs": {
    "material": "PLA",
    "weight": "250g"
  }
}
```
3. Save the file
4. Add the product image to `/public/images/`
5. Refresh the website - your product appears instantly!

### How do I change the price of a product?

1. Find the product in `/public/data/products.json`
2. Change the `"price"` value
3. Save and refresh - done!

### How do I feature a product on the homepage?

In `/public/data/products.json`, set `"featured": true` for up to 4 products. They'll appear in the "Featured Products" section on the homepage.

### How do I see what orders customers place?

1. **With Email Setup**: Check the email inbox for razat249@gmail.com
2. **Without Email**: You'll need to implement order logging (advanced)

Each order email contains:
- Customer name, email, and address
- All items ordered with quantities and prices
- Order total

### How do I delete a product?

Remove the entire product object from `/public/data/products.json` and save.

### How do I change a category name?

1. Change the `"name"` in `/public/data/categories.json`
2. Update all products in `/public/data/products.json` that use that category
3. Save both files

## Design & Customization

### How do I change the logo?

Option 1: Edit the text in `/components/header.tsx` (line 17):
```tsx
<span>Your Store Name</span>
```

Option 2: Add a logo image - create an image component instead.

### How do I change the homepage headline?

Edit `/app/page.tsx` around line 54:
```tsx
<h1>Your New Headline</h1>
```

### How do I change colors?

Edit `/app/globals.css` and update the CSS variables in the `:root` section:
```css
--primary: 168 86% 39%;      /* Change to your color */
--background: 250 10% 97%;
--foreground: 20 10% 15%;
```

Use [HSL Color Picker](https://www.hsluv.org/) to find the values you want.

### How do I add more categories?

1. Add to `/public/data/categories.json`:
```json
{
  "id": "category-id",
  "name": "New Category",
  "description": "Description here",
  "image": "/images/category-image.jpg",
  "productCount": 3,
  "icon": "🎮"
}
```
2. Make sure products have matching category names
3. Category appears automatically!

## Emails & Checkout

### How do I test the checkout?

1. Add items to cart
2. Click the cart icon
3. Click "Checkout"
4. Fill the form with test data
5. Click "Complete Order"
6. You'll see the success page

**No payment is processed** - this is just order collection.

### Why am I not getting order emails?

Check:
1. ✅ GMAIL_USER and GMAIL_PASSWORD are set in Vars
2. ✅ Using an app-specific password (not regular Gmail password)
3. ✅ Check spam folder
4. ✅ Gmail security allows app access
5. ✅ Verify email address is correct

### Can I change the order confirmation email?

Edit `/app/api/checkout/route.ts` to modify the email template (around line 65).

## Performance & Optimization

### How do I add more products without slowing down?

The current setup is fine for hundreds of products. If you exceed 1000 products, consider:
1. Paginating the products page
2. Adding lazy loading for images
3. Using a real database instead of JSON

### How do I improve page load speed?

1. Optimize product images (compress to <200KB each)
2. Use WebP format instead of JPG
3. Lazy load below-the-fold images
4. Minimize custom fonts (already optimized)

## Troubleshooting

### Products page shows no results

Check:
1. Are products in `/public/data/products.json`?
2. Is the JSON valid? (No trailing commas, quotes match)
3. Do product categories match exactly with `/public/data/categories.json`?

### Images not loading

Check:
1. Are images in `/public/images/`?
2. Are file names spelled correctly in products.json?
3. Try browser cache clear (Ctrl+Shift+Delete)

### Search/filters not working

1. Clear browser cache
2. Restart dev server
3. Check browser console (F12) for errors

### Checkout button not working

1. Make sure cart has items
2. Check browser console for errors
3. Verify all form fields are filled
4. Check network tab for API errors

## Advanced Customization

### How do I add product images/gallery?

Edit `/app/products/[id]/page.tsx` to add:
```tsx
<Image src={product.image} alt={product.name} width={400} height={400} />
```

### How do I add a wishlist feature?

1. Create a new context similar to `cart-context.tsx`
2. Add a heart icon button to products
3. Store wishlist items and display on new `/wishlist` page

### How do I add product reviews?

You'd need:
1. A database (Supabase, Firebase, etc.)
2. Authentication system
3. Review form component
4. Ratings display component

This requires more setup but is doable!

## File Locations Cheat Sheet

| What | Where |
|------|-------|
| Products data | `/public/data/products.json` |
| Categories | `/public/data/categories.json` |
| Product images | `/public/images/` |
| Colors & fonts | `/app/globals.css` |
| Header/nav | `/components/header.tsx` |
| Home page | `/app/page.tsx` |
| Products listing | `/app/products/page.tsx` |
| Product details | `/app/products/[id]/page.tsx` |
| Shopping cart | `/components/cart-sidebar.tsx` |
| Checkout | `/app/checkout/page.tsx` |
| Email handling | `/app/api/checkout/route.ts` |

## Questions?

Refer to:
1. **README.md** - Full documentation
2. **SETUP_GUIDE.md** - Detailed setup instructions
3. **Code comments** - Check .tsx files for inline comments
4. **Component files** - Each component explains what it does

Good luck with your board game business! 🎲
