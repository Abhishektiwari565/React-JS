
# 🎥 Favorite Movies Manager

A **React** app to keep track of your favorite movies! Add, edit, and delete movies with ease, and store them safely in your browser using **localStorage**.  

---

## ✨ Features

- **Add Movies:** Quickly add new movies to your list.  
- **Edit Movies:** Update movie details anytime.  
- **Delete Movies:** Remove movies you no longer want.  
- **Persistent Data:** Movies stay in localStorage even after refreshing.  
- **User Session Info:** See your session details with the `UserSession` component.  
- **Responsive Design:** Works on desktop, tablet, and mobile.  

---

## 🧩 Tech Stack

- **React** – For building UI components  
- **JavaScript (ES6)** – App logic & state management  
- **CSS** – Styling the app  
- **localStorage** – Persistent storage for movies  

---

## 📂 Folder Structure

```

favorite-movies-manager/
│
├─ src/
│  ├─ components/
│  │  ├─ MovieForm.jsx      # Form to add movies
│  │  ├─ MovieList.jsx      # Movie list with edit/delete functionality
│  │  └─ UserSession.jsx    # Displays session info
│  │
│  ├─ App.jsx               # Main component
│  └─ App.css               # Styling
│
├─ public/
│  └─ index.html
│
└─ package.json

````
## 📝 How It Works

* **State Management:** Uses `useState` to manage the `movies` array.
* **LocalStorage:** Loads movies from localStorage on start, and saves updates automatically.
* **CRUD Operations:**

  * `addMovie(movie)` – Add a new movie
  * `deleteMovie(index)` – Remove a movie by its index
  * `editMovie(index, updatedMovie)` – Update movie info

---

video:

https://github.com/user-attachments/assets/10e1b47c-081f-4296-a7b8-6aadc80a794d

