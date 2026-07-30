// ===============================
// FOOD DATA
// ===============================
const foodItems = [
  { id: 1, name: "Double Beef Burger", price: 9.67, image: "images/burger.png" },
  { id: 2, name: "Veggie Pizza", price: 10.99, image: "images/pizza.png" },
  { id: 3, name: "Fried Chicken", price: 13.45, image: "images/fried-chicken.png" },
  { id: 4, name: "Chicken Roll", price: 7.5, image: "images/chicken-roll.png" },
  { id: 5, name: "Sub Sandwich", price: 6.99, image: "images/sandwich.png" },
  { id: 6, name: "Chicken Lasagna", price: 16.45, image: "images/lasagna.png" },
  { id: 7, name: "Italian Spaghetti", price: 7.65, image: "images/spaghetti.png" },
  { id: 8, name: "Spring Roll", price: 9.31, image: "images/spring-roll.png" }
];

// ===============================
// GENERATE MENU
// ===============================
const cardList = document.querySelector(".card-list");

foodItems.forEach(item => {
  const card = document.createElement("div");
  card.className = "order-card";

  card.innerHTML = `
    <div class="card-image">
      <img src="${item.image}">
    </div>
    <h4>${item.name}</h4>
    <h4 class="price">$${item.price}</h4>
    <a href="#" class="btn add-to-cart" data-id="${item.id}">Add to Cart</a>
  `;

  cardList.appendChild(card);
});

// ===============================
// CART + LOCAL STORAGE
// ===============================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartIcon = document.querySelector(".cart-icon");
const cartTab = document.querySelector(".cart-tab");
const cartList = document.querySelector(".cart-list");
const cartValue = document.querySelector(".cart-value");
const cartTotal = document.querySelector(".cart-total");

// OPEN / CLOSE CART
cartIcon.addEventListener("click", (e) => {
  e.preventDefault();
  cartTab.classList.toggle("cart-open");
});

// ADD TO CART
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart")) {
    e.preventDefault();
    const id = e.target.dataset.id;
    const item = foodItems.find(i => i.id == id);
    cart.push(item);
    updateCart();
  }
});

// REMOVE ITEM
cartList.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove")) {
    const index = e.target.dataset.index;
    cart.splice(index, 1);
    updateCart();
  }
});

// UPDATE CART UI
function updateCart() {
  cartList.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;

    cartList.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}">
        <div>
          <h5>${item.name}</h5>
          <p>$${item.price}</p>
        </div>
        <button class="remove" data-index="${index}">❌</button>
      </div>
    `;
  });

  cartValue.innerText = cart.length;
  cartTotal.innerText = `Total: $${total.toFixed(2)}`;

  localStorage.setItem("cart", JSON.stringify(cart));
}

// LOAD CART ON REFRESH
updateCart();

// ===============================
// MOBILE MENU
// ===============================
const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobile-menu");

hamburger.addEventListener("click", () => {
  mobileMenu.classList.toggle("mobile-menu-active");
});

// ===============================
// SWIPER
// ===============================
if (document.querySelector(".mySwiper")) {
  new Swiper(".mySwiper", {
    loop: true,
    navigation: {
      nextEl: "#next",
      prevEl: "#prev",
    },
  });
}
