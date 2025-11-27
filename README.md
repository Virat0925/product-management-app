Product Management App

A modern, responsive React-based Product Management Application that allows users to view, search, add, edit, and paginate products efficiently, following industry best practices in performance, accessibility, and clean code.

📌 Features
1. Product Listing

List View (Table)

Card View (Grid)

Toggle between views

Responsive layout

2. Search (Debounced)

Real-time product search

Debounced by 500ms

Smooth UI updates

3. Add & Edit Products

Modal-based form

Required fields: Name, Price, Category

Optional fields: Description

Price & Stock validated numerically

Preserves product ID during edit

ESC key closes modal

Autofocus on first input

4. Pagination

Dynamic page numbers

Prev/Next buttons

Ellipsis for long page ranges

Page clamping (no invalid pages)

Accessible labels

🛠 Tech Stack

JavaScript

React (Vite)

TailwindCSS

Lucide Icons

React Hooks

Custom useDebounce Hook

🧠 Best Practices Implemented
🚀 Performance

useMemo for filtering & pagination

useCallback for stable handlers

React.memo for Card & Table components

Debounced search for optimized rendering


🧹 Code Quality

Normalized product data

Clean validation logic

Defensive default values

Modular folder structure

📂 Project Structure
src/
│ App.jsx
│ main.jsx
│ index.css
│
├── components/
│   ├── ProductCard.jsx
│   ├── ProductTable.jsx
│   ├── ProductForm.jsx
│   └── Pagination.jsx
│
├── hooks/
│   └── useDebounce.js
│
└── data/
    └── products.json

⚙️ Installation
git clone <your-repository-url>
cd <project-folder>
npm install
npm run dev


App will be available at:
[product-management-app-mocha-beta.vercel.app](https://product-management-app-mocha-beta.vercel.app/)

🌐 Deployment

You can deploy the project on platforms like:

Vercel

Netlify

Render

Build command
npm run build

Output directory
dist

📋 Assignment Requirements Checklist
Requirement	Status
List view (table format)	✅
Card view (grid format)	✅
View toggle	✅
Search with debounce (500ms)	✅
Add product	✅
Edit product	✅
Form validation	✅
Pagination	✅
In-memory state update	✅
GitHub repo link	✅
Live deployed site	✅


👨‍💻 Author

Virat Singh Bhadauriya

📄 License

This project is open-source and free to use.