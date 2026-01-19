# 🌕 The Moon – Restaurant POS

**The Moon – Restaurant POS** is a modern, intuitive, and fully-featured **Restaurant Point of Sale (POS)** web application.  
Designed for restaurants to efficiently manage **menu items, orders, invoices, and employees**, it combines a sleek **vertical navbar layout**, **interactive dashboards**, **CRUD functionalities**, and **role-based features** for managers and employees.  

Built with **React**, **Redux Toolkit**, and **modern CSS**, it ensures a seamless experience with real-time updates, elegant UI, and smooth navigation.

---



## 🔑 Features

### 🧭 1. Dashboard
- Interactive charts & graphs (Revenue, Orders, Sales trends) powered by **Recharts**.  
- Overview of **current orders, total revenue, top dishes, and employee performance**.  
- Clean and **responsive layout** designed for vertical sidebar navigation.

---

### 🍽️ 2. Menu Management
- **Full CRUD operations**: Add, update, and delete menu items.  
- Upload menu images via drag-and-drop or URL.  
- Set **availability**, **tax rate**, **rating**, **special item flag**, and **preparation time**.  
- Filter menu by **category**, **availability**, or **search term**.  
- Beautiful **card-based layout** with badges, icons, and responsive grid.  
- Dynamic menu updates powered by **Redux Toolkit async thunks**.

---

### 👨‍🍳 3. Employee Management
- View, add, update, and delete employees.  
- Filter employees by **role** or **status**.  
- Track employee performance (total sales, total orders handled).  
- Integrated **CRUD operations** with Redux Toolkit and Axios.  
- Fully responsive, clean employee list UI with edit/delete controls.

---

### 🧾 4. Order Management
- Create and manage customer orders in real time.  
- Add multiple items with automatic **subtotal, tax, and total** calculation.  
- Modify orders before checkout (add/remove items, change quantities).  
- Update order status (**Pending**, **In Progress**, **Completed**).  
- Search and filter orders by **status**, **customer**, or **date**.  
- Integrated **invoice generation** for completed orders.

---

### 💳 5. Invoice Management
- Generate detailed invoices with:  
  - Restaurant name, logo, customer details, order ID, date/time.  
  - Itemized list (item name, quantity, price, tax, subtotal).  
  - Total including **GST** and **service charge**.  
- View, print, or download invoices as **PDF**.  
- Store invoice history for reporting and analytics.

---

### 🔐 6. User Authentication
- Secure **login/logout** for managers and employees.  
- **Role-based access control**:
  - Manager → Full system access  
  - Employee → Order and personal dashboard access  
- Auth state handled with **Redux Toolkit** for reliability and persistence.

---

### 📊 7. Dashboards & Reports
#### 👨‍💼 Manager Dashboard
- View **Total Employees, Orders, Revenue, and Customers Served**.  
- Charts for **Daily/Monthly Sales Trends** and **Top Performing Employees**.  
- Filters for **date range** or **employee** reports.

#### 🧑‍💼 Employee Dashboard
- View personal sales stats, total orders handled, and recent orders.  
- Calculate **average order value** and daily performance metrics.

---

### 🧭 8. Vertical Sidebar Navigation
- Smooth, **collapsible vertical navbar** with icons and text labels.  
- Fully responsive for desktop and tablet screens.  
- Active route highlighting for better user experience.  
- Matches professional dark/light theme (without golden tones).

---

### 🔍 9. Search & Filter
- Global search for **menu items, employees, and orders**.  
- Filter menus by **category**, **availability**, or **special tag**.  
- Filter orders by **status** or **date range**.  
- Instant results without page reload.

---

### 🎨 10. Modern UI/UX
- Elegant **card-based layouts** for all modules.  
- Hover effects, soft shadows, and fluid transitions.  
- Consistent color palette (no golden color used).  
- Designed for readability and visual balance.  
- Optimized for **desktop and tablet** viewports.

---

## ⚙️ Technical Stack

| Category | Technology |
|-----------|-------------|
| **Frontend** | React, React Router, Redux Toolkit |
| **Charts** | Recharts |
| **HTTP Requests** | Axios |
| **State Management** | Redux Toolkit (createSlice + createAsyncThunk) |
| **Styling** | Modular CSS (with vertical navbar layout) |
| **Backend (Mock)** | JSON Server |
| **Build Tool** | Vite / CRA |

---

## 🗂️project structure
<pre>src/
├─ components/
│  ├─ Navbar/
│  ├─ Dashboard/
│  ├─ MenuManager/
│  ├─ Employees/
│  ├─ Orders/
│  ├─ Invoices/
│  └─ Authentication/
├─ slices/
│  ├─ AuthSlice.js
│  ├─ MenuSlice.js
│  ├─ EmployeeSlice.js
│  ├─ OrderSlice.js
│  └─ InvoiceSlice.js
├─ store/
│  └─ store.js
├─ App.jsx
└─ index.js</pre>
---

## ⚡ Installation & Setup
 demo video:

