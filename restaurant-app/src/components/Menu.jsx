import React from "react";

export default function Menu() {
  const menuItems = [
    {
      id: 1,
      name: "Pizza Margherita",
      price: "$12",
      desc: "Classic cheese and tomato with fresh basil.",
      img: "https://picsum.photos/400/250?pizza",
    },
    {
      id: 2,
      name: "Pasta Alfredo",
      price: "$14",
      desc: "Creamy Alfredo sauce with parmesan and herbs.",
      img: "https://picsum.photos/400/250?pasta",
    },
    {
      id: 3,
      name: "Caesar Salad",
      price: "$10",
      desc: "Crispy lettuce, parmesan & Caesar dressing.",
      img: "https://picsum.photos/400/250?salad",
    },
    {
      id: 4,
      name: "Classic Burger",
      price: "$11",
      desc: "Juicy grilled beef patty with cheese & veggies.",
      img: "https://picsum.photos/400/250?burger",
    },
  ];

  return (
    <section id="menu" className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center fw-bold mb-5">Our Menu</h2>
        <div className="row g-4">
          {menuItems.map((item) => (
            <div className="col-md-6 col-lg-3" key={item.id}>
              <div className="card h-100 shadow border-0">
                <img
                  src={item.img}
                  className="card-img-top rounded-top"
                  alt={item.name}
                />
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold">{item.name}</h5>
                  <p className="card-text text-muted">{item.desc}</p>
                  <p className="fw-bold text-dark">{item.price}</p>
                  <a href="#order" className="btn btn-warning rounded-pill px-4">
                    Order Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
