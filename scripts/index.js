let cartData = [];
const btnContainer = document.getElementById("button-container");
const cardContainer = document.getElementById("card-container");
const cartContainer = document.getElementById("cart-container");

const TotalValue = document.getElementById("total-value");

// name
// :
// "Mango Tree"
// price
// :
// 3000
// quantity
// :
// 6

// Total Section
function displayTotal(arr) {
  console.log(arr, 555555);
  TotalValue.innerText = "";
  let sumPrice = 0;
  arr.forEach((price) => {
    sumPrice += price.price;
  });
  TotalValue.innerText = sumPrice;
}

// cart section

function displayCart(cartsData) {
  cartContainer.innerHTML = "";
  console.log(cartsData);
  for (let cart of cartsData) {
    const div = document.createElement("div");
    div.innerHTML = `
              <div class="card   shadow-sm  bg-[#F0FDF4] m-2 shadow-lg ">
              <div class="card-body">
                  <div class=" ">
                      <div class="flex justify-between items-center gap-1">
                          <div>
                              <h5 class="text-[12px] font-semibold">${cart.name}</h5>
                              <p class="text-[12px]"><span>৳</span><span>${cart.singlePrice}</span> x <span>${cart.quantity}</span>
                              </p>
                          </div>

                          <button class="btn btn-sm  hover:bg-green-900 hover:text-white" onclick="disCart('${cart.name}', ${cart.singlePrice}, -1, ${cart.singlePrice})"
>
                              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24"
                                  stroke="currentColor">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="M6 18L18 6M6 6l12 12" />
                              </svg>

                          </button>

                      </div>
                  </div>
              </div>
          </div>`;
    cartContainer.appendChild(div);

    displayTotal(cartsData);
  }
}
function cartCalculation(arr) {
  let map = {};

  console.log(arr);

  for (let item of arr) {
    let key = (item.name || " ").trim();
    if (!map[key]) {
      map[key] = {
        name: key,
        quantity: 0,
        price: 0,
        singlePrice: item.singlePrice,
      };
    }

    map[key].quantity += Number(item.quantity) || 0;
    map[key].price += Number(item.price) || 0;
  }

  console.log(map, 11111111);
  var result = [];
  for (var k in map) {
    if (Object.prototype.hasOwnProperty.call(map, k)) {
      if (map[k].quantity > 0) {
        result.push(map[k]);
      }
    }
  }

  console.log(result, 111122);

  displayCart(result);
}

function updateCart(name, quantity, singlePrice) {
  let data = {
    name: name,
    price: singlePrice * quantity, 
    quantity: quantity,
    singlePrice: singlePrice,
  };

  cartData.push(data);
  cartCalculation(cartData);
}

function disCart(name, price, quantity, singlePrice) {
  updateCart(name, quantity, singlePrice);
}

// name, price, quantity, singlePrice

function cartFunction(name, price, quantity, singlePrice) {
  updateCart(name, quantity, singlePrice);
}
// toggle btn

const removeActive = () => {
  const lessonButtons = document.querySelectorAll(".tree-btn");
  lessonButtons.forEach((btn) => btn.classList.remove("active"));
};

// loadding section

function manageLoading(status) {
  if (status === true) {
    document.getElementById("spinner").classList.remove("hidden");
    cardContainer.classList.add("hidden")

  } else {
    document.getElementById("spinner").classList.add("hidden");
        cardContainer.classList.remove("hidden")
  }
}

// modal section

const displayModalDes = (detail) => {
  const modalContainer = document.getElementById("modal-container");

  const modal = document.getElementById("my_modal_5").showModal();

  modalContainer.innerHTML = `
  <div class="card bg-base-100 w-full h-full shadow-sm flex flex-col justify-between">
    <div class="p-2">
      <figure class="aspect-square">
        <img class="rounded-lg w-full h-full object-cover" 
          src="${detail.image}" alt="Plant Image" />
      </figure>
    </div>
    <div class="card-body flex flex-col flex-1">
      <h2 class="card-title text-[13px]">${detail.name}</h2>
      <p class="text-gray-600 text-[10px] text-justify flex-1 overflow-hidden">
        ${detail.description}
      </p>
      <div class="flex justify-between items-center mt-2">
        <div class="font-bold bg-[#DCFCE7] rounded-[20px] text-[10px] p-[6px]">
          ${detail.category}
        </div>
        <div class="text-[10px] font-bold">৳<span id="amount">${detail.price}</span></div>
      </div>
    </div>
  </div>
`;
};

const loadModalDes = (id) => {
  url = `https://openapi.programming-hero.com/api/plant/${id}`;

  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      displayModalDes(json.plants);
    });
};

// plantsByCategories section
const displayPlantsByCategories = (plants) => {
  console.log(plants);
  manageLoading(true);
  cardContainer.innerHTML = "";
  // ${plant.image}
  for (let plant of plants) {
    const div = document.createElement("div");
    div.classList.add("h-full", "w-full");
    div.innerHTML = `
  <div class="card bg-base-100 w-full h-full shadow-sm flex flex-col justify-between">
    <div class="p-2">
      <figure class="aspect-square">
        <img class="rounded-lg w-full h-full object-cover" 
          src="" alt="Plant Image" />
      </figure>
    </div>
    <div class="card-body flex flex-col flex-1">
      <h2 class="card-title text-[13px]" onclick="loadModalDes(${
        plant.id
      })"   >${plant.name}</h2>
      <p class="text-gray-600 text-[10px] text-justify flex-1 overflow-hidden">
        ${
          plant.description.length > 80
            ? plant.description.slice(0, 80) + " ..."
            : plant.description
        }
      </p>
      <div class="flex justify-between items-center mt-2">
        <div class="font-bold bg-[#DCFCE7] rounded-[20px] text-[10px] p-[6px]">
          ${plant.category}
        </div>
        <div class="text-[10px] font-bold">৳<span id="amount">${
          plant.price
        }</span></div>
      </div>
      <button class="btn bg-[#15803D] w-full rounded-[999px] text-white text-[10px] mt-auto" onclick="cartFunction('${
        plant.name
      }', ${plant.price}, ${1},${plant.price})"
>
        Add to Cart
      </button>
    </div>
  </div>
`;

    cardContainer.appendChild(div);
  }
  manageLoading(false);
};

const loadPlantsByCategories = (id) => {
  manageLoading(true);
  const url = `https://openapi.programming-hero.com/api/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      removeActive();
      const clickBtn = document.getElementById(`tree-btn${id}`);

      clickBtn.classList.add("active");
      displayPlantsByCategories(json.plants);
    });
};

// all tree

const allLoadCategories = () => {
  manageLoading(true);
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((json) => {
      removeActive();
      const clickBtnAll = document.getElementById("tree-btn");
      clickBtnAll.classList.add("active");

      displayPlantsByCategories(json.plants);
    });
};

// Categories section

const displayCategories = (btns) => {
  btnContainer.innerHTML = "";

  const allDiv = document.createElement("div");

  allDiv.innerHTML = `

  <div id="tree-btn" class="active tree-btn p-1 pl-2 text-[#1F2937]  hover:bg-green-900 hover:text-white rounded-sm " onclick="allLoadCategories()">All Trees</div>    
    `;

  btnContainer.appendChild(allDiv);

  for (let btn of btns) {
    const div = document.createElement("div");

    div.innerHTML = `
    <div id="tree-btn${btn.id}" class="tree-btn p-1 pl-2 text-[#1F2937]  hover:bg-green-900 hover:text-white rounded-sm " onclick="loadPlantsByCategories(${btn.id})">${btn.category_name}</div>
    
    
    
    `;
    btnContainer.appendChild(div);
  }
};

const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((json) => {
      allLoadCategories();

      displayCategories(json.categories);
    });
};

loadCategories();
