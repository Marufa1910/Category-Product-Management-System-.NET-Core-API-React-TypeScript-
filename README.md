# Category & Product Management System

A full-stack master-detail management application featuring an **ASP.NET Core Web API** backend and an **Expressive Minimalist UI** built with **React, TypeScript, and Bootstrap**. This system allows users to seamlessly manage product categories and their nested products inside a single unified transactional interface.

---

## 🚀 Features

### Frontend (React & TypeScript)
* **Master-Detail Form:** Add, update, or remove multiple products dynamically within a category interface before submitting them transactionally.
* **Nested Data Presentation:** Expandable layout to view total product counts and deep product details (Standard Cost, List Price, Size, Weight, Color) inside each category row.
* **Type Safety:** Fully typed interfaces utilizing TypeScript definitions for `ProductCategory` and `Product`.
* **State Management & Optimization:** Efficient rendering with optimized side effects via React hooks (`useCallback`, `useEffect`, `useState`).

### Backend (ASP.NET Core API)
* **RESTful Architecture:** Secure and clean endpoints to support full CRUD operations.
* **Relational Integrity:** Managed category-to-product data mapping handling complex parent-child relations safely.

---

## 🛠️ Tech Stack

* **Frontend:** React (v18+), TypeScript, React Router DOM, Bootstrap 5, Bootstrap Icons
* **Backend:** ASP.NET Core Web API, Entity Framework Core, MS SQL Server

---

## 📋 Prerequisites & Installation

Before running the application, ensure you have the following installed on your local machine:
* [Node.js](https://nodejs.org/) (v18 or higher recommended)
* [.NET SDK](https://dotnet.microsoft.com/download) (v8.0 or higher)
* SQL Server LocalDB or standard MS SQL Server Instance

### 1. Setup the Frontend (React)

Since dependencies (`node_modules`) are excluded from this repository, you must restore them before launching the application.

1. Open your terminal and navigate to the frontend directory:
   ```bash
   cd ProductCategoryManagementWithReact
2. npm install
3. code .
4. After Open, Go to new Terminal and Write npm run dev
### 2. Setup the Backend API
1. In console dotnet restrore
2. update-database
3. run 
