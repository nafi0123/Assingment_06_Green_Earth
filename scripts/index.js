console.log(222);
const btnContainer = document.getElementById("button-container");
const cardContainer = document.getElementById("card-container");

// toggle btn

const removeActive = () => {
  const lessonButtons = document.querySelectorAll(".tree-btn");
  lessonButtons.forEach((btn) => btn.classList.remove("active"));
};

// "plants": {
// "id": 1,
// "image": "https://i.ibb.co.com/cSQdg7tf/mango-min.jpg",
// "name": "Mango Tree",
// "description": "A fast-growing tropical tree that produces delicious, juicy mangoes during summer. Its dense green canopy offers shade, while its sweet fruits are rich in vitamins and minerals.",
// "category": "Fruit Tree",
// "price": 500
// }

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
        <div class="text-[10px] font-bold">৳<span id="amount">${
          detail.price
        }</span></div>
      </div>
    </div>
  </div>
`;
};

const loadModalDes = (id) => {
  url = `https://openapi.programming-hero.com/api/plant/${id}`;

  fetch(url)
    .then((res) => res.json(url))
    .then((json) => {
      displayModalDes(json.plants);
    });
};

// plantsByCategories section
const displayPlantsByCategories = (plants) => {
  console.log(plants, 1);
  cardContainer.innerHTML = "";

  for (let plant of plants) {
    const div = document.createElement("div");
    div.classList.add("h-full", "w-full");
    div.innerHTML = `
  <div class="card bg-base-100 w-full h-full shadow-sm flex flex-col justify-between">
    <div class="p-2">
      <figure class="aspect-square">
        <img class="rounded-lg w-full h-full object-cover" 
          src="${plant.image}" alt="Plant Image" />
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
      <button class="btn bg-[#15803D] w-full rounded-[999px] text-white text-[10px] mt-auto">
        Add to Cart
      </button>
    </div>
  </div>
`;

    cardContainer.appendChild(div);
  }
};

const loadPlantsByCategories = (id) => {
  const url = `https://openapi.programming-hero.com/api/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      removeActive();
      const clickBtn = document.getElementById(`tree-btn${id}`);
      console.log(clickBtn);
      clickBtn.classList.add("active");
      displayPlantsByCategories(json.plants);
    });
};

// all tree

const allLoadCategories = () => {
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

  console.log(btns);

  const allDiv = document.createElement("div");

  allDiv.innerHTML = `

  <div id="tree-btn" class="active tree-btn p-1 pl-2 text-[#1F2937]  hover:bg-green-900 hover:text-white rounded-sm " onclick="allLoadCategories()">All Trees</div>    
    `;

  btnContainer.appendChild(allDiv);

  for (let btn of btns) {
    const div = document.createElement("div");
    console.log(btn.id);
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
