import menuArray from "./data.js";

document.querySelector("#order-list").innerHTML = menuArray
  .map((item) => {
    const { name, ingredients, id, price, emoji } = item;
    return `<div class="item" id=item-${id}>
      <div class="item-image">
        <p class="emoji margin-zero">${emoji}</p>
      </div>
      <div class="item-desc margin-zero">
        <h2 class="item-title margin-zero">${name}</h2>
        <p class="item-ingredients margin-zero">${ingredients}</p>
        <p class="item-price margin-zero">$${price}</p>
      </div>
      <button id="${id}" class="add-item-btn pointer">+</button>
    </div>`;
  })
  .join("");

const orderItems = new Map();

const orderDetails = document.getElementById("order-details");
document.addEventListener("click", (e) => {
  const itemId = Number(e.target.id);
  if (!isNaN(itemId) && itemId >= 0 && itemId < menuArray.length) {
    if (orderItems.has(menuArray[itemId].name)) {
      console.log("element already exists");
      orderItems.set(
        menuArray[itemId].name,
        orderItems.get(menuArray[itemId].name) + menuArray[itemId].price
      );
      console.log(orderItems);
      render(orderItems);
    } else {
      console.log("new element");
      orderItems.set(menuArray[itemId].name, menuArray[itemId].price);
      console.log(orderItems);
      render(orderItems);
    }
  }

  if (orderItems.has(e.target.id)) {
    console.log("remove ");
    orderItems.delete(e.target.id);
    render(orderItems);
  }

  if (e.target.id === "complete-order") {
    const payment = document.querySelector("#payment");
    payment.classList.add("payment");
  }
});

function render(orderItems) {
  const orderContainer = document.querySelector("#order-container");
  if (orderItems.size < 1) {
    orderDetails.classList.add("hide");
  } else if (orderItems.size === 1) {
    orderDetails.classList.remove("hide");
  }

  let str = "";
  let total = 0;
  orderItems.forEach((value, key) => {
    str += `
    <div class="ordered-item">
        <h2 class="ordered-item-title">${key}</h2>
        <button class="remove-btn pointer" id=${key}>remove</button>
        <p class="ordered-item-price"  >$${value}</p>
    </div>
    `;
    console.log(key);
    total += value;
  });
  orderContainer.innerHTML = str;
  document.querySelector("#total-price").innerHTML = `$${total}`;
}

document.addEventListener("click", (e) => {
  if (e.target.id === "submit") {
    e.preventDefault();
    const payment = document.querySelector("#payment");
    payment.classList.remove("payment");
    payment.classList.add("hide");

    const orderContainer = document.querySelector("#order-container");
    orderDetails.classList.add("hide");

    const thanks = document.querySelector("#thanks");

    thanks.innerHTML = `<p>Thanks, ${
      document.getElementById("name").value
    }! Your order is on its way!</p>`;
    thanks.classList.remove("hide");
    thanks.classList.add("thanks-container");
  }
});
