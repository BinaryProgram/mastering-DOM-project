const cartButtons = document.getElementsByClassName("add-btn");
let cnt = 0;
// Loop is the best way to get all cart button at once.
for (let cartButton of cartButtons) {
  cartButton.addEventListener("click", function (e) {
    cnt += 1;
    updateInnerText("cart-count", cnt);

    const place = e.target.parentNode.childNodes[1].innerText;
    const price = e.target.parentNode.childNodes[3].childNodes[1].innerText;

    const li = document.createElement("li");
    const p1 = document.createElement("p");
    const p2 = document.createElement("p");

    p1.innerText = place;
    p2.innerText = price;
    li.append(p1, p2); 
    // validation check before added total cost
    const budget = document.getElementById("budget").innerText;
    const convertedBudget = parseInt(budget);
    
    if (convertedBudget - parseInt(price) < 0) {
      alert("Out of budget!");
      return;
    }
    
    
    const currentBudget = convertedBudget - parseInt(price);
    updateInnerText("budget", currentBudget);

    document.getElementById("selected-place-container").append(li);

    totalCost("total-cost", parseInt(price));
  });
}

// common function to set inner text
function updateInnerText(id, value) {
  document.getElementById(id).innerText = value;
}

function totalCost(id, price) {
  const cost = document.getElementById(id).innerText;
  // cost is converted from string -> number
  let convertedCost = parseInt(cost);
  convertedCost += parseInt(price);
  updateInnerText(id, convertedCost);
  updateInnerText("grand-total", convertedCost);
}

function grandTotal(via) {
  const totalCost = document.getElementById("total-cost").innerText;
  convertedTotalCost = parseInt(totalCost);

  updateInnerText("grand-total", convertedTotalCost);

  if (via == "bus") {
    updateInnerText("grand-total", convertedTotalCost + 100);
  } else if (via == "train") {
    updateInnerText("grand-total", convertedTotalCost - 200);
  } else if (via == "flight") {
    updateInnerText("grand-total", convertedTotalCost + 500);
  } else {
    updateInnerText("grand-total", convertedTotalCost);
  }
}
