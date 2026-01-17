# Lume & Decor - E-commerce Website

A beautiful home decor e-commerce website built with Next.js, featuring a stunning purple and white theme with smooth animations.

![Lume & Decor](logo.jpeg)

## ✨ Features

- **Modern Design**: Purple and white theme matching the Lume & Decor brand
- **Smooth Animations**: Powered by Framer Motion for delightful user experiences
- **Full E-commerce Flow**: Product browsing, cart, and checkout functionality
- **Responsive**: Works beautifully on all devices
- **State Management**: Using Zustand with persistence for cart functionality

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
├── app/
│   ├── page.tsx          # Homepage
│   ├── shop/             # Product listing page
│   ├── product/[id]/     # Product detail page
│   ├── cart/             # Shopping cart
│   ├── checkout/         # Checkout flow
│   └── about/            # About page
├── components/
│   ├── Header.tsx        # Navigation header
│   ├── Footer.tsx        # Site footer
│   ├── Hero.tsx          # Homepage hero section
│   ├── ProductCard.tsx   # Product card component
│   ├── Categories.tsx    # Category showcase
│   └── ...
├── store/
│   └── cartStore.ts      # Zustand cart state
└── data/
    └── products.ts       # Product data
```

## 🎨 Theme Colors

- **Primary Purple**: #7b5cb8
- **Dark Purple**: #5f3a8a
- **Light Purple**: #a978cd
- **Cream**: #faf9f7
- **Ivory**: #f5f3f0

## 🛠 Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Icons**: Lucide React
- **Fonts**: Cormorant Garamond, Outfit

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🌟 Promo Code

Try code **LUME10** at checkout for 10% off!

---

**Lume & Decor** - *Glow Up Every Corner*

