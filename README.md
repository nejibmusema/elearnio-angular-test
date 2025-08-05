# 🛍️ Angular 20 Product Listing App

This is a modern Angular 20+ application that demonstrates product listing, filtering, sorting, and cart management. It utilizes the latest Angular features including Signals and NGRX Signal Store for reactive state management.

---

## 🚀 Features

- ✅ **Product Listing** – Displays a grid of products with image, price, and category.
- ✅ **Filtering & Sorting** – Easily filter products by category and sort by price or name.
- ✅ **Add to Cart** – Users can add products to a shopping cart with quantity management.
- ✅ **Signal Store (NgRx)** – Uses `@ngrx/signals` for clean, reactive state.
- ✅ **Signals API** – Built using Angular Signals for optimal reactivity.
- ✅ **LocalStorage Persistence** – Cart data is saved and restored from `localStorage`.
- ✅ **API Ready** – Currently reads from a local JSON file; easy swap-in of an API via `ApiService`.

---

## 📦 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [Angular CLI](https://angular.io/cli) v20+

### Install Dependencies

```bash
npm install
```

### Run the App

```bash
npm run start
```

That’s it! The app will be available at `http://localhost:4200/`.

---

## 🧠 Architecture Overview

### Data Source

Currently loads product data from a local `data.json` file via the `ApiService`.

**To switch to a real API:**  
Update `api.service.ts` with your HTTP requests using Angular's `HttpClient`.

### State Management

The app uses:

- `@ngrx/signals` for creating a **signal store** (`CartStore`) to manage cart state.
- Signals to track reactive state updates throughout the app.
- LocalStorage to persist cart items across sessions.

---

## 🗂️ Folder Structure (Simplified)

```
src/
├── app/
│   ├── components/
│   │   ├── product-grid/
│   │   ├── product-item/
│   │   └── filter-bar/
│   ├── models/
│   ├── services/
│   └── store/         # Signal store (cart)
├── assets/
│   └── data.json      # Product mock data
```

---

## 🧩 Tech Stack

- Angular 20+
- Angular Signals
- NGRX Signal Store (`@ngrx/signals`)
- Tailwind CSS or custom styles
- LocalStorage for persistence

---

## 💡 Customization

- 📦 To add a real backend: Replace mock JSON logic in `ApiService` with API calls.
- 🎨 UI can be styled with Tailwind or any CSS framework.
- 🛒 Cart logic is extendable for features like checkout, coupons, etc.

---

## 📃 License

MIT – free to use and modify.

---

## 🤝 Contributions

PRs and suggestions welcome!

---

Made with ❤️ using Angular 20 & Signals
