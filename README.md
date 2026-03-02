# Fintide

[![Stars](https://img.shields.io/github/stars/ftashmit/fintide-v2.0)]()
[![Issues](https://img.shields.io/github/issues/ftashmit/fintide-v2.0)]()
[![License](https://img.shields.io/github/license/ftashmit/fintide-v2.0)]()

## 🚀 Project Overview

**Fintide** is a modern, component‑driven web experience built with
**Next.js, TypeScript, and Tailwind CSS**.\
The goal of the project is to deliver a **fast, clean, scalable fintech
UI** that is easy to extend and maintain.

It focuses on: - Performance - Clean UI architecture - Reusable
components - Modern design patterns

------------------------------------------------------------------------

# ✨ What's New in this Version

### Updated Landing Experience

-   Redesigned **Hero Section**
-   New **Testimonials Block**
-   Premium **dark theme aesthetic**
-   Improved layout spacing and visual hierarchy

### Custom Animated Footer

A new animated component located at:

    @/components/ui/flickering-footer

Features: - Subtle flicker animation - Glass / neon inspired design -
Fully responsive

### Improved UI Utilities

The UI stack now includes:

-   `@radix-ui/react-icons`
-   `clsx`
-   `tailwind-merge`
-   `motion`
-   `color-bits`

These improve: - class management - animations - accessibility - styling
consistency

------------------------------------------------------------------------

# 🧩 Features

### Responsive Design

-   Mobile‑first architecture
-   Tailwind breakpoints (`sm`, `md`, `lg`, `xl`)
-   Works across devices

### Component‑First Structure

UI sections are modular:

-   Hero
-   Testimonials
-   Footer
-   Layout containers

Each component can be swapped independently.

### Shadcn‑Compatible

Project follows **components/ui conventions**, making it fully
compatible with:

-   shadcn/ui patterns
-   Radix primitives
-   modern UI ecosystems

------------------------------------------------------------------------

# 🧰 Tech Stack

  Technology             Purpose
  ---------------------- -----------------
  Next.js (App Router)   Framework
  React                  UI
  TypeScript             Type safety
  Tailwind CSS           Styling
  Radix Icons            Icon system
  clsx                   Class utilities
  tailwind-merge         Class merging
  motion                 Animations
  color-bits             Color utilities

------------------------------------------------------------------------

# ⚙️ Getting Started

## 1. Clone the repository

``` bash
git clone https://github.com/ftashmit/fintide-v2.0.git
```

## 2. Navigate into the project

``` bash
cd fintide-v2.0
```

## 3. Install dependencies

``` bash
npm install
```

## 4. Run development server

``` bash
npm run dev
```

App will run at:

    http://localhost:3000

------------------------------------------------------------------------

# 🏗 Production Build

``` bash
npm run build
npm start
```

------------------------------------------------------------------------

# 📂 Project Structure

    fintide
    │
    ├── app
    │   └── page.tsx
    │
    ├── components
    │   └── ui
    │       └── flickering-footer.tsx
    │
    ├── public
    │
    ├── styles
    │
    └── package.json

------------------------------------------------------------------------

# 💡 Usage Example

### Import the Footer

``` ts
import { Component as Footer } from "@/components/ui/flickering-footer";
```

### Add it to the page layout

``` tsx
export default function Page() {
  return (
    <main className="min-h-screen bg-black">
      {/* Page Content */}

      <Footer />
    </main>
  );
}
```

------------------------------------------------------------------------

# 🎨 Design Philosophy

Fintide aims to deliver:

-   Modern fintech visuals
-   Minimalist design
-   Smooth interactions
-   Clean typography
-   Reusable UI patterns

Inspired by platforms like:

-   Vercel
-   Stripe
-   Linear
-   Apple product pages

------------------------------------------------------------------------

# 🤝 Contributing

Pull requests are welcome.

If you'd like to contribute:

1.  Fork the repo
2.  Create a new branch
3.  Submit a PR


------------------------------------------------------------------------

# 🌊 Fintide

**Track markets. Discover trends. Move smarter.**
