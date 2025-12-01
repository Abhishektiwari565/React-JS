

# 🎬 **Bollywood Movies React App — README.md**

A complete CRUD (Create, Read, Update, Delete) React project using **React Router**, **Bootstrap UI**, and **Local JSON data**.

---

# 🌟 **Project Overview**

This is a **Bollywood Movie Management App** built during the practical exam.
It allows users to:

✅ View all movies
✅ Search movies
✅ Add new movie
✅ Edit movie details
✅ Delete movie
✅ View full details page

All data is stored inside a **local JSON file** (no backend required).

---

# 🛠️ **Technologies Used**

| Technology                        | Purpose                        |
| --------------------------------- | ------------------------------ |
| ⚛️ **React JS**                   | Main front-end library         |
| 🚦 **React Router v6**            | Page navigation                |
| 🎨 **Bootstrap 5**                | UI styling                     |
| 📁 **Local JSON File**            | Movie data storage             |
| 🔧 **useState, useEffect, props** | State management               |
| 💡 **Functional Components**      | Clean & modern React structure |

---

# 📂 **Project Folder Structure**

```
src
│
├── components
│     └── Navbar.jsx
│
├── pages
│     ├── Home.jsx
│     ├── AddMovie.jsx
│     ├── EditMovie.jsx
│     ├── DetailsPage.jsx
│
├── data
│     └── bollywood.json
│
├── App.jsx
└── main.jsx
```

---

# 🚀 **How to Run the Project**

### 1️⃣ Install dependencies

```
npm install
```

### 2️⃣ Start development server

```
npm run dev
```

### 3️⃣ Open in browser

```
http://localhost:5173
```

---

# 🎭 **Features Explained**

## 🏠 Home Page (`/`)

Shows all Bollywood movies in a grid UI.

Includes:

* 🎞 Movie poster
* 🎬 Title
* 📅 Year
* 🔍 **Search bar**
* 🔘 Buttons for Edit, Delete, Details

---

## ➕ Add Movie Page (`/add`)

A form to add new movies.

### **Form Includes:**

* 📝 Title
* 📅 Year
* 🖼 Poster URL
* 🏷 Category (Action, Comedy, Drama, etc.)
* 🎭 Description

### **Buttons:**

* **Save Movie** → Adds movie to JSON state
* **Cancel** → Returns to Home

---

## ✏️ Edit Movie Page (`/edit/:id`)

Allows editing already added movies.

Features:

* All fields auto-filled
* Update button
* Cancel button

---

## 📄 Movie Details Page (`/movie/:id`)

A full-page detailed view of a movie.

Shows:

* Large Poster
* Title
* Year
* Category
* Description

---

# 🧭 **Routing Overview**

### All Routes Used in the Project

| Route        | Component       | Purpose         |
| ------------ | --------------- | --------------- |
| `/`          | Home.jsx        | Show all movies |
| `/add`       | AddMovie.jsx    | Add movie       |
| `/edit/:id`  | EditMovie.jsx   | Edit movie      |
| `/movie/:id` | DetailsPage.jsx | View details    |

---

# 🧩 **Navbar Explained**

The navigation bar contains:

### 🔗 **Links**

* 🏠 **Home**
* ➕ **Add Movie**

### 🎨 Styled using Bootstrap:

```html
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
```

# 🧹 **CRUD Operations Summary**

### **CREATE**

✔ AddMovie.jsx
✔ Adds new movie to state

### **READ**

✔ Home page shows all movies
✔ Movie details page

### **UPDATE**

✔ EditMovie.jsx
✔ Updates JSON state

### **DELETE**

✔ One-click Remove button
✔ Updates UI instantly

---

# 🎨 **UI Details (Bootstrap)**

### Components used:

* Cards
* Buttons
* Container
* Form
* Grid system
* Navbar
* Shadows

### Button Colors:

| Button    | Color           | Purpose        |
| --------- | --------------- | -------------- |
| Add Movie | `btn-success`   | Create         |
| Edit      | `btn-primary`   | Update         |
| Delete    | `btn-danger`    | Remove         |
| Details   | `btn-warning`   | View full info |
| Save      | `btn-success`   | Submit form    |
| Cancel    | `btn-secondary` | Go back        |

deploy link:https://react-js-5fcs.vercel.app/
