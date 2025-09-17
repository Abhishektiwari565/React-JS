
# 🛍️ React E-Commerce App

This is a **React-based E-Commerce web application** that allows users to:
✅ **Sign In** (with local storage authentication)
✅ **Browse Products** displayed in a clean layout
✅ **View product details**
✅ **Add products to cart** 🛒
✅ **Remove products from cart**
✅ **View total price of cart items** 💰
✅ **Log Out** securely

---

## 📂 Project Structure

```
src/
 ├── components/
 │   ├── Home.jsx          # Displays all products in card/grid layout
 │   ├── Cart.jsx          # Shows cart items with total price
 │   ├── Navbar.jsx        # Navigation bar with links + logout
 │   ├── SignIn.jsx        # Simple sign-in page (local storage)
 │   ├── PrivateRoute.jsx  # Protects routes (only logged-in users)
 │   ├── About.jsx         # About page
 │   ├── Projects.jsx      # Projects page
 │   ├── Contact.jsx       # Contact page
 │   └── ProductDetail.jsx # Product detail view
 ├── json/
 │   └── Products.js       # Product list with title, price, category, image
 ├── App.jsx               # Main app file with routes
 ├── App.css               # Global styles
```

---

## ⚙️ Features

✨ **Authentication**

* Simple sign-in with email & password stored in `localStorage`.
* `PrivateRoute` checks if user is logged in before showing pages.

✨ **Products**

* Displayed on Home page.
* Each product has **title, price, category, and image**.
* Bootstrap cards used for clean UI.

✨ **Cart**

* Users can add products to cart.
* Delete button ❌ to remove items.
* Cart total is automatically calculated using `useEffect`.

✨ **Navigation**

* A **Navbar** with links: Home, About, Projects, Contact, Cart.
* Logout button 🔒 clears user session and redirects to SignIn.

---

## 🚀 How to Run

1️⃣ Clone this repo

```bash
git clone https://github.com/your-username/react-ecommerce.git
cd react-ecommerce
```

2️⃣ Install dependencies

```bash
npm install
```

3️⃣ Run the project

```bash
npm start
```

4️⃣ Open in browser

```
http://localhost:3000
```

---

## 🖥️ Tech Stack

* ⚛️ **React** (functional components + hooks)
* 🛣️ **React Router DOM** (for routing and navigation)
* 🎨 **Bootstrap 5** (for layout and styling)
* 💾 **LocalStorage** (for user authentication & cart persistence)

---

## 📸 video:

https://github.com/user-attachments/assets/67c5d7d2-ae24-4e82-b5c7-be1ac59ad466


