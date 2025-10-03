

# 🛒 React Order Management System

A simple and interactive **Order Management System** built with **React.js**.
This project allows users to **search, filter, and manage order data** using multiple filters such as Order ID, Customer Name, Product, Payment Method, Status, and Date.

---

## ✨ Features

✅ **Filter Orders** by multiple fields (Order ID, Customer, Product, Payment, Status).
✅ **Search Button** to display filtered results.
✅ **Clear Filters Button** to reset all inputs and show all data.
✅ **Dynamic Table** showing live order details.
✅ **Reusable Components** (Home for filters, HeroSection for table).
✅ **Responsive Design** with CSS Grid/Flexbox.

---

## 🏗️ Project Structure

```
📦 your-project
├── 📂 src
│   ├── 📂 assets
│   │   ├── 📂 components
│   │   │   ├── 📂 Home
│   │   │   │   ├── Home.jsx
│   │   │   │   ├── Home.css
│   │   │   ├── 📂 HeroSection
│   │   │   │   ├── HeroSection.jsx
│   │   │   │   ├── HeroSection.css
│   │   │   ├── 📂 Navbar
│   │   │   │   ├── Navbar.jsx
│   │   │   ├── 📂 Middle
│   │   │   │   ├── Middle.jsx
│   │   ├── data.js   # 📊 Dummy dataset
│   ├── App.jsx       # 🚀 Main entry
│   ├── index.js
└── package.json
```

---

## ⚙️ How It Works

### 🖊️ **1. Input Section (Home.jsx)**

* User can type/search by **Order ID, Customer, Product**.
* Dropdowns for **Payment** and **Status**.
* Date picker (optional).
* **Search** button triggers filtering logic.
* **Clear Filters** resets everything.

### 📊 **2. Data Table (HeroSection.jsx)**

* Displays all filtered results in a clean **table format**.
* Shows: Order ID, Date, Customer, Product, Price, Payment, and Status.

### 🛠️ **3. Filtering Logic (Home.jsx)**

* Each input updates a **state variable** (e.g. `order`, `customer`, `status`).
* On clicking **Search**, all filters are applied to `data.js`.
* The filtered results are passed to `<HeroSection data={filteredData} />`.

---

## 📸 Demo Preview

👉 Search by **Customer Name** → See results instantly.
👉 Select **Payment = Paid** → Table updates to show only paid orders.
👉 Clear all filters → Table resets with full data.

---
## video:

https://github.com/user-attachments/assets/6997ddf4-0953-4d91-9600-bb0bdf28649b

