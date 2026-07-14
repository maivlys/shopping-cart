# Shopping Cart – React & TypeScript

A modern e-commerce application built with React and TypeScript, focused on realistic shopping cart functionality, scalable frontend architecture, and responsive user experience.

## Live Demo

[preview](https://pearla-shopping-cart-project.vercel.app/)

## Features

- Browse a product catalog with category filtering and detailed product pages
- Shopping cart with persistent state stored in local storage
- Favorites system for saving preferred products
- Multi-step checkout flow with Zod validation
- Responsive design optimized for desktop, tablet, and mobile devices
- Global state management with Zustand
- Efficient server state management and caching with TanStack Query
- Complete checkout flow with simulated purchase confirmation

## Refactoring Highlights

This project was originally built using a single React Context and manual data fetching. It was later refactored to demonstrate modern React architecture and best practices.

- **Zustand** replaced the Context API for global state management, using dedicated stores for the shopping cart and favorites to improve separation of concerns and reduce unnecessary re-renders.
- **TanStack Query** replaced manual `useEffect`-based data fetching, providing built-in caching, loading and error states, background refetching, and significantly less boilerplate.
- **Derived state with `useMemo`** replaced `useState` + `useEffect` synchronization for product filtering, eliminating unnecessary state updates and avoiding a common React anti-pattern.

## Skills Demonstrated

- Building reusable and modular React components
- Type-safe frontend development with TypeScript
- Modern state management with Zustand
- Server state management with TanStack Query
- Client-side routing with React Router
- Form validation using Zod
- Deriving computed state with React hooks (`useMemo`)
- Persistent client-side state using local storage
- Simulating API-based data fetching with a custom JSON product database
- Responsive layouts using CSS Modules, Flexbox, and CSS Grid
- UI implementation based on custom Figma designs and UX research conducted as part of a master's thesis

## Installation

```bash
git clone https://github.com/maivlys/shopping-cart.git
cd shopping-cart
npm install
npm run dev
```

## Future Improvements

- Add frontend testing with Vitest _(currently in progress)_
- Expand product dataset and implement pagination
- Basic user authentication system (login/logout with optional backend integration)
- Quick buy modal to allow faster product purchase directly from detail page
