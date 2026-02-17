# 3D Print Board Games - E-Commerce Website

A modern, beautiful e-commerce platform for selling board game inserts, board game upgrades, and replacement pieces.

## Features

- **Beautiful Homepage** with large search box and category showcase
- **Product Catalog** with filtering, search, and detailed product pages
- **Shopping Cart** with persistent state management
- **Checkout System** with order validation
- **Email Notifications** (configurable) - automatic order confirmation emails
- **Responsive Design** - fully mobile-friendly
- **Data-Driven** - all products and categories stored in JSON files

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS with custom design system
- **Components**: Shadcn UI
- **State Management**: React Context API
- **Email**: Nodemailer (optional setup)
- **Data Storage**: JSON files in `/public/data/`

## Getting Started

### Installation

```bash
# Using shadcn CLI
npx shadcn-cli@latest init

# Or install locally
npm install
# or
yarn install
# or
pnpm install
```

### Running the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Configuration

### Email Setup (Optional)

To enable automatic order confirmation emails:

1. Go to the **Vars** section in the v0 sidebar
2. Add these environment variables:
   - `GMAIL_USER`: Your Gmail address
   - `GMAIL_PASSWORD`: Your Gmail app-specific password (not your regular password)

To generate a Gmail app password:
1. Visit [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
2. Select "Mail" and "Windows Computer" (or your device)
3. Copy the generated password and paste it as `GMAIL_PASSWORD`

All checkout emails are sent to: **razat249@gmail.com**

### Product Data

Edit product information in `/public/data/products.json`:

```json
{
  "id": "unique-id",
  "name": "Product Name",
  "category": "Category Name (must match categories.json)",
  "price": 29.99,
  "image": "/images/product-image.jpg",
  "description": "Product description",
  "featured": true,
  "specs": {
    "material": "PLA",
    "weight": "250g"
  }
}
```

### Categories

Edit categories in `/public/data/categories.json`:

```json
{
  "id": "unique-id",
  "name": "Category Name",
  "description": "Category description",
  "image": "/images/category-image.jpg",
  "productCount": 4,
  "icon": "icon-name"
}
```

## Project Structure

```
├── app/
│   ├── page.tsx              # Home page
│   ├── products/
│   │   ├── page.tsx          # Products listing with filters
│   │   └── [id]/page.tsx     # Product detail page
│   ├── category/[id]/page.tsx # Category pages
│   ├── checkout/page.tsx      # Checkout page
│   ├── success/page.tsx       # Order success page
│   ├── api/
│   │   └── checkout/route.ts  # Checkout API endpoint
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── header.tsx            # Navigation header
│   ├── search-box.tsx        # Search component
│   ├── product-card.tsx      # Product card component
│   ├── category-card.tsx     # Category card component
│   ├── cart-sidebar.tsx      # Shopping cart sidebar
│   ├── checkout-form.tsx     # Checkout form
│   ├── quantity-selector.tsx # Quantity picker
│   ├── newsletter-signup.tsx # Newsletter subscription
│   └── ui/                   # Shadcn UI components
├── lib/
│   ├── cart-context.tsx      # Cart state management
│   └── utils.ts             # Utility functions
└── public/
    ├── data/
    │   ├── products.json     # Product data
    │   └── categories.json   # Category data
    └── images/              # Product and category images
```

## Pages

### Home (`/`)
- Hero section with search box
- Category showcase with navigation
- Featured products display
- Newsletter signup
- Footer

### Products (`/products`)
- Full product catalog
- Filter by category
- Search functionality
- Sort options
- Responsive grid layout

### Product Detail (`/products/[id]`)
- Full product information
- Product specifications
- Image gallery
- Add to cart functionality
- Related products

### Category (`/category/[id]`)
- Category-specific product listing
- Category description
- Breadcrumb navigation

### Checkout (`/checkout`)
- Shopping cart review
- Customer information form
- Order total calculation
- Order submission

### Success (`/success`)
- Order confirmation
- Order details display
- Next steps information

## Styling & Design

The website uses a premium, modern design system with:

- **Colors**: Teal accent (#06b6a1), warm neutrals, and careful contrast
- **Typography**: Playfair Display for headings, Poppins for body text
- **Layout**: Flexbox-based responsive design
- **Accessibility**: Semantic HTML, ARIA labels, proper contrast ratios

Customize the color scheme in `/app/globals.css` by modifying the CSS variables in the `:root` selector.

## Cart Management

The cart uses React Context API for state management. Cart items are stored in memory and persist across page navigation but will reset on page refresh (unless you implement local storage).

To make the cart persistent across browser sessions, update `/lib/cart-context.tsx` to use localStorage.

## API Endpoints

### POST `/api/checkout`

Submits a checkout order and sends confirmation emails.

**Request body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "(555) 123-4567",
  "address": "123 Main St",
  "city": "New York",
  "state": "NY",
  "zipCode": "10001",
  "items": [
    {
      "id": "product-id",
      "name": "Product Name",
      "price": 29.99,
      "quantity": 2
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "orderId": "ORD-1234567890",
  "message": "Order placed successfully"
}
```

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard (if using email)
4. Deploy

### Other Platforms

This Next.js app can be deployed to any platform that supports Node.js:
- AWS Amplify
- Netlify
- DigitalOcean
- Heroku
- Railway

## Customization Tips

1. **Change Colors**: Edit CSS variables in `/app/globals.css`
2. **Add Products**: Edit `/public/data/products.json`
3. **Update Content**: Edit component files in `/components/`
4. **Modify Layout**: Edit page files in `/app/`
5. **Add Features**: Create new components and integrate them

## Troubleshooting

### Email not sending?
- Verify `GMAIL_USER` and `GMAIL_PASSWORD` are correctly set
- Check that you're using an app-specific password, not your regular Gmail password
- Ensure your Gmail account allows less secure app access (if needed)

### Products not showing?
- Verify product image paths exist in `/public/images/`
- Check that product categories match exactly with categories in `categories.json`
- Clear browser cache and restart dev server

### Cart not persisting?
- Cart data is stored in memory. To persist across sessions, implement localStorage in `cart-context.tsx`

## Support

For issues or questions, contact: razat249@gmail.com

## License

This project is proprietary and not open for public use without permission.
